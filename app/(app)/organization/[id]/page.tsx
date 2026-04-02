import { createExpense, deleteExpense } from "@/app/actions/expenses";
import { ExpenseForm } from "@/components/forms/expense-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { listExpensesForOrganization } from "@/services/expenses";
import { getOrganizationById } from "@/services/organizations";
import { Receipt } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatMoney(amount: string | number) {
  const n = typeof amount === "number" ? amount : Number(amount);
  if (Number.isNaN(n)) return amount;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireUser();

  const organization = await getOrganizationById(supabase, id);
  if (!organization) {
    notFound();
  }

  const expenses = await listExpensesForOrganization(supabase, id);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Organizations
        </Link>
        <p className="mt-3 text-sm font-medium text-primary">Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {organization.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add and review expenses for this organization.
        </p>
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Add expense</CardTitle>
          <CardDescription>
            Amounts are stored with two decimal places. Category is optional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseForm organizationId={id} action={createExpense} />
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Expenses</h2>
        {expenses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <Receipt
              className="mx-auto h-10 w-10 text-muted-foreground/80"
              aria-hidden
            />
            <p className="mt-3 text-sm font-medium text-foreground">
              No expenses yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the form above to add your first entry.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/80 bg-card shadow-sm">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-border/80 bg-muted/40">
                <tr>
                  <th className="px-3 py-2 font-medium">Title</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium w-[100px]"> </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/80">
                {expenses.map((e) => (
                  <tr key={e.id} className="bg-card">
                    <td className="px-3 py-2">{e.title}</td>
                    <td className="px-3 py-2 tabular-nums">
                      {formatMoney(e.amount)}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {e.category ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatDate(e.created_at)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <form action={deleteExpense}>
                        <input type="hidden" name="expense_id" value={e.id} />
                        <input
                          type="hidden"
                          name="organization_id"
                          value={organization.id}
                        />
                        <Button type="submit" variant="destructive" size="sm">
                          Delete
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
