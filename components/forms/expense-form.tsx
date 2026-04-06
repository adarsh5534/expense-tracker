"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";

type State = { error: string | null } | null;

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health",
  "Travel",
  "Education",
  "Personal Care",
  "Other",
];

export function ExpenseForm({
  organizationId,
  action,
}: {
  organizationId: string;
  action: (formData: FormData) => Promise<{ error: string | null }>;
}) {
  const [state, formAction, pending] = useActionState(
    async (_prev: State, formData: FormData) => {
      return action(formData);
    },
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="organization_id" value={organizationId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="expense-title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="expense-title"
            name="title"
            placeholder="Coffee"
            required
            disabled={pending}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="expense-amount" className="text-sm font-medium">
            Amount
          </label>
          <Input
            id="expense-amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
            disabled={pending}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="expense-category" className="text-sm font-medium">
            Category <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <Select name="category" disabled={pending}>
            <SelectTrigger id="expense-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Adding…" : "Add expense"}
        </Button>
      </div>
    </form>
  );
}
