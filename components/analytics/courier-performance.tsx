"use client";

import { Courier } from "@/lib/data/types/courier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Star, Timer, TrendingUp } from "lucide-react";

interface CourierPerformanceProps {
  couriers: Courier[];
}

export function CourierPerformance({ couriers }: CourierPerformanceProps) {
  const activeCouriers = couriers
    .filter(c => c.status === "active")
    .sort((a, b) => b.rating - a.rating);

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle>Top Performing Couriers</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {activeCouriers.map((courier) => (
            <div key={courier.id} className="flex items-center justify-between p-4 border-b last:border-0">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={courier.avatar} alt={courier.name} />
                  <AvatarFallback>{getInitials(courier.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{courier.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {courier.deliveriesCompleted.toLocaleString()} deliveries
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>{courier.metrics.successRate}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Timer className="h-4 w-4 text-blue-500" />
                  <span>{courier.metrics.onTimeRate}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Package2 className="h-4 w-4 text-purple-500" />
                  <span>{courier.metrics.packageAccuracy}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{courier.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}