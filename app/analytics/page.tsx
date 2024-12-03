"use client";

import { useCouriers } from "@/lib/data/courier-context";
import { PerformanceMetrics } from "@/components/analytics/performance-metrics";
import { DeliveryTrends } from "@/components/analytics/delivery-trends";
import { CourierPerformance } from "@/components/analytics/courier-performance";
import { BusinessInsights } from "@/components/analytics/business-insights";
import { PerformanceDistribution } from "@/components/analytics/performance-distribution";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AnalyticsPage() {
  const { couriers } = useCouriers();

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        </div>
        <div className="space-y-8">
          <PerformanceMetrics couriers={couriers} />
          <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
            <DeliveryTrends couriers={couriers} />
            <PerformanceDistribution couriers={couriers} />
          </div>
          <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
            <CourierPerformance couriers={couriers} />
            <BusinessInsights couriers={couriers} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}