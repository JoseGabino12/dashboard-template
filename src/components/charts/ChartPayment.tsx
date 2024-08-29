"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  porVencer: {
    label: "Por Vencer",
    color: "hsl(var(--chart-1))",
  },
  d1_a_30: {
    label: "1 a 30 días",
    color: "hsl(var(--chart-2))",
  },
  d31_a_60: {
    label: "31 a 60 días",
    color: "hsl(var(--chart-3))",
  },
  d61_a_90: {
    label: "61 a 90 días",
    color: "hsl(var(--chart-4))",
  },
  mas_de_90: {
    label: "Más de 90 días",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface CustomLegendProps {
  data: Record<string, number>;
  config: ChartConfig;
}

const CustomLegend: React.FC<CustomLegendProps> = ({ data, config }) => {
  return (
    <div className="flex flex-wrap justify-between items-center sm:space-x-2">
      { Object.keys(config).map((key) => (
        <div key={ key } className="flex items-center space-x-2 my-1">
          <div
            className="w-2 h-2"
            style={ { backgroundColor: config[key].color } }
          ></div>
          <span className="text-sm text-muted-foreground">
            { config[key].label }
          </span>
          <span className="text-sm block sm:hidden">
            { data[key]?.toLocaleString("es-MX", {
              minimumFractionDigits: 2,
            }) }
          </span>
        </div>
      )) }
    </div>
  );
};

export function ChartPayment ({ payments }: { payments: PaymentData[] }) {
  const nombresUnicos = Array.from(
    new Set(payments.map((item) => item.nombre))
  );

  const [selectedNombre, setSelectedNombre] = React.useState<string | "Todos">(
    "Todos"
  );

  const filteredData =
    selectedNombre === "Todos"
      ? [
        {
          nombre: "Todos",
          porVencer: payments.reduce((acc, curr) => acc + curr.porVencer, 0),
          d1_a_30: payments.reduce((acc, curr) => acc + curr.d1_a_30, 0),
          d31_a_60: payments.reduce((acc, curr) => acc + curr.d31_a_60, 0),
          d61_a_90: payments.reduce((acc, curr) => acc + curr.d61_a_90, 0),
          mas_de_90: payments.reduce((acc, curr) => acc + curr.mas_de_90, 0),
        },
      ]
      : payments.filter((item) => item.nombre === selectedNombre);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gráfica de antigüedad de saldos</CardTitle>
        </div>
        <Select value={ selectedNombre } onValueChange={ setSelectedNombre }>
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
            { nombresUnicos.map((nombre) => (
              <SelectItem key={ nombre } value={ nombre } className="rounded-lg">
                { nombre }
              </SelectItem>
            )) }
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-10 sm:pt-6">
        { filteredData.length > 0 ? (
          <ChartContainer
            config={ chartConfig }
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              data={ filteredData }
              margin={ { top: 20, right: 30, bottom: 20, left: 20 } }
              barGap={ 30 }
            >
              <CartesianGrid vertical={ false } />
              <XAxis dataKey="nombre" tickLine={ false } axisLine={ false } />

              <ChartTooltip
                cursor={ false }
                content={
                  <ChartTooltipContent
                    labelFormatter={ (label) => label }
                    indicator="dot"
                  />
                }
              />
              <Bar
                dataKey="porVencer"
                fill="var(--color-porVencer)"
                radius={ [4, 4, 0, 0] }
                barSize={ 54 }
              >
                <LabelList
                  position="top"
                  offset={ 12 }
                  className="fill-foreground hidden sm:block"
                  fontSize={ 12 }
                  formatter={ (value: number) => Number(value.toFixed(2)).toLocaleString("es-MX") }
                />
              </Bar>

              <Bar
                dataKey="d1_a_30"
                fill="var(--color-d1_a_30)"
                radius={ [4, 4, 0, 0] }
                barSize={ 54 }
              >
                <LabelList
                  position="top"
                  offset={ 12 }
                  className="fill-foreground hidden sm:block"
                  fontSize={ 12 }
                  formatter={ (value: number) => Number(value.toFixed(2)).toLocaleString("es-MX") }
                />
              </Bar>

              <Bar
                dataKey="d31_a_60"
                fill="var(--color-d31_a_60)"
                radius={ [4, 4, 0, 0] }
                barSize={ 54 }
              >
                <LabelList
                  position="top"
                  offset={ 12 }
                  className="fill-foreground hidden sm:block"
                  fontSize={ 12 }
                  formatter={ (value: number) => Number(value.toFixed(2)).toLocaleString("es-MX") }
                />
              </Bar>

              <Bar
                dataKey="d61_a_90"
                fill="var(--color-d61_a_90)"
                radius={ [4, 4, 0, 0] }
                barSize={ 54 }
              >
                <LabelList
                  position="top"
                  offset={ 12 }
                  className="fill-foreground hidden sm:block"
                  fontSize={ 12 }
                  formatter={ (value: number) => Number(value.toFixed(2)).toLocaleString("es-MX") }
                />
              </Bar>

              <Bar
                dataKey="mas_de_90"
                fill="var(--color-mas_de_90)"
                radius={ [4, 4, 0, 0] }
                barSize={ 54 }
              >
                <LabelList
                  position="top"
                  offset={ 12 }
                  className="fill-foreground hidden sm:block"
                  fontSize={ 12 }
                  formatter={ (value: number) => Number(value.toFixed(2)).toLocaleString("es-MX") }
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            No se encontró información para el rango de fechas especificado.
          </div>
        ) }
      </CardContent>
      <CardFooter className="flex justify-center">
        <CustomLegend
          data={ Object.fromEntries(
            Object.entries(filteredData[0]).filter(
              ([key]) => key !== "nombre"
            )
          ) }
          config={ chartConfig }
        />
      </CardFooter>
    </Card>
  );
}