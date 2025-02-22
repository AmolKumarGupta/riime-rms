import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoice, tenant } from "@/db/facades";
import { months } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

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

function BasicInfo({
  model,
}: {
  model: Awaited<ReturnType<typeof tenant.firstUsingUuidWithProperty>>;
}) {
  if (!model) return null;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4  gap-4">
      <div>
        <div className="text-gray-400 text-sm">Property</div>
        <div className="text-gray-700 font-semibold">
          {model.property?.name ?? "No Property"}
        </div>
      </div>

      {model.property && (
        <div>
          <div className="text-gray-400 text-sm">Monthly Rent</div>
          <div className="text-gray-700 font-semibold">
            {model.property.monthly_rent}
          </div>
        </div>
      )}

      <div>
        <div className="text-gray-400 text-sm">Billing Date</div>
        <div className="text-gray-700 font-semibold">
          {model.billing_date.toLocaleDateString()}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Starting Date</div>
        <div className="text-gray-700 font-semibold">
          {model.starting_date.toLocaleDateString()}
        </div>
      </div>
    </section>
  );
}

function InvoiceSection({
  invoices,
  className,
}: {
  invoices: Awaited<ReturnType<typeof invoice.getByTenantId>>;
  className?: string | undefined;
}) {
  return (
    <Table className={cn("mt-8", className)}>
      <TableHeader>
        <TableRow>
          <TableHead className="">Invoice</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center hidden sm:table-cell">
            Creation Date
          </TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-semibold min-w-[6rem]">
              <span className="text-xs">
                {months().find((m) => m.value === invoice.month)?.label}{" "}
                {invoice.year}
              </span>
            </TableCell>
            <TableCell className="text-center">{invoice.status}</TableCell>
            <TableCell className="text-center">{invoice.total}</TableCell>
            <TableCell className="text-center hidden sm:block">
              {invoice.created_at.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-center">...</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
