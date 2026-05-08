# Finance Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone personal finance dashboard that connects to Wings Financial Credit Union via Plaid, auto-detects income and bills, and shows exactly how much to move to savings each paycheck.

**Architecture:** New Next.js 15 App Router app (separate repo from Attune). Plaid handles all bank data via three API routes. Pure TypeScript functions compute all financial values. Data persisted in gitignored local JSON files — no database.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Plaid Node SDK v29, react-plaid-link, Jest + ts-jest

---

## File Map

```
~/finance-dashboard/
├── .data/                              # gitignored — never commit
│   ├── plaid.json                      # { accessToken, itemId }
│   └── goals.json                      # { name, targetAmount, currentAmount }
├── src/
│   ├── lib/
│   │   ├── types.ts                    # shared interfaces
│   │   ├── storage.ts                  # read/write .data/ JSON files
│   │   ├── compute.ts                  # pure financial calculation functions
│   │   └── plaid.ts                    # Plaid SDK client singleton
│   ├── app/
│   │   ├── layout.tsx                  # root layout — dark bg, Inter font
│   │   ├── page.tsx                    # dashboard — server component, fetches data
│   │   ├── setup/
│   │   │   └── page.tsx                # onboarding — launches Plaid Link
│   │   └── api/plaid/
│   │       ├── create-link-token/route.ts
│   │       ├── exchange-token/route.ts
│   │       └── data/route.ts
│   └── components/
│       ├── PlaidLink.tsx               # client component — Plaid Link button
│       ├── HeroSavings.tsx             # big savings number + paycheck info
│       ├── StatCards.tsx               # income / bills / surplus row
│       ├── SavingsGoal.tsx             # progress bar + inline edit (client)
│       ├── BillsList.tsx               # recurring outflows with due dates
│       ├── SpendingCategories.tsx      # horizontal bar category breakdown
│       └── SyncButton.tsx              # client component — "Sync now" button
├── __tests__/
│   ├── compute.test.ts
│   └── storage.test.ts
├── .env.local                          # Plaid keys — gitignored
├── .gitignore
└── jest.config.ts
```

---

## Task 1: Scaffold the project

**Files:**
- Create: `~/finance-dashboard/` (new repo)
- Create: `.gitignore`
- Create: `.env.local`
- Create: `jest.config.ts`

- [ ] **Step 1: Create the Next.js app**

```bash
cd ~
npx create-next-app@latest finance-dashboard \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd finance-dashboard
# Rename src to expected structure
mkdir -p src/lib src/components __tests__
```

Wait — `create-next-app` puts files in root by default without `--src-dir`. Use:

```bash
cd ~
npx create-next-app@latest finance-dashboard \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd finance-dashboard
mkdir -p src/lib src/components __tests__ .data
```

- [ ] **Step 2: Install dependencies**

```bash
npm install plaid react-plaid-link
npm install --save-dev jest @types/jest ts-jest
```

- [ ] **Step 3: Create `.gitignore`** (add to the generated one)

Add these lines to the existing `.gitignore`:

```
# local data — contains Plaid access tokens, never commit
.data/

# env
.env.local
```

- [ ] **Step 4: Create `.env.local`**

```bash
cat > .env.local << 'EOF'
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox
EOF
```

Sign up at https://dashboard.plaid.com to get free sandbox credentials. Copy Client ID and Sandbox secret into this file.

- [ ] **Step 5: Create `jest.config.ts`**

```typescript
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
```

- [ ] **Step 6: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Initialize git and commit scaffold**

```bash
git init
git add .
git commit -m "feat: scaffold finance-dashboard Next.js app"
```

---

## Task 2: Shared types

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: Write `src/lib/types.ts`**

```typescript
export interface RecurringStream {
  name: string
  amount: number        // always positive (abs value)
  frequency: string     // MONTHLY, SEMI_MONTHLY, WEEKLY, BIWEEKLY, UNKNOWN
  lastDate: string      // ISO date string: "2026-03-31"
  nextDueDate: string   // ISO date string: computed from lastDate + frequency
  category: string      // e.g. "RENT_AND_UTILITIES", "LOAN_PAYMENTS"
}

export interface SpendingCategory {
  name: string          // human-readable: "Housing", "Food & Dining", etc.
  amount: number        // total spent this month
  percentage: number    // share of total spending (0-100)
}

export interface PlaidData {
  inflowStreams: RecurringStream[]    // income deposits
  outflowStreams: RecurringStream[]   // recurring bills
  categories: SpendingCategory[]     // last 30 days grouped
  currentBalance: number
  lastSynced: string                 // ISO datetime string
}

export interface FinancialSummary {
  monthlyIncome: number
  monthlyBills: number
  monthlySurplus: number
  perPaycheckSavings: number
  nextPaycheckDate: string           // ISO date string
  nextPaycheckAmount: number
  leftoverAfterSavings: number
  payChecksToGoal: number            // ceil, -1 if no goal set
}

export interface Goal {
  name: string
  targetAmount: number
  currentAmount: number
}

export interface StoredPlaidCredentials {
  accessToken: string
  itemId: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Data storage helpers

**Files:**
- Create: `src/lib/storage.ts`
- Create: `__tests__/storage.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// __tests__/storage.test.ts
import { readJson, writeJson } from '@/lib/storage'
import fs from 'fs'
import path from 'path'
import os from 'os'

describe('storage', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'finance-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true })
  })

  it('writeJson creates file with JSON content', () => {
    const filePath = path.join(tmpDir, 'test.json')
    writeJson(filePath, { foo: 'bar' })
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(JSON.parse(content)).toEqual({ foo: 'bar' })
  })

  it('readJson returns parsed content', () => {
    const filePath = path.join(tmpDir, 'test.json')
    fs.writeFileSync(filePath, JSON.stringify({ hello: 42 }))
    expect(readJson(filePath)).toEqual({ hello: 42 })
  })

  it('readJson returns null when file does not exist', () => {
    expect(readJson(path.join(tmpDir, 'missing.json'))).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npm test -- --testPathPattern=storage
```

Expected: FAIL — `Cannot find module '@/lib/storage'`

- [ ] **Step 3: Write `src/lib/storage.ts`**

```typescript
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')

export function dataPath(filename: string): string {
  return path.join(DATA_DIR, filename)
}

export function readJson<T>(filePath: string): T | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch {
    return null
  }
}

export function writeJson<T>(filePath: string, data: T): void {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern=storage
```

Expected: PASS — 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/lib/storage.ts __tests__/storage.test.ts
git commit -m "feat: add JSON file storage helpers"
```

---

## Task 4: Financial computation functions

**Files:**
- Create: `src/lib/compute.ts`
- Create: `__tests__/compute.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// __tests__/compute.test.ts
import {
  computeFinancialSummary,
  getNextPaycheckDate,
  getNextDueDate,
  groupTransactionsByCategory,
} from '@/lib/compute'
import type { RecurringStream, Goal } from '@/lib/types'

describe('getNextPaycheckDate', () => {
  it('returns the 15th when today is before the 15th', () => {
    const result = getNextPaycheckDate(new Date('2026-04-08'))
    expect(result).toBe('2026-04-15')
  })

  it('returns the 15th when today is exactly the 15th', () => {
    const result = getNextPaycheckDate(new Date('2026-04-15'))
    expect(result).toBe('2026-04-15')
  })

  it('returns last day of month when today is after the 15th', () => {
    const result = getNextPaycheckDate(new Date('2026-04-20'))
    expect(result).toBe('2026-04-30')
  })

  it('returns last day of month when today is the last day', () => {
    const result = getNextPaycheckDate(new Date('2026-04-30'))
    expect(result).toBe('2026-04-30')
  })
})

describe('getNextDueDate', () => {
  it('adds ~30 days for MONTHLY', () => {
    const result = getNextDueDate('2026-03-01', 'MONTHLY')
    expect(result).toBe('2026-04-01')
  })

  it('adds 14 days for BIWEEKLY', () => {
    const result = getNextDueDate('2026-03-01', 'BIWEEKLY')
    expect(result).toBe('2026-03-15')
  })

  it('adds 7 days for WEEKLY', () => {
    const result = getNextDueDate('2026-03-01', 'WEEKLY')
    expect(result).toBe('2026-03-08')
  })

  it('falls back to 30 days for UNKNOWN', () => {
    const result = getNextDueDate('2026-03-01', 'UNKNOWN')
    expect(result).toBe('2026-03-31')
  })
})

describe('computeFinancialSummary', () => {
  const inflowStreams: RecurringStream[] = [
    { name: 'Payroll', amount: 3200, frequency: 'SEMI_MONTHLY', lastDate: '2026-03-15', nextDueDate: '2026-03-31', category: 'INCOME' },
    { name: 'Payroll', amount: 3200, frequency: 'SEMI_MONTHLY', lastDate: '2026-03-31', nextDueDate: '2026-04-15', category: 'INCOME' },
  ]
  const outflowStreams: RecurringStream[] = [
    { name: 'Rent', amount: 1800, frequency: 'MONTHLY', lastDate: '2026-03-01', nextDueDate: '2026-04-01', category: 'RENT_AND_UTILITIES' },
    { name: 'Car', amount: 420, frequency: 'MONTHLY', lastDate: '2026-03-10', nextDueDate: '2026-04-10', category: 'LOAN_PAYMENTS' },
  ]
  const goal: Goal = { name: 'Emergency Fund', targetAmount: 10000, currentAmount: 6840 }

  it('computes monthly income as sum of inflow streams', () => {
    const summary = computeFinancialSummary(inflowStreams, outflowStreams, goal, new Date('2026-04-08'))
    expect(summary.monthlyIncome).toBe(6400)
  })

  it('computes monthly bills as sum of outflow streams', () => {
    const summary = computeFinancialSummary(inflowStreams, outflowStreams, goal, new Date('2026-04-08'))
    expect(summary.monthlyBills).toBe(2220)
  })

  it('computes surplus = income - bills', () => {
    const summary = computeFinancialSummary(inflowStreams, outflowStreams, goal, new Date('2026-04-08'))
    expect(summary.monthlySurplus).toBe(4180)
  })

  it('computes per-paycheck savings = surplus / 2', () => {
    const summary = computeFinancialSummary(inflowStreams, outflowStreams, goal, new Date('2026-04-08'))
    expect(summary.perPaycheckSavings).toBe(2090)
  })

  it('computes leftover = paycheck amount - savings', () => {
    const summary = computeFinancialSummary(inflowStreams, outflowStreams, goal, new Date('2026-04-08'))
    expect(summary.leftoverAfterSavings).toBe(3200 - 2090)
  })

  it('computes paychecks to goal', () => {
    // goal: 10000 - 6840 = 3160 remaining, 2090/paycheck → ceil(3160/2090) = 2
    const summary = computeFinancialSummary(inflowStreams, outflowStreams, goal, new Date('2026-04-08'))
    expect(summary.payChecksToGoal).toBe(2)
  })
})

describe('groupTransactionsByCategory', () => {
  it('groups by primary category and sums amounts', () => {
    const transactions = [
      { amount: 50, personal_finance_category: { primary: 'FOOD_AND_DRINK' } },
      { amount: 30, personal_finance_category: { primary: 'FOOD_AND_DRINK' } },
      { amount: 1800, personal_finance_category: { primary: 'RENT_AND_UTILITIES' } },
    ] as any[]
    const result = groupTransactionsByCategory(transactions)
    const food = result.find(c => c.name === 'Food & Dining')
    expect(food?.amount).toBe(80)
    const housing = result.find(c => c.name === 'Housing')
    expect(housing?.amount).toBe(1800)
  })

  it('excludes income and transfer transactions', () => {
    const transactions = [
      { amount: -3200, personal_finance_category: { primary: 'INCOME' } },
      { amount: 500, personal_finance_category: { primary: 'TRANSFER_OUT' } },
      { amount: 50, personal_finance_category: { primary: 'FOOD_AND_DRINK' } },
    ] as any[]
    const result = groupTransactionsByCategory(transactions)
    expect(result.find(c => c.name === 'Income')).toBeUndefined()
    expect(result.find(c => c.name === 'Transfer')).toBeUndefined()
    expect(result.length).toBe(1)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npm test -- --testPathPattern=compute
```

Expected: FAIL — `Cannot find module '@/lib/compute'`

- [ ] **Step 3: Write `src/lib/compute.ts`**

```typescript
import type { RecurringStream, FinancialSummary, SpendingCategory, Goal } from './types'

const CATEGORY_LABELS: Record<string, string> = {
  FOOD_AND_DRINK: 'Food & Dining',
  TRANSPORTATION: 'Transport',
  RENT_AND_UTILITIES: 'Housing',
  ENTERTAINMENT: 'Entertainment',
  GENERAL_MERCHANDISE: 'Shopping',
  LOAN_PAYMENTS: 'Loan Payments',
  PERSONAL_CARE: 'Personal Care',
  MEDICAL: 'Medical',
  TRAVEL: 'Travel',
  BANK_FEES: 'Bank Fees',
  GOVERNMENT_AND_NON_PROFIT: 'Government',
}

const EXCLUDED_CATEGORIES = new Set(['INCOME', 'TRANSFER_IN', 'TRANSFER_OUT'])

/** Returns next paycheck date (15th or last day of month) as ISO date string */
export function getNextPaycheckDate(today: Date = new Date()): string {
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const lastDayNum = new Date(year, month + 1, 0).getDate()

  let targetDate: Date
  if (day <= 15) {
    targetDate = new Date(year, month, 15)
  } else {
    targetDate = new Date(year, month, lastDayNum)
  }
  return targetDate.toISOString().split('T')[0]
}

/** Computes next due date from lastDate string + frequency */
export function getNextDueDate(lastDate: string, frequency: string): string {
  const date = new Date(lastDate)
  const daysMap: Record<string, number> = {
    MONTHLY: 30,
    SEMI_MONTHLY: 15,
    BIWEEKLY: 14,
    WEEKLY: 7,
  }
  const days = daysMap[frequency] ?? 30
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

/** Groups raw Plaid transactions by primary category, excludes income/transfers */
export function groupTransactionsByCategory(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[]
): SpendingCategory[] {
  const totals: Record<string, number> = {}

  for (const tx of transactions) {
    const primary: string = tx.personal_finance_category?.primary ?? 'OTHER'
    if (EXCLUDED_CATEGORIES.has(primary)) continue
    if (tx.amount <= 0) continue // negative = money coming in, skip
    const label = CATEGORY_LABELS[primary] ?? 'Other'
    totals[label] = (totals[label] ?? 0) + tx.amount
  }

  const totalSpend = Object.values(totals).reduce((a, b) => a + b, 0)

  return Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, amount]) => ({
      name,
      amount: Math.round(amount * 100) / 100,
      percentage: totalSpend > 0 ? Math.round((amount / totalSpend) * 100) : 0,
    }))
}

/** Computes all derived financial values from Plaid data */
export function computeFinancialSummary(
  inflowStreams: RecurringStream[],
  outflowStreams: RecurringStream[],
  goal: Goal | null,
  today: Date = new Date()
): FinancialSummary {
  const monthlyIncome = inflowStreams.reduce((sum, s) => sum + s.amount, 0)
  const monthlyBills = outflowStreams.reduce((sum, s) => sum + s.amount, 0)
  const monthlySurplus = monthlyIncome - monthlyBills
  const perPaycheckSavings = monthlySurplus / 2
  const nextPaycheckDate = getNextPaycheckDate(today)
  const nextPaycheckAmount = monthlyIncome / 2
  const leftoverAfterSavings = nextPaycheckAmount - perPaycheckSavings

  let payChecksToGoal = -1
  if (goal && perPaycheckSavings > 0) {
    const remaining = goal.targetAmount - goal.currentAmount
    payChecksToGoal = remaining > 0 ? Math.ceil(remaining / perPaycheckSavings) : 0
  }

  return {
    monthlyIncome,
    monthlyBills,
    monthlySurplus,
    perPaycheckSavings,
    nextPaycheckDate,
    nextPaycheckAmount,
    leftoverAfterSavings,
    payChecksToGoal,
  }
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test -- --testPathPattern=compute
```

Expected: PASS — all tests pass

- [ ] **Step 5: Commit**

```bash
git add src/lib/compute.ts __tests__/compute.test.ts
git commit -m "feat: add financial computation functions with tests"
```

---

## Task 5: Plaid client + API routes

**Files:**
- Create: `src/lib/plaid.ts`
- Create: `src/app/api/plaid/create-link-token/route.ts`
- Create: `src/app/api/plaid/exchange-token/route.ts`
- Create: `src/app/api/plaid/data/route.ts`

- [ ] **Step 1: Write `src/lib/plaid.ts`**

```typescript
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments ?? 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

export const plaidClient = new PlaidApi(configuration)
```

- [ ] **Step 2: Write `src/app/api/plaid/create-link-token/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { plaidClient } from '@/lib/plaid'
import { Products, CountryCode } from 'plaid'

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'sam-personal' },
      client_name: 'Finance Dashboard',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    })
    return NextResponse.json({ link_token: response.data.link_token })
  } catch (error) {
    console.error('create-link-token error:', error)
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Write `src/app/api/plaid/exchange-token/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { plaidClient } from '@/lib/plaid'
import { writeJson, dataPath } from '@/lib/storage'
import type { StoredPlaidCredentials } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { public_token } = await request.json()
    const response = await plaidClient.itemPublicTokenExchange({ public_token })
    const credentials: StoredPlaidCredentials = {
      accessToken: response.data.access_token,
      itemId: response.data.item_id,
    }
    writeJson(dataPath('plaid.json'), credentials)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('exchange-token error:', error)
    return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Write `src/app/api/plaid/data/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { plaidClient } from '@/lib/plaid'
import { readJson, dataPath } from '@/lib/storage'
import { getNextDueDate, groupTransactionsByCategory } from '@/lib/compute'
import type { StoredPlaidCredentials, PlaidData, RecurringStream } from '@/lib/types'

export async function GET() {
  const credentials = readJson<StoredPlaidCredentials>(dataPath('plaid.json'))
  if (!credentials) {
    return NextResponse.json({ error: 'Not connected' }, { status: 401 })
  }

  const { accessToken } = credentials

  try {
    const [recurringRes, balanceRes] = await Promise.all([
      plaidClient.transactionsRecurringGet({
        access_token: accessToken,
        options: { include_personal_finance_category: true },
      }),
      plaidClient.accountsBalanceGet({ access_token: accessToken }),
    ])

    // Fetch recent transactions for spending categories
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const txRes = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    })

    const mapStream = (stream: any): RecurringStream => ({
      name: stream.merchant_name || stream.description || 'Unknown',
      amount: Math.abs(stream.average_amount?.amount ?? 0),
      frequency: stream.frequency ?? 'UNKNOWN',
      lastDate: stream.last_date ?? '',
      nextDueDate: getNextDueDate(stream.last_date ?? '', stream.frequency ?? 'UNKNOWN'),
      category: stream.personal_finance_category?.primary ?? 'OTHER',
    })

    const inflowStreams = (recurringRes.data.inflow_streams ?? [])
      .filter((s: any) => s.is_active)
      .map(mapStream)

    const outflowStreams = (recurringRes.data.outflow_streams ?? [])
      .filter((s: any) => s.is_active)
      .map(mapStream)

    const categories = groupTransactionsByCategory(txRes.data.transactions)

    const primaryAccount = balanceRes.data.accounts[0]
    const currentBalance = primaryAccount?.balances?.current ?? 0

    const data: PlaidData = {
      inflowStreams,
      outflowStreams,
      categories,
      currentBalance,
      lastSynced: new Date().toISOString(),
    }

    return NextResponse.json(data)
  } catch (error: any) {
    // Plaid item login required = connection expired
    if (error?.response?.data?.error_code === 'ITEM_LOGIN_REQUIRED') {
      return NextResponse.json({ error: 'ITEM_LOGIN_REQUIRED' }, { status: 401 })
    }
    console.error('data route error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/plaid.ts src/app/api/
git commit -m "feat: add Plaid API routes"
```

---

## Task 6: Global layout + styles

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --card: #111111;
  --border: #1e1e1e;
  --border-subtle: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #555555;
  --text-muted: #333333;
  --green: #4ade80;
  --purple: #a78bfa;
  --purple-dark: #7c3aed;
  --red: #f87171;
}

* {
  box-sizing: border-box;
}

body {
  background: var(--background);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
}

.label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
```

- [ ] **Step 2: Replace `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Personal finance dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add global layout and design system CSS"
```

---

## Task 7: Setup page + PlaidLink component

**Files:**
- Create: `src/components/PlaidLink.tsx`
- Create: `src/app/setup/page.tsx`

- [ ] **Step 1: Write `src/components/PlaidLink.tsx`**

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'

export default function PlaidLink() {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/plaid/create-link-token', { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        if (data.link_token) {
          setLinkToken(data.link_token)
        } else {
          setError('Could not initialize bank connection. Check your Plaid credentials.')
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Network error. Is the dev server running?')
        setLoading(false)
      })
  }, [])

  const onSuccess = useCallback(async (publicToken: string) => {
    const res = await fetch('/api/plaid/exchange-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token: publicToken }),
    })
    if (res.ok) {
      router.push('/')
    } else {
      setError('Failed to save bank connection. Try again.')
    }
  }, [router])

  const { open, ready } = usePlaidLink({
    token: linkToken ?? '',
    onSuccess,
  })

  if (error) {
    return <p style={{ color: '#f87171', fontSize: 14 }}>{error}</p>
  }

  return (
    <button
      onClick={() => open()}
      disabled={!ready || loading}
      style={{
        background: loading || !ready ? '#333' : '#a78bfa',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '14px 32px',
        fontSize: 15,
        fontWeight: 600,
        cursor: loading || !ready ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
      }}
    >
      {loading ? 'Preparing...' : 'Connect Wings Financial'}
    </button>
  )
}
```

- [ ] **Step 2: Write `src/app/setup/page.tsx`**

```typescript
import { redirect } from 'next/navigation'
import { readJson, dataPath } from '@/lib/storage'
import type { StoredPlaidCredentials } from '@/lib/types'
import PlaidLink from '@/components/PlaidLink'

export default function SetupPage() {
  const credentials = readJson<StoredPlaidCredentials>(dataPath('plaid.json'))
  if (credentials?.accessToken) {
    redirect('/')
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: '0 24px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>
          Finance Dashboard
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
          Connect your bank
        </h1>
        <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
          Securely connect Wings Financial Credit Union via Plaid. Your credentials never touch this app.
        </p>
        <PlaidLink />
        <p style={{ color: '#333', fontSize: 12, marginTop: 16 }}>
          Uses Plaid's encrypted bank-grade connection
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Start dev server and test setup flow in sandbox**

```bash
npm run dev
```

Visit http://localhost:3000 — you should be redirected to `/setup` (no `.data/plaid.json` exists yet).

Click "Connect Wings Financial". In Plaid sandbox, use:
- Institution: search "First Platypus Bank" (sandbox test bank)
- Username: `user_good`
- Password: `pass_good`

On success you should be redirected to `/` (which shows a blank page for now).

Check that `.data/plaid.json` was created with `accessToken` and `itemId`.

- [ ] **Step 4: Commit**

```bash
git add src/components/PlaidLink.tsx src/app/setup/
git commit -m "feat: add setup page and PlaidLink onboarding component"
```

---

## Task 8: Dashboard UI components

**Files:**
- Create: `src/components/HeroSavings.tsx`
- Create: `src/components/StatCards.tsx`
- Create: `src/components/SavingsGoal.tsx`
- Create: `src/components/BillsList.tsx`
- Create: `src/components/SpendingCategories.tsx`
- Create: `src/components/SyncButton.tsx`

- [ ] **Step 1: Write `src/components/HeroSavings.tsx`**

```typescript
import type { FinancialSummary } from '@/lib/types'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function HeroSavings({ summary }: { summary: FinancialSummary }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '28px 32px' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', marginBottom: 8 }}>
        Next paycheck: {formatDate(summary.nextPaycheckDate)} · {formatCurrency(summary.nextPaycheckAmount)}
      </p>
      <div style={{ color: '#4ade80', fontSize: 52, fontWeight: 700, lineHeight: 1 }}>
        {formatCurrency(summary.perPaycheckSavings)}
      </div>
      <p style={{ color: '#555', fontSize: 13, marginTop: 8 }}>
        move to savings on {formatDate(summary.nextPaycheckDate)}
      </p>
      <div style={{ color: '#333', fontSize: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid #1a1a1a' }}>
        After savings ·{' '}
        <span style={{ color: '#aaa' }}>{formatCurrency(summary.leftoverAfterSavings)} remaining</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `src/components/StatCards.tsx`**

```typescript
import type { FinancialSummary } from '@/lib/types'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function StatCards({ summary }: { summary: FinancialSummary }) {
  const cards = [
    { label: 'Monthly Income', value: formatCurrency(summary.monthlyIncome), sub: '2 paychecks / mo', color: '#fff' },
    { label: 'Monthly Bills', value: formatCurrency(summary.monthlyBills), sub: 'recurring outflows', color: '#fff' },
    { label: 'Monthly Surplus', value: formatCurrency(summary.monthlySurplus), sub: `${formatCurrency(summary.perPaycheckSavings)} per paycheck`, color: '#4ade80' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {cards.map(card => (
        <div key={card.label} className="card">
          <div className="label">{card.label}</div>
          <div style={{ color: card.color, fontSize: 22, fontWeight: 600 }}>{card.value}</div>
          <div style={{ color: '#555', fontSize: 11, marginTop: 4 }}>{card.sub}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Write `src/components/SavingsGoal.tsx`**

```typescript
'use client'

import { useState } from 'react'
import type { Goal, FinancialSummary } from '@/lib/types'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function SavingsGoal({ goal, summary }: { goal: Goal; summary: FinancialSummary }) {
  const [editing, setEditing] = useState(false)
  const [currentAmount, setCurrentAmount] = useState(goal.currentAmount)
  const [inputValue, setInputValue] = useState(String(goal.currentAmount))
  const [saving, setSaving] = useState(false)

  const percentage = Math.min(100, Math.round((currentAmount / goal.targetAmount) * 100))

  const handleSave = async () => {
    const parsed = parseFloat(inputValue)
    if (isNaN(parsed) || parsed < 0) return
    setSaving(true)
    await fetch('/api/goals/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentAmount: parsed }),
    })
    setCurrentAmount(parsed)
    setEditing(false)
    setSaving(false)
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <div className="label">Savings Goal</div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{goal.name} · {formatCurrency(goal.targetAmount)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {editing ? (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ color: '#555', fontSize: 13 }}>$</span>
              <input
                type="number"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{
                  background: '#1a1a1a', border: '1px solid #333', borderRadius: 6,
                  color: '#fff', padding: '4px 8px', fontSize: 14, width: 100,
                }}
                autoFocus
              />
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ background: '#a78bfa', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}
              >
                {saving ? '...' : 'Save'}
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{ background: 'transparent', color: '#555', border: 'none', cursor: 'pointer', fontSize: 12 }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', padding: 0 }}
            >
              <div style={{ color: '#a78bfa', fontSize: 20, fontWeight: 600 }}>{formatCurrency(currentAmount)}</div>
              <div style={{ color: '#555', fontSize: 11 }}>{percentage}% complete · tap to update</div>
            </button>
          )}
        </div>
      </div>
      <div style={{ background: '#1a1a1a', borderRadius: 999, height: 6, overflow: 'hidden' }}>
        <div style={{
          background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
          width: `${percentage}%`,
          height: '100%',
          borderRadius: 999,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <p style={{ color: '#555', fontSize: 11, marginTop: 8 }}>
        {summary.payChecksToGoal > 0
          ? `~${summary.payChecksToGoal} more ${summary.payChecksToGoal === 1 ? 'paycheck' : 'paychecks'} at current rate`
          : summary.payChecksToGoal === 0
          ? 'Goal reached!'
          : 'Set a goal to see progress'}
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/BillsList.tsx`**

```typescript
import type { RecurringStream } from '@/lib/types'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatDate(isoDate: string) {
  if (!isoDate) return '—'
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const PREVIEW_COUNT = 5

export default function BillsList({ streams }: { streams: RecurringStream[] }) {
  const sorted = [...streams].sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate))
  const preview = sorted.slice(0, PREVIEW_COUNT)
  const rest = sorted.slice(PREVIEW_COUNT)
  const restTotal = rest.reduce((sum, s) => sum + s.amount, 0)

  return (
    <div className="card">
      <div className="label">Recurring Bills</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {preview.map((stream, i) => (
          <div key={stream.name + i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0',
            borderTop: i > 0 ? '1px solid #1a1a1a' : undefined,
          }}>
            <div>
              <div style={{ fontSize: 13 }}>{stream.name}</div>
              <div style={{ color: '#555', fontSize: 11 }}>Due {formatDate(stream.nextDueDate)}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(stream.amount)}</div>
          </div>
        ))}
        {rest.length > 0 && (
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '10px 0', borderTop: '1px solid #1a1a1a',
          }}>
            <div style={{ color: '#aaa', fontSize: 12 }}>+ {rest.length} more bills</div>
            <div style={{ color: '#aaa', fontSize: 12 }}>{formatCurrency(restTotal)}</div>
          </div>
        )}
        {streams.length === 0 && (
          <p style={{ color: '#555', fontSize: 13, padding: '10px 0' }}>
            No recurring bills detected yet. Plaid needs ~2 weeks of history.
          </p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Write `src/components/SpendingCategories.tsx`**

```typescript
import type { SpendingCategory } from '@/lib/types'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

const BAR_COLORS = ['#7c3aed', '#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function SpendingCategories({ categories }: { categories: SpendingCategory[] }) {
  return (
    <div className="card">
      <div className="label">Spending Categories</div>
      {categories.length === 0 ? (
        <p style={{ color: '#555', fontSize: 13, padding: '10px 0' }}>
          No transactions yet. Connect your bank to see spending breakdown.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {categories.map((cat, i) => (
            <div key={cat.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#aaa', fontSize: 12 }}>{cat.name}</span>
                <span style={{ fontSize: 12 }}>{formatCurrency(cat.amount)}</span>
              </div>
              <div style={{ background: '#1a1a1a', borderRadius: 999, height: 4 }}>
                <div style={{
                  background: BAR_COLORS[i % BAR_COLORS.length],
                  width: `${cat.percentage}%`,
                  height: '100%',
                  borderRadius: 999,
                  minWidth: cat.percentage > 0 ? 4 : 0,
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Write `src/components/SyncButton.tsx`**

```typescript
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function SyncButton({ lastSynced }: { lastSynced: string }) {
  const [isPending, startTransition] = useTransition()
  const [label, setLabel] = useState('Sync now')
  const router = useRouter()

  const handleSync = () => {
    startTransition(() => {
      setLabel('Syncing...')
      router.refresh()
      setTimeout(() => setLabel('Sync now'), 1500)
    })
  }

  const elapsed = Math.round((Date.now() - new Date(lastSynced).getTime()) / 60000)
  const syncLabel = elapsed < 2 ? 'just now' : `${elapsed}m ago`

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ color: '#555', fontSize: 11 }}>Last synced {syncLabel}</span>
      <button
        onClick={handleSync}
        disabled={isPending}
        style={{
          background: 'transparent',
          border: '1px solid #333',
          borderRadius: 6,
          color: '#aaa',
          padding: '4px 12px',
          fontSize: 12,
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {label}
      </button>
    </div>
  )
}
```

- [ ] **Step 7: Commit all components**

```bash
git add src/components/
git commit -m "feat: add all dashboard UI components"
```

---

## Task 9: Goals update API route

**Files:**
- Create: `src/app/api/goals/update/route.ts`

The `SavingsGoal` component calls this to persist `currentAmount` changes.

- [ ] **Step 1: Write `src/app/api/goals/update/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { readJson, writeJson, dataPath } from '@/lib/storage'
import type { Goal } from '@/lib/types'

const DEFAULT_GOAL: Goal = {
  name: 'Emergency Fund',
  targetAmount: 10000,
  currentAmount: 0,
}

export async function POST(request: NextRequest) {
  try {
    const { currentAmount } = await request.json()
    if (typeof currentAmount !== 'number' || currentAmount < 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }
    const existing = readJson<Goal>(dataPath('goals.json')) ?? DEFAULT_GOAL
    const updated: Goal = { ...existing, currentAmount }
    writeJson(dataPath('goals.json'), updated)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/goals/
git commit -m "feat: add goals update API route"
```

---

## Task 10: Dashboard page (main)

**Files:**
- Modify: `src/app/page.tsx`

This is the main server component that wires everything together.

- [ ] **Step 1: Replace `src/app/page.tsx`**

```typescript
import { redirect } from 'next/navigation'
import { readJson, dataPath } from '@/lib/storage'
import { computeFinancialSummary } from '@/lib/compute'
import type { StoredPlaidCredentials, PlaidData, Goal } from '@/lib/types'
import HeroSavings from '@/components/HeroSavings'
import StatCards from '@/components/StatCards'
import SavingsGoal from '@/components/SavingsGoal'
import BillsList from '@/components/BillsList'
import SpendingCategories from '@/components/SpendingCategories'
import SyncButton from '@/components/SyncButton'

const DEFAULT_GOAL: Goal = {
  name: 'Emergency Fund',
  targetAmount: 10000,
  currentAmount: 0,
}

async function fetchPlaidData(): Promise<PlaidData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/plaid/data`, { cache: 'no-store' })
    if (res.status === 401) return null
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  // Check connection
  const credentials = readJson<StoredPlaidCredentials>(dataPath('plaid.json'))
  if (!credentials?.accessToken) {
    redirect('/setup')
  }

  const goal = readJson<Goal>(dataPath('goals.json')) ?? DEFAULT_GOAL
  const plaidData = await fetchPlaidData()

  // Handle expired connection
  if (!plaidData) {
    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{
          background: '#1a0a0a', border: '1px solid #f87171', borderRadius: 10,
          padding: '16px 20px', marginBottom: 24, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: '#f87171', fontSize: 14 }}>
            Your bank connection expired or failed to load.
          </span>
          <a href="/setup" style={{
            color: '#fff', background: '#f87171', border: 'none', borderRadius: 6,
            padding: '6px 14px', fontSize: 12, textDecoration: 'none', fontWeight: 600,
          }}>
            Reconnect
          </a>
        </div>
      </main>
    )
  }

  const summary = computeFinancialSummary(
    plaidData.inflowStreams,
    plaidData.outflowStreams,
    goal
  )

  const noData = plaidData.inflowStreams.length === 0 && plaidData.outflowStreams.length === 0

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: 2 }}>
            Finance
          </p>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Wings Financial</h1>
        </div>
        <SyncButton lastSynced={plaidData.lastSynced} />
      </div>

      {/* Still learning banner */}
      {noData && (
        <div style={{
          background: '#0a0a1a', border: '1px solid #333', borderRadius: 10,
          padding: '14px 18px', marginBottom: 20, color: '#aaa', fontSize: 13,
        }}>
          Still learning your transactions — Plaid needs ~2 weeks of history to detect recurring patterns.
        </div>
      )}

      <div style={{ display: 'grid', gap: 16 }}>
        <HeroSavings summary={summary} />
        <StatCards summary={summary} />
        <SavingsGoal goal={goal} summary={summary} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <BillsList streams={plaidData.outflowStreams} />
          <SpendingCategories categories={plaidData.categories} />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Add `NEXT_PUBLIC_BASE_URL` to `.env.local`**

```bash
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" >> .env.local
```

- [ ] **Step 3: Start dev server and verify full dashboard renders**

```bash
npm run dev
```

Visit http://localhost:3000. With a sandbox connection you should see:
- Hero card with green savings amount
- 3 stat cards (income / bills / surplus)
- Savings goal with progress bar
- Bills list (may show empty state in sandbox until recurring patterns detected)
- Spending categories (populated from sandbox test transactions)

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx .env.local
git commit -m "feat: wire up dashboard page with all components"
```

---

## Task 11: Switch to production and connect Wings Financial

- [ ] **Step 1: Create a Plaid production/development app**

Log into https://dashboard.plaid.com:
1. Create a new application
2. Request **Development** access (free, supports real banks, up to 100 items)
3. Once approved, copy your Development `client_id` and `secret`

- [ ] **Step 2: Update `.env.local`**

```bash
# Replace sandbox values with development credentials
PLAID_CLIENT_ID=your_development_client_id
PLAID_SECRET=your_development_secret
PLAID_ENV=development
```

- [ ] **Step 3: Delete sandbox credentials and reconnect**

```bash
rm .data/plaid.json
```

Restart the dev server. Visit http://localhost:3000 → redirects to `/setup`. Click "Connect Wings Financial", search for "Wings Financial Credit Union", log in with your real credentials.

- [ ] **Step 4: Verify real data loads**

After connecting, you should see your actual paycheck deposits detected as inflow streams and real recurring bills as outflow streams. The savings number will reflect your actual finances.

---

## Task 12: Run full test suite + final commit

- [ ] **Step 1: Run all tests**

```bash
npm test
```

Expected: all tests pass (compute + storage)

- [ ] **Step 2: Run a production build to catch type errors**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete finance dashboard with Plaid integration"
```
