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