'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataTable } from './DataTable';
import { Button } from './ui/button';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import { sellers } from '@/lib/data';

export function Reports () {
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Vendedores');

    worksheet.columns = [
      { header: 'Vendedor', key: 'vendedor', width: 20 },
      { header: 'Contado', key: 'contado', width: 20 },
      { header: 'Crédito', key: 'credito', width: 20 },
      { header: 'Total', key: 'total', width: 20 },
    ];

    worksheet.addRows(sellers);

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'vendedores.xlsx');
    });
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-2'>
        <CardTitle>Vendedores</CardTitle>
        <Button onClick={ handleExport }>Exportar</Button>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
  )
}