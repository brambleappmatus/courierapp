"use client";

import { faker } from "@faker-js/faker";
import { MONTHS, YEARS } from "../constants";
import { seasonalPatterns, yearEvents, yearMultipliers } from "./seasonal-patterns";

export function generateSeasonalDeliveries(baseDeliveries: number, month: string, year: number) {
  let multiplier = 1.0;

  // Apply seasonal patterns
  Object.entries(seasonalPatterns).forEach(([_, months]) => {
    if (month in months) {
      multiplier = months[month];
    }
  });

  // Apply special year events
  if (yearEvents[year]?.[month]) {
    multiplier = yearEvents[year][month];
  }

  // Add randomness but maintain seasonal patterns
  const randomFactor = 1 + faker.number.float({ min: -0.15, max: 0.15 });
  const yearMultiplier = yearMultipliers[year];
  const deliveries = Math.round(baseDeliveries * multiplier * randomFactor * yearMultiplier);

  // Ensure reasonable limits
  return Math.max(15, Math.min(deliveries, 150));
}

export function generateMonthlyStats(year: number, baseDeliveries: number) {
  return MONTHS.map(month => ({
    id: faker.string.uuid(),
    month,
    deliveries: generateSeasonalDeliveries(baseDeliveries, month, year),
    year
  }));
}

export function generateYearlyStats() {
  const baseDeliveries = faker.number.int({ min: 40, max: 80 });
  const baseRating = faker.number.float({ min: 4.0, max: 4.5 });

  return YEARS.map(year => {
    const yearlyStats = generateMonthlyStats(year, baseDeliveries);
    const totalDeliveries = yearlyStats.reduce((sum, stat) => sum + stat.deliveries, 0);
    const rating = Number(Math.min(5.0, Math.max(3.5, 
      baseRating + faker.number.float({ min: -0.2, max: 0.2 })
    )).toFixed(1));

    return {
      year,
      deliveries: totalDeliveries,
      rating
    };
  });
}

export function generateMetrics() {
  return {
    successRate: Number(faker.number.float({ min: 95, max: 99.9 }).toFixed(1)),
    onTimeRate: Number(faker.number.float({ min: 94, max: 99.5 }).toFixed(1)),
    packageAccuracy: Number(faker.number.float({ min: 96, max: 99.9 }).toFixed(1))
  };
}