import StatCard from "@/components/custom/stat-card";
import { DollarSign } from "lucide-react";

export default function Page() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        content="$ 45,231.89"
        helpText="+20.1% from last month"
      />
    </section>
  );
}
