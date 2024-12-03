"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { YearlyStat } from "@/lib/data/types/courier";

interface YearlyStatsProps {
  stats: YearlyStat[];
}

export function YearlyStats({ stats }: YearlyStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yearly Performance</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <LineChart
          data={stats}
          xAxisKey="year"
          yAxisKey="deliveries"
        />
      </CardContent>
    </Card>
  );
}