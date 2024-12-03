export interface DeliveryDataPoint {
  month: string;
  deliveries: number;
}

export const deliveryData: DeliveryDataPoint[] = [
  { month: "Jan", deliveries: 400 },
  { month: "Feb", deliveries: 300 },
  { month: "Mar", deliveries: 450 },
  { month: "Apr", deliveries: 500 },
  { month: "May", deliveries: 800 },
  { month: "Jun", deliveries: 700 },
  { month: "Jul", deliveries: 650 },
  { month: "Aug", deliveries: 750 },
  { month: "Sep", deliveries: 1200 },
  { month: "Oct", deliveries: 1100 },
  { month: "Nov", deliveries: 1000 },
  { month: "Dec", deliveries: 1300 },
];