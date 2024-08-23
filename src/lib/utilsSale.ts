import { AggregatedData, SalesData } from "@/interfaces/interfaces";

export const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  return date.toISOString().split('T')[0];
}

type AggregatableData<T> = Record<string, T>;

export function aggregateData<T extends object, K extends keyof T>(
  data: T[],
  key: K,
  fieldsToAggregate: K[]
): T[] {
  const aggregatedData: AggregatableData<T> = {};

  data.forEach((item) => {
    const keyValue = item[key] as string;

    if (!aggregatedData[keyValue]) {
      aggregatedData[keyValue] = { ...item };
      fieldsToAggregate.forEach((field) => {
        aggregatedData[keyValue][field] = item[field] as any;
      });
    } else {
      fieldsToAggregate.forEach((field) => {
        aggregatedData[keyValue][field] = (aggregatedData[keyValue][field] as any) + (item[field] as any);
      });
    }
  });

  return Object.values(aggregatedData);
}

export const sumaryOverviewData = (data: SalesData[]): AggregatedData[] => {
  const isSingleDay = data.every((item) => item.fecha === data[0].fecha);

  // If it's a single day, return the data as is
  if (isSingleDay) {
    return data;
  }

  // If it's multiple days, aggregate the data
  return data.reduce((acc: AggregatedData[], seller) => {
    const existingDate = acc.find(item => item.fecha === seller.fecha);

    if (existingDate) {
      existingDate.contado += seller.contado;
      existingDate.credito += seller.credito;
    } else {
      acc.push({
        fecha: seller.fecha,
        contado: seller.contado,
        credito: seller.credito,
      });
    }

    return acc;
  }, []);
};