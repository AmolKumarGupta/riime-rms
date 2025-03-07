import { invoice, property, tenant } from "@/db/facades";
import { formatInvoiceId, getInvoiceStatusInfo } from "@/lib/invoice";
import { notFound } from "next/navigation";
import InvoiceBasicInfo from "./_components/invoice-basic-info";
import { months } from "@/lib/calendar";
import { formatDate } from "date-fns";
import { InvoiceStatus } from "@/types/globals";

type PageProps = {
  params: { uuid: string };
};

export default async function Page({ params }: PageProps) {
  const myInvoice = await invoice.getByUuid(params.uuid);
  if (!myInvoice) notFound();

  const myProperty = await property.first(myInvoice.property_id);
  if (!myProperty) notFound();

  const myTenant = await tenant.first(myInvoice.tenant_id);
  if (!myTenant) notFound();

  const label = getInvoiceStatusInfo();

  return (
    <main className="sm:pt-8 pb-8 px-2 w-full sm:max-w-[1024px] mx-auto">
      <h2 className="flex items-center gap-4 scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-8">
        # {formatInvoiceId(myInvoice.id)}
      </h2>

      <InvoiceBasicInfo property={myProperty} tenant={myTenant} />

      <section className="mt-4 grid grid-cols-2 md:grid-cols-4  gap-4">
        <div>
          <div className="text-gray-400 text-sm">Period</div>
          <div className="text-gray-700 font-semibold">
            {months().find((m) => m.value === myInvoice.month)?.label}{" "}
            {myInvoice.year}
          </div>
        </div>

        <div>
          <div className="text-gray-400 text-sm">Status</div>
          <div className="text-gray-700 font-semibold">
            {label[myInvoice.status as InvoiceStatus]}
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 md:grid-cols-4  gap-4">
        <div>
          <div className="text-gray-400 text-sm">Monthly Rent</div>
          <div className="text-gray-700 font-semibold">
            {myInvoice.monthly_rent}
          </div>
        </div>

        <div>
          <div className="text-gray-400 text-sm">Tax</div>
          <div className="text-gray-700 font-semibold">{myInvoice.tax}</div>
        </div>

        <div>
          <div className="text-gray-400 text-sm">Total</div>
          <div className="text-gray-700 font-semibold">{myInvoice.total}</div>
        </div>

        <div>
          <div className="text-gray-400 text-sm">Invoice Creation Date</div>
          <div className="text-gray-700 font-semibold">
            {formatDate(myInvoice.created_at, "dd/MM/yyyy")}
          </div>
        </div>
      </section>
    </main>
  );
}
