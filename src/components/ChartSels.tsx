"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { sucursal: "sucursal1", ventas: 275, fill: "#e76e50" },
  { sucursal: "sucursal2", ventas: 200, fill: "#299d90" },
  { sucursal: "sucursal3", ventas: 287, fill: "#f4a362" },
  { sucursal: "sucursal4", ventas: 173, fill: "#e9c469" },
  { sucursal: "sucursal5", ventas: 190, fill: "#264753" },
]

const chartConfig = {
  ventas: {
    label: "Ventas",
  },
  sucursal1: {
    label: "Sucursal 1",
    color: "hsl(var(--chart-1))",
  },
  sucursal2: {
    label: "Sucursal 2",
    color: "hsl(var(--chart-2))",
  },
  sucursal3: {
    label: "Sucursal 3",
    color: "hsl(var(--chart-3))",
  },
  sucursal4: {
    label: "Sucursal 4",
    color: "hsl(var(--chart-4))",
  },
  sucursal5: {
    label: "Sucursal 5",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ChartSels() {
  const totalVentas = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.ventas, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ventas por sucursal</CardTitle>
        <CardDescription>Ventas 2020</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="ventas"
              nameKey="sucursal"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
              label
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVentas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Ventas
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey="sucursal" className="text-lg" />}
              className="flex-wrap mt-2 gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
