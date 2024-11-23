'use server'

import { property } from '@/db/facades';
import { propertySchema } from '@/form-schema';
import { auth } from '@clerk/nextjs/server';

export async function createProperty(formData: FormData) {
  const { userId } = await auth()
  if (!userId) {
    return { status: 401, error: "unauthenticated" }
  }

  const data = Object.fromEntries(formData);

  const validated = propertySchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    const error = Object.values(errors).at(0)?.at(0);

    return { status: 422, errors, error }
  }

  try {
    await property.create({
      user_id: userId,
      name: data.name as string,
      monthly_rent: data.monthly_rent ? parseInt(data.monthly_rent as string) : 0
    });

  } catch (e) {
    return { status: 500, error: "Something went wrong" }
  }

  return { status: 201 }
}

export async function updateProperty(id: number, formData: FormData) {
  const { userId } = await auth()
  if (!userId) return { status: 401, error: "unauthenticated" };

  const data = Object.fromEntries(formData);
  const validated = propertySchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    const error = Object.values(errors).at(0)?.at(0);

    return { status: 422, errors, error }
  }

  try {
    const model = await property.first(id);
    if (!model) return { status: 400, error: "not found" };
    if (model.user_id != userId) return { status: 400, error: "not found" };

    await property.update(id, {
      name: data.name as string,
      monthly_rent: data.monthly_rent ? parseInt(data.monthly_rent as string) : 0
    });

  } catch (e) {
    return { status: 500, error: "Something went wrong" }
  }

  return { status: 200 }
}