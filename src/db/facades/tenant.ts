import { revalidatePath } from "next/cache";
import { client } from "../client";

export async function create(data: { user_id: string; name: string; billing_date: Date; starting_date: Date; }) {
  const tenant = await client.tenant.create({ data })
  revalidatePath("/tenants");

  return tenant;
}

/**
 * Fetches data for all properties for table component
 */
export async function tableQuery(userId: string) {
  return await client.tenant.findMany({
    select: {
      id: true,
      name: true,
      billing_date: true,
      starting_date: true,
      property_id: true,
    },
    where: {
      user_id: userId
    }
  });
}