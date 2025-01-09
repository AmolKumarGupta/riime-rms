import StatCard from "@/components/custom/stat-card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { property, tenant } from "@/db/facades";
import { auth } from "@clerk/nextjs/server";
import { DollarSign, HomeIcon, UserIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page() {
  const { userId } = auth();
  if (!userId) return notFound();

  const totalProperties = await property.total(userId);
  const totalTenants = await tenant.total(userId);

  return (
    <>
      <header className="mb-4 px-2">
        <h1 className="text-2xl font-bold">Overview</h1>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        <StatCard
          title="Total Properties"
          icon={<HomeIcon className="h-4 w-4 text-blue-900" />}
          content={totalProperties.toString()}
        />

        <StatCard
          title="Total Tenants"
          icon={<UserIcon className="h-4 w-4 text-red-900" />}
          content={totalTenants.toString()}
        />

        <StatCard
          title="Total Revenue"
          icon={<DollarSign className="h-4 w-4 text-yellow-500" />}
          content="$ 12,345.99"
        />
      </section>

      <section className="my-8 px-2">
        <header>
          <h2 className="text-2xl font-bold">Recent Activity</h2>
        </header>

        <Separator className="my-4" />

        <div>
          <Skeleton className="w-100 h-48" />
        </div>
      </section>
    </>
  );
}
