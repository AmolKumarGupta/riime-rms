import { InvoiceStatus } from "@/types/globals";

/**
 * format the invoice id in particular format for displaying
 * 
 * @param id 
 * @returns {string} Formatted invoice id
 */
export function formatInvoiceId(id: number | string): string {
    return `INV-${id.toString().padStart(5, "0")}`;
}

export function getInvoiceStatusInfo(): Record<InvoiceStatus, string> {
    return {
        draft: "Draft",
        sent: "Sent",
        paid: "Paid",
        overdue: "Overdue",
        partially_paid: "Partially Paid",
        cancelled: "Cancelled",
        pending: "Pending",
    };
}