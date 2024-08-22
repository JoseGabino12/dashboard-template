import { SalesData } from "@/interfaces/interfaces";

export const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  return date.toISOString().split('T')[0];
}

export function aggregateSalesData(data: SalesData[]): SalesData[] {
  const aggregatedData: Record<string, SalesData> = {};

  data.forEach((item) => {
    if (!aggregatedData[item.vendedor]) {
      aggregatedData[item.vendedor] = { ...item };
    } else {
      aggregatedData[item.vendedor].ventas += item.ventas;
      aggregatedData[item.vendedor].contado += item.contado;
      aggregatedData[item.vendedor].credito += item.credito;
      aggregatedData[item.vendedor].total += item.total;
    }
  });

  return Object.values(aggregatedData);
}
