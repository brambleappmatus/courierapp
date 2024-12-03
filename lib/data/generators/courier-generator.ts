"use client";

import { faker } from "@faker-js/faker";
import { Courier } from "../types/courier";
import { generateYearlyStats, generateMonthlyStats, generateMetrics } from "./delivery-generator";

export function generateMockCouriers(count: number): Courier[] {
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const yearlyStats = generateYearlyStats();
    const monthlyStats = yearlyStats.flatMap(yearStat => 
      generateMonthlyStats(yearStat.year, yearStat.deliveries / 12)
    );
    const totalDeliveries = monthlyStats.reduce((sum, stat) => sum + stat.deliveries, 0);

    return {
      id: faker.string.uuid(),
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName[0]}${lastName[0]}`,
      status: faker.helpers.arrayElement(["active", "inactive"]),
      deliveriesCompleted: totalDeliveries,
      rating: Number(faker.number.float({ min: 4.0, max: 5.0 }).toFixed(1)),
      metrics: generateMetrics(),
      monthlyStats,
      yearlyStats
    };
  });
}

export const mockCouriers = generateMockCouriers(10);