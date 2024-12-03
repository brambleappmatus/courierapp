"use client";

import { Courier } from "@/lib/data/types/courier";
import { TrendingUp, Clock, Package2, Star } from "lucide-react";

interface PerformanceMetricsProps {
  couriers: Courier[];
}

export function PerformanceMetrics({ couriers }: PerformanceMetricsProps) {
  const activeCouriers = couriers.filter(c => c.status === "active");
  
  const metrics = {
    successRate: activeCouriers.reduce((sum, c) => sum + c.metrics.successRate, 0) / activeCouriers.length,
    onTimeRate: activeCouriers.reduce((sum, c) => sum + c.metrics.onTimeRate, 0) / activeCouriers.length,
    packageAccuracy: activeCouriers.reduce((sum, c) => sum + c.metrics.packageAccuracy, 0) / activeCouriers.length,
    avgRating: activeCouriers.reduce((sum, c) => sum + c.rating, 0) / activeCouriers.length,
  };

  const cards = [
    {
      title: "Success Rate",
      value: `${metrics.successRate.toFixed(1)}%`,
      description: "Average delivery success rate",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "On-Time Rate",
      value: `${metrics.onTimeRate.toFixed(1)}%`,
      description: "Average on-time delivery rate",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Package Accuracy",
      value: `${metrics.packageAccuracy.toFixed(1)}%`,
      description: "Average package handling accuracy",
      icon: Package2,
      color: "text-purple-500",
    },
    {
      title: "Average Rating",
      value: metrics.avgRating.toFixed(1),
      description: "Customer satisfaction score",
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="card-3d">
          <div className="flex items-center justify-between">
            <card.icon className={`h-5 w-5 ${card.color}`} />
            <span className="text-2xl font-bold">{card.value}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium">{card.title}</p>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}