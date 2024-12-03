"use client";

import { CourierMap } from "@/components/map/courier-map";
import { useCouriers } from "@/lib/data/courier-context";
import { useCourierTracking } from "@/hooks/use-courier-tracking";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useState } from "react";

export default function RoutesPage() {
  const { couriers } = useCouriers();
  const locations = useCourierTracking(couriers);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  const activeCouriers = couriers.filter(c => c.status === "active");
  const statusCounts = Object.values(locations).reduce((acc, location) => {
    acc[location.status] = (acc[location.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex h-[calc(100vh-7.5rem)] gap-4">
      {/* Main map area */}
      <div className="flex-1 rounded-xl overflow-hidden">
        <CourierMap 
          couriers={couriers} 
          locations={locations} 
          selectedCourier={selectedCourier}
          onSelectCourier={setSelectedCourier}
        />
      </div>

      {/* Sidebar */}
      <Card className="w-[300px] flex flex-col">
        <div className="p-4 border-b space-y-3">
          <h3 className="font-semibold">Active Couriers</h3>
          <div className="grid grid-cols-3 gap-2">
            <Card className="p-2">
              <div className="text-xs text-muted-foreground whitespace-nowrap">Active</div>
              <div className="text-lg font-semibold mt-0.5">{activeCouriers.length}</div>
            </Card>
            <Card className="p-2">
              <div className="text-xs text-muted-foreground whitespace-nowrap">En&nbsp;Route</div>
              <div className="text-lg font-semibold mt-0.5">{statusCounts.en_route || 0}</div>
            </Card>
            <Card className="p-2">
              <div className="text-xs text-muted-foreground whitespace-nowrap">Delivering</div>
              <div className="text-lg font-semibold mt-0.5">{statusCounts.delivering || 0}</div>
            </Card>
          </div>
        </div>
        <ScrollArea className="flex-1">
          {activeCouriers.map(courier => {
            const location = locations[courier.id];
            if (!location) return null;

            const statusColors = {
              idle: "bg-[#808080]",
              en_route: "bg-[#4CAF50]",
              delivering: "bg-[#2196F3]"
            };

            const statusLabels = {
              idle: "Idle",
              en_route: "En Route",
              delivering: "Delivering"
            };

            return (
              <div
                key={courier.id}
                className={`p-3 border-b cursor-pointer transition-colors hover:bg-accent ${
                  selectedCourier === courier.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedCourier(courier.id)}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={courier.avatar} alt={courier.name} />
                    <AvatarFallback>{getInitials(courier.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none mb-1 truncate">
                      {courier.name}
                    </p>
                    <Badge 
                      variant="outline"
                      className={`text-[11px] text-white whitespace-nowrap ${statusColors[location.status]}`}
                    >
                      {statusLabels[location.status]}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </Card>
    </div>
  );
}