// import { revalidatePath } from "next/cache";
import { client } from "../client";


export async function create(data: {
    property_id: number;
    tenant_id: number;
    year: number;
    month: number;
    rent: number;
    prev_electricity_reading: number;
    cur_electricity_reading: number;
    electricity_rent: number;
    tax: number;
    total: number;
}) {
    const invoice = await client.invoice.create({
        data: {
            tenant_id: data.tenant_id,
            property_id: data.property_id,
            year: data.year,
            month: data.month,
            monthly_rent: data.rent,
            tax: data.tax,
            total: data.total,
        }
    })

    const rentVariant = await client.rentVariant.findFirst({
        where: {
            property_id: data.property_id,
            name: "electricity"
        }
    })

    if (rentVariant) {
        await client.invoiceVariantItem.update({
            where: {
                id: rentVariant.id
            },
            data: {
                current_reading: data.cur_electricity_reading
            }
        });

        await client.invoiceVariantItem.create({
            data: {
                invoice_id: invoice.id,
                name: "electricity",
                prev_reading: data.prev_electricity_reading,
                current_reading: data.cur_electricity_reading,
                amount: data.electricity_rent
            }
        })
    }

    return invoice;
}