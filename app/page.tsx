import { PublicShell } from "@/components/layout/public-shell";
import { Button } from "@/components/ui/button";
import { Building2, Lock, Receipt } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Building2,
    title: "Multiple organizations",
    body: "Keep personal and work spending in separate workspaces.",
  },
  {
    icon: Receipt,
    title: "Simple expense entries",
    body: "Add amounts, titles, and optional categories in seconds.",
  },
  {
    icon: Lock,
    title: "Your data, your account",
    body: "Row-level security in Postgres keeps each user’s data isolated.",
  },
];

export default function Home() {
  return (
    <PublicShell>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-12 sm:pt-20">
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Expense management</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Know where your money goes
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            Create organizations, log expenses, and review them in one calm
            dashboard—built on Next.js and Supabase.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/auth/sign-up">Get started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto mt-20 grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-border/80 bg-card p-6 text-card-foreground shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-5 w-5 text-foreground" aria-hidden />
              </div>
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </section>
      </div>
    </PublicShell>
  );
}
