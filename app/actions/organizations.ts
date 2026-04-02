"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOrganization(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "Name is required" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("organizations").insert({
    name,
    owner_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { error: null };
}
