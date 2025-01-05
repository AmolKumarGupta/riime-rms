'use server'

import { property, tenant } from "@/db/facades";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export async function deleteTenant(id: number) {
  const { userId } = auth();
  if (!userId) notFound();

  const model = await tenant.first(id);
  if (!model) notFound();
  if (model.user_id != userId) notFound();

  await tenant.remove(id);
  redirect('/tenants');
}

export async function getUnAssignedPropertiesWithTenantProperty(tenantId: number) {
  const { userId } = auth();
  if (!userId) return null;

  return await property.unAssignedPropertiesWithTenantProperty(userId, tenantId);
}