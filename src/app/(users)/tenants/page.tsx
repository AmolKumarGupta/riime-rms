import { Metadata } from "next";
import dynamic from "next/dynamic";
import TableSkeleton from "@/components/custom/table-skeleton";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Tenants`,
};

const Table = dynamic(() => import("./table"), {
  loading: () => <TableSkeleton />,
});

export default function Page() {
  return (
    <main className="sm:pt-10 pb-10 px-2">
      <Table />
    </main>
  );
}
