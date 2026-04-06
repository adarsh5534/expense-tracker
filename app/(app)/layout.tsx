import AppShell from "@/components/app/app-shell";
import { Suspense } from "react";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading…</p>
        }
      >
        {children}
      </Suspense>
    </AppShell>
  );
}
