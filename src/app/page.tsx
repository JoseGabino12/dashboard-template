'use client'

import { useMemo } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Overview } from '@/components/charts/Overview';

import { CardInfo } from '@/components/Card';
import { DatePickerWithRange } from '@/components/DateRangePicker';

import { Reports } from '@/components/Reports';
import { ChartSlider } from '@/components/ChartSlider';

import { Banknote } from 'lucide-react';

import { useSales } from '@/hooks/useSales';
import { Toaster } from '@/components/ui/sonner';
import { SkeletonTabs } from '@/components/skeletons/SkeletonTabs';
import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { SkeletonChart } from '@/components/skeletons/SkeletonChart';

export default function Home() {
  const { sales, saleByDate, loading } = useSales();

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
          <h2 className="text-3xl font-bold tracking-tight">Reporte ejecutivo</h2>
          <div className="flex items-center flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
            <DatePickerWithRange saleByDate={ saleByDate } />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          {
            loading ? <SkeletonTabs /> :
              <TabsList>
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="sels">Sucursales</TabsTrigger>
                <TabsTrigger value="reports">Reportes</TabsTrigger>
              </TabsList>
          }
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {
                loading ? <SkeletonCard /> :
                  <>
                    <CardInfo
                    title="Total de ventas"
                    value={`$${Number(totals.total.toFixed(2)).toLocaleString('es-MX')}`}
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
                    value={`$${Number(totals.contado.toFixed(2)).toLocaleString('es-MX')}`}
                    icon={
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                    }
                  />

                  <CardInfo
                    title="Total de crédito"
                    value={`$${Number(totals.credito.toFixed(2)).toLocaleString('es-MX')}`}
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              
              <Card className="col-span-7">
                {
                  loading ? <SkeletonChart /> :
                  <>
                    <CardHeader>
                      <CardTitle>Resumen</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview data={ sales } />
                    </CardContent>
                  </>
                }
                
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sels" className="space-y-4">
            <ChartSlider />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Reports data={ sales } />
            <Reports data={ sales } />
          </TabsContent>
        </Tabs>
      </div>

      <Toaster />
    </main>
  );
}
