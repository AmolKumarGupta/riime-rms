import PublicLayout from "@/components/custom/layout/public";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <PublicLayout>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <SignUp />
      </main>
    </PublicLayout>
  );
}
