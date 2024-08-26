"use client";

import * as React from "react";

import {
  Card,
  CardContent,
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

import { PaymentData } from "@/interfaces/interfaces";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

const chartConfig = {
  maximoAtraso: {
    label: "Máximo Atraso",
    color: "hsl(var(--chart-1))",
  },
  porVencer: {
    label: "Por Vencer",
    color: "hsl(var(--chart-2))",
  },
  saldoTotal: {
    label: "Saldo Total",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ChartPayment({ payments }: { payments: PaymentData[] }) {
  const nombresUnicos = Array.from(
    new Set(payments.map((item) => item.nombre))
  );

  const [selectedNombre, setSelectedNombre] = React.useState<string | "Todos">(
    "Todos"
  );

  const filteredData =
    selectedNombre === "Todos"
      ? payments
      : payments.filter((item) => item.nombre === selectedNombre);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gráfica de antigüedad de saldos</CardTitle>
        </div>
        <Select value={selectedNombre} onValueChange={setSelectedNombre}>
          <SelectTrigger
            className="w-[260px] rounded-lg sm:ml-auto"
            aria-label="Selecciona un nombre"
          >
            <SelectValue placeholder="Selecciona un nombre" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="Todos" className="rounded-lg">
              Todos
            </SelectItem>
            {nombresUnicos.map((nombre) => (
              <SelectItem key={nombre} value={nombre} className="rounded-lg">
                {nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-10 sm:pt-6">
        {filteredData.length > 0 ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            {filteredData.length === 1 ? (
              // Si solo hay un dato, muestra una gráfica de barras
              <BarChart data={filteredData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="nombre" tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => label}
                      indicator="dot"
                    />
                  }
                />
                <Bar
                  dataKey="maximoAtraso"
                  fill="var(--color-maximoAtraso)"
                  radius={[4, 4, 0, 0]}
                  barSize={54}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>

                <Bar
                  dataKey="porVencer"
                  fill="var(--color-porVencer)"
                  radius={[4, 4, 0, 0]}
                  barSize={54}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>

                <Bar
                  dataKey="saldoTotal"
                  fill="var(--color-saldoTotal)"
                  radius={[4, 4, 0, 0]}
                  barSize={54}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            ) : (
              // Si hay más de un dato, muestra la gráfica de áreas
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillmaximoAtraso" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-maximoAtraso)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-maximoAtraso)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillporVencer" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-porVencer)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-porVencer)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillsaldoTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-saldoTotal)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-saldoTotal)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="nombre" tickLine={false} axisLine={false} />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => label}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="maximoAtraso"
                  type="monotone"
                  fill="url(#fillmaximoAtraso)"
                  stroke="var(--color-maximoAtraso)"
                />
                <Area
                  dataKey="porVencer"
                  type="monotone"
                  fill="url(#fillporVencer)"
                  stroke="var(--color-porVencer)"
                />
                <Area
                  dataKey="saldoTotal"
                  type="monotone"
                  fill="url(#fillsaldoTotal)"
                  stroke="var(--color-saldoTotal)"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            )}
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            No se encontró información para el rango de fechas especificado.
          </div>
        )}
      </CardContent>
    </Card>
  );
}