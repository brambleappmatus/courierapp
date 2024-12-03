"use client";

import { faker } from "@faker-js/faker";

export interface CourierLocation {
  id: string;
  latitude: number;
  longitude: number;
  status: "idle" | "en_route" | "delivering";
  statusDuration: number;
  lastUpdated: Date;
  targetLat?: number;
  targetLng?: number;
  progress: number;
  route: Array<[number, number]>;
  routeIndex: number;
}

// Define key locations in Bratislava
const DELIVERY_ROUTES = [
  // City Center to Petržalka
  [
    [48.153892, 17.133616], // City Center
    [48.148834, 17.129668], // SNP Bridge
    [48.133861, 17.121472], // Petržalka Center
    [48.119863, 17.108726], // South Petržalka
  ],
  // City Center to Ružinov
  [
    [48.153892, 17.133616], // City Center
    [48.158561, 17.137144], // Old Town
    [48.168627, 17.177419], // Ružinov Center
    [48.175892, 17.188234], // East Ružinov
  ],
  // City Center to Nové Mesto
  [
    [48.153892, 17.133616], // City Center
    [48.162734, 17.127893], // Blumentál
    [48.172563, 17.127893], // Nové Mesto Center
    [48.182461, 17.127893], // North Nové Mesto
  ],
  // Additional routes for better coverage
  [
    [48.153892, 17.133616], // City Center
    [48.145678, 17.125432], // Residential Area 1
    [48.138765, 17.142345], // Shopping District
    [48.156789, 17.167890], // Business Park
  ],
  [
    [48.153892, 17.133616], // City Center
    [48.162345, 17.145678], // University Area
    [48.171234, 17.156789], // Tech Hub
    [48.165432, 17.178901], // Industrial Zone
  ],
];

function getRandomRoute() {
  const routeIndex = faker.number.int({ min: 0, max: DELIVERY_ROUTES.length - 1 });
  const route = [...DELIVERY_ROUTES[routeIndex]];
  
  // Add some randomness to the route points to avoid identical paths
  return route.map(([lat, lng]) => [
    lat + faker.number.float({ min: -0.002, max: 0.002 }),
    lng + faker.number.float({ min: -0.002, max: 0.002 }),
  ]);
}

export function generateInitialLocation(): CourierLocation {
  const route = getRandomRoute();
  const startPoint = route[faker.number.int({ min: 0, max: route.length - 2 })];
  
  return {
    id: faker.string.uuid(),
    latitude: startPoint[0],
    longitude: startPoint[1],
    status: faker.helpers.arrayElement(["idle", "en_route", "delivering"]),
    statusDuration: faker.number.int({ min: 0, max: 300 }),
    lastUpdated: new Date(),
    targetLat: route[1][0],
    targetLng: route[1][1],
    progress: faker.number.float({ min: 0, max: 0.8 }),
    route,
    routeIndex: 0,
  };
}

export function updateLocation(current: CourierLocation): CourierLocation {
  const now = new Date();
  const timeDiff = (now.getTime() - current.lastUpdated.getTime()) / 1000;
  
  let newStatus = current.status;
  let newStatusDuration = current.statusDuration + timeDiff;
  let newRouteIndex = current.routeIndex;
  let newProgress = current.progress;
  let newRoute = current.route;

  // Status transitions with longer durations
  if (current.status === "delivering" && newStatusDuration >= 600) { // 10 minutes delivery
    newStatus = "en_route";
    newStatusDuration = 0;
    newRouteIndex = Math.min(current.routeIndex + 1, current.route.length - 1);
    newProgress = 0;
  } else if (current.status === "idle" && newStatusDuration >= 300) { // 5 minutes idle
    newStatus = "en_route";
    newStatusDuration = 0;
    newRoute = getRandomRoute();
    newRouteIndex = 0;
    newProgress = 0;
  } else if (current.status === "en_route") {
    // Slower movement for more realistic speeds
    newProgress = Math.min(current.progress + 0.003, 1);
    if (newProgress >= 1) {
      if (newRouteIndex < current.route.length - 1) {
        newStatus = "delivering";
        newStatusDuration = 0;
        newProgress = 0;
        newRouteIndex++;
      } else {
        newStatus = "idle";
        newStatusDuration = 0;
        newRoute = getRandomRoute();
        newRouteIndex = 0;
        newProgress = 0;
      }
    }
  }

  const currentPoint = newRoute[newRouteIndex];
  const nextPoint = newRoute[Math.min(newRouteIndex + 1, newRoute.length - 1)];
  
  // Linear interpolation for smooth movement
  const newLat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * newProgress;
  const newLng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * newProgress;

  return {
    ...current,
    latitude: newLat,
    longitude: newLng,
    status: newStatus,
    statusDuration: newStatusDuration,
    progress: newProgress,
    route: newRoute,
    routeIndex: newRouteIndex,
    lastUpdated: now,
    targetLat: nextPoint[0],
    targetLng: nextPoint[1],
  };
}