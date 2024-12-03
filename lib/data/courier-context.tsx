"use client";

import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { Courier, generateMockCouriers } from "./courier-data";

interface CourierContextType {
  couriers: Courier[];
  updateCourier: (updatedCourier: Courier) => void;
  deleteCourier: (courierId: string) => void;
  addCourier: (courier: Courier) => void;
  getCourierStats: (year: number) => {
    totalDeliveries: number;
    avgSuccessRate: number;
    avgOnTimeRate: number;
    avgRating: number;
  };
}

const CourierContext = createContext<CourierContextType | undefined>(undefined);

export function CourierProvider({ children }: { children: React.ReactNode }) {
  const [couriers, setCouriers] = useState<Courier[]>([]);

  useEffect(() => {
    // Generate mock data only once on mount
    const initialCouriers = generateMockCouriers(10);
    setCouriers(initialCouriers);
  }, []);

  // Memoize expensive calculations
  const getCourierStats = useCallback((year: number) => {
    const activeCouriers = couriers.filter(c => c.status === "active");
    const yearlyDeliveries = couriers.reduce((sum, courier) => {
      return sum + courier.monthlyStats
        .filter(stat => stat.year === year)
        .reduce((total, stat) => total + stat.deliveries, 0);
    }, 0);

    return {
      totalDeliveries: yearlyDeliveries,
      avgSuccessRate: activeCouriers.reduce((sum, c) => sum + c.metrics.successRate, 0) / activeCouriers.length,
      avgOnTimeRate: activeCouriers.reduce((sum, c) => sum + c.metrics.onTimeRate, 0) / activeCouriers.length,
      avgRating: activeCouriers.reduce((sum, c) => sum + c.rating, 0) / activeCouriers.length,
    };
  }, [couriers]);

  const updateCourier = useCallback((updatedCourier: Courier) => {
    setCouriers(prev => 
      prev.map(courier => courier.id === updatedCourier.id ? updatedCourier : courier)
    );
  }, []);

  const deleteCourier = useCallback((courierId: string) => {
    setCouriers(prev => prev.filter(courier => courier.id !== courierId));
  }, []);

  const addCourier = useCallback((courier: Courier) => {
    setCouriers(prev => [...prev, courier]);
  }, []);

  const value = useMemo(() => ({
    couriers,
    updateCourier,
    deleteCourier,
    addCourier,
    getCourierStats,
  }), [couriers, updateCourier, deleteCourier, addCourier, getCourierStats]);

  return (
    <CourierContext.Provider value={value}>
      {children}
    </CourierContext.Provider>
  );
}

export function useCouriers() {
  const context = useContext(CourierContext);
  if (context === undefined) {
    throw new Error("useCouriers must be used within a CourierProvider");
  }
  return context;
}