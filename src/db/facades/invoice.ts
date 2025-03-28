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
        await client.rentVariant.update({
            where: {
                id: rentVariant.id
            },
            data: {
                current: data.cur_electricity_reading
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

export async function update(id: number, data: {
    year: number;
    month: number;
    rent: number;
    prev_electricity_reading: number;
    cur_electricity_reading: number;
    electricity_rent: number;
    tax: number;
    total: number;
    status: string;
}) {

    const invoice = await client.invoice.update({
        where: {
            id
        },
        data: {
            year: data.year,
            month: data.month,
            monthly_rent: data.rent,
            tax: data.tax,
            total: data.total,
            status: data.status
        }
    });

    const rentVariant = await client.rentVariant.findFirst({
        where: {
            property_id: invoice.property_id,
            name: "electricity"
        }
    })

    if (rentVariant) {
        const variantItem = await client.invoiceVariantItem.findFirst({
            where: {
                invoice_id: id,
                name: "electricity"
            }
        })

        if (variantItem) {
            await client.invoiceVariantItem.update({
                where: {
                    id: variantItem.id
                },
                data: {
                    prev_reading: data.prev_electricity_reading,
                    current_reading: data.cur_electricity_reading,
                    amount: data.electricity_rent
                }
            })

        }
    }

    return invoice;
}

/**
 * get invoices of tenant in descending order of year and month
 */
export async function getByTenantId(id: number, limit: number = 10) {
    return await client.invoice.findMany({
        where: {
            tenant_id: id
        },
        orderBy: [
            {
                year: "desc"
            },
            {
                month: "desc"
            }
        ],
        take: limit
    });
}

export async function first(id: number) {
    return await client.invoice.findFirst({
        where: {
            id
        }
    });
}

export async function getByUuid(uuid: string) {
    return await client.invoice.findFirst({
        where: {
            uuid
        }
    });
}