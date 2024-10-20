import PublicLayout from "@/components/custom/layout/public";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <PublicLayout>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <section className="min-h-[calc(100vh_-_theme(spacing.64))] flex flex-col justify-center lg:items-center">
          <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">
            Effortless Rentals, Seamless Management
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Simplify your rental process with our innovative SaaS solution
          </p>
          <Button asChild className="mt-4 max-w-32">
            <Link href={ process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string }>Get Started</Link>
          </Button>
        </section>
      </main>
    </PublicLayout>
  );
}
