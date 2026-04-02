import type { SupabaseClient } from "@supabase/supabase-js";
import type { Organization } from "@/lib/types";

export async function listOrganizations(
  supabase: SupabaseClient,
): Promise<Organization[]> {
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name, owner_id, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Organization[];
}

export async function getOrganizationById(
  supabase: SupabaseClient,
  id: string,
): Promise<Organization | null> {
  const { data, error } = await supabase
    .from("organizations")
    .select("id, name, owner_id, created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Organization | null;
}
