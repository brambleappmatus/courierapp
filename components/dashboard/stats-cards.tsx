"use client";

import { Package2, TrendingUp, Users, Star } from "lucide-react";
import { StatsCard } from "./stats-card";
import { useCouriers } from "@/lib/data/courier-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { YEARS } from "@/lib/data/constants";

export function StatsCards() {
  const { couriers, getCourierStats } = useCouriers();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Memoize stats calculations
  const stats = useMemo(() => {
    const yearStats = getCourierStats(parseInt(selectedYear));
    const activeCouriers = couriers.filter(c => c.status === "active").length;

    return [
      {
        title: "Total Deliveries",
        value: yearStats.totalDeliveries.toLocaleString(),
        description: `For year ${selectedYear}`,
        icon: Package2,
      },
      {
        title: "Success Rate",
        value: `${yearStats.avgSuccessRate.toFixed(1)}%`,
        description: "Average across all couriers",
        icon: TrendingUp,
      },
      {
        title: "Active Couriers",
        value: activeCouriers.toString(),
        description: `Out of ${couriers.length} total couriers`,
        icon: Users,
      },
      {
        title: "Average Rating",
        value: yearStats.avgRating.toFixed(1),
        description: "Customer satisfaction",
        icon: Star,
      },
    ];
  }, [couriers, selectedYear, getCourierStats]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select
          value={selectedYear}
          onValueChange={setSelectedYear}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}