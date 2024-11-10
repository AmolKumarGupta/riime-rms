"use server";

import { columns, Property } from "./columns";
import DataTable from "./data-table";
import { property } from "@/db/facades";

export default async function Table() {
  const data = await property.tableQuery();

  return <DataTable columns={columns} data={data} />;
}
