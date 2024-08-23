"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BloqueraItemsData } from "@/interfaces/interfaces";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas bloquera</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <BarChart data={data} barGap={8} barCategoryGap={16}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="articulo"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />

              <Bar dataKey="total" fill="var(--color-total)" radius={4} barSize={100} />

            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            No se encontró artículos de bloquera para el rango de fechas especificado.
          </div>
        )}
      </CardContent>
    </Card>
  );
}