"use server";

import { prisma } from "@/lib/db";
import { columns, Property } from "./columns";
import DataTable from "./data-table";

export default async function Table() {
  const data = await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      monthly_rent: true,
    },
  });

  return <DataTable columns={columns} data={data} />;
}
