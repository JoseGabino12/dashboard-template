import { ColumnDef } from "@tanstack/react-table";

// Props
export interface CardProps {
  title: string
  icon: React.ReactNode
  value: string
}

export interface OverviewProps {
  data: SalesData[]
}

export interface ExcelColumn<T> {
  header: string;
  key: keyof T;
  width?: number;
}

export interface ReportsProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  excelColumns: ExcelColumn<T>[];
  title: string;
  fileName: string;
}

export interface ReportTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export interface DateRangePickerProps {
  saleByDate: (from: string, to: string) => Promise<void>
  bloqueraItemsData: (from: string, to: string) => Promise<void>
  concreteraItemsData: (from: string, to: string) => Promise<void>
}

export interface ChartSliderProps {
  sales: SalesData[]
  bloqueraItems: BloqueraItemsData[]
  concreteraItems: ConcreteraItemsData[]
}

// Enpoints
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

export interface PaymentData {
  nombre: string,
  documentos: number,
  maximoAtraso: number,
  porVencer: number,
  d1_a_30: number,
  d31_a_60: number,
  d61_a_90: number,
  mas_de_90: number,
  saldoTotal: number
}

export interface BloqueraItemsData {
  fecha: string,
  articulo: string,
  ventas: number,
  piezas: number,
  total: number
}

export interface ConcreteraItemsData {
  fecha: string,
  articulo: string,
  ventas: number,
  mtsCubicos: number,
  total: number
}