import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Confirm your email
        </CardTitle>
        <CardDescription>One more step to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent a confirmation link to your inbox. Open it to verify your
          account, then sign in to open your dashboard.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/login">Go to sign in</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
