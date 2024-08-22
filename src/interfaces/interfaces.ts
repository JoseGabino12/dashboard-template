export interface CardProps {
  title: string
  icon: React.ReactNode
  value: string
}

export interface OverviewProps {
  data: SalesData[]
}

export interface SalesData {
  fecha: string
  vendedor: string
  ventas: number
  contado: number
  credito: number
  total: number
}

export interface AggregatedData {
  fecha: string
  contado: number
  credito: number
}

export interface DateRangePickerProps {
  saleByDate: (from: string, to: string) => Promise<void>
}