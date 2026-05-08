# Capital Dashboard — Design Spec

**Date:** 2026-03-28
**Status:** Approved
**Replaces:** `2026-03-28-finance-dashboard-design.md` (Plaid version — superseded)

---

## Vision

A fully autonomous personal CFO dashboard that connects directly to Wings Financial Credit Union via Teller, surfaces Gmail-parsed income receipts, and tells Sam exactly when to move money, how much, and where. Aesthetic: Private Wealth Office — off-white, ultra-minimal, zero noise.

---

## Goals

- Real-time Wings Financial checking + savings balance via Teller
- Every transaction auto-synced (debit purchases, transfers, deposits)
- Paycheck calendar: Sam picks pay dates, dashboard forecasts balance 30–60 days forward
- "Move Money" engine: computes buffer (1 month expenses), identifies deployable surplus, issues a clear directive — "Move $840 to savings today"
- Savings rate tracker: week-over-week, month-over-month
- Gmail layer: Stripe, KDP, loan servicers — supplementary income/expense signals
- Alerts: payment failures, upcoming obligations, low balance warnings
- Runs itself — zero manual input after initial setup

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router, TypeScript |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Bank connection | Teller API (teller.io) + teller-connect-react |
| Gmail parsing | Google Gmail API (OAuth2, stored credentials) |
| Storage | Local JSON files in `.data/` (gitignored) |
| Scheduling | macOS launchd plist — auto-syncs every 15 min |
| Hosting | Local / personal machine |

---

## Aesthetic System

```
Background:    #f8f8f6  (warm off-white)
Surface:       #ffffff
Border:        #e8e8e4  (subtle warm grey)
Border-strong: #111111  (key stat underlines)
Text-primary:  #111111
Text-secondary:#888888
Text-muted:    #bbbbbb
Accent-red:    #cc0000  (alerts, failures only)
Accent-green:  #006644  (positive deltas, move-money CTA)
Font:          Inter, weight 300 (numbers) / 400 (labels) / 500 (CTAs)
Numbers:       tabular-nums, no bold except the hero
Spacing:       48px page padding, 24px card gap, 16px inner padding
Cards:         white bg, 1px #e8e8e4 border, no shadow, no radius or subtle 4px
```

No gradients. No glow. No color except red for alerts and green for the move-money directive.

---

## File Structure

```
~/finance-dashboard/          # rebuilt from existing scaffold
├── .data/
│   ├── teller.json           # { accessToken, accountIds } — gitignored
│   ├── gmail-credentials.json # OAuth2 tokens — gitignored
│   ├── transactions.json     # cached transaction history
│   ├── paycheck-schedule.json # { paydates: string[], frequency: string }
│   └── goals.json            # { name, targetAmount, currentAmount }
├── src/
│   ├── lib/
│   │   ├── types.ts          # all shared interfaces
│   │   ├── storage.ts        # read/write .data/ helpers
│   │   ├── teller.ts         # Teller API client
│   │   ├── gmail.ts          # Gmail OAuth2 + email parsing
│   │   ├── compute.ts        # cash flow math, move-money engine
│   │   └── forecast.ts       # 30-60 day balance projection
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # dashboard
│   │   ├── setup/page.tsx                    # Teller Connect onboarding
│   │   └── api/
│   │       ├── teller/connect/route.ts       # exchange Teller token
│   │       ├── teller/sync/route.ts          # GET — fetch latest txns
│   │       ├── gmail/sync/route.ts           # GET — parse financial emails
│   │       ├── paycheck/update/route.ts      # POST — save pay schedule
│   │       └── goals/update/route.ts         # POST — update savings goal
│   └── components/
│       ├── TellerConnect.tsx         # 'use client' — Teller Connect button
│       ├── HeroCapital.tsx           # deployable capital + move-money CTA
│       ├── CapitalStats.tsx          # income / debt service / overhead row
│       ├── MoveMoney.tsx             # "Move $X to savings" directive card
│       ├── CashFlowCalendar.tsx      # 30-day forecast with pay dates marked
│       ├── IncomeStreams.tsx          # Stripe, KDP, direct deposit breakdown
│       ├── ObligationsTable.tsx      # loans + HOA + subscriptions
│       ├── TransactionFeed.tsx       # recent transactions, categorized
│       ├── SavingsTracker.tsx        # savings rate + goal progress
│       ├── AlertsBanner.tsx          # red — payment failures, low balance
│       └── SyncButton.tsx            # manual refresh trigger
├── scripts/
│   └── sync.ts               # standalone sync script for launchd
└── launchd/
    └── com.sam.financedashboard.plist  # auto-runs sync every 15 min
```

---

## Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ Capital Dashboard          Mar 28 · synced 2m ago  [↻]  │
├─────────────────────────────────────────────────────────┤
│  ⚠  Vercel $57.65 payment failed — card 5608            │  ← AlertsBanner (red, dismissible)
├─────────────────────────────────────────────────────────┤
│                                                         │
│              $2,840                                     │  ← HeroCapital
│         free capital this month                         │
│                                                         │
├──────────────┬──────────────┬──────────────────────────┤
│ Income       │ Debt Svc     │ Overhead                  │  ← CapitalStats
│ $6,400       │ $1,840       │ $1,720                    │
├──────────────┴──────────────┴──────────────────────────┤
│  ● Move $840 to savings today  →  [Do It]              │  ← MoveMoney directive
│    Wings Checking → Wings Savings                       │
├─────────────────────────────────────────────────────────┤
│ Cash Flow · Next 30 Days                                │  ← CashFlowCalendar
│ [Apr 1][Apr 2]...[Apr 15 ↑PAY]...[Apr 30 ↑PAY]        │
│ Balance floor: $1,200 · Projected low: $890 Apr 12 ⚠   │
├────────────────────┬────────────────────────────────────┤
│ Income Streams     │ Obligations                        │
│ Stripe   $500  3/28│ Jovia       $420  due Apr 10       │
│ KDP      $182  3/20│ Citizens    $389  due Apr 15       │
│ Deposit $3200  3/15│ LendingClub $297  due Apr 18       │
│                    │ HOA         $315  due Apr 1        │
├────────────────────┴────────────────────────────────────┤
│ Recent Transactions                                     │  ← TransactionFeed
│ Mar 28  ANTHROPIC (Venmo)       -$5.00                  │
│ Mar 25  Transfer → Jovia       -$420.00                 │
│ Mar 20  KDP Royalty            +$182.40                 │
├─────────────────────────────────────────────────────────┤
│ Savings Rate  ████████░░  62% of surplus saved          │  ← SavingsTracker
│ Emergency Fund  $6,840 / $10,000  · 3 paychecks away   │
└─────────────────────────────────────────────────────────┘
```

---

## Teller Integration

**Teller API base:** `https://api.teller.io`
**Auth:** Application ID + OAuth2 certificate (stored in `.data/`)
**Teller Connect:** `teller-connect-react` — renders the bank-login widget
**Endpoints used:**
- `GET /accounts` — checking + savings accounts
- `GET /accounts/{id}/balances` — real-time balance
- `GET /accounts/{id}/transactions` — full transaction history
- Webhook (optional): real-time transaction notifications

**Setup flow:**
1. Sign up at teller.io, get Application ID + certificate
2. Visit `/setup` → Teller Connect widget → select Wings Financial → authenticate
3. Access token stored in `.data/teller.json`
4. Auto-sync every 15 min via launchd

---

## Gmail Integration

**Parsed senders:**
| Sender | Type | Parse target |
|---|---|---|
| venmo@venmo.com | Transaction | Subject: "Receipt from X - $Y.YY" |
| notifications@stripe.com | Income | Subject: "Payment of $X from Name" |
| noreply@accounts-payable.amazon.com | Income | Body: royalty amount |
| noreply.payments@jovia.org | Bill confirmed | Body: payment amount |
| Support@citizens.myloanmanager.com | Bill reminder | Subject/body: amount + due date |
| payments@mail6.lendingclub.com | Bill reminder | Body: amount + due date |
| propertypay@hoa.firstcitizens.com | Bill confirmed | Body: $315.00 HOA |
| failed-payments@vercel.com | Alert | Subject: amount + card |
| Any "payment failed" / "payment unsuccessful" | Alert | Flag immediately |

Gmail credentials: Google Cloud OAuth2, consent screen for personal use. Stored in `.data/gmail-credentials.json`.

---

## Paycheck Calendar

Stored in `.data/paycheck-schedule.json`:
```json
{
  "paydates": ["2026-04-15", "2026-04-30", "2026-05-15", "2026-05-31"],
  "netAmount": 3200
}
```

Sam edits pay dates via a simple calendar UI on the dashboard. The forecast engine uses these to project forward balance.

---

## Move-Money Engine (`src/lib/compute.ts`)

```
monthlyIncome     = sum of Teller income transactions (30 days)
monthlyExpenses   = sum of Teller outflow transactions (30 days)
buffer            = monthlyExpenses × 1.0   (1 month expenses as floor)
currentBalance    = Teller checking balance
deployable        = currentBalance - buffer
moveAmount        = floor(deployable / 100) × 100  (round to nearest $100)
directive         = moveAmount > 0
                    ? "Move $X to savings today"
                    : "Stay the course — buffer is tight"
```

Directive updates on every sync. Zero configuration after setup.

---

## Cash Flow Forecast (`src/lib/forecast.ts`)

Projects checking balance day-by-day for next 60 days:
- Adds paycheck amounts on paycheck dates
- Subtracts known recurring obligations on their due dates
- Flags any day where projected balance drops below buffer
- Output: array of `{ date, projectedBalance, event? }` for the calendar component

---

## Automated Sync (launchd)

`scripts/sync.ts` runs every 15 minutes via macOS launchd:
1. Hits `/api/teller/sync` — fetches latest Teller transactions
2. Hits `/api/gmail/sync` — parses new financial emails
3. Writes updated `.data/transactions.json`
4. Dashboard on next load reflects fresh data

---

## Alerts

| Condition | Display |
|---|---|
| Payment failed email detected | Red banner, persistent until dismissed |
| Projected balance < buffer on any future date | Yellow warning in calendar |
| Checking balance < 2 weeks expenses | Red hero section |
| Savings goal hit | Green banner |
| New income received (Stripe, KDP) | Subtle green indicator in income section |

---

## Out of Scope

- Mobile app
- Multiple bank accounts (other than Wings Financial checking + savings)
- Investment accounts
- Tax tracking
- Multi-user
- Budget categories / envelope budgeting
