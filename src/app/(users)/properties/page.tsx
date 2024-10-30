import AuthLayout from "@/components/custom/layout/auth";
import { columns, Property } from "./columns";
import DataTable from "./data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Properties`,
};

async function getData(): Promise<Property[]> {
  return Array.from({ length: 25 }, (_, i) => i).map((i) => ({
    id: i.toString(),
    name: `Property ${1000 * i}`,
    monthly_rent: 1000 * i,
  }));
}

export default async function Page() {
  const data = await getData();

  return (
    <AuthLayout>
      <main className="py-10 px-2">
        <DataTable columns={columns} data={data} />
      </main>
    </AuthLayout>
  );
}
