
/**
 * format the invoice id in particular format for displaying
 * 
 * @param id 
 * @returns {string} Formatted invoice id
 */
export function formatInvoiceId(id: number | string): string {
    return `INV-${id.toString().padStart(5, "0")}`;
}