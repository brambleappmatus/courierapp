"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { YEARS, MONTHS } from "@/lib/data/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DeliveryTrendsProps {
  couriers: Courier[];
}

export function DeliveryTrends({ couriers }: DeliveryTrendsProps) {
  const [selectedYears, setSelectedYears] = useState<number[]>([new Date().getFullYear()]);

  const chartData = MONTHS.map(month => ({ month }));
  const currentYear = new Date().getFullYear();
  
  selectedYears.forEach(year => {
    const yearData = couriers.reduce((acc, courier) => {
      courier.monthlyStats
        .filter(stat => stat.year === year)
        .forEach(stat => {
          const monthIndex = MONTHS.indexOf(stat.month);
          if (!acc[monthIndex]) {
            acc[monthIndex] = 0;
          }
          acc[monthIndex] += stat.deliveries;
        });
      return acc;
    }, Array(12).fill(0));

    chartData.forEach((item, index) => {
      item[`deliveries${year}`] = yearData[index];
    });
  });

  const lines = selectedYears.map(year => ({
    key: `deliveries${year}`,
    name: `${year} Deliveries`,
    color: year === currentYear ? "#000000" : `hsl(var(--chart-${selectedYears.indexOf(year) + 1}))`
  }));

  const handleYearSelect = (value: string) => {
    const year = parseInt(value);
    if (!selectedYears.includes(year)) {
      setSelectedYears([...selectedYears, year].sort((a, b) => b - a));
    }
  };

  const handleRemoveYear = (yearToRemove: number) => {
    if (selectedYears.length > 1) {
      setSelectedYears(selectedYears.filter(year => year !== yearToRemove));
    }
  };

  const availableYears = YEARS.filter(year => !selectedYears.includes(year));

  return (
    <Card className="border bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Delivery Overview</CardTitle>
        <div className="flex items-center space-x-4">
          <ScrollArea className="max-w-[300px]">
            <div className="flex flex-wrap gap-2">
              {selectedYears.map(year => (
                <Badge
                  key={year}
                  variant="secondary"
                  className="flex items-center gap-1"
                  style={{
                    backgroundColor: year === currentYear ? "#000000" : undefined,
                    color: year === currentYear ? "#ffffff" : undefined
                  }}
                >
                  {year}
                  {selectedYears.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveYear(year)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))}
            </div>
          </ScrollArea>
          {availableYears.length > 0 && (
            <Select onValueChange={handleYearSelect}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Add year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <LineChart
          data={chartData}
          xAxisKey="month"
          lines={lines}
          height={350}
        />
      </CardContent>
    </Card>
  );
}