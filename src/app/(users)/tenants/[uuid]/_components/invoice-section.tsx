"use client";

import InvoiceStatusBadge from "@/components/custom/badges/invoice-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoice } from "@/db/facades";
import { months } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/globals";
import { formatDate } from "date-fns";
import { ActionCell, ActionCellLink } from "./action-cell";

export default function InvoiceSection({
  invoices,
  className,
}: {
  invoices: Awaited<ReturnType<typeof invoice.getByTenantId>>;
  className?: string | undefined;
}) {
  "use client";
  return (
    <section className={cn("mt-8", className)}>
      <h3 className="font-bold text-2xl">Invoices</h3>

      <Table className="mt-4">
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
              <TableCell className="text-center">
                <InvoiceStatusBadge
                  status={invoice.status as InvoiceStatus}
                  className=""
                />
              </TableCell>
              <TableCell className="text-center">{invoice.total}</TableCell>
              <TableCell className="text-center hidden sm:block">
                {formatDate(invoice.created_at, "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-center">
                <ActionCell>
                  <ActionCellLink href={`/invoices/${invoice.uuid}`}>
                    View
                  </ActionCellLink>
                </ActionCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
