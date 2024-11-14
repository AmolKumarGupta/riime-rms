"use server";

import { auth } from "@clerk/nextjs/server";
import { columns, Property } from "./columns";
import DataTable from "./data-table";
import { property } from "@/db/facades";

export default async function Table() {
  const { userId } = auth();

  const data = await property.tableQuery(userId);

  return <DataTable columns={columns} data={data} />;
}
