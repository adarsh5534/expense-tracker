import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import Link from "next/link";

export function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Wallet className="h-4 w-4" aria-hidden />
      </span>
      <span>Expense Tracker</span>
    </Link>
  );
}
