"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { DeliveryChart } from "@/components/dashboard/delivery-chart";
import { useCouriers } from "@/lib/data/courier-context";

export default function Home() {
  const { couriers } = useCouriers();
  const activeUser = couriers[0]; // For demonstration, using first courier as active user

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {activeUser?.name.split(" ")[0]}
        </h2>
      </div>
      <div className="flex-1 min-h-0 space-y-8">
        <StatsCards />
        <DeliveryChart />
      </div>
    </div>
  );
}