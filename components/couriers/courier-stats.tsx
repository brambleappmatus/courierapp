"use client";

import { Courier } from "@/lib/data/types/courier";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthlyStats } from "./stats/monthly-stats";
import { YearlyStats } from "./stats/yearly-stats";

interface CourierStatsProps {
  courier: Courier;
}

export function CourierStats({ courier }: CourierStatsProps) {
  return (
    <Tabs defaultValue="monthly" className="space-y-4">
      <TabsList>
        <TabsTrigger value="monthly">Monthly Stats</TabsTrigger>
        <TabsTrigger value="yearly">Yearly Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="monthly" className="space-y-4">
        <MonthlyStats stats={courier.monthlyStats} />
      </TabsContent>
      <TabsContent value="yearly" className="space-y-4">
        <YearlyStats stats={courier.yearlyStats} />
      </TabsContent>
    </Tabs>
  );
}