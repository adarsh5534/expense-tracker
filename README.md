# Expense Tracker

A full-stack expense tracking app built with **Next.js 15**, **Supabase**, and **Tailwind CSS**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
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
├── app/
│   ├── (app)/                    # Protected routes (dashboard, org pages)
│   ├── auth/                     # Auth pages (login, sign-up, password reset)
│   ├── actions/                  # Server Actions (expenses, organizations)
│   ├── protected/               # Placeholder protected route
│   ├── layout.tsx               # Root layout with ThemeProvider
│   └── page.tsx                 # Landing page
├── lib/
│   └── supabase/
│       ├── client.ts            # Browser client (createBrowserClient)
│       ├── server.ts            # Server client (createServerClient)
│       └── env.ts               # Env var helpers
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── tutorial/                # Tutorial steps (sign-up, connect-supabase, etc.)
├── middleware.ts                # Auth middleware (cookie-based sessions)
└── proxy.ts                     # Supabase proxy for local dev (optional)
```

## Setup

### 1. Create a Supabase Project

Sign up at [supabase.com](https://supabase.com) and create a new project.

### 2. Get Your API Keys

In your Supabase project dashboard, go to **Settings → API** and copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key  # optional (Supabase dashboard may provide this instead)
NEXT_PUBLIC_LOCAL_REDIRECT_URL=http://localhost:3000/**
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
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_LOCAL_REDIRECT_URL=http://localhost:3000/**
```

### Configure Supabase for Production

In **Supabase Dashboard → Authentication → URL Configuration**:

- **Site URL**: `https://your-vercel-app.vercel.app`
- **Redirect URLs**:
  ```
  http://localhost:3000/**
  https://your-vercel-app.vercel.app/**
  ```

### Set Up DNS (Custom Domain - optional)

If using a custom domain, add it in **Vercel → Domains** and configure DNS records as instructed.

## Authentication Flow

1. User signs up at `/auth/sign-up`
2. Supabase sends a confirmation email with a link
3. User clicks the link → hits `/auth/confirm` route
4. `route.ts` calls `supabase.auth.verifyOtp()` to verify the token
5. User is redirected to `/` (or the `next` param)
6. Middleware reads the auth cookie to protect routes

### Email Confirmation URL Format

```
https://your-app.vercel.app/auth/confirm?token_hash=XXX&type=signup&next=/
```

## Database Schema

Tables are managed via Supabase migrations. Key tables:

- `profiles` — user profiles
- `organizations` — expense groups
- `expenses` — individual expense records

Refer to Supabase Dashboard → **Table Editor** for full schema.

## Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
