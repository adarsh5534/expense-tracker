import { AuthButton } from "@/components/auth-button";
import { AppLogo } from "@/components/brand/app-logo";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { UserEmail } from "@/components/app/user-email";
import { NavigationProgress } from "@/components/navigation-progress";
import Link from "next/link";
import { Suspense } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <NavigationProgress />
      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4">
          <div className="flex min-w-0 items-center gap-6">
            <AppLogo className="min-w-0 shrink" />
            <Link
              href="/dashboard"
              className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Suspense fallback={<span className="h-5 w-24 animate-pulse rounded-md bg-muted" />}>
              <UserEmail />
            </Suspense>
            <ThemeSwitcher />
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense
                fallback={<span className="h-8 w-24 animate-pulse rounded-md bg-muted" />}
              >
                <AuthButton />
              </Suspense>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-border/80 py-6 text-center text-xs text-muted-foreground">
        <p className="mx-auto max-w-4xl px-4">Expense Tracker</p>
      </footer>
    </div>
  );
}
