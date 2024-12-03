"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CouriersList } from "@/components/couriers/couriers-list";
import { Button } from "@/components/ui/button";
import { AddCourierDialog } from "@/components/couriers/add-courier-dialog";
import { useCouriers } from "@/lib/data/courier-context";

export default function CouriersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { couriers, addCourier, deleteCourier, updateCourier } = useCouriers();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-3xl font-bold tracking-tight">Couriers</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Courier
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <CouriersList 
          couriers={couriers} 
          onDelete={deleteCourier}
          onUpdate={updateCourier}
        />
      </div>
      <AddCourierDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAdd={(newCourier) => {
          addCourier(newCourier);
          setIsAddDialogOpen(false);
        }}
      />
    </div>
  );
}