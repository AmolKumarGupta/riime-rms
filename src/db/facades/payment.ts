import { client } from "../client";

export async function firstUsingUuid(uuid: string) {
    return await client.payment.findUnique({
        where: { uuid }
    })
}