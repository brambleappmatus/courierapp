"use client";

import { useParams, useRouter } from "next/navigation";
import { useCouriers } from "@/lib/data/courier-context";
import { CourierStats } from "@/components/couriers/courier-stats";
import { CourierHeader } from "@/components/couriers/courier-header";
import { NotFound } from "@/components/shared/not-found";
import { useEffect, useState } from "react";
import { Courier } from "@/lib/data/courier-data";

export default function CourierPage() {
  const { id } = useParams();
  const router = useRouter();
  const { couriers, updateCourier, deleteCourier } = useCouriers();
  const [courier, setCourier] = useState<Courier | null>(null);

  useEffect(() => {
    const found = couriers.find((c) => c.id === id);
    setCourier(found || null);
  }, [couriers, id]);

  if (!courier) {
    return <NotFound message="Courier not found" />;
  }

  const handleDelete = () => {
    deleteCourier(courier.id);
    router.push("/couriers");
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <CourierHeader 
        courier={courier} 
        onUpdate={updateCourier}
        onDelete={handleDelete}
      />
      <CourierStats courier={courier} />
    </div>
  );
}