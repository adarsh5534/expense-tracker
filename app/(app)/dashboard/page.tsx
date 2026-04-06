import { createOrganization } from "@/app/actions/organizations";
import { CreateOrganizationForm } from "@/components/forms/create-organization-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { listOrganizations } from "@/services/organizations";
import { Building2 } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

async function DashboardContent() {
  const { supabase } = await requireUser();
  const organizations = await listOrganizations(supabase);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-sm font-medium text-primary">Dashboard</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Organizations
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Each organization is a separate space for expenses—create one for
          work, personal use, or anything else.
        </p>
      </div>
      
      <Card className="border-border/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">New organization</CardTitle>
          <CardDescription>
            Give it a short name. You can add more anytime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm action={createOrganization} />
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Your list</h2>
        {organizations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <Building2
              className="mx-auto h-10 w-10 text-muted-foreground/80"
              aria-hidden
            />
            <p className="mt-3 text-sm font-medium text-foreground">
              No organizations yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the form above to create your first one.
            </p>
          </div>
        ) : (
          <ul className="divide-y overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
            {organizations.map((org) => (
              <li
                key={org.id}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5"
              >
                <span className="font-medium">{org.name}</span>
                <Button asChild size="sm">
                  <Link href={`/organization/${org.id}`}>Open</Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
