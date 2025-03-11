import { invoice, property, tenant } from "@/db/facades";
import { formatInvoiceId } from "@/lib/invoice";
import { notFound } from "next/navigation";
import InvoiceBasicInfo from "./_components/invoice-basic-info";
import { months } from "@/lib/calendar";
import { formatDate } from "date-fns";
import { InvoiceStatus } from "@/types/globals";
import { Calendar } from "lucide-react";
import InvoiceStatusBadge from "@/components/custom/badges/invoice-status-badge";
import money from "@/lib/money";

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

  return (
    <main className="sm:pt-8 pb-8 px-2 w-full sm:max-w-[1024px] mx-auto">
      <div className="mb-8">
        <h2 className="flex items-center scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 ">
          Invoice No. {formatInvoiceId(myInvoice.id)}
        </h2>

        <span className="text-gray-500 text-sm flex gap-1 items-center">
          <Calendar size={12} /> Created on{" "}
          {formatDate(myInvoice.created_at, "dd/MM/yyyy")}
        </span>
      </div>

      <main className="bg-neutral-50 rounded-lg border-2 border-zinc-100 p-4">
        <header className="mb-4 flex justify-between items-center">
          <h3 className="font-bold text-xl">Invoice Details</h3>
          <InvoiceStatusBadge
            status={myInvoice.status as InvoiceStatus}
            className="text-[0.55rem] rounded-lg"
          />
        </header>

        <InvoiceBasicInfo property={myProperty} tenant={myTenant} />

        <section className="mt-4 grid grid-cols-2 md:grid-cols-4  gap-4">
          <div>
            <div className="text-gray-400 text-sm">Period</div>
            <div className="text-gray-700 font-semibold">
              {months().find((m) => m.value === myInvoice.month)?.label}{" "}
              {myInvoice.year}
            </div>
          </div>
        </section>

        <hr className="mt-4" />

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700 font-semibold">Monthly Rent</div>
          <div className="text-gray-700 font-medium">
            {money(myInvoice.monthly_rent)}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700 font-semibold">Tax</div>
          <div className="text-gray-700 font-medium">
            {money(myInvoice.tax)}
          </div>
        </div>

        <hr className="mt-4" />

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700 font-bold">Total</div>
          <div className="text-gray-700 font-bold">
            {money(myInvoice.total)}
          </div>
        </div>
      </main>
    </main>
  );
}
