import { invoice, tenant } from "@/db/facades";
import { notFound } from "next/navigation";
import InvoiceSection from "./_components/invoice-section";
import BasicInfo from "./_components/basic-info";

type PageProps = {
  params: { uuid: string };
};

export default async function Page({ params }: PageProps) {
  const tn = await tenant.firstUsingUuidWithProperty(params.uuid);
  if (!tn) return notFound();

  const invoices = await invoice.getByTenantId(tn.id);

  return (
    <main className="sm:pt-8 pb-8 px-2 w-full sm:max-w-[1024px] mx-auto">
      <h2 className="flex items-center gap-4 scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-8">
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-200">
          {tn.name.at(0)?.toUpperCase()}
        </div>
        {tn.name}
      </h2>

      <BasicInfo model={tn} />

      <InvoiceSection invoices={invoices} />
    </main>
  );
}
