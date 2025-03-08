import { Badge } from "@/components/ui/badge";
import { getInvoiceStatusInfo } from "@/lib/invoice";
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "@/types/globals";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const invoiceStatusBadgeVariants = cva("", {
  variants: {
    status: {
      draft: "bg-zinc-500 hover:bg-zinc-500/80",
      sent: "bg-yellow-500 hover:bg-yellow-500/80",
      paid: "bg-green-500 hover:bg-green-500/80",
      overdue: "bg-purple-500 hover:bg-purple-500/80",
      partially_paid: "bg-orange-500 hover:bg-orange-500/80",
      cancelled: "bg-red-500 hover:bg-red-500/80",
      pending: "bg-blue-500 hover:bg-blue-500/80",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

export interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof invoiceStatusBadgeVariants> {}

export default function InvoiceStatusBadge({
  className,
  status,
  ...props
}: Props) {
  const label = getInvoiceStatusInfo();

  return (
    <Badge
      className={cn(invoiceStatusBadgeVariants({ status }), className)}
      {...props}
    >
      {label[status as InvoiceStatus]}
    </Badge>
  );
}
