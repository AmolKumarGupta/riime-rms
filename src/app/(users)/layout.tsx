import AuthLayout from "@/components/custom/layout/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthLayout>
      <Suspense fallback={<Skeleton className="w-full h-64"></Skeleton>}>
        {children}
      </Suspense>
    </AuthLayout>
  );
}
