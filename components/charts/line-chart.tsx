"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis
} from "recharts";
import { useChartTheme } from "@/hooks/use-chart-theme";
import { CustomTooltip } from "./tooltip";

interface ChartData {
  [key: string]: string | number;
}

interface LineConfig {
  key: string;
  name: string;
  color: string;
}

interface LineChartProps<T extends ChartData> {
  data: T[];
  xAxisKey: keyof T;
  lines?: LineConfig[];
  yAxisKey?: keyof T;
  height?: number;
}

export function LineChart<T extends ChartData>({
  data,
  xAxisKey,
  lines,
  yAxisKey,
  height = 350,
}: LineChartProps<T>) {
  const { lineProps, gridColor, theme, xAxisProps, yAxisProps } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis {...xAxisProps} dataKey={xAxisKey as string} />
        <YAxis {...yAxisProps} />
        <Tooltip content={<CustomTooltip />} />
        {lines ? (
          <>
            <Legend />
            {lines.map((line) => {
              const strokeColor = line.color === "#000000" && theme === "dark" 
                ? "#ffffff" 
                : line.color;
              return (
                <Line
                  key={line.key}
                  {...lineProps}
                  name={line.name}
                  dataKey={line.key}
                  stroke={strokeColor}
                />
              );
            })}
          </>
        ) : (
          <Line 
            {...lineProps} 
            dataKey={yAxisKey as string} 
            stroke={theme === "dark" ? "hsl(var(--foreground))" : "hsl(var(--primary))"} 
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}