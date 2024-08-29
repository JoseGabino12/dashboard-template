'use client'

import { useMemo } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Overview } from '@/components/charts/Overview';

import { CardInfo } from '@/components/Card';
import { DatePickerWithRange } from '@/components/DateRangePicker';

import { Reports } from '@/components/Reports';
import { ChartSlider } from '@/components/ChartSlider';

import { Banknote } from 'lucide-react';

import { useApi } from '@/hooks/useApi';
import { useColumns } from '@/hooks/useColumns';

import { Toaster } from '@/components/ui/sonner';
import { SkeletonTabs } from '@/components/skeletons/SkeletonTabs';
import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { SkeletonChart } from '@/components/skeletons/SkeletonChart';
import Image from 'next/image';

export default function Home () {
  const {
    sales,
    saleByDate,
    payment,
    concreteraItems,
    concreteraItemsData,
    bloqueraItems,
    bloqueraItemsData,
    loading
  } = useApi();
  const { salesColumns, paymentColumns, salesExcelColumns, paymentExcelColumns } = useColumns();

  const totals = useMemo(() => {
    if (sales.length > 0) {
      return sales.reduce(
        (acc, item) => {
          acc.contado += item.contado;
          acc.credito += item.credito;
          acc.total += item.total;
          return acc;
        },
        { contado: 0, credito: 0, total: 0 }
      );
    } else {
      return { contado: 0, credito: 0, total: 0 };
    }
  }, [sales]);


  return (
    <main className='p-5'>
      <div className="flex-1 space-y-4 p-8 pt-6">

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2">
          <Image src="/assets/logo.jpeg" alt="Logo" width={ 200 } height={ 200 } />
          <div className="flex items-center flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
            <DatePickerWithRange saleByDate={ saleByDate } concreteraItemsData={ concreteraItemsData } bloqueraItemsData={ bloqueraItemsData } />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          {
            loading ? <SkeletonTabs /> :
              <TabsList>
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="graficas">Gráficas</TabsTrigger>
                <TabsTrigger value="reports">Reportes</TabsTrigger>
              </TabsList>
          }

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

              <Card className="col-span-7">
                {
                  loading ? <SkeletonChart /> :
                    <>
                      <CardContent className="pl-2">
                        <Overview data={ sales } />
                      </CardContent>
                    </>
                }

              </Card>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {
                loading ? <SkeletonCard /> :
                  <>
                    <CardInfo
                      title="Total de ventas"
                      value={ `$${Number(totals.total.toFixed(2)).toLocaleString('es-MX')}` }
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      }
                    />

                    <CardInfo
                      title="Total de contado"
                      value={ `$${Number(totals.contado.toFixed(2)).toLocaleString('es-MX')}` }
                      icon={
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                      }
                    />

                    <CardInfo
                      title="Total de crédito"
                      value={ `$${Number(totals.credito.toFixed(2)).toLocaleString('es-MX')}` }
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <path d="M2 10h20" />
                        </svg>
                      }
                    />
                  </>
              }
            </div>
          </TabsContent>

          <TabsContent value="graficas" className="space-y-4">
            {
              loading ? <SkeletonChart /> :
                <ChartSlider
                  sales={ sales }
                  concreteraItems={ concreteraItems }
                  bloqueraItems={ bloqueraItems }
                  payment={ payment }
                />
            }
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            {
              loading ? <SkeletonChart /> :
                <>
                  <Reports
                    title='Reporte de vendedores'
                    fileName='reporte_vendedores'
                    data={ sales }
                    columns={ salesColumns }
                    excelColumns={ salesExcelColumns }
                    aggregationKey="vendedor"
                    fieldsToAggregate={ ['ventas', 'contado', 'credito', 'total'] }
                  />

                  <Reports
                    title='Antigüedad de saldos'
                    fileName='reporte_pagos'
                    data={ payment }
                    columns={ paymentColumns }
                    excelColumns={ paymentExcelColumns }
                  />
                </>
            }

          </TabsContent>
        </Tabs>
      </div>

      <Toaster />
    </main>
  );
}
