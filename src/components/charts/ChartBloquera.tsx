"use client";

import * as React from "react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BloqueraItemsData } from "@/interfaces/interfaces";

// Configuración dinámica del chart
const generateChartConfig = (items: { articulo: string; total: number }[]) => {
  return items.reduce((config, item, index) => {
    config[item.articulo] = {
      label: item.articulo,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return config;
  }, {} as ChartConfig);
};

const CustomLegend = ({ payload = [] }: { payload?: any[] }) => {
  return (
    <div className="flex justify-center mt-4">
      <ul className="flex justify-center flex-wrap gap-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center">
            <span
              className="inline-block w-3 h-3 mr-2"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm text-foreground">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function ChartBloquera({ bloqueraItems }: { bloqueraItems: BloqueraItemsData[] }) {
  // Agrupar por uniqueItems (articulo) y calcular totales
 const data = bloqueraItems.reduce((acc, item) => {
  const existingItem = acc.find((i) => i.articulo === item.articulo);

  if (existingItem) {
    existingItem.total += item.total;
  } else {
    acc.push({
      articulo: item.articulo,
      total: item.total,
    });
  }
  return acc;
}, [] as { articulo: string; total: number }[]);

  const chartConfig = generateChartConfig(data);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Ventas bloquera</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {data.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[450px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie data={data} dataKey="total" nameKey="articulo" labelLine={false} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig[entry.articulo]?.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            No se encontraron artículos de bloquera para el rango de fechas especificado.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center flex-wrap">
        <CustomLegend
          payload={data.map((entry, index) => ({
            value: entry.articulo,
            color: chartConfig[entry.articulo]?.color,
          }))}
        />
      </CardFooter>
    </Card>
  );
}