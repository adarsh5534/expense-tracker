import { PublicShell } from "@/components/layout/public-shell";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicShell>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px]">{children}</div>
      </main>
    </PublicShell>
  );
}
