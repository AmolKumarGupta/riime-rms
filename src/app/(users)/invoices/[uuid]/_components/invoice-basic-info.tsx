"use client";

import {
  property as propertyFacade,
  tenant as tenantFacade,
} from "@/db/facades";
import { formatDate } from "date-fns";
import { Calendar, HomeIcon, User } from "lucide-react";

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
        <div className="text-gray-700 font-semibold">
          <User size={12} className="inline" /> {tenant.name}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Property</div>
        <div className="text-gray-700 font-semibold">
          <HomeIcon size={12} className="inline" /> {property.name}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Billing Date</div>
        <div className="text-gray-700 font-semibold">
          <Calendar size={12} className="inline" />{" "}
          {formatDate(tenant.billing_date, "dd/MM/yyyy")}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Starting Date</div>
        <div className="text-gray-700 font-semibold">
          <Calendar size={12} className="inline" />{" "}
          {formatDate(tenant.starting_date, "dd/MM/yyyy")}
        </div>
      </div>
    </section>
  );
}
