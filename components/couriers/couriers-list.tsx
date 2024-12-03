"use client";

import { Courier } from "@/lib/data/courier-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Edit, Package2, Star, Timer, Trash2, TrendingUp } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import { EditCourierDialog } from "./edit-courier-dialog";
import { EditStatsDialog } from "./edit-stats-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CouriersListProps {
  couriers: Courier[];
  onDelete: (id: string) => void;
  onUpdate: (courier: Courier) => void;
}

export function CouriersList({ couriers, onDelete, onUpdate }: CouriersListProps) {
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);

  return (
    <>
      <div className="rounded-md border h-full">
        <div className="relative">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Courier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>On-Time</TableHead>
                <TableHead>Package Accuracy</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <Table>
            <TableBody>
              {couriers.map((courier) => (
                <TableRow key={courier.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={courier.avatar} alt={courier.name} />
                        <AvatarFallback>{getInitials(courier.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{courier.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {courier.deliveriesCompleted.toLocaleString()} deliveries
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={courier.status === "active" ? "default" : "secondary"}
                    >
                      {courier.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          {courier.metrics.successRate}%
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Successful delivery rate
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center">
                          <Timer className="h-4 w-4 text-blue-500 mr-1" />
                          {courier.metrics.onTimeRate}%
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        On-time delivery rate
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex items-center">
                          <Package2 className="h-4 w-4 text-purple-500 mr-1" />
                          {courier.metrics.packageAccuracy}%
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Package handling accuracy
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      {courier.rating}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedCourier(courier);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit courier</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setSelectedCourier(courier);
                          setIsStatsDialogOpen(true);
                        }}
                      >
                        <BarChart className="h-4 w-4" />
                        <span className="sr-only">Edit stats</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(courier.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete courier</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {selectedCourier && (
        <>
          <EditCourierDialog
            courier={selectedCourier}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSave={(updatedCourier) => {
              onUpdate(updatedCourier);
              setIsEditDialogOpen(false);
              setSelectedCourier(null);
            }}
          />
          <EditStatsDialog
            courier={selectedCourier}
            open={isStatsDialogOpen}
            onOpenChange={setIsStatsDialogOpen}
            onSave={(updatedCourier) => {
              onUpdate(updatedCourier);
              setIsStatsDialogOpen(false);
              setSelectedCourier(null);
            }}
          />
        </>
      )}
    </>
  );
}