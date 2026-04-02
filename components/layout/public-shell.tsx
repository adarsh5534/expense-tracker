import { AuthButton } from "@/components/auth-button";
import { AppLogo } from "@/components/brand/app-logo";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <AppLogo />
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitcher />
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense fallback={<span className="h-8 w-20 animate-pulse rounded-md bg-muted" />}>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </div>
      </header>
      {children}
      <footer className="mt-auto border-t border-border/80 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-xs text-muted-foreground">
          <p>Expense Tracker — private expense workspaces.</p>
        </div>
      </footer>
    </div>
  );
}
