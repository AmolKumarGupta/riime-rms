import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

type Prop = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Prop) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:flex-1 md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          </Link>

          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>

          <Link
            href="/properties"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Properties
          </Link>

          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Renters
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetTitle>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                </Link>
              </SheetTitle>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>

              <Link
                href="/properties"
                className="text-muted-foreground hover:text-foreground"
              >
                Properties
              </Link>

              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Renters
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href="#"
          className="block md:hidden text-muted-foreground transition-colors hover:text-foreground"
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>

        <div className="flex-1"></div>

        <div>
          <SignedOut>
            <Button asChild>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className="container mx-auto px-2 md:px-8 py-8 md:py-8">{children}</main>
    </div>
  );
}
