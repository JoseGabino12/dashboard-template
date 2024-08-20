"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const allData = [
  { date: "2024-04-01", value: 473 },
  { date: "2024-04-02", value: 252 },
  { date: "2024-04-03", value: 71 },
  { date: "2024-04-04", value: 238 },
  { date: "2024-04-05", value: 223 },
  { date: "2024-04-06", value: 272 },
  { date: "2024-04-07", value: 227 },
  { date: "2024-04-08", value: 333 },
  { date: "2024-04-09", value: 300 },
  { date: "2024-04-10", value: 423 },
  { date: "2024-04-11", value: 354 },
  { date: "2024-04-12", value: 181 },
  { date: "2024-04-13", value: 483 },
  { date: "2024-04-14", value: 103 },
  { date: "2024-04-15", value: 62 },
  { date: "2024-04-16", value: 67 },
  { date: "2024-04-17", value: 53 },
  { date: "2024-04-18", value: 383 },
  { date: "2024-04-19", value: 255 },
  { date: "2024-04-20", value: 327 },
  { date: "2024-05-01", value: 123 },
  { date: "2024-05-02", value: 234 },
  { date: "2024-05-03", value: 345 },
  { date: "2024-06-01", value: 456 },
  { date: "2024-06-02", value: 567 },
]

export function Overview() {
  const [selectedMonth, setSelectedMonth] = React.useState("2024-04")

  // Filtrar los datos según el mes seleccionado
  const filteredData = allData.filter((item) => {
    const itemDate = parseISO(item.date)
    return format(itemDate, "yyyy-MM") === selectedMonth
  })

  // Generar datos para todos los días del mes seleccionado
  const dataForChart = eachDayOfInterval({
    start: startOfMonth(parseISO(`${selectedMonth}-01`)),
    end: endOfMonth(parseISO(`${selectedMonth}-01`)),
  }).map((date) => {
    const formattedDate = format(date, "yyyy-MM-dd")
    const data = filteredData.find((item) => item.date === formattedDate)
    return {
      date: formattedDate,
      value: data ? data.value : 0,
    }
  })

  return (
    <div>
      <div className="mb-4">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Selecciona un mes"
          >
            <SelectValue placeholder="Selecciona un mes" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="2024-04">Abril 2024</SelectItem>
            <SelectItem value="2024-05">Mayo 2024</SelectItem>
            <SelectItem value="2024-06">Junio 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={dataForChart}>
          <defs>
            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = parseISO(value)
              return format(date, "dd MMM", { locale: es })
            }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) =>
              format(parseISO(value), "dd MMM, yyyy", { locale: es })
            }
          />
          <Area
            dataKey="value"
            type="monotone"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#fillValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}