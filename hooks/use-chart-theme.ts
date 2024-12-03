"use client";

import { useTheme } from "next-themes";
import { XAxisProps, YAxisProps, LineProps } from "recharts";

export function useChartTheme() {
  const { theme } = useTheme();

  const xAxisProps: Partial<XAxisProps> = {
    stroke: "currentColor",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    padding: { left: 10, right: 10 },
    style: {
      fontSize: '12px',
    }
  };

  const yAxisProps: Partial<YAxisProps> = {
    stroke: "currentColor",
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    tickFormatter: (value) => `${value}`,
    width: 40,
    style: {
      fontSize: '12px',
    }
  };

  const lineProps: Partial<LineProps> = {
    type: "monotone",
    strokeWidth: 2,
    dot: {
      stroke: theme === "dark" ? "hsl(var(--foreground))" : "hsl(var(--primary))",
      fill: "hsl(var(--background))",
      strokeWidth: 2,
      r: 4,
    },
    activeDot: {
      stroke: theme === "dark" ? "hsl(var(--foreground))" : "hsl(var(--primary))",
      fill: theme === "dark" ? "hsl(var(--foreground))" : "hsl(var(--primary))",
      strokeWidth: 2,
      r: 6,
    }
  };

  const gridColor = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return {
    xAxisProps,
    yAxisProps,
    lineProps,
    gridColor,
    theme,
  };
}