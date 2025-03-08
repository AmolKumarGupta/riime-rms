import { client } from "../client";

export async function create(
  property_id: number,
  data: { name: string, initial: number, current: number }
) {
  const variant = await client.rentVariant.create({
    data: {
      property_id,
      name: data.name,
      initial: data.initial,
      current: data.current
    }
  });

  return variant;
}

export async function all(property_id: number) {
  const variants = await client.rentVariant.findMany({
    where: { property_id }
  });

  return variants;
}