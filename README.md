# Expense Tracker

A production-ready expense tracking app built with **Next.js (App Router)**, **Supabase (Auth + Postgres)**, and **Tailwind CSS**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Backend | Supabase (Auth + PostgreSQL) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui + Radix UI |
| Deployment | Vercel |

## Features

- User authentication (sign up, login, password reset, email confirmation)
- Organization-based expense tracking
- Cookie-based sessions via `@supabase/ssr`
- Dark/light mode with `next-themes`

## Project Structure

```
app/
  (app)/                              # Authenticated app routes (dashboard + org pages)
    layout.tsx
    dashboard/page.tsx
    organization/[id]/page.tsx
  auth/                               # Auth routes (login, sign-up, reset, confirm)
    layout.tsx
    login/page.tsx
    sign-up/page.tsx
    sign-up-success/page.tsx
    forgot-password/page.tsx
    update-password/page.tsx
    confirm/route.ts
    error/page.tsx
  actions/                            # Server Actions (mutations)
    organizations.ts
    expenses.ts
  protected/                          # Simple protected route (redirects to /dashboard)
    layout.tsx
    page.tsx
  layout.tsx                           # Root layout (ThemeProvider)
  page.tsx                             # Landing page

components/
  app/app-shell.tsx                  # Authenticated header + footer
  layout/public-shell.tsx            # Public header + footer
  brand/app-logo.tsx
  forms/
    create-organization-form.tsx
    expense-form.tsx
  ui/                                # shadcn/ui components

lib/
  auth.ts                             # requireUser() helper
  supabase/
    client.ts                         # Browser client
    server.ts                         # Server client
    proxy.ts                          # Session/cookie proxy for Next.js 16
    env.ts                            # Env var helpers (includes ANON key fallback)

services/
  organizations.ts                     # Supabase read queries
  expenses.ts                          # Supabase read queries

supabase/
  migrations/
    001_expense_tracker.sql          # Organizations + expenses + RLS policies

proxy.ts                                # Next.js 16 proxy entrypoint
```

## Setup

### 1. Create a Supabase Project

Sign up at [supabase.com](https://supabase.com) and create a new project.

### 2. Get Your API Keys

In your Supabase project dashboard, go to **Settings → API** and copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables

Create a `.env.local` file (values copied from your Supabase project settings):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# Optional fallback key (some starter templates use this name)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Configure Supabase Auth URLs

In **Supabase Dashboard → Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` (for local dev)
- **Redirect URLs**:
  ```
  http://localhost:3000/**
  ```

### 5. Enable Email Confirmation (optional)

In **Supabase Dashboard → Authentication → Providers → Email**:

Toggle **Confirm email** on if you want users to verify their email before signing in.

## Local Development

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Deployment to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)

### Option 2: Manual Deploy

```bash
npm i -g vercel
vercel
```

### Configure Environment Variables on Vercel

In your **Vercel project dashboard → Settings → Environment Variables**, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# Optional fallback key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### Configure Supabase for Production

In **Supabase Dashboard → Authentication → URL Configuration**:

- **Site URL**: `https://your-vercel-app.vercel.app`
- **Redirect URLs**:
  ```
  https://your-vercel-app.vercel.app/
  https://your-vercel-app.vercel.app/** 
  ```

### Set Up DNS (Custom Domain - optional)

If using a custom domain, add it in **Vercel → Domains** and configure DNS records as instructed.

## Authentication Flow

1. User signs up at `/auth/sign-up`
2. Supabase sends a confirmation email with a link
3. User clicks the link → hits `/auth/confirm` route
4. `route.ts` calls `supabase.auth.verifyOtp()` to verify the token
5. User is redirected to `/dashboard` (or the `next` param)
6. `proxy.ts` (Next.js 16) uses the Supabase auth cookie to protect `/dashboard` and `/organization/*`

### Email Confirmation URL Format

```
https://your-app.vercel.app/auth/confirm?token_hash=XXX&type=signup&next=/
```

## Database Schema

Run Supabase SQL migration:

- `supabase/migrations/001_expense_tracker.sql`

This creates:

- `organizations` (id, name, owner_id)
- `expenses` (id, title, amount, category, organization_id)
- RLS policies so users can only access their own organizations/expenses.

## Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
