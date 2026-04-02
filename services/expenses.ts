import type { SupabaseClient } from "@supabase/supabase-js";
import type { Expense } from "@/lib/types";

export async function listExpensesForOrganization(
  supabase: SupabaseClient,
  organizationId: string,
): Promise<Expense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("id, title, amount, category, created_at, organization_id")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Expense[];
}
