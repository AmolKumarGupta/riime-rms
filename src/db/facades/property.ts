import { revalidatePath } from "next/cache";
import { client } from "../client";

export async function create(data: {
  user_id: string,
  name: string,
  monthly_rent: number
}) {
  const property = await client.property.create({ data })
  revalidatePath("/properties");

  return property;
}

export async function update(id: number, data: { name: string, monthly_rent: number }) {
  const property = await client.property.update({ where: { id }, data });

  revalidatePath("/properties");

  return property;
}

export async function remove(id: number) {
  await client.property.delete({
    where: { id }
  })

  revalidatePath('/properties');
}

/**
 * Fetches data for all properties for table component
 */
export async function tableQuery(userId: string) {
  return await client.property.findMany({
    select: {
      id: true,
      name: true,
      monthly_rent: true,
    },
    where: {
      user_id: userId
    },
    orderBy: {
      id: 'asc'
    }
  });
}

export async function first(id: number) {
  return await client.property.findUnique({
    where: { id }
  })
}


export async function unAssignedProperties(userId: string) {
  return await client.property.findMany({
    select: {
      id: true,
      name: true
    },
    where: {
      user_id: userId,
      tenant: null
    }
  });
}

/**
 * Retrieves a list of properties that are either unassigned or assigned to a specific tenant.
 */
export async function unAssignedPropertiesWithTenantProperty(userId: string, tenantId: number) {
  return await client.property.findMany({
    select: {
      id: true,
      name: true
    },
    where: {
      user_id: userId,
      OR: [
        { tenant: null },
        {
          tenant: {
            id: tenantId
          }
        }
      ]
    }
  });
}

/**
 * Retrieves the total number of properties for a user.
 */
export async function total(userId: string): Promise<number> {
  return await client.property.count({
    where: {
      user_id: userId
    }
  });
}