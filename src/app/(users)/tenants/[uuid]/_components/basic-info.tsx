"use client";

import { tenant } from "@/db/facades";
import { formatDate } from "date-fns";

export default function BasicInfo({
  model,
}: {
  model: Awaited<ReturnType<typeof tenant.firstUsingUuidWithProperty>>;
}) {
  if (!model) return null;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4  gap-4">
      <div>
        <div className="text-gray-400 text-sm">Property</div>
        <div className="text-gray-700 font-semibold">
          {model.property?.name ?? "No Property"}
        </div>
      </div>

      {model.property && (
        <div>
          <div className="text-gray-400 text-sm">Monthly Rent</div>
          <div className="text-gray-700 font-semibold">
            {model.property.monthly_rent}
          </div>
        </div>
      )}

      <div>
        <div className="text-gray-400 text-sm">Billing Date</div>
        <div className="text-gray-700 font-semibold">
          {formatDate(model.billing_date, "dd/MM/yyyy")}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-sm">Starting Date</div>
        <div className="text-gray-700 font-semibold">
          {formatDate(model.starting_date, "dd/MM/yyyy")}
        </div>
      </div>
    </section>
  );
}
