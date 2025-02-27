import { invoice } from "@/db/facades";
import { notFound } from "next/navigation";

type PageProps = {
  params: { uuid: string };
};

export default async function Page({ params }: PageProps) {
  const myInvoice = await invoice.getByUuid(params.uuid);
  if (!myInvoice) notFound();

  return (
    <main className="sm:pt-8 pb-8 px-2 w-full sm:max-w-[1024px] mx-auto">
      <h2 className="flex items-center gap-4 scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-8">
        # INV-{myInvoice.id.toString().padStart(5, "0")}
      </h2>
    </main>
  );
}
