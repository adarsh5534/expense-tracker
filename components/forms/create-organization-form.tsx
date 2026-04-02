"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

type State = { error: string | null } | null;

export function CreateOrganizationForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ error: string | null }>;
}) {
  const [state, formAction, pending] = useActionState(
    async (_prev: State, formData: FormData) => {
      return action(formData);
    },
    null,
  );

  return (
    <div className="flex flex-col gap-2">
      <form
        action={formAction}
        className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="org-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="org-name"
            name="name"
            placeholder="e.g. Personal"
            required
            disabled={pending}
          />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create"}
        </Button>
      </form>
      {state?.error ? (
        <p className="text-sm text-destructive">{state.error}</p>
      ) : null}
    </div>
  );
}
