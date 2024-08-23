"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { OverviewProps } from "@/interfaces/interfaces";
import { sumaryOverviewData } from "@/lib/utilsSale";

const chartConfig = {
  contado: {
    label: "Contado",
    color: "hsl(var(--chart-1))",
  },
  credito: {
    label: "Crédito",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Overview({ data }: OverviewProps) {
  const summaryByDate = sumaryOverviewData(data);

  return (
    <>
      {
        summaryByDate.length > 0 ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            {summaryByDate.length === 1 ? (
              // Renderiza una gráfica de barras si hay solo un dato
              <BarChart data={summaryByDate}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="fecha"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-MX", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("es-MX", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Bar
                  dataKey="contado"
                  fill="var(--color-contado)"
                  radius={[4, 4, 0, 0]}
                  barSize={54}
                />
                <Bar
                  dataKey="credito"
                  fill="var(--color-credito)"
                  radius={[4, 4, 0, 0]}
                  barSize={54}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            ) : (
              // Renderiza la gráfica de áreas si hay más de un dato
              <AreaChart data={summaryByDate}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="fecha"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-MX", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("es-MX", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <defs>
                  <linearGradient id="fillcredito" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-credito)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-credito)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillcontado" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-contado)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-contado)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="contado"
                  type="natural"
                  fill="url(#fillcontado)"
                  fillOpacity={0.4}
                  stroke="var(--color-contado)"
                  stackId="a"
                />
                <Area
                  dataKey="credito"
                  type="natural"
                  fill="url(#fillcredito)"
                  fillOpacity={0.4}
                  stroke="var(--color-credito)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            )}
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            No se encontró vendedores para el rango de fechas especificado.
          </div>
        )
      }
    </>
  );
}