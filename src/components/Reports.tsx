'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ReportTable } from './tables/ReportTable';
import { Button } from './ui/button';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import type { ReportsProps } from '@/interfaces/interfaces';
import { aggregateData } from '@/lib/utilsSale';

export function Reports<T extends object>({
  data,
  columns,
  title,
  fileName,
  excelColumns,
  aggregationKey,
  fieldsToAggregate
}: ReportsProps<T> & { aggregationKey?: keyof T, fieldsToAggregate?: (keyof T)[] }) {

  const aggregatedData = aggregationKey && fieldsToAggregate
    ? aggregateData(data, aggregationKey, fieldsToAggregate)
    : data;

  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title);

    worksheet.columns = excelColumns.map(col => ({
      header: col.header,
      key: col.key as string,
      width: col.width || 20,
    }));

    worksheet.addRows(data);

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), `${fileName}.xlsx`);
    });
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-2'>
        <CardTitle>{title}</CardTitle>
        <Button onClick={handleExport}>Exportar</Button>
      </CardHeader>
      <CardContent>
        <ReportTable data={aggregatedData} columns={columns} />
      </CardContent>
    </Card>
  )
}