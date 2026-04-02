import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <p className="text-sm text-muted-foreground">
      {params?.error
        ? `Something went wrong (${params.error}).`
        : "Something went wrong. Try signing in again."}
    </p>
  );
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Authentication error
        </CardTitle>
        <CardDescription>We couldn&apos;t complete that request.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={<p className="text-sm text-muted-foreground">…</p>}>
          <ErrorMessage searchParams={searchParams} />
        </Suspense>
        <Button asChild variant="outline" className="w-full">
          <Link href="/auth/login">Back to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
