import { revalidatePath } from "next/cache";
import { client } from "../client";

export async function create(data: {
  user_id: string,
  name: string
  monthly_rent: number
}) {
  const property = await client.property.create({ data })
  revalidatePath("/properties");

  return property;
}

/**
 * Fetches data for all properties for table component
 */
export async function tableQuery(userId: string|null = null) {
  if (userId) {
    return await client.property.findMany({
      select: {
        id: true,
        name: true,
        monthly_rent: true,
      },
      where: {
        user_id: userId
      }
    });
  }

  return await client.property.findMany({
    select: {
      id: true,
      name: true,
      monthly_rent: true,
    },
  });
}