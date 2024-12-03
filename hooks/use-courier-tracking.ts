"use client";

import { useState, useEffect } from "react";
import { CourierLocation, generateInitialLocation, updateLocation } from "@/lib/data/location-data";
import { Courier } from "@/lib/data/courier-data";

export function useCourierTracking(couriers: Courier[]) {
  const [locations, setLocations] = useState<Record<string, CourierLocation>>({});

  useEffect(() => {
    // Initialize locations for all active couriers
    const initialLocations = couriers.reduce((acc, courier) => {
      if (courier.status === "active") {
        acc[courier.id] = generateInitialLocation();
      }
      return acc;
    }, {} as Record<string, CourierLocation>);
    
    setLocations(initialLocations);

    // Update locations frequently for smooth movement
    const interval = setInterval(() => {
      setLocations(prevLocations => {
        const updatedLocations = { ...prevLocations };
        Object.keys(updatedLocations).forEach(courierId => {
          updatedLocations[courierId] = updateLocation(updatedLocations[courierId]);
        });
        return updatedLocations;
      });
    }, 100); // Update every 100ms for smoother movement

    return () => clearInterval(interval);
  }, [couriers]);

  return locations;
}