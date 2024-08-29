"use client";

import * as React from "react";
import { Pie, PieChart, Sector, Label, Cell } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
  ChartStyle,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConcreteraItemsData } from "@/interfaces/interfaces";

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

export function ChartConcretera ({ concreteraItems }: { concreteraItems: ConcreteraItemsData[] }) {
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

  const chartConfig = generateChartConfig(data);
  const id = "pie-interactive-concretera";
  const [activeArticulo, setActiveArticulo] = React.useState(data[0]?.articulo || "");

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.articulo === activeArticulo),
    [activeArticulo, data]
  );
  const articulos = React.useMemo(() => data.map((item) => item.articulo), [data]);

  return (
    <Card data-chart={ id } className="flex flex-col">
      <ChartStyle id={ id } config={ chartConfig } />
      <CardHeader className="flex-row flex-wrap gap-2 items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Ventas Concretera</CardTitle>
        </div>
        <Select value={ activeArticulo } onValueChange={ setActiveArticulo }>
          <SelectTrigger
            className="ml-auto w-[260px] rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Seleccionar artículo" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            { articulos.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={ key }
                  value={ key }
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={ {
                        backgroundColor: chartConfig[key]?.color,
                      } }
                    />
                    { config?.label }
                  </div>
                </SelectItem>
              );
            }) }
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center my-10">
        <ChartContainer
          id={ id }
          config={ chartConfig }
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={ false } content={ <ChartTooltipContent hideLabel /> } />
            <Pie
              data={ data }
              dataKey="total"
              nameKey="articulo"
              innerRadius={ 70 }  // Aumentar el radio interno
              strokeWidth={ 5 }
              activeIndex={ activeIndex }
              activeShape={ ({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector { ...props } outerRadius={ outerRadius + 10 } />
                  <Sector
                    { ...props }
                    outerRadius={ outerRadius + 25 }
                    innerRadius={ outerRadius + 12 }
                  />
                </g>
              ) }
            >
              { data.map((entry, index) => (
                <Cell key={ `cell-${index}` } fill={ chartConfig[entry.articulo]?.color } />
              )) }
              <Label
                content={ ({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const formattedValue = Number(data[activeIndex]?.total
                      .toFixed(2))
                      .toLocaleString("es-MX");
                    return (
                      <text
                        x={ viewBox.cx }
                        y={ viewBox.cy }
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={ viewBox.cx }
                          y={ viewBox.cy }
                          className="fill-foreground text-2xl font-bold"  // Cambia a text-2xl o un tamaño más pequeño
                        >
                          { formattedValue }
                        </tspan>
                        <tspan
                          x={ viewBox.cx }
                          y={ (viewBox.cy || 0) + 24 }
                          className="fill-muted-foreground"
                        >
                          Ventas
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                } }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}