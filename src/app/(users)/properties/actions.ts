'use server'

import { property } from "@/db/facades";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export async function deleteProperty(id: number) {
  const { userId } = auth();
  if (!userId) notFound();

  const model = await property.first(id);
  if (!model) notFound();
  if (model.user_id != userId) notFound();

  await property.remove(id);
  redirect('/properties');
}