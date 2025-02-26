import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { rentVariant, tenant as tenantFacade } from "@/db/facades";
import { notFound } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CreateForm from "./create-form";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - New Invoice`,
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { userId } = auth();
  if (!userId) return notFound();

  const { tenant = undefined } = await searchParams;
  if (!tenant) return notFound();

  const model = await tenantFacade.firstUsingUuidWithProperty(tenant as string);
  if (!model) return notFound();

  // Authorization check
  if (model.user_id !== userId) return notFound();

  const propertyVariants =
    model.property && model.property.id
      ? await rentVariant.all(model.property.id)
      : [];

  return (
    <main className="sm:pt-8 pb-8 px-2">
      <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
        New Invoice
      </h2>

      <Separator className="my-4 bg-zinc-50" />

      <div className="w-full sm:w-1/2 mx-auto space-y-4">
        <Alert className="border-zinc-900">
          <AlertTitle className="text-xl font-semibold">
            {model.name}
          </AlertTitle>
          <AlertDescription className="italic text-xs text-zinc-500">
            {model.property?.name}
          </AlertDescription>
        </Alert>

        <CreateForm tenant={model} propertyVariants={propertyVariants} />
      </div>
    </main>
  );
}
