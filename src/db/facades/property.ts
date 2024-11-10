import { client } from "../client";

export async function create(data: {
  user_id: string,
  name: string
  monthly_rent: number
}) {
  return await client.property.create({ data })
}

/**
 * Fetches data for all properties for table component
 */
export async function tableQuery() {
  return await client.property.findMany({
    select: {
      id: true,
      name: true,
      monthly_rent: true,
    },
  });
}