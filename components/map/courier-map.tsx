"use client";

import { useEffect, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { CourierLocation } from "@/lib/data/location-data";
import { Courier } from "@/lib/data/courier-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Package2, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

interface CourierMapProps {
  couriers: Courier[];
  locations: Record<string, CourierLocation>;
  selectedCourier: string | null;
  onSelectCourier: (id: string | null) => void;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoiYnJhbWJsZWFwcCIsImEiOiJjbHNoZDhnanMwejZiMmtvdXcxc2Q2d3MyIn0.tqEhHZ-ZHcErYfdhXuZcQA";

const statusColors = {
  idle: "#808080",
  en_route: "#4CAF50",
  delivering: "#2196F3",
};

const statusLabels = {
  idle: "Idle",
  en_route: "En Route",
  delivering: "Delivering",
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function CourierMap({ couriers, locations, selectedCourier, onSelectCourier }: CourierMapProps) {
  const mapRef = useRef(null);

  const initialViewState = {
    latitude: 48.153892,
    longitude: 17.133616,
    zoom: 13
  };

  useEffect(() => {
    if (selectedCourier && locations[selectedCourier]) {
      const location = locations[selectedCourier];
      mapRef.current?.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 14,
        duration: 1500
      });
    }
  }, [selectedCourier, locations]);

  return (
    <div className="h-full rounded-xl overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {Object.entries(locations).map(([courierId, location]) => {
          const courier = couriers.find(c => c.id === courierId);
          if (!courier) return null;

          return (
            <div key={courierId}>
              <Marker
                latitude={location.latitude}
                longitude={location.longitude}
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  onSelectCourier(courierId);
                }}
              >
                <div 
                  className={`relative group cursor-pointer transition-transform duration-300 ${
                    selectedCourier === courierId ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-white shadow-lg ${
                      selectedCourier === courierId ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: statusColors[location.status] }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap backdrop-blur-sm">
                    {courier.name}
                  </div>
                </div>
              </Marker>

              {selectedCourier === courierId && (
                <Popup
                  latitude={location.latitude}
                  longitude={location.longitude}
                  onClose={() => onSelectCourier(null)}
                  closeButton={false}
                  closeOnClick={false}
                  anchor="bottom"
                  className="!p-0 w-[300px] rounded-lg overflow-hidden z-50"
                  maxWidth="300px"
                  offset={12}
                >
                  <Card className="border-0 shadow-none relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 rounded-full hover:bg-accent"
                      onClick={() => onSelectCourier(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 border-2 border-white/10">
                          <AvatarImage src={courier.avatar} alt={courier.name} />
                          <AvatarFallback>{getInitials(courier.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg leading-none mb-1">
                            {courier.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
                            style={{ 
                              backgroundColor: statusColors[location.status],
                              color: 'white'
                            }}
                          >
                            {statusLabels[location.status]}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1 animate-in fade-in-50 slide-in-from-bottom-3 duration-500">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-mono font-medium">
                            {formatDuration(location.statusDuration)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Deliveries</span>
                          <div className="flex items-center">
                            <Package2 className="h-4 w-4 mr-1 text-primary" />
                            <span>{courier.deliveriesCompleted.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Rating</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                            <span>{courier.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Popup>
              )}
            </div>
          );
        })}
      </Map>
    </div>
  );
}