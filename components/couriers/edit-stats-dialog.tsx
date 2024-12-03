"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Courier, generateMockCouriers } from "@/lib/data/courier-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, Wand2 } from "lucide-react";
import { MONTHS } from "@/lib/data/constants";
import { useToast } from "@/components/ui/use-toast";

const monthlyStatSchema = z.object({
  id: z.string(),
  month: z.string(),
  deliveries: z.coerce.number().min(0, "Must be a positive number"),
  year: z.number(),
});

const formSchema = z.object({
  monthlyStats: z.array(monthlyStatSchema),
});

interface EditStatsDialogProps {
  courier: Courier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (courier: Courier) => void;
}

export function EditStatsDialog({
  courier,
  open,
  onOpenChange,
  onSave,
}: EditStatsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [backupStats, setBackupStats] = useState<typeof courier.monthlyStats | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyStats: courier.monthlyStats,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const yearlyStats = courier.yearlyStats.map(yearStat => {
        const yearlyDeliveries = values.monthlyStats
          .filter(stat => stat.year === yearStat.year)
          .reduce((sum, stat) => sum + stat.deliveries, 0);
        return {
          ...yearStat,
          deliveries: yearlyDeliveries,
        };
      });

      const updatedCourier: Courier = {
        ...courier,
        monthlyStats: values.monthlyStats,
        yearlyStats,
        deliveriesCompleted: values.monthlyStats.reduce((sum, stat) => sum + stat.deliveries, 0),
      };
      onSave(updatedCourier);
      onOpenChange(false);
      setBackupStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomStats = () => {
    const year = parseInt(selectedYear);
    if (!backupStats) {
      const currentYearStats = form.getValues("monthlyStats")
        .filter(stat => stat.year === year);
      setBackupStats(currentYearStats);
    }

    const [mockCourier] = generateMockCouriers(1);
    const newMonthlyStats = mockCourier.monthlyStats
      .filter(stat => stat.year === year)
      .map(stat => ({
        ...stat,
        id: courier.monthlyStats.find(s => s.month === stat.month && s.year === year)?.id || stat.id,
      }));

    const currentMonthlyStats = form.getValues("monthlyStats");
    const updatedMonthlyStats = currentMonthlyStats
      .filter(stat => stat.year !== year)
      .concat(newMonthlyStats)
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
      });

    form.setValue("monthlyStats", updatedMonthlyStats, { shouldDirty: true });

    toast({
      title: "Stats Generated",
      description: `Random stats have been generated for ${year}. You can restore the previous values if needed.`,
    });
  };

  const restoreBackup = () => {
    if (backupStats) {
      const year = parseInt(selectedYear);
      const currentMonthlyStats = form.getValues("monthlyStats");
      const updatedMonthlyStats = currentMonthlyStats
        .filter(stat => stat.year !== year)
        .concat(backupStats)
        .sort((a, b) => {
          if (a.year !== b.year) return a.year - b.year;
          return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
        });

      form.setValue("monthlyStats", updatedMonthlyStats, { shouldDirty: true });
      setBackupStats(null);

      toast({
        title: "Stats Restored",
        description: `Previous values for ${year} have been restored.`,
      });
    }
  };

  const currentYearStats = form.watch("monthlyStats")
    .filter(stat => stat.year === parseInt(selectedYear))
    .sort((a, b) => MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="space-y-3">
          <DialogTitle>Edit Delivery Statistics</DialogTitle>
          <DialogDescription>
            Update delivery statistics for {courier.name}
          </DialogDescription>
          <div className="flex justify-between items-center gap-2 pt-2">
            <Select
              value={selectedYear}
              onValueChange={setSelectedYear}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {courier.yearlyStats.map((stat) => (
                  <SelectItem key={stat.year} value={stat.year.toString()}>
                    {stat.year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              {backupStats && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={restoreBackup}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Restore
                </Button>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateRandomStats}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Data
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 border rounded-md h-[400px]">
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Month</TableHead>
                      <TableHead>Deliveries</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentYearStats.map((stat) => {
                      const monthlyStatIndex = form.getValues("monthlyStats")
                        .findIndex(s => s.id === stat.id);
                      
                      return (
                        <TableRow key={stat.id}>
                          <TableCell className="font-medium">{stat.month}</TableCell>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name={`monthlyStats.${monthlyStatIndex}.deliveries`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      className="w-[100px]"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}