export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
] as const;

export type Month = typeof MONTHS[number];

export const YEARS = Array.from({ length: 4 }, (_, i) => 
  new Date().getFullYear() - (3 - i)
);