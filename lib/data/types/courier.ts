"use client";

export interface CourierMetrics {
  successRate: number;
  onTimeRate: number;
  packageAccuracy: number;
}

export interface MonthlyStat {
  id: string;
  month: string;
  deliveries: number;
  year: number;
}

export interface YearlyStat {
  year: number;
  deliveries: number;
  rating: number;
}

export interface Courier {
  id: string;
  name: string;
  avatar: string;
  status: "active" | "inactive";
  deliveriesCompleted: number;
  rating: number;
  metrics: CourierMetrics;
  monthlyStats: MonthlyStat[];
  yearlyStats: YearlyStat[];
}