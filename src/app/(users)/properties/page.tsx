import AuthLayout from "@/components/custom/layout/auth";
import { Metadata } from "next";
import TableSkeleton from "./_components/table-skeleton";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Properties`,
};

const Table = dynamic(() => import("./table"), {
  loading: () => <TableSkeleton />,
});

export default function Page() {
  return (
    <AuthLayout>
      <main className="sm:pt-10 pb-10 px-2">
        <Table />
      </main>
    </AuthLayout>
  );
}
