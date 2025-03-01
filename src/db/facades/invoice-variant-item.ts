// import { revalidatePath } from "next/cache";
import { client } from "../client";

export async function getByInvoiceId(id: number) {
    return await client.invoiceVariantItem.findMany({
        where: {
            invoice_id: id
        }
    })
}