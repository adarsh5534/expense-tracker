"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createExpense(formData: FormData) {
  const organizationId = String(formData.get("organization_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const amountRaw = String(formData.get("amount") ?? "").trim();
  const categoryRaw = String(formData.get("category") ?? "").trim();

  if (!organizationId || !title) {
    return { error: "Organization, title, and amount are required" };
  }

  const amount = Number(amountRaw);
  if (Number.isNaN(amount) || amount < 0) {
    return { error: "Amount must be a valid non-negative number" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("expenses").insert({
    organization_id: organizationId,
    title,
    amount,
    category: categoryRaw ? categoryRaw : null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/organization/${organizationId}`);
  return { error: null };
}

export async function deleteExpense(formData: FormData): Promise<void> {
  const expenseId = String(formData.get("expense_id") ?? "");
  const organizationId = String(formData.get("organization_id") ?? "");

  if (!expenseId || !organizationId) {
    return;
  }

  const supabase = await createClient();

  const { error } = await supabase.from("expenses").delete().eq("id", expenseId);

  if (error) {
    return;
  }

  revalidatePath(`/organization/${organizationId}`);
}
