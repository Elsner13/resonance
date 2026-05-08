# Finance Dashboard — Design Spec

**Date:** 2026-03-28
**Status:** Approved
**Type:** Standalone personal app (separate from Attune website)

---

## Overview

A personal finance dashboard for Sam that connects to Wings Financial Credit Union via Plaid, automatically detects recurring income and bills, and tells Sam exactly how much to move to savings on each paycheck (15th and last day of the month).

---

## Goals

- Show total monthly income, total monthly bills, and monthly surplus at a glance
- Compute per-paycheck savings amount (monthly surplus ÷ 2)
- Show leftover amount after savings transfer
- Track a savings goal with progress bar and projected paychecks-to-completion
- Show recurring bills list with due dates
- Show spending category breakdown from recent transactions
- Automatically stay current via Plaid — zero manual entry after initial setup

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS 4 |
| Bank connection | Plaid Node SDK |
| Data storage | Local JSON files (`.data/`) — gitignored |
| Charts | CSS horizontal bars (no library) |
| Hosting | Local / personal server |

No auth layer needed — personal tool, runs privately.

---

## File Structure

```
finance-dashboard/
├── .data/
│   ├── plaid.json          # { accessToken, itemId } — gitignored
│   └── goals.json          # { name, targetAmount, currentAmount }
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                        # Dashboard — server component, fetches all data
│   │   ├── setup/
│   │   │   └── page.tsx                    # Plaid Link onboarding
│   │   └── api/plaid/
│   │       ├── create-link-token/route.ts  # POST — creates Plaid Link token
│   │       ├── exchange-token/route.ts     # POST — exchanges public token, saves access token
│   │       └── data/route.ts               # GET — recurring transactions + balance + categories
│   └── components/
│       ├── HeroSavings.tsx         # Big savings number, next paycheck date, leftover
│       ├── StatCards.tsx           # Monthly income / bills / surplus row
│       ├── SavingsGoal.tsx         # Progress bar, % complete, paychecks-to-goal
│       ├── BillsList.tsx           # Recurring outflows with amounts and due dates
│       ├── SpendingCategories.tsx  # Horizontal bar breakdown by category
│       └── PlaidLink.tsx           # Client component — Plaid Link button (setup page)
├── .env.local                      # PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV
└── .gitignore                      # includes .data/
```

---

## Pages

### `/` — Dashboard

Server component. On load:
1. Checks for `.data/plaid.json` — if missing, redirects to `/setup`
2. Calls `/api/plaid/data` to fetch all Plaid data
3. Computes derived values (see below)
4. Renders all dashboard sections

**Layout (top to bottom):**
- Header bar: app name, bank name, last-synced timestamp, "Sync now" button
- **Hero card**: next paycheck date + amount, big green savings number, "move to savings on [date]", leftover after savings
- **3-col stat cards**: Monthly Income / Monthly Bills / Monthly Surplus
- **Savings Goal**: goal name, current vs target, progress bar, % complete, paychecks-to-goal estimate
- **Bottom row (2-col)**: Recurring Bills list (left) + Spending Categories (right)

### `/setup` — Onboarding

Single page. Shows "Connect Wings Financial" button that launches Plaid Link. On success, exchanges token and redirects to `/`.

If already connected, redirects to `/`.

---

## API Routes

### `POST /api/plaid/create-link-token`

Calls `plaidClient.linkTokenCreate()` with `products: ['transactions']` and `country_codes: ['US']`. Returns `{ link_token }`.

### `POST /api/plaid/exchange-token`

Receives `{ public_token }`. Calls `plaidClient.itemPublicTokenExchange()`. Writes `{ accessToken, itemId }` to `.data/plaid.json`. Returns `{ success: true }`.

### `GET /api/plaid/data`

Reads access token from `.data/plaid.json`. Makes three Plaid calls in parallel:

1. `transactionsRecurringGet` — recurring inflow streams (income) + outflow streams (bills)
2. `transactionsGet` — last 30 days for spending category breakdown
3. `accountsBalanceGet` — current account balance

Returns combined JSON payload to the dashboard.

---

## Computed Values

All derived — no manual input required after setup.

```
monthlyIncome         = sum of average_amount across all inflow recurring streams
monthlyBills          = sum of average_amount across all outflow recurring streams
monthlySurplus        = monthlyIncome - monthlyBills
perPaycheckSavings    = monthlySurplus / 2
nextPaycheckDate      = whichever comes next: 15th or last day of current month
nextPaycheckAmount    = monthlyIncome / 2
leftoverAfterSavings  = nextPaycheckAmount - perPaycheckSavings
payChecksToGoal       = ceil((goal.targetAmount - goal.currentAmount) / perPaycheckSavings)
```

---

## Savings Goal

Stored in `.data/goals.json`:

```json
{
  "name": "Emergency Fund",
  "targetAmount": 10000,
  "currentAmount": 6840
}
```

`currentAmount` is editable via an inline click-to-edit field on the dashboard. No separate settings page needed.

---

## Visual Design

- Background: `#0a0a0a`
- Card background: `#111111`, border: `#1e1e1e`
- Savings/positive numbers: `#4ade80` (green)
- Savings goal accent: `#a78bfa` (purple)
- Warning/increase: `#f87171` (red)
- Body text: `#ffffff`
- Secondary text: `#555555`
- Font: Inter (system fallback acceptable)
- Spacing: 16px grid gap between cards, 18–28px internal padding

---

## Error States

| Condition | Behavior |
|---|---|
| No `.data/plaid.json` | Redirect to `/setup` |
| Plaid API error | Show last-cached data + "sync failed" banner with retry button |
| Recurring transactions not detected yet | "Still learning your transactions" notice + manual amount override fields |
| Wings Financial connection expired | Sticky banner: "Reconnect your bank" → re-launches Plaid Link |

---

## Environment Variables

```
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox   # sandbox → development → production
```

Plaid sandbox allows testing with fake credentials before going live with Wings Financial.

---

## Out of Scope

- Multiple bank accounts
- Multiple savings goals simultaneously
- Budget limits / alerts
- Historical charts over time
- Mobile app
- Authentication / multi-user support
