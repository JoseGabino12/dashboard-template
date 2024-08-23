import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SalesData, PaymentData, ExcelColumn } from "@/interfaces/interfaces";

export const useColumns = () => {
  // Columnas para SalesData
  const salesColumns: ColumnDef<SalesData>[] = [
    {
      accessorKey: "vendedor",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendedor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue("vendedor")}</div>,
    },
    {
      accessorKey: "ventas",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Ventas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-start font-bold">{row.getValue("ventas")}</div>,
    },
    {
      accessorKey: "contado",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Contado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start font-medium">
          {(row.getValue("contado") as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "credito",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Crédito
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start font-medium">
          {(row.getValue("credito") as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start font-bold">
          {(row.getValue("total") as number).toFixed(2)}
        </div>
      ),
    },
  ];

  const salesExcelColumns: ExcelColumn<SalesData>[] = [
    { header: "Vendedor", key: "vendedor" },
    { header: "Ventas", key: "ventas" },
    { header: "Contado", key: "contado" },
    { header: "Crédito", key: "credito" },
    { header: "Total", key: "total" },
  ];

  // Columnas para PaymentData
  const paymentColumns: ColumnDef<PaymentData>[] = [
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize">{row.getValue("nombre")}</div>,
    },
    {
      accessorKey: "documentos",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Documentos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("documentos")}</div>,
    },
    {
      accessorKey: "maximoAtraso",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Máximo Atraso
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("maximoAtraso")}</div>,
    },
    {
      accessorKey: "porVencer",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Por Vencer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("porVencer")}</div>,
    },
    {
      accessorKey: "d1_a_30",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          De 1 a 30 días
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("d1_a_30")}</div>,
    },
    {
      accessorKey: "d31_a_60",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          De 31 a 60 días
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("d31_a_60")}</div>,
    },
    {
      accessorKey: "d61_a_90",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          De 61 a 90 días
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("d61_a_90")}</div>,
    },
    {
      accessorKey: "mas_de_90",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Más de 90 días
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right">{row.getValue("mas_de_90")}</div>,
    },
    {
      accessorKey: "saldoTotal",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-right"
        >
          Saldo Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right font-bold">{row.getValue("saldoTotal")}</div>,
    },
  ];

  const paymentExcelColumns: ExcelColumn<PaymentData>[] = [
    { header: "Nombre", key: "nombre" },
    { header: "Documentos", key: "documentos" },
    { header: "Máximo Atraso", key: "maximoAtraso" },
    { header: "Por Vencer", key: "porVencer" },
    { header: "De 1 a 30 días", key: "d1_a_30" },
    { header: "De 31 a 60 días", key: "d31_a_60" },
    { header: "De 61 a 90 días", key: "d61_a_90" },
    { header: "Más de 90 días", key: "mas_de_90" },
    { header: "Saldo Total", key: "saldoTotal" },
  ];

  return {
    salesColumns,
    salesExcelColumns,
    paymentColumns,
    paymentExcelColumns
  };
};