'use server'

import { property, rentVariant, tenant } from '@/db/facades';
import { propertySchema, propertyWithVariantSchema, tenantWithPropertySchema } from '@/form-schema';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';

/**
 * Creates a new property with the provided data.
 * 
 * @returns An object containing the status of the operation and any errors encountered.
 */
export async function createProperty(data: z.infer<typeof propertyWithVariantSchema>) {
  const { userId } = await auth()
  if (!userId) {
    return { status: 401, error: "unauthenticated" }
  }

  const validated = propertyWithVariantSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    const error = Object.values(errors).at(0)?.at(0);

    return { status: 422, errors, error }
  }

  try {
    const propertyModel = await property.create({
      user_id: userId,
      name: validated.data.name,
      monthly_rent: validated.data.monthly_rent ? validated.data.monthly_rent : 0
    });

    if (!validated.data.electricty_bill_included) {
      rentVariant.create(propertyModel.id, {
        name: "electricity",
        initial: validated.data.electricty_initial_value,
        current: validated.data.electricty_initial_value,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { status: 500, error: "Something went wrong" }
  }

  return { status: 201 }
}

/**
 * Updates a property with the given ID using the provided form data.
 * 
 * @returns An object containing the status of the operation and any errors if applicable.
 */
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { status: 500, error: "Something went wrong" }
  }

  return { status: 200 }
}

/**
 * Creates a new tenant with the provided data.
 *
 * @returns An object containing the status code and any relevant error messages.
 */
export async function createTenant(data: z.infer<typeof tenantWithPropertySchema>) {
  const { userId } = await auth()
  if (!userId) {
    return { status: 401, error: "unauthenticated" }
  }

  const validated = tenantWithPropertySchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    const error = Object.values(errors).at(0)?.at(0);

    return { status: 422, errors, error }
  }

  try {
    await tenant.create({
      user_id: userId,
      name: validated.data.name,
      billing_date: validated.data.billing_date,
      starting_date: validated.data.starting_date,
      property_id: validated.data.property_id
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { status: 500, error: "Something went wrong" }
  }

  return { status: 201 }
}

/**
 * Updates a tenant with the given ID using the provided form data.
 * 
 * @returns An object containing the status of the operation and any errors if applicable.
 */
export async function updateTenant(id: number, data: z.infer<typeof tenantWithPropertySchema>) {
  const { userId } = await auth()
  if (!userId) return { status: 401, error: "unauthenticated" };

  const validated = tenantWithPropertySchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors
    const error = Object.values(errors).at(0)?.at(0);

    return { status: 422, errors, error }
  }

  try {
    const model = await tenant.first(id);
    if (!model) return { status: 400, error: "not found" };
    if (model.user_id != userId) return { status: 400, error: "not found" };

    await tenant.update(id, {
      name: data.name as string,
      billing_date: validated.data.billing_date,
      starting_date: validated.data.starting_date,
      property_id: (validated.data && validated.data.property_id) ? validated.data.property_id : null,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { status: 500, error: "Something went wrong" }
  }

  return { status: 200 }
}