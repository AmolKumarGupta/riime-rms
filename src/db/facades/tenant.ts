import { revalidatePath } from "next/cache";
import { client } from "../client";

export async function create(data: { user_id: string; name: string; billing_date: Date; starting_date: Date; }) {
  const tenant = await client.tenant.create({ data })
  revalidatePath("/tenants");

  return tenant;
}

export async function update(
  id: number,
  data: { name: string, billing_date: Date, starting_date: Date, property_id: number }
) {
  const tenant = await client.tenant.update({ where: { id }, data });

  revalidatePath("/tenants");

  return tenant;
}

export async function remove(id: number) {
  await client.tenant.delete({
    where: { id }
  })

  revalidatePath('/tenants');
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

export async function first(id: number) {
  return await client.tenant.findUnique({
    where: { id }
  })
}