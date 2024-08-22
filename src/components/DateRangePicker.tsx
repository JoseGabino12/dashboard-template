"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Search as SearchIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utilsSale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DateRangePickerProps } from "@/interfaces/interfaces"

export function DatePickerWithRange({ saleByDate }: DateRangePickerProps) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: localToday,
    to: undefined,
  })

  const handleClickDate = () => {
    const formattedFrom = formatDate(date?.from)
    const formattedTo = date?.to ? formatDate(date.to) : formattedFrom

    formattedFrom !== undefined &&
      formattedTo !== undefined &&
      saleByDate(formattedFrom, formattedTo)  
  }

  return (
    <div className={cn("flex gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd-MMMM-yyyy", { locale: es })} -{" "}
                  {format(date.to, "dd-MMMM-yyyy", { locale: es })}
                </>
              ) : (
                format(date.from, "dd-MMMM-yyyy", { locale: es })
              )
            ) : (
              <span>Selecciona una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>

      <Button className="w-14" onClick={handleClickDate}>
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}