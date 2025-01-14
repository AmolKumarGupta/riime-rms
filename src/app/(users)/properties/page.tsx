import { Metadata } from "next";
import TableSkeleton from "@/components/custom/table-skeleton";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Properties`,
};

const Table = dynamic(() => import("./table"), {
  loading: () => <TableSkeleton />,
});

export default function Page() {
  return (
    <main className="sm:pt-10 pb-10 px-2">
      <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
        All Properties
      </h2>

      <Table />
    </main>
  );
}
