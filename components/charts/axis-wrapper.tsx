"use client";

import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from "recharts";
import { useChartTheme } from "@/hooks/use-chart-theme";

export function XAxis(props: any) {
  const { xAxisProps } = useChartTheme();
  return <RechartsXAxis {...xAxisProps} {...props} />;
}

export function YAxis(props: any) {
  const { yAxisProps } = useChartTheme();
  return <RechartsYAxis {...yAxisProps} {...props} />;
}