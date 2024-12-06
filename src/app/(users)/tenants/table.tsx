"use server";

import { auth } from "@clerk/nextjs/server";
import { columns } from "./_components/columns";
import DataTable from "./_components/data-table";
import { tenant } from "@/db/facades";
import { notFound } from "next/navigation";

export default async function Table() {
  const { userId } = auth();
  if (!userId) notFound();

  const data = await tenant.tableQuery(userId);

  return <DataTable columns={columns} data={data} />;
}
