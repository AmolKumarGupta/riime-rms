"use client";

import {
  property as propertyFacade,
  tenant as tenantFacade,
} from "@/db/facades";
import { formatDate } from "date-fns";

export default function InvoiceBasicInfo({
  property,
  tenant,
}: {
  property: Awaited<ReturnType<typeof propertyFacade.first>>;
  tenant: Awaited<ReturnType<typeof tenantFacade.first>>;
}) {
  if (!property) return null;
  if (!tenant) return null;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4  gap-4">
      <div>
        <div className="text-gray-400 text-sm">Tenant</div>
        <div className="text-gray-700 font-semibold">{tenant.name}</div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Property</div>
        <div className="text-gray-700 font-semibold">{property.name}</div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Billing Date</div>
        <div className="text-gray-700 font-semibold">
          {formatDate(tenant.billing_date, "dd/MM/yyyy")}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Starting Date</div>
        <div className="text-gray-700 font-semibold">
          {formatDate(tenant.starting_date, "dd/MM/yyyy")}
        </div>
      </div>
    </section>
  );
}
