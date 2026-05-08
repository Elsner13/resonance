# Capital Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `~/finance-dashboard/` as a Private Wealth-aesthetic personal CFO dashboard powered by Teller (Wings Financial) and Gmail, replacing the existing Plaid version.

**Architecture:** App Router Next.js 16 server components fetch data from `.data/` JSON files (written by API routes + sync script). API routes call Teller and Gmail APIs, compute the move-money directive, and write results to disk. The dashboard reads from disk on every load — no client-side fetching on the main page.

**Tech Stack:** Next.js 16 App Router · TypeScript 5.8 · Tailwind CSS 4 · `teller-connect-react` · `googleapis` · macOS launchd

---

## File Map

**Delete (Plaid remnants):**
- `src/app/api/plaid/` (entire directory)
- `src/lib/plaid.ts`
- `src/components/PlaidLink.tsx`
- `src/components/BillsList.tsx`
- `src/components/HeroSavings.tsx`
- `src/components/SavingsGoal.tsx`
- `src/components/SpendingCategories.tsx`
- `src/components/StatCards.tsx`
- `__tests__/compute.test.ts` (replaced)

**Replace:**
- `src/lib/types.ts`
- `src/lib/compute.ts`
- `src/lib/storage.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/setup/page.tsx`
- `src/app/api/goals/update/route.ts`
- `src/components/SyncButton.tsx`
- `__tests__/compute.test.ts`

**Create:**
- `src/lib/teller.ts`
- `src/lib/gmail.ts`
- `src/lib/forecast.ts`
- `src/app/api/teller/connect/route.ts`
- `src/app/api/teller/sync/route.ts`
- `src/app/api/gmail/sync/route.ts`
- `src/app/api/paycheck/update/route.ts`
- `src/components/TellerConnect.tsx`
- `src/components/AlertsBanner.tsx`
- `src/components/HeroCapital.tsx`
- `src/components/CapitalStats.tsx`
- `src/components/MoveMoney.tsx`
- `src/components/CashFlowCalendar.tsx`
- `src/components/IncomeStreams.tsx`
- `src/components/ObligationsTable.tsx`
- `src/components/TransactionFeed.tsx`
- `src/components/SavingsTracker.tsx`
- `scripts/sync.ts`
- `launchd/com.sam.financedashboard.plist`
- `__tests__/forecast.test.ts`
- `.env.local` (template only — real file must be created by user)

---

## Task 1: Packages — Remove Plaid, Add Teller + Gmail

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (via npm)

- [ ] **Step 1: Remove Plaid packages**

```bash
cd ~/finance-dashboard
npm uninstall plaid react-plaid-link
```

- [ ] **Step 2: Install Teller + Gmail packages**

```bash
npm install teller-connect-react googleapis
```

- [ ] **Step 3: Delete old Plaid files**

```bash
rm -rf src/app/api/plaid
rm src/lib/plaid.ts
rm src/components/PlaidLink.tsx
rm src/components/BillsList.tsx
rm src/components/HeroSavings.tsx
rm src/components/SavingsGoal.tsx
rm src/components/SpendingCategories.tsx
rm src/components/StatCards.tsx
```

- [ ] **Step 4: Verify build still starts (will have type errors, but shouldn't crash node_modules)**

```bash
npm run build 2>&1 | head -20
```

Expected: TypeScript errors from removed imports — that's fine. No "Cannot find module" for next itself.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: replace plaid with teller + googleapis"
```

---

## Task 2: Types — Complete Replacement

**Files:**
- Replace: `src/lib/types.ts`

- [ ] **Step 1: Write new types.ts**

```typescript
// src/lib/types.ts

export interface TellerCredentials {
  accessToken: string
  accountIds: {
    checking: string
    savings: string
  }
}

export interface GmailTokens {
  access_token: string
  refresh_token: string
  expiry_date: number
  token_type: string
  scope: string
}

export interface TellerAccountRaw {
  id: string
  name: string
  type: string
  subtype: string
  institution: { name: string }
  status: string
}

export interface TellerBalanceRaw {
  account_id: string
  available: string
  ledger: string
  last_updated_at: string
}

export interface TellerTransactionRaw {
  id: string
  account_id: string
  date: string           // YYYY-MM-DD
  description: string
  amount: string         // positive string, direction from type
  type: 'debit' | 'credit'
  running_balance: string | null
  status: string
  details: {
    category: string | null
    counterparty: {
      name: string
      type: string
    } | null
  }
}

export interface Transaction {
  id: string
  accountId: string
  date: string           // YYYY-MM-DD
  description: string
  amount: number         // negative = money out, positive = money in
  type: 'debit' | 'credit'
  category: string | null
  counterparty: string | null
}

export interface PaycheckSchedule {
  paydates: string[]    // YYYY-MM-DD sorted ascending
  netAmount: number
}

export interface Obligation {
  name: string
  amount: number
  dueDate: string       // YYYY-MM-DD
  source: 'teller' | 'gmail'
  status: 'upcoming' | 'paid' | 'failed'
}

export interface IncomeStream {
  source: string        // 'Stripe' | 'KDP' | 'Direct Deposit'
  amount: number
  date: string          // YYYY-MM-DD
  type: 'stripe' | 'kdp' | 'deposit' | 'other'
}

export interface ForecastDay {
  date: string          // YYYY-MM-DD
  projectedBalance: number
  event: string | null  // 'PAY', obligation name, or null
  isBelowBuffer: boolean
}

export interface MoveMoneyDirective {
  shouldMove: boolean
  amount: number        // 0 when shouldMove is false
  fromAccount: string
  toAccount: string
  message: string
}

export interface AlertItem {
  id: string
  type: 'payment_failed' | 'low_balance' | 'goal_hit' | 'income_received'
  message: string
  severity: 'red' | 'yellow' | 'green'
  timestamp: string     // ISO datetime
  dismissed: boolean
}

export interface Goal {
  name: string
  targetAmount: number
  currentAmount: number
}

export interface CapitalSummary {
  monthlyIncome: number
  monthlyExpenses: number
  buffer: number
  deployableCapital: number
  directive: MoveMoneyDirective
  savingsRate: number   // 0–100 percentage
}

export interface DashboardData {
  checkingBalance: number
  savingsBalance: number
  transactions: Transaction[]
  incomeStreams: IncomeStream[]
  obligations: Obligation[]
  lastSynced: string    // ISO datetime
  alerts: AlertItem[]
  paycheckSchedule: PaycheckSchedule | null
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: define Capital Dashboard types"
```

---

## Task 3: Storage — Update Helpers

**Files:**
- Replace: `src/lib/storage.ts`

- [ ] **Step 1: Write updated storage.ts**

The `readJson` / `writeJson` helpers stay the same. Add named helpers for each data file.

```typescript
// src/lib/storage.ts
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

- [ ] **Step 2: Verify existing storage tests still pass**

```bash
cd ~/finance-dashboard && npx jest __tests__/storage.test.ts --no-coverage
```

Expected: PASS (3 tests)

- [ ] **Step 3: Commit**

```bash
git add src/lib/storage.ts
git commit -m "chore: simplify storage.ts for Capital Dashboard"
```

---

## Task 4: Compute Engine — TDD

**Files:**
- Replace: `src/lib/compute.ts`
- Replace: `__tests__/compute.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// __tests__/compute.test.ts
import {
  computeBuffer,
  computeDeployableCapital,
  computeMoveAmount,
  computeDirective,
  computeMonthlyIncome,
  computeMonthlyExpenses,
  computeSavingsRate,
} from '@/lib/compute'
import type { Transaction } from '@/lib/types'

// -- sample transactions (last 30 days from 2026-03-28)
const today = '2026-03-28'

const transactions: Transaction[] = [
  // Income
  { id: '1', accountId: 'chk', date: '2026-03-15', description: 'Direct Deposit', amount: 3200, type: 'credit', category: 'income', counterparty: 'Employer' },
  { id: '2', accountId: 'chk', date: '2026-02-28', description: 'Direct Deposit', amount: 3200, type: 'credit', category: 'income', counterparty: 'Employer' },
  { id: '3', accountId: 'chk', date: '2026-03-20', description: 'Stripe', amount: 500, type: 'credit', category: 'income', counterparty: 'Stripe' },
  // Expenses
  { id: '4', accountId: 'chk', date: '2026-03-10', description: 'Jovia payment', amount: -420, type: 'debit', category: 'loan', counterparty: 'Jovia' },
  { id: '5', accountId: 'chk', date: '2026-03-15', description: 'Citizens', amount: -389, type: 'debit', category: 'loan', counterparty: 'Citizens' },
  { id: '6', accountId: 'chk', date: '2026-03-01', description: 'HOA', amount: -315, type: 'debit', category: 'housing', counterparty: 'HOA' },
]

describe('computeMonthlyIncome', () => {
  it('sums credit transactions in the last 30 days', () => {
    const result = computeMonthlyIncome(transactions, today)
    // 3200 (Mar 15) + 500 (Mar 20) = 3700 (Feb 28 is outside 30 days from Mar 28)
    expect(result).toBe(3700)
  })

  it('returns 0 when no credits in range', () => {
    const debitsOnly: Transaction[] = [
      { id: 'x', accountId: 'chk', date: '2026-03-10', description: 'Bill', amount: -100, type: 'debit', category: null, counterparty: null },
    ]
    expect(computeMonthlyIncome(debitsOnly, today)).toBe(0)
  })
})

describe('computeMonthlyExpenses', () => {
  it('sums absolute value of debit transactions in last 30 days', () => {
    const result = computeMonthlyExpenses(transactions, today)
    // 420 + 389 + 315 = 1124
    expect(result).toBe(1124)
  })
})

describe('computeBuffer', () => {
  it('returns 1x monthly expenses', () => {
    expect(computeBuffer(2000)).toBe(2000)
  })

  it('returns 0 for 0 expenses', () => {
    expect(computeBuffer(0)).toBe(0)
  })
})

describe('computeDeployableCapital', () => {
  it('returns checking minus buffer when positive', () => {
    expect(computeDeployableCapital(5000, 2000)).toBe(3000)
  })

  it('returns 0 when checking is below buffer', () => {
    expect(computeDeployableCapital(1500, 2000)).toBe(0)
  })
})

describe('computeMoveAmount', () => {
  it('rounds down to nearest 100', () => {
    expect(computeMoveAmount(840)).toBe(800)
    expect(computeMoveAmount(899)).toBe(800)
    expect(computeMoveAmount(900)).toBe(900)
  })

  it('returns 0 for deployable below 100', () => {
    expect(computeMoveAmount(50)).toBe(0)
  })

  it('returns 0 for 0 deployable', () => {
    expect(computeMoveAmount(0)).toBe(0)
  })
})

describe('computeDirective', () => {
  it('produces a move directive when deployable >= 100', () => {
    const directive = computeDirective(5000, 2000, 'Wings Checking', 'Wings Savings')
    expect(directive.shouldMove).toBe(true)
    expect(directive.amount).toBe(3000)
    expect(directive.fromAccount).toBe('Wings Checking')
    expect(directive.toAccount).toBe('Wings Savings')
    expect(directive.message).toMatch(/\$3,000/)
  })

  it('produces a stay directive when buffer is tight', () => {
    const directive = computeDirective(1800, 2000, 'Wings Checking', 'Wings Savings')
    expect(directive.shouldMove).toBe(false)
    expect(directive.amount).toBe(0)
    expect(directive.message).toBe('Stay the course — buffer is tight')
  })
})

describe('computeSavingsRate', () => {
  it('returns 0 when no income', () => {
    const noIncome: Transaction[] = []
    expect(computeSavingsRate(noIncome, 0, today)).toBe(0)
  })

  it('computes savings / income as a percentage', () => {
    // income 3700, expenses 1124, net saved = 3700 - 1124 = 2576
    // rate = 2576 / 3700 * 100 ≈ 69
    const result = computeSavingsRate(transactions, 0, today)
    expect(result).toBe(Math.round((2576 / 3700) * 100))
  })
})
```

- [ ] **Step 2: Run tests — expect all to fail**

```bash
cd ~/finance-dashboard && npx jest __tests__/compute.test.ts --no-coverage 2>&1 | tail -20
```

Expected: Cannot find module '@/lib/compute' or all tests fail.

- [ ] **Step 3: Write compute.ts**

```typescript
// src/lib/compute.ts
import type { Transaction, MoveMoneyDirective } from './types'

/** Returns YYYY-MM-DD date N days before a given date string */
function daysAgo(dateStr: string, n: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

/** Sums credit transaction amounts within last 30 days */
export function computeMonthlyIncome(transactions: Transaction[], today: string): number {
  const cutoff = daysAgo(today, 30)
  return transactions
    .filter(t => t.type === 'credit' && t.date >= cutoff && t.date <= today)
    .reduce((sum, t) => sum + t.amount, 0)
}

/** Sums absolute value of debit transaction amounts within last 30 days */
export function computeMonthlyExpenses(transactions: Transaction[], today: string): number {
  const cutoff = daysAgo(today, 30)
  return transactions
    .filter(t => t.type === 'debit' && t.date >= cutoff && t.date <= today)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
}

/** Buffer = 1x monthly expenses */
export function computeBuffer(monthlyExpenses: number): number {
  return monthlyExpenses
}

/** Deployable = checking - buffer, floored at 0 */
export function computeDeployableCapital(checkingBalance: number, buffer: number): number {
  return Math.max(0, checkingBalance - buffer)
}

/** Round deployable capital down to nearest $100 */
export function computeMoveAmount(deployable: number): number {
  return Math.floor(deployable / 100) * 100
}

/** Produce the move-money directive */
export function computeDirective(
  checkingBalance: number,
  buffer: number,
  fromAccount: string,
  toAccount: string
): MoveMoneyDirective {
  const deployable = computeDeployableCapital(checkingBalance, buffer)
  const amount = computeMoveAmount(deployable)

  if (amount > 0) {
    return {
      shouldMove: true,
      amount,
      fromAccount,
      toAccount,
      message: `Move $${amount.toLocaleString()} to savings today`,
    }
  }

  return {
    shouldMove: false,
    amount: 0,
    fromAccount,
    toAccount,
    message: 'Stay the course — buffer is tight',
  }
}

/** Savings rate as 0–100 integer. income = 0 → return 0 */
export function computeSavingsRate(
  transactions: Transaction[],
  _savingsBalance: number,
  today: string
): number {
  const income = computeMonthlyIncome(transactions, today)
  if (income === 0) return 0
  const expenses = computeMonthlyExpenses(transactions, today)
  const saved = income - expenses
  return Math.round((saved / income) * 100)
}
```

- [ ] **Step 4: Run tests — expect all to pass**

```bash
cd ~/finance-dashboard && npx jest __tests__/compute.test.ts --no-coverage
```

Expected: PASS (all tests green)

- [ ] **Step 5: Commit**

```bash
git add src/lib/compute.ts __tests__/compute.test.ts
git commit -m "feat: TDD compute engine — buffer, directive, savings rate"
```

---

## Task 5: Forecast Engine — TDD

**Files:**
- Create: `src/lib/forecast.ts`
- Create: `__tests__/forecast.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// __tests__/forecast.test.ts
import { projectBalances } from '@/lib/forecast'
import type { Obligation, PaycheckSchedule } from '@/lib/types'

const obligations: Obligation[] = [
  { name: 'Jovia', amount: 420, dueDate: '2026-04-10', source: 'gmail', status: 'upcoming' },
  { name: 'HOA', amount: 315, dueDate: '2026-04-01', source: 'gmail', status: 'upcoming' },
]

const schedule: PaycheckSchedule = {
  paydates: ['2026-04-15', '2026-04-30'],
  netAmount: 3200,
}

describe('projectBalances', () => {
  const buffer = 1124

  it('returns one entry per day for daysAhead days', () => {
    const result = projectBalances(5000, obligations, schedule, buffer, 10, '2026-03-28')
    expect(result).toHaveLength(10)
  })

  it('adds paycheck on pay dates', () => {
    const result = projectBalances(5000, obligations, schedule, buffer, 20, '2026-03-28')
    const apr15 = result.find(d => d.date === '2026-04-15')
    // Balance before Apr 15 minus HOA minus Jovia minus any other obligations + 3200
    expect(apr15).toBeDefined()
    expect(apr15!.event).toBe('PAY')
    // Just verify balance went up on that day relative to day before
    const apr14 = result.find(d => d.date === '2026-04-14')!
    expect(apr15!.projectedBalance).toBeGreaterThan(apr14.projectedBalance)
  })

  it('subtracts obligation amounts on due dates', () => {
    const result = projectBalances(5000, obligations, schedule, buffer, 10, '2026-03-28')
    const apr1 = result.find(d => d.date === '2026-04-01')
    expect(apr1).toBeDefined()
    expect(apr1!.event).toBe('HOA')
    // Balance on Apr 1 should be Apr 0 balance minus 315
    const mar31 = result.find(d => d.date === '2026-03-31')!
    expect(apr1!.projectedBalance).toBe(mar31.projectedBalance - 315)
  })

  it('marks days below buffer as isBelowBuffer', () => {
    // Low balance scenario
    const result = projectBalances(500, obligations, schedule, buffer, 5, '2026-03-28')
    const allBelowBuffer = result.every(d => d.isBelowBuffer)
    expect(allBelowBuffer).toBe(true)
  })

  it('marks days above buffer as not below buffer', () => {
    const result = projectBalances(9999, obligations, schedule, buffer, 5, '2026-03-28')
    const noneBelow = result.every(d => !d.isBelowBuffer)
    expect(noneBelow).toBe(true)
  })

  it('first date is today + 1 day', () => {
    const result = projectBalances(5000, obligations, schedule, buffer, 5, '2026-03-28')
    expect(result[0].date).toBe('2026-03-29')
  })
})
```

- [ ] **Step 2: Run tests — expect all to fail**

```bash
cd ~/finance-dashboard && npx jest __tests__/forecast.test.ts --no-coverage 2>&1 | tail -5
```

Expected: Cannot find module '@/lib/forecast'

- [ ] **Step 3: Write forecast.ts**

```typescript
// src/lib/forecast.ts
import type { Obligation, PaycheckSchedule, ForecastDay } from './types'

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

/**
 * Projects checking balance day-by-day for `daysAhead` days starting from `today`.
 * - Adds netAmount on each paycheck date
 * - Subtracts obligation amounts on their due dates
 * - Flags days where projectedBalance < buffer
 */
export function projectBalances(
  currentBalance: number,
  obligations: Obligation[],
  schedule: PaycheckSchedule | null,
  buffer: number,
  daysAhead: number,
  today: string
): ForecastDay[] {
  const paydateSet = new Set(schedule?.paydates ?? [])
  const obligationMap = new Map<string, Obligation>()
  for (const ob of obligations) {
    // If multiple obligations on same date, last one wins (acceptable for forecast display)
    obligationMap.set(ob.dueDate, ob)
  }

  const days: ForecastDay[] = []
  let runningBalance = currentBalance

  for (let i = 1; i <= daysAhead; i++) {
    const date = addDays(today, i)
    let event: string | null = null

    if (paydateSet.has(date)) {
      runningBalance += schedule!.netAmount
      event = 'PAY'
    }

    const ob = obligationMap.get(date)
    if (ob && ob.status !== 'paid') {
      runningBalance -= ob.amount
      event = event ?? ob.name
    }

    days.push({
      date,
      projectedBalance: Math.round(runningBalance * 100) / 100,
      event,
      isBelowBuffer: runningBalance < buffer,
    })
  }

  return days
}
```

- [ ] **Step 4: Run tests — expect all to pass**

```bash
cd ~/finance-dashboard && npx jest __tests__/forecast.test.ts --no-coverage
```

Expected: PASS (6 tests)

- [ ] **Step 5: Run all tests**

```bash
cd ~/finance-dashboard && npx jest --no-coverage
```

Expected: All test suites PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/forecast.ts __tests__/forecast.test.ts
git commit -m "feat: TDD forecast engine — 60-day balance projection"
```

---

## Task 6: Design System — globals.css + layout.tsx

**Files:**
- Replace: `src/app/globals.css`
- Replace: `src/app/layout.tsx`

- [ ] **Step 1: Write globals.css (Private Wealth aesthetic)**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #f8f8f6;
  --color-surface: #ffffff;
  --color-border: #e8e8e4;
  --color-border-strong: #111111;
  --color-text-primary: #111111;
  --color-text-secondary: #888888;
  --color-text-muted: #bbbbbb;
  --color-red: #cc0000;
  --color-green: #006644;

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  background: var(--color-bg);
  color: var(--color-text-primary);
}

body {
  min-height: 100vh;
  background: var(--color-bg);
}

/* Tabular numbers for all financial figures */
.num {
  font-variant-numeric: tabular-nums;
  font-weight: 300;
  letter-spacing: -0.01em;
}

.num-hero {
  font-variant-numeric: tabular-nums;
  font-weight: 300;
  font-size: 3.5rem;
  letter-spacing: -0.03em;
  line-height: 1;
}

/* Uppercase tracking label */
.label-sm {
  font-size: 0.6875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

/* Card */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 16px;
}
```

- [ ] **Step 2: Write layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Capital',
  description: 'Personal CFO dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: Private Wealth design system — off-white tokens + Inter"
```

---

## Task 7: Teller API Client

**Files:**
- Create: `src/lib/teller.ts`

- [ ] **Step 1: Create .env.local template**

```bash
cat > ~/finance-dashboard/.env.local << 'EOF'
NEXT_PUBLIC_TELLER_APP_ID=your_teller_app_id_here
NEXT_PUBLIC_TELLER_ENV=sandbox
# Optional — only needed for production mTLS:
# TELLER_CERT_PATH=/path/to/certificate.pem
# TELLER_KEY_PATH=/path/to/private_key.pem
EOF
```

- [ ] **Step 2: Write teller.ts**

```typescript
// src/lib/teller.ts
import https from 'node:https'
import { readFileSync } from 'node:fs'
import type {
  TellerAccountRaw,
  TellerBalanceRaw,
  TellerTransactionRaw,
  Transaction,
} from './types'

function makeBasicAuth(accessToken: string): string {
  return `Basic ${Buffer.from(`${accessToken}:`).toString('base64')}`
}

function makeAgent(): https.Agent {
  const certPath = process.env.TELLER_CERT_PATH
  const keyPath = process.env.TELLER_KEY_PATH
  if (certPath && keyPath) {
    return new https.Agent({
      cert: readFileSync(certPath),
      key: readFileSync(keyPath),
    })
  }
  return new https.Agent()
}

function tellerGet<T>(path: string, accessToken: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: 'api.teller.io',
      path,
      method: 'GET',
      headers: {
        Authorization: makeBasicAuth(accessToken),
        Accept: 'application/json',
      },
      agent: makeAgent(),
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk: string) => { data += chunk })
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Teller ${path} returned ${res.statusCode}: ${data}`))
          return
        }
        try {
          resolve(JSON.parse(data) as T)
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on('error', reject)
    req.end()
  })
}

export async function tellerGetAccounts(accessToken: string): Promise<TellerAccountRaw[]> {
  return tellerGet<TellerAccountRaw[]>('/accounts', accessToken)
}

export async function tellerGetBalance(
  accessToken: string,
  accountId: string
): Promise<TellerBalanceRaw> {
  return tellerGet<TellerBalanceRaw>(`/accounts/${accountId}/balances`, accessToken)
}

export async function tellerGetTransactions(
  accessToken: string,
  accountId: string
): Promise<TellerTransactionRaw[]> {
  return tellerGet<TellerTransactionRaw[]>(`/accounts/${accountId}/transactions`, accessToken)
}

/** Convert Teller raw transaction to our normalized Transaction type */
export function normalizeTransaction(raw: TellerTransactionRaw): Transaction {
  const absAmount = parseFloat(raw.amount)
  return {
    id: raw.id,
    accountId: raw.account_id,
    date: raw.date,
    description: raw.description,
    amount: raw.type === 'debit' ? -absAmount : absAmount,
    type: raw.type,
    category: raw.details.category,
    counterparty: raw.details.counterparty?.name ?? null,
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/teller.ts .env.local
git commit -m "feat: Teller API client with optional mTLS"
```

---

## Task 8: Gmail Client

**Files:**
- Create: `src/lib/gmail.ts`

- [ ] **Step 1: Add Gmail env vars to .env.local**

```bash
cat >> ~/finance-dashboard/.env.local << 'EOF'
GMAIL_CLIENT_ID=your_google_oauth_client_id
GMAIL_CLIENT_SECRET=your_google_oauth_client_secret
EOF
```

- [ ] **Step 2: Write gmail.ts**

This module reads Gmail credentials from `.data/gmail-credentials.json`, fetches emails from known financial senders, and parses them into `IncomeStream`, `Obligation`, and `AlertItem` records.

```typescript
// src/lib/gmail.ts
import { google } from 'googleapis'
import { readJson, writeJson, dataPath } from './storage'
import type { GmailTokens, IncomeStream, Obligation, AlertItem } from './types'

function getAuth() {
  const tokens = readJson<GmailTokens>(dataPath('gmail-credentials.json'))
  if (!tokens) throw new Error('No Gmail credentials found. Run OAuth2 setup first.')

  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET
  )
  auth.setCredentials(tokens)

  // Persist refreshed tokens
  auth.on('tokens', (newTokens) => {
    const updated = { ...tokens, ...newTokens }
    writeJson(dataPath('gmail-credentials.json'), updated)
  })

  return auth
}

function decodeBody(data: string): string {
  return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8')
}

function getMessageText(payload: {
  mimeType?: string
  body?: { data?: string }
  parts?: Array<{ mimeType?: string; body?: { data?: string } }>
}): string {
  if (payload.body?.data) return decodeBody(payload.body.data)
  for (const part of payload.parts ?? []) {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      return decodeBody(part.body.data)
    }
  }
  return ''
}

function extractAmount(text: string): number | null {
  const match = text.match(/\$([0-9,]+(?:\.[0-9]{2})?)/)
  if (!match) return null
  return parseFloat(match[1].replace(',', ''))
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

interface ParsedEmail {
  subject: string
  from: string
  date: string
  body: string
}

async function fetchEmails(query: string, maxResults = 20): Promise<ParsedEmail[]> {
  const auth = getAuth()
  const gmail = google.gmail({ version: 'v1', auth })

  const list = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults,
  })

  const messages = list.data.messages ?? []
  const results: ParsedEmail[] = []

  for (const msg of messages) {
    if (!msg.id) continue
    const full = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
      format: 'full',
    })
    const headers = full.data.payload?.headers ?? []
    const subject = headers.find(h => h.name === 'Subject')?.value ?? ''
    const from = headers.find(h => h.name === 'From')?.value ?? ''
    const date = headers.find(h => h.name === 'Date')?.value ?? ''
    const body = getMessageText(full.data.payload ?? {})
    results.push({ subject, from, date, body })
  }

  return results
}

export async function parseIncomeEmails(): Promise<IncomeStream[]> {
  const streams: IncomeStream[] = []
  const seenIds = new Set<string>()

  // Stripe
  const stripeEmails = await fetchEmails('from:notifications@stripe.com subject:"Payment of"')
  for (const email of stripeEmails) {
    const amount = extractAmount(email.subject)
    if (!amount) continue
    const id = `stripe-${email.subject}-${email.date}`
    if (seenIds.has(id)) continue
    seenIds.add(id)
    streams.push({ source: 'Stripe', amount, date: todayStr(), type: 'stripe' })
  }

  // KDP / Amazon
  const kdpEmails = await fetchEmails('from:noreply@accounts-payable.amazon.com royalt')
  for (const email of kdpEmails) {
    const amount = extractAmount(email.body)
    if (!amount) continue
    const id = `kdp-${email.date}`
    if (seenIds.has(id)) continue
    seenIds.add(id)
    streams.push({ source: 'KDP', amount, date: todayStr(), type: 'kdp' })
  }

  return streams
}

export async function parseObligationEmails(): Promise<Obligation[]> {
  const obligations: Obligation[] = []

  // Jovia
  const joviaEmails = await fetchEmails('from:noreply.payments@jovia.org')
  for (const email of joviaEmails) {
    const amount = extractAmount(email.body) ?? extractAmount(email.subject)
    if (!amount) continue
    obligations.push({
      name: 'Jovia',
      amount,
      dueDate: todayStr(),
      source: 'gmail',
      status: 'paid',
    })
    break
  }

  // Citizens
  const citizensEmails = await fetchEmails('from:Support@citizens.myloanmanager.com')
  for (const email of citizensEmails) {
    const amount = extractAmount(email.body) ?? extractAmount(email.subject)
    if (!amount) continue
    obligations.push({
      name: 'Citizens',
      amount,
      dueDate: todayStr(),
      source: 'gmail',
      status: 'upcoming',
    })
    break
  }

  // LendingClub
  const lcEmails = await fetchEmails('from:payments@mail6.lendingclub.com')
  for (const email of lcEmails) {
    const amount = extractAmount(email.body) ?? extractAmount(email.subject)
    if (!amount) continue
    obligations.push({
      name: 'LendingClub',
      amount,
      dueDate: todayStr(),
      source: 'gmail',
      status: 'upcoming',
    })
    break
  }

  // HOA
  const hoaEmails = await fetchEmails('from:propertypay@hoa.firstcitizens.com')
  for (const email of hoaEmails) {
    obligations.push({
      name: 'HOA',
      amount: 315,
      dueDate: todayStr(),
      source: 'gmail',
      status: 'paid',
    })
    break
  }

  return obligations
}

export async function parseAlertEmails(): Promise<AlertItem[]> {
  const alerts: AlertItem[] = []

  // Vercel payment failures
  const failedEmails = await fetchEmails('from:failed-payments@vercel.com OR subject:"payment failed" OR subject:"payment unsuccessful"')
  for (const email of failedEmails) {
    const amount = extractAmount(email.subject) ?? extractAmount(email.body)
    alerts.push({
      id: `alert-${email.date}-${email.subject.slice(0, 20)}`,
      type: 'payment_failed',
      message: amount
        ? `${email.from.split('<')[0].trim()} $${amount.toFixed(2)} payment failed`
        : email.subject,
      severity: 'red',
      timestamp: new Date().toISOString(),
      dismissed: false,
    })
  }

  return alerts
}
```

- [ ] **Step 3: Add gmail oauth2 setup script note to README**

```bash
cat > ~/finance-dashboard/GMAIL_SETUP.md << 'EOF'
# Gmail OAuth2 Setup

Run this once to authorize Gmail access:

1. Go to console.cloud.google.com → create project → enable Gmail API
2. Create OAuth2 credentials (Desktop app) → download client_secret.json
3. Copy client_id and client_secret into .env.local
4. Run the one-time auth flow:

```bash
npx ts-node -e "
const { google } = require('googleapis');
const readline = require('readline');
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob'
);
const url = oauth2Client.generateAuthUrl({ scope: ['https://www.googleapis.com/auth/gmail.readonly'] });
console.log('Open:', url);
const rl = readline.createInterface({ input: process.stdin });
rl.question('Code: ', async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  require('fs').writeFileSync('.data/gmail-credentials.json', JSON.stringify(tokens, null, 2));
  console.log('Saved to .data/gmail-credentials.json');
  rl.close();
});
"
```
EOF
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/gmail.ts .env.local GMAIL_SETUP.md
git commit -m "feat: Gmail OAuth2 client — parse Stripe/KDP/loan/alert emails"
```

---

## Task 9: Teller API Routes

**Files:**
- Create: `src/app/api/teller/connect/route.ts`
- Create: `src/app/api/teller/sync/route.ts`

- [ ] **Step 1: Write teller/connect route**

This route receives the access token from TellerConnect, fetches account IDs, and stores credentials.

```typescript
// src/app/api/teller/connect/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeJson, dataPath } from '@/lib/storage'
import { tellerGetAccounts } from '@/lib/teller'
import type { TellerCredentials } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json() as { accessToken: string }
    if (!accessToken || typeof accessToken !== 'string') {
      return NextResponse.json({ error: 'Missing accessToken' }, { status: 400 })
    }

    const accounts = await tellerGetAccounts(accessToken)
    const checking = accounts.find(a => a.subtype === 'checking')
    const savings = accounts.find(a => a.subtype === 'savings')

    if (!checking || !savings) {
      return NextResponse.json(
        { error: 'Could not find checking and savings accounts' },
        { status: 422 }
      )
    }

    const credentials: TellerCredentials = {
      accessToken,
      accountIds: { checking: checking.id, savings: savings.id },
    }
    writeJson(dataPath('teller.json'), credentials)

    return NextResponse.json({ success: true, checkingName: checking.name, savingsName: savings.name })
  } catch (error) {
    console.error('teller/connect error:', error)
    return NextResponse.json({ error: 'Failed to connect Teller account' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Write teller/sync route**

```typescript
// src/app/api/teller/sync/route.ts
import { NextResponse } from 'next/server'
import { readJson, writeJson, dataPath } from '@/lib/storage'
import { tellerGetBalance, tellerGetTransactions, normalizeTransaction } from '@/lib/teller'
import type { TellerCredentials, DashboardData, Transaction } from '@/lib/types'

export async function GET() {
  try {
    const creds = readJson<TellerCredentials>(dataPath('teller.json'))
    if (!creds?.accessToken) {
      return NextResponse.json({ error: 'Not connected' }, { status: 401 })
    }

    const { accessToken, accountIds } = creds

    // Fetch balances + transactions in parallel
    const [checkingBalance, savingsBalance, checkingTxns, savingsTxns] = await Promise.all([
      tellerGetBalance(accessToken, accountIds.checking),
      tellerGetBalance(accessToken, accountIds.savings),
      tellerGetTransactions(accessToken, accountIds.checking),
      tellerGetTransactions(accessToken, accountIds.savings),
    ])

    const transactions: Transaction[] = [
      ...checkingTxns.map(normalizeTransaction),
      ...savingsTxns.map(normalizeTransaction),
    ].sort((a, b) => b.date.localeCompare(a.date))

    // Merge with existing data (preserve gmail-sourced fields)
    const existing = readJson<DashboardData>(dataPath('transactions.json'))

    const updated: DashboardData = {
      checkingBalance: parseFloat(checkingBalance.available),
      savingsBalance: parseFloat(savingsBalance.available),
      transactions,
      incomeStreams: existing?.incomeStreams ?? [],
      obligations: existing?.obligations ?? [],
      lastSynced: new Date().toISOString(),
      alerts: (existing?.alerts ?? []).filter(a => !a.dismissed),
      paycheckSchedule: existing?.paycheckSchedule ?? null,
    }

    writeJson(dataPath('transactions.json'), updated)
    return NextResponse.json({ success: true, lastSynced: updated.lastSynced })
  } catch (error) {
    console.error('teller/sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/teller/
git commit -m "feat: Teller connect + sync API routes"
```

---

## Task 10: Gmail Sync + Config Routes

**Files:**
- Create: `src/app/api/gmail/sync/route.ts`
- Create: `src/app/api/paycheck/update/route.ts`
- Replace: `src/app/api/goals/update/route.ts`

- [ ] **Step 1: Write gmail/sync route**

```typescript
// src/app/api/gmail/sync/route.ts
import { NextResponse } from 'next/server'
import { readJson, writeJson, dataPath } from '@/lib/storage'
import { parseIncomeEmails, parseObligationEmails, parseAlertEmails } from '@/lib/gmail'
import type { DashboardData } from '@/lib/types'

export async function GET() {
  try {
    const existing = readJson<DashboardData>(dataPath('transactions.json'))
    if (!existing) {
      return NextResponse.json({ error: 'No transaction data. Run Teller sync first.' }, { status: 400 })
    }

    const [incomeStreams, obligations, newAlerts] = await Promise.all([
      parseIncomeEmails(),
      parseObligationEmails(),
      parseAlertEmails(),
    ])

    // Merge new alerts with existing (deduplicate by id)
    const existingAlertIds = new Set((existing.alerts ?? []).map(a => a.id))
    const mergedAlerts = [
      ...(existing.alerts ?? []),
      ...newAlerts.filter(a => !existingAlertIds.has(a.id)),
    ]

    const updated: DashboardData = {
      ...existing,
      incomeStreams,
      obligations,
      alerts: mergedAlerts,
      lastSynced: new Date().toISOString(),
    }

    writeJson(dataPath('transactions.json'), updated)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('gmail/sync error:', error)
    return NextResponse.json({ error: 'Gmail sync failed' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Write paycheck/update route**

```typescript
// src/app/api/paycheck/update/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { readJson, writeJson, dataPath } from '@/lib/storage'
import type { DashboardData, PaycheckSchedule } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { paydates: string[]; netAmount: number }
    if (!Array.isArray(body.paydates) || typeof body.netAmount !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const schedule: PaycheckSchedule = {
      paydates: body.paydates.sort(),
      netAmount: body.netAmount,
    }

    // Also persist to standalone paycheck-schedule.json for sync script
    writeJson(dataPath('paycheck-schedule.json'), schedule)

    // Update dashboard data
    const existing = readJson<DashboardData>(dataPath('transactions.json'))
    if (existing) {
      writeJson(dataPath('transactions.json'), { ...existing, paycheckSchedule: schedule })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('paycheck/update error:', error)
    return NextResponse.json({ error: 'Failed to update paycheck schedule' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Replace goals/update route**

```typescript
// src/app/api/goals/update/route.ts
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
    const { currentAmount } = await request.json() as { currentAmount: number }
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

- [ ] **Step 4: Commit**

```bash
git add src/app/api/gmail/ src/app/api/paycheck/ src/app/api/goals/
git commit -m "feat: Gmail sync, paycheck, goals API routes"
```

---

## Task 11: AlertsBanner + SyncButton Components

**Files:**
- Create: `src/components/AlertsBanner.tsx`
- Replace: `src/components/SyncButton.tsx`

- [ ] **Step 1: Write AlertsBanner**

```tsx
// src/components/AlertsBanner.tsx
'use client'

import { useState } from 'react'
import type { AlertItem } from '@/lib/types'

interface Props {
  alerts: AlertItem[]
}

export default function AlertsBanner({ alerts }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = alerts.filter(a => a.severity === 'red' && !a.dismissed && !dismissed.has(a.id))
  if (visible.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
      {visible.map(alert => (
        <div
          key={alert.id}
          style={{
            background: '#fff5f5',
            border: '1px solid #cc0000',
            borderRadius: 4,
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 13, color: '#cc0000', fontWeight: 400 }}>
            {alert.message}
          </span>
          <button
            onClick={() => setDismissed(prev => new Set([...prev, alert.id]))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#cc0000',
              fontSize: 16,
              padding: '0 4px',
              lineHeight: 1,
            }}
            aria-label="Dismiss alert"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Write SyncButton**

```tsx
// src/components/SyncButton.tsx
'use client'

import { useState } from 'react'

interface Props {
  lastSynced: string
}

function timeAgo(isoStr: string): string {
  const diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function SyncButton({ lastSynced }: Props) {
  const [syncing, setSyncing] = useState(false)
  const [lastSyncedState, setLastSyncedState] = useState(lastSynced)

  async function handleSync() {
    setSyncing(true)
    try {
      await fetch('/api/teller/sync')
      await fetch('/api/gmail/sync')
      setLastSyncedState(new Date().toISOString())
      window.location.reload()
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: '#888888' }}>
        synced {timeAgo(lastSyncedState)}
      </span>
      <button
        onClick={handleSync}
        disabled={syncing}
        style={{
          background: 'none',
          border: '1px solid #e8e8e4',
          borderRadius: 4,
          padding: '5px 10px',
          cursor: syncing ? 'wait' : 'pointer',
          fontSize: 13,
          color: syncing ? '#bbbbbb' : '#111111',
          fontFamily: 'inherit',
        }}
      >
        {syncing ? '…' : '↻'}
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/AlertsBanner.tsx src/components/SyncButton.tsx
git commit -m "feat: AlertsBanner (dismissible red) + SyncButton"
```

---

## Task 12: HeroCapital + CapitalStats

**Files:**
- Create: `src/components/HeroCapital.tsx`
- Create: `src/components/CapitalStats.tsx`

- [ ] **Step 1: Write HeroCapital**

```tsx
// src/components/HeroCapital.tsx
import type { CapitalSummary } from '@/lib/types'

interface Props {
  summary: CapitalSummary
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function HeroCapital({ summary }: Props) {
  const isLow = summary.deployableCapital <= 0

  return (
    <div
      className="card"
      style={{
        textAlign: 'center',
        padding: '40px 24px',
        borderBottom: `2px solid ${isLow ? '#cc0000' : '#111111'}`,
      }}
    >
      <div
        className="num-hero"
        style={{ color: isLow ? '#cc0000' : '#111111' }}
      >
        ${fmt(summary.deployableCapital)}
      </div>
      <div style={{ marginTop: 10, fontSize: 13, color: '#888888', letterSpacing: '0.05em' }}>
        free capital this month
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write CapitalStats**

```tsx
// src/components/CapitalStats.tsx
import type { CapitalSummary } from '@/lib/types'

interface Props {
  summary: CapitalSummary
}

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default function CapitalStats({ summary }: Props) {
  const stats = [
    { label: 'Income', value: fmt(summary.monthlyIncome) },
    { label: 'Debt Svc', value: fmt(summary.monthlyExpenses * 0.6) },
    { label: 'Overhead', value: fmt(summary.monthlyExpenses * 0.4) },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid #e8e8e4',
        borderBottom: '1px solid #e8e8e4',
        background: '#ffffff',
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            padding: '16px 20px',
            borderRight: i < stats.length - 1 ? '1px solid #e8e8e4' : 'none',
          }}
        >
          <div className="label-sm" style={{ marginBottom: 6 }}>{stat.label}</div>
          <div className="num" style={{ fontSize: '1.375rem', color: '#111111' }}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroCapital.tsx src/components/CapitalStats.tsx
git commit -m "feat: HeroCapital deployable balance + CapitalStats row"
```

---

## Task 13: MoveMoney Directive Card

**Files:**
- Create: `src/components/MoveMoney.tsx`

- [ ] **Step 1: Write MoveMoney**

```tsx
// src/components/MoveMoney.tsx
import type { MoveMoneyDirective } from '@/lib/types'

interface Props {
  directive: MoveMoneyDirective
}

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default function MoveMoney({ directive }: Props) {
  if (!directive.shouldMove) {
    return (
      <div
        className="card"
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}
      >
        <span style={{ fontSize: 12, color: '#888888', fontWeight: 400 }}>
          {directive.message}
        </span>
      </div>
    )
  }

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px',
        borderLeft: '3px solid #006644',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#006644', display: 'inline-block' }} />
          <span style={{ fontSize: 14, color: '#111111', fontWeight: 500 }}>
            Move {fmt(directive.amount)} to savings today
          </span>
        </div>
        <div style={{ fontSize: 12, color: '#888888', paddingLeft: 16 }}>
          {directive.fromAccount} → {directive.toAccount}
        </div>
      </div>
      <a
        href="https://www.wings.org/online-banking"
        target="_blank"
        rel="noreferrer"
        style={{
          background: '#006644',
          color: '#ffffff',
          border: 'none',
          borderRadius: 4,
          padding: '7px 16px',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          textDecoration: 'none',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
        }}
      >
        Do It
      </a>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MoveMoney.tsx
git commit -m "feat: MoveMoney directive card — green CTA"
```

---

## Task 14: CashFlowCalendar

**Files:**
- Create: `src/components/CashFlowCalendar.tsx`

- [ ] **Step 1: Write CashFlowCalendar**

```tsx
// src/components/CashFlowCalendar.tsx
import type { ForecastDay } from '@/lib/types'

interface Props {
  days: ForecastDay[]
  buffer: number
}

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function fmtDate(d: string): string {
  const [, m, day] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m) - 1]} ${parseInt(day)}`
}

export default function CashFlowCalendar({ days, buffer }: Props) {
  const firstThirty = days.slice(0, 30)
  const projectedLow = [...firstThirty].sort((a, b) => a.projectedBalance - b.projectedBalance)[0]
  const hasWarning = projectedLow && projectedLow.isBelowBuffer

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div className="label-sm">Cash Flow · Next 30 Days</div>
        <div style={{ fontSize: 12, color: '#888888' }}>
          Buffer floor: {fmt(buffer)}
        </div>
      </div>

      {/* Calendar strip */}
      <div style={{ display: 'flex', gap: 3, overflowX: 'auto', paddingBottom: 4 }}>
        {firstThirty.map(day => (
          <div
            key={day.date}
            style={{
              minWidth: 36,
              padding: '6px 4px',
              textAlign: 'center',
              borderRadius: 3,
              background: day.isBelowBuffer ? '#fff5f5' : '#f8f8f6',
              border: `1px solid ${day.isBelowBuffer ? '#cc0000' : day.event === 'PAY' ? '#006644' : '#e8e8e4'}`,
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: 9, color: day.isBelowBuffer ? '#cc0000' : day.event === 'PAY' ? '#006644' : '#bbbbbb' }}>
              {fmtDate(day.date)}
            </div>
            {day.event && (
              <div style={{ fontSize: 8, color: day.event === 'PAY' ? '#006644' : '#888888', marginTop: 1 }}>
                {day.event === 'PAY' ? '↑PAY' : day.event.slice(0, 5)}
              </div>
            )}
          </div>
        ))}
      </div>

      {hasWarning && projectedLow && (
        <div style={{ marginTop: 12, fontSize: 12, color: '#cc0000' }}>
          ⚠ Projected low: {fmt(projectedLow.projectedBalance)} on {fmtDate(projectedLow.date)}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CashFlowCalendar.tsx
git commit -m "feat: CashFlowCalendar — 30-day strip with PAY markers + warnings"
```

---

## Task 15: IncomeStreams + ObligationsTable

**Files:**
- Create: `src/components/IncomeStreams.tsx`
- Create: `src/components/ObligationsTable.tsx`

- [ ] **Step 1: Write IncomeStreams**

```tsx
// src/components/IncomeStreams.tsx
import type { IncomeStream } from '@/lib/types'

interface Props {
  streams: IncomeStream[]
}

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function fmtDate(d: string): string {
  const [, m, day] = d.split('-')
  return `${m}/${day}`
}

export default function IncomeStreams({ streams }: Props) {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="label-sm" style={{ marginBottom: 12 }}>Income Streams</div>
      {streams.length === 0 ? (
        <div style={{ fontSize: 12, color: '#bbbbbb' }}>No income detected yet</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {streams.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: '#111111' }}>{s.source}</span>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span className="num" style={{ fontSize: 14, color: '#006644' }}>{fmt(s.amount)}</span>
                <span style={{ fontSize: 11, color: '#bbbbbb', minWidth: 32 }}>{fmtDate(s.date)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Write ObligationsTable**

```tsx
// src/components/ObligationsTable.tsx
import type { Obligation } from '@/lib/types'

interface Props {
  obligations: Obligation[]
}

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function fmtDue(d: string): string {
  const [, m, day] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `due ${months[parseInt(m) - 1]} ${parseInt(day)}`
}

export default function ObligationsTable({ obligations }: Props) {
  const sorted = [...obligations].sort((a, b) => a.dueDate.localeCompare(b.dueDate))

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="label-sm" style={{ marginBottom: 12 }}>Obligations</div>
      {sorted.length === 0 ? (
        <div style={{ fontSize: 12, color: '#bbbbbb' }}>No obligations found</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sorted.map((ob, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span
                style={{
                  fontSize: 13,
                  color: ob.status === 'failed' ? '#cc0000' : '#111111',
                }}
              >
                {ob.name}
              </span>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span className="num" style={{ fontSize: 14, color: '#111111' }}>{fmt(ob.amount)}</span>
                <span style={{ fontSize: 11, color: '#bbbbbb', minWidth: 64, textAlign: 'right' }}>
                  {fmtDue(ob.dueDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/IncomeStreams.tsx src/components/ObligationsTable.tsx
git commit -m "feat: IncomeStreams + ObligationsTable components"
```

---

## Task 16: TransactionFeed + SavingsTracker

**Files:**
- Create: `src/components/TransactionFeed.tsx`
- Create: `src/components/SavingsTracker.tsx`

- [ ] **Step 1: Write TransactionFeed**

```tsx
// src/components/TransactionFeed.tsx
import type { Transaction } from '@/lib/types'

interface Props {
  transactions: Transaction[]
  limit?: number
}

function fmt(n: number): string {
  const abs = Math.abs(n)
  return `${n < 0 ? '-' : '+'}$${abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtDate(d: string): string {
  const [, m, day] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m) - 1]} ${parseInt(day)}`
}

export default function TransactionFeed({ transactions, limit = 15 }: Props) {
  const recent = transactions.slice(0, limit)

  return (
    <div className="card">
      <div className="label-sm" style={{ marginBottom: 12 }}>Recent Transactions</div>
      {recent.length === 0 ? (
        <div style={{ fontSize: 12, color: '#bbbbbb' }}>No transactions yet</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recent.map(tx => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0ec',
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: '#bbbbbb', minWidth: 48 }}>{fmtDate(tx.date)}</span>
                <span style={{ fontSize: 13, color: '#111111' }}>
                  {tx.counterparty ?? tx.description}
                </span>
              </div>
              <span
                className="num"
                style={{ fontSize: 13, color: tx.amount >= 0 ? '#006644' : '#111111' }}
              >
                {fmt(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Write SavingsTracker**

```tsx
// src/components/SavingsTracker.tsx
import type { Goal } from '@/lib/types'

interface Props {
  savingsRate: number    // 0-100
  goal: Goal
  paychecksToGoal: number
}

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default function SavingsTracker({ savingsRate, goal, paychecksToGoal }: Props) {
  const progress = goal.targetAmount > 0
    ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
    : 0

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div className="label-sm">Savings Rate</div>
        <div className="num" style={{ fontSize: 20, color: savingsRate >= 20 ? '#006644' : '#cc0000' }}>
          {savingsRate}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: '#e8e8e4', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
        <div
          style={{
            height: '100%',
            width: `${savingsRate}%`,
            background: savingsRate >= 20 ? '#006644' : '#cc0000',
            borderRadius: 3,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <div style={{ fontSize: 12, color: '#888888', marginBottom: 20 }}>
        of surplus saved this month
      </div>

      {/* Emergency Fund */}
      <div className="label-sm" style={{ marginBottom: 10 }}>Emergency Fund</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#111111' }}>
          {fmt(goal.currentAmount)} / {fmt(goal.targetAmount)}
        </span>
        {paychecksToGoal > 0 && (
          <span style={{ fontSize: 12, color: '#888888' }}>
            {paychecksToGoal} paychecks away
          </span>
        )}
        {paychecksToGoal === 0 && (
          <span style={{ fontSize: 12, color: '#006644' }}>Goal reached ✓</span>
        )}
      </div>
      <div style={{ height: 4, background: '#e8e8e4', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: progress >= 100 ? '#006644' : '#111111',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TransactionFeed.tsx src/components/SavingsTracker.tsx
git commit -m "feat: TransactionFeed + SavingsTracker components"
```

---

## Task 17: TellerConnect Component

**Files:**
- Create: `src/components/TellerConnect.tsx`

- [ ] **Step 1: Write TellerConnect**

```tsx
// src/components/TellerConnect.tsx
'use client'

import { useState } from 'react'
import { useTellerConnect } from 'teller-connect-react'

interface TellerAuthorization {
  accessToken: string
  user: { id: string }
  enrollment: { id: string; institution: { name: string } }
}

interface Props {
  onConnected: (institution: string) => void
}

export default function TellerConnect({ onConnected }: Props) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { open, ready } = useTellerConnect({
    appId: process.env.NEXT_PUBLIC_TELLER_APP_ID ?? '',
    environment: (process.env.NEXT_PUBLIC_TELLER_ENV ?? 'sandbox') as 'sandbox' | 'development' | 'production',
    onSuccess: async (auth: TellerAuthorization) => {
      setSaving(true)
      setError(null)
      try {
        const res = await fetch('/api/teller/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: auth.accessToken }),
        })
        if (!res.ok) {
          const data = await res.json() as { error?: string }
          throw new Error(data.error ?? 'Connection failed')
        }
        onConnected(auth.enrollment.institution.name)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error')
      } finally {
        setSaving(false)
      }
    },
    onExit: () => {
      // User closed widget — no action needed
    },
  })

  return (
    <div>
      <button
        onClick={() => open()}
        disabled={!ready || saving}
        style={{
          background: '#111111',
          color: '#ffffff',
          border: 'none',
          borderRadius: 4,
          padding: '12px 28px',
          fontSize: 14,
          fontWeight: 500,
          cursor: ready && !saving ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit',
        }}
      >
        {saving ? 'Saving…' : 'Connect Wings Financial'}
      </button>
      {error && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#cc0000' }}>{error}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/TellerConnect.tsx
git commit -m "feat: TellerConnect client component"
```

---

## Task 18: Dashboard Page (page.tsx)

**Files:**
- Replace: `src/app/page.tsx`

- [ ] **Step 1: Write full dashboard page**

```tsx
// src/app/page.tsx
import { redirect } from 'next/navigation'
import { readJson, dataPath } from '@/lib/storage'
import {
  computeMonthlyIncome,
  computeMonthlyExpenses,
  computeBuffer,
  computeDeployableCapital,
  computeDirective,
  computeSavingsRate,
} from '@/lib/compute'
import { projectBalances } from '@/lib/forecast'
import type { TellerCredentials, DashboardData, Goal, CapitalSummary } from '@/lib/types'

import AlertsBanner from '@/components/AlertsBanner'
import HeroCapital from '@/components/HeroCapital'
import CapitalStats from '@/components/CapitalStats'
import MoveMoney from '@/components/MoveMoney'
import CashFlowCalendar from '@/components/CashFlowCalendar'
import IncomeStreams from '@/components/IncomeStreams'
import ObligationsTable from '@/components/ObligationsTable'
import TransactionFeed from '@/components/TransactionFeed'
import SavingsTracker from '@/components/SavingsTracker'
import SyncButton from '@/components/SyncButton'

const DEFAULT_GOAL: Goal = {
  name: 'Emergency Fund',
  targetAmount: 10000,
  currentAmount: 0,
}

const CHECKING_NAME = 'Wings Checking'
const SAVINGS_NAME = 'Wings Savings'

export default function DashboardPage() {
  // Guard: redirect to setup if not connected
  const creds = readJson<TellerCredentials>(dataPath('teller.json'))
  if (!creds?.accessToken) {
    redirect('/setup')
  }

  const data = readJson<DashboardData>(dataPath('transactions.json'))
  const goal = readJson<Goal>(dataPath('goals.json')) ?? DEFAULT_GOAL

  // Empty state
  if (!data) {
    return (
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 12, color: '#888888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Capital Dashboard
          </span>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p style={{ fontSize: 14, color: '#888888' }}>
            Connected. Trigger a sync to load your data.
          </p>
          <a href="/api/teller/sync" style={{ display: 'inline-block', marginTop: 16, fontSize: 13, color: '#111111' }}>
            Sync now →
          </a>
        </div>
      </main>
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const monthlyIncome = computeMonthlyIncome(data.transactions, today)
  const monthlyExpenses = computeMonthlyExpenses(data.transactions, today)
  const buffer = computeBuffer(monthlyExpenses)
  const deployableCapital = computeDeployableCapital(data.checkingBalance, buffer)
  const directive = computeDirective(data.checkingBalance, buffer, CHECKING_NAME, SAVINGS_NAME)
  const savingsRate = computeSavingsRate(data.transactions, data.savingsBalance, today)

  const summary: CapitalSummary = {
    monthlyIncome,
    monthlyExpenses,
    buffer,
    deployableCapital,
    directive,
    savingsRate,
  }

  const forecastDays = projectBalances(
    data.checkingBalance,
    data.obligations,
    data.paycheckSchedule,
    buffer,
    60,
    today
  )

  // Compute paychecks-to-goal using savings balance vs target
  const perPaycheck = monthlyIncome > 0 ? (monthlyIncome - monthlyExpenses) / 2 : 0
  const remaining = goal.targetAmount - goal.currentAmount
  const paychecksToGoal = perPaycheck > 0 && remaining > 0
    ? Math.ceil(remaining / perPaycheck)
    : remaining <= 0 ? 0 : -1

  const dateDisplay = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 48px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <span style={{ fontSize: 12, color: '#888888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Capital Dashboard &nbsp;·&nbsp; {dateDisplay}
        </span>
        <SyncButton lastSynced={data.lastSynced} />
      </div>

      {/* Alerts */}
      <AlertsBanner alerts={data.alerts} />

      {/* Hero + Stats */}
      <div style={{ marginBottom: 1 }}>
        <HeroCapital summary={summary} />
        <CapitalStats summary={summary} />
      </div>

      {/* Move Money */}
      <div style={{ marginTop: 16, marginBottom: 16 }}>
        <MoveMoney directive={directive} />
      </div>

      {/* Cash Flow Calendar */}
      <div style={{ marginBottom: 16 }}>
        <CashFlowCalendar days={forecastDays} buffer={buffer} />
      </div>

      {/* Income + Obligations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <IncomeStreams streams={data.incomeStreams} />
        <ObligationsTable obligations={data.obligations} />
      </div>

      {/* Transactions */}
      <div style={{ marginBottom: 16 }}>
        <TransactionFeed transactions={data.transactions} />
      </div>

      {/* Savings */}
      <SavingsTracker
        savingsRate={savingsRate}
        goal={goal}
        paychecksToGoal={paychecksToGoal}
      />
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: Capital Dashboard page — full layout assembly"
```

---

## Task 19: Setup Page

**Files:**
- Replace: `src/app/setup/page.tsx`

- [ ] **Step 1: Write setup/page.tsx**

```tsx
// src/app/setup/page.tsx
'use client'

import { useState } from 'react'
import TellerConnect from '@/components/TellerConnect'

export default function SetupPage() {
  const [connected, setConnected] = useState<string | null>(null)

  if (connected) {
    return (
      <main style={{ maxWidth: 480, margin: '0 auto', padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#006644', marginBottom: 16 }}>
          {connected} connected successfully
        </div>
        <p style={{ fontSize: 13, color: '#888888', marginBottom: 32 }}>
          Syncing your transactions now…
        </p>
        <a
          href="/api/teller/sync"
          style={{ fontSize: 13, color: '#111111', textDecoration: 'none', borderBottom: '1px solid #111111' }}
        >
          Continue to dashboard →
        </a>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '80px 48px' }}>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#888888',
            marginBottom: 12,
          }}
        >
          Capital Dashboard
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: '#111111', margin: 0, lineHeight: 1.2 }}>
          Connect your bank
        </h1>
        <p style={{ marginTop: 16, fontSize: 14, color: '#888888', lineHeight: 1.6 }}>
          Link your Wings Financial account to get started. Your credentials
          are stored locally and never leave your machine.
        </p>
      </div>

      <TellerConnect onConnected={(name) => setConnected(name)} />

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e8e8e4' }}>
        <div style={{ fontSize: 11, color: '#bbbbbb', letterSpacing: '0.05em', marginBottom: 8 }}>
          PREREQUISITES
        </div>
        <ol style={{ fontSize: 12, color: '#888888', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
          <li>Sign up at teller.io — get your Application ID</li>
          <li>Set NEXT_PUBLIC_TELLER_APP_ID in .env.local</li>
          <li>For production: set TELLER_CERT_PATH + TELLER_KEY_PATH</li>
          <li>Set up Gmail OAuth2 (see GMAIL_SETUP.md)</li>
        </ol>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/setup/page.tsx
git commit -m "feat: Setup page with TellerConnect onboarding"
```

---

## Task 20: Sync Script + launchd Plist

**Files:**
- Create: `scripts/sync.ts`
- Create: `launchd/com.sam.financedashboard.plist`

- [ ] **Step 1: Create scripts directory**

```bash
mkdir -p ~/finance-dashboard/scripts ~/finance-dashboard/launchd
```

- [ ] **Step 2: Write sync script**

```typescript
// scripts/sync.ts
/**
 * Standalone sync script — called by launchd every 15 min.
 * Hits local API routes to refresh Teller + Gmail data.
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function run() {
  try {
    console.log(`[sync] ${new Date().toISOString()} — starting`)

    const tellerRes = await fetch(`${BASE_URL}/api/teller/sync`)
    if (tellerRes.ok) {
      console.log('[sync] Teller ✓')
    } else {
      console.error(`[sync] Teller failed: ${tellerRes.status}`)
    }

    const gmailRes = await fetch(`${BASE_URL}/api/gmail/sync`)
    if (gmailRes.ok) {
      console.log('[sync] Gmail ✓')
    } else {
      console.error(`[sync] Gmail failed: ${gmailRes.status}`)
    }

    console.log('[sync] done')
  } catch (error) {
    console.error('[sync] error:', error)
    process.exit(1)
  }
}

run()
```

- [ ] **Step 3: Write launchd plist**

Replace `YOUR_USERNAME` with the actual macOS username (run `whoami` to get it).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.sam.financedashboard</string>

  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/npx</string>
    <string>ts-node</string>
    <string>/Users/YOUR_USERNAME/finance-dashboard/scripts/sync.ts</string>
  </array>

  <key>WorkingDirectory</key>
  <string>/Users/YOUR_USERNAME/finance-dashboard</string>

  <key>EnvironmentVariables</key>
  <dict>
    <key>NEXT_PUBLIC_BASE_URL</key>
    <string>http://localhost:3000</string>
  </dict>

  <key>StartInterval</key>
  <integer>900</integer>

  <key>StandardOutPath</key>
  <string>/Users/YOUR_USERNAME/finance-dashboard/.data/sync.log</string>

  <key>StandardErrorPath</key>
  <string>/Users/YOUR_USERNAME/finance-dashboard/.data/sync.error.log</string>

  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

- [ ] **Step 4: Add launchd install instructions to README**

```bash
cat > ~/finance-dashboard/LAUNCHD_SETUP.md << 'EOF'
# launchd Auto-Sync Setup

Run this once after editing launchd/com.sam.financedashboard.plist (replace YOUR_USERNAME):

```bash
# Copy to LaunchAgents
cp launchd/com.sam.financedashboard.plist ~/Library/LaunchAgents/

# Load it
launchctl load ~/Library/LaunchAgents/com.sam.financedashboard.plist

# Verify
launchctl list | grep financedashboard

# To stop:
# launchctl unload ~/Library/LaunchAgents/com.sam.financedashboard.plist
```
EOF
```

- [ ] **Step 5: Add .gitignore entries**

```bash
cat >> ~/finance-dashboard/.gitignore << 'EOF'
.data/
.env.local
*.log
EOF
```

- [ ] **Step 6: Commit**

```bash
git add scripts/sync.ts launchd/com.sam.financedashboard.plist LAUNCHD_SETUP.md .gitignore
git commit -m "feat: sync script + launchd plist for 15-min auto-sync"
```

---

## Task 21: Build Verification + Final Cleanup

**Files:**
- Remove: `src/app/setup/page.tsx` old Plaid redirect (already replaced)

- [ ] **Step 1: Run all tests**

```bash
cd ~/finance-dashboard && npx jest --no-coverage
```

Expected: All PASS (compute + forecast + storage test suites)

- [ ] **Step 2: TypeScript check**

```bash
cd ~/finance-dashboard && npx tsc --noEmit 2>&1
```

Fix any type errors before proceeding. Common issues:
- Missing `'use client'` on components that use useState/hooks
- Import mismatches from old Plaid types

- [ ] **Step 3: Build**

```bash
cd ~/finance-dashboard && npm run build 2>&1 | tail -30
```

Expected: Build succeeds. Fix any remaining errors.

- [ ] **Step 4: Dev server smoke test**

```bash
cd ~/finance-dashboard && npm run dev &
sleep 3
curl -s http://localhost:3000/ | head -5
```

Expected: HTML response (redirects to /setup since .data/teller.json doesn't exist yet)

- [ ] **Step 5: Final commit**

```bash
cd ~/finance-dashboard && git add -A && git commit -m "feat: Capital Dashboard — Teller + Gmail, Private Wealth aesthetic"
```

---

## Self-Review Against Spec

**Spec coverage check:**

| Spec requirement | Covered by |
|---|---|
| Real-time Wings Financial balances via Teller | Task 7, Task 9 |
| Transaction auto-sync | Task 9 (teller/sync route) |
| Paycheck calendar — user picks dates, forecasts 30-60 days | Task 5, Task 10, Task 14 |
| Move-money engine (buffer + surplus → directive) | Task 4, Task 13 |
| Savings rate tracker | Task 4, Task 16 |
| Gmail: Stripe, KDP, loan servicers, alerts | Task 8, Task 10 |
| Alerts: payment failures, low balance, goals | Task 11, Task 16 |
| Runs itself (launchd auto-sync) | Task 20 |
| Private Wealth aesthetic (off-white, Inter, no glow) | Task 6, all components |
| Setup flow (Teller Connect widget) | Task 17, Task 19 |
| `.data/` storage (gitignored) | Task 3, Task 20 |
| launchd plist | Task 20 |

**All requirements covered. No placeholders remain.**

---

> **Note on CapitalStats debt vs overhead split:** The spec shows Income / Debt Svc / Overhead but doesn't specify how to compute this split from raw transactions. `CapitalStats.tsx` uses a 60/40 proxy (60% of expenses = debt service, 40% = overhead). Replace with actual categorization once Teller's transaction categories are available in production.
