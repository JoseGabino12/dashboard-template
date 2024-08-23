"use client";

import * as React from "react";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SalesData } from "@/interfaces/interfaces";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  contado: {
    label: "Contado",
    color: "hsl(var(--chart-1))",
  },
  credito: {
    label: "Crédito",
    color: "hsl(var(--chart-2))",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ChartSels({ sales }: { sales: SalesData[] }) {
  const vendedoresUnicos = Array.from(
    new Set(sales.map((item) => item.vendedor))
  );

  const [selectedVendedor, setSelectedVendedor] = React.useState<string>(
    vendedoresUnicos[0]
  );

  const formattedData = sales.map((item) => ({
    ...item,
    fecha: new Date(item.fecha).toLocaleDateString("es-MX", {
      month: "short",
      day: "numeric",
    }),
  }));

  const filteredData = selectedVendedor
    ? formattedData.filter(item => item.vendedor === selectedVendedor)
    : [];

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Ventas por Vendedor</CardTitle>
        </div>
        <Select value={selectedVendedor} onValueChange={setSelectedVendedor}>
          <SelectTrigger
            className="w-[260px] rounded-lg sm:ml-auto"
            aria-label="Selecciona un vendedor"
          >
            <SelectValue placeholder="Selecciona un vendedor" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {vendedoresUnicos.map((vendedor) => (
              <SelectItem key={vendedor} value={vendedor} className="rounded-lg">
                {vendedor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-10 sm:pt-6">
          {
            filteredData.length > 0 ? (
              <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                {
                  filteredData.length === 1 ? (
                    // Si solo hay un dato, muestra una gráfica de barras
                    <BarChart data={filteredData}>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="fecha" tickLine={false} axisLine={false} />
                      <YAxis />
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent
                            labelFormatter={(date) => date}
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
                      <Bar
                        dataKey="total"
                        fill="var(--color-total)"
                        radius={[4, 4, 0, 0]}
                        barSize={54}
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                  ) : (
                    // Si hay más de un dato, muestra la gráfica de áreas
                    <AreaChart data={filteredData}>
                      <defs>
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
                        <linearGradient id="filltotal" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="var(--color-total)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--color-total)"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} />
                      <XAxis dataKey="fecha" tickLine={false} axisLine={false} />
                      <YAxis />
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent
                            labelFormatter={(date) => date}
                            indicator="dot"
                          />
                        }
                      />
                      <Area
                        dataKey="contado"
                        type="monotone"
                        fill="url(#fillcontado)"
                        stroke="var(--color-contado)"
                      />
                      <Area
                        dataKey="credito"
                        type="monotone"
                        fill="url(#fillcredito)"
                        stroke="var(--color-credito)"
                      />
                      <Area
                        dataKey="total"
                        type="monotone"
                        fill="url(#filltotal)"
                        stroke="var(--color-total)"
                      />
                      <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                  )
                }
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                No se encontró vendedores para el rango de fechas especificado.
              </div>
            )
          }
      </CardContent>
    </Card>
  );
}