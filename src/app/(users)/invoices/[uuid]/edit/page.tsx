import { invoice, invoiceVariantItem, property, tenant } from "@/db/facades";
import { formatInvoiceId } from "@/lib/invoice";
import { notFound } from "next/navigation";
import InvoiceBasicInfo from "../_components/invoice-basic-info";
import UpdateForm from "../_components/update-form";

type PageProps = {
  params: { uuid: string };
};

export default async function Page({ params }: PageProps) {
  const myInvoice = await invoice.getByUuid(params.uuid);
  if (!myInvoice) notFound();

  const myVariants = await invoiceVariantItem.getByInvoiceId(myInvoice.id);

  const myProperty = await property.first(myInvoice.property_id);
  if (!myProperty) notFound();

  const myTenant = await tenant.first(myInvoice.tenant_id);
  if (!myTenant) notFound();

  return (
    <main className="sm:pt-8 pb-8 px-2 w-full sm:max-w-[1024px] mx-auto">
      <h2 className="flex items-center gap-4 scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-8">
        Edit Invoice - #{formatInvoiceId(myInvoice.id)}
      </h2>

      <InvoiceBasicInfo property={myProperty} tenant={myTenant} />

      <UpdateForm invoice={myInvoice} variants={myVariants} className="mt-8" />
    </main>
  );
}
