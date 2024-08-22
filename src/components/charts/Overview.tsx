"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AggregatedData, OverviewProps } from "@/interfaces/interfaces"

const chartConfig = {
  contado: {
    label: "Contado",
    color: "hsl(var(--chart-1))",
  },
  credito: {
    label: "Crédito",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Overview({ data }: OverviewProps) {
  const summaryByDate = data.reduce((acc: AggregatedData[], seller) => {
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

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <AreaChart
        data={data}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="fecha"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value)
            return date.toLocaleDateString("es-MX", {
              month: "short",
              day: "numeric",
            })
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
                })
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
    </ChartContainer>
  )
}
