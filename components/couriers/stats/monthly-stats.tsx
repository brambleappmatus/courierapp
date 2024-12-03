"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { MonthlyStat } from "@/lib/data/types/courier";

interface MonthlyStatsProps {
  stats: MonthlyStat[];
}

export function MonthlyStats({ stats }: MonthlyStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Deliveries</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <LineChart
          data={stats}
          xAxisKey="month"
          yAxisKey="deliveries"
        />
      </CardContent>
    </Card>
  );
}