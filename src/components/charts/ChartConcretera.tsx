"use client";

import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ConcreteraItemsData } from "@/interfaces/interfaces";

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ChartConcretera({ concreteraItems }: { concreteraItems: ConcreteraItemsData[] }) {
  // Agrupar por articulo y calcular totales
  const data = concreteraItems.reduce((acc, item) => {
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
        <CardTitle>Ventas de artículos concretera</CardTitle>
      </CardHeader>
      <CardContent>
        {
          data.length > 0 ? (
            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
              <LineChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="articulo"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                  cursor={{ stroke: "rgba(0, 0, 0, 0.1)" }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="var(--color-ventas)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="mtsCubicos"
                  stroke="var(--color-mtsCubicos)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="var(--color-total)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground">
              No se encontró artículos de concretera para el rango de fechas especificado.
            </div>
          )
        }
      </CardContent>
    </Card>
  );
}