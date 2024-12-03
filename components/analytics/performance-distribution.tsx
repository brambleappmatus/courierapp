"use client";

import { Courier } from "@/lib/data/types/courier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTheme } from "next-themes";

interface PerformanceDistributionProps {
  couriers: Courier[];
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * (index % 2 === 0 ? 1.6 : 1.8);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';
  
  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={textAnchor}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function PerformanceDistribution({ couriers }: PerformanceDistributionProps) {
  const { theme } = useTheme();
  const activeCouriers = couriers.filter(c => c.status === "active");

  // Calculate performance distribution
  const performanceRanges = {
    exceptional: activeCouriers.filter(c => c.metrics.successRate >= 98).length,
    good: activeCouriers.filter(c => c.metrics.successRate >= 95 && c.metrics.successRate < 98).length,
    average: activeCouriers.filter(c => c.metrics.successRate >= 90 && c.metrics.successRate < 95).length,
    needsImprovement: activeCouriers.filter(c => c.metrics.successRate < 90).length,
  };

  const data = [
    { 
      name: "Exceptional",
      value: performanceRanges.exceptional,
      description: "≥98% success rate"
    },
    { 
      name: "Good",
      value: performanceRanges.good,
      description: "95-97% success rate"
    },
    { 
      name: "Average",
      value: performanceRanges.average,
      description: "90-94% success rate"
    },
    { 
      name: "Needs Improvement",
      value: performanceRanges.needsImprovement,
      description: "<90% success rate"
    },
  ].filter(item => item.value > 0);

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: payload[0].color }}
              />
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {data.description}
            </div>
            <div className="font-medium">
              {data.value} couriers ({((data.value / activeCouriers.length) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle>Performance Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index]}
                    stroke={theme === "dark" ? "hsl(var(--background))" : "white"}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full shrink-0" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="space-y-1">
                <div className="text-sm font-medium leading-none">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}