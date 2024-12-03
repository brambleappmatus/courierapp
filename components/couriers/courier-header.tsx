"use client";

import { Courier } from "@/lib/data/courier-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, LineChart, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditCourierDialog } from "./edit-courier-dialog";
import { EditStatsDialog } from "./edit-stats-dialog";
import { getInitials } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CourierHeaderProps {
  courier: Courier;
  onUpdate: (updatedCourier: Courier) => void;
  onDelete: () => void;
}

export function CourierHeader({ courier, onUpdate, onDelete }: CourierHeaderProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={courier.avatar} alt={courier.name} />
          <AvatarFallback>{getInitials(courier.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{courier.name}</h2>
          <div className="flex items-center space-x-2">
            <Badge variant={courier.status === "active" ? "default" : "secondary"}>
              {courier.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsStatsDialogOpen(true)}
        >
          <LineChart className="h-4 w-4 mr-2" />
          Edit Stats
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      <EditCourierDialog
        courier={courier}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={onUpdate}
      />

      <EditStatsDialog
        courier={courier}
        open={isStatsDialogOpen}
        onOpenChange={setIsStatsDialogOpen}
        onSave={onUpdate}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Courier</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {courier.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}