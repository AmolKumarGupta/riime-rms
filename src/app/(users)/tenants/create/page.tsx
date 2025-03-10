import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import CreateForm from "./create-form";
import { property } from "@/db/facades";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import CenteredLayout from "@/components/custom/containers/centered-layout";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Create Tenant`,
};

export default async function Page() {
  const { userId } = auth();
  if (!userId) return notFound();

  const properties = await property.unAssignedProperties(userId);

  return (
    <CenteredLayout className="sm:pt-8 pb-8 px-2">
      <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
        Create a new Tenant
      </h2>

      <Separator className="my-4 bg-zinc-50" />

      <CreateForm properties={properties} />
    </CenteredLayout>
  );
}
