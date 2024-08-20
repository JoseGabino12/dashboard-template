import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Overview } from '@/components/Overview';

import { ChartSels } from '@/components/ChartSels';
import { CardInfo } from '@/components/Card';
import { DatePickerWithRange } from '@/components/DateRangePicker';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select';

export default function Home() {
  return (
    <main className='p-5'>
      <div className="flex-1 space-y-4 p-8 pt-6">

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 ">
          <h2 className="text-3xl font-bold tracking-tight">Reporte ejecutivo</h2>
          <div className="flex items-center flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
            <DatePickerWithRange />
            <Button>Descargar</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="sels">Sucursales</TabsTrigger>
            <TabsTrigger value="reports" disabled>Reportes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <CardInfo
                title="Total de ventas"
                value="$45,231.89"
                subtitle="+20.1% desde el mes pasado"
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
                title="Venta máxima por sucursal"
                value="+2350"
                subtitle="+180.1% desde el mes pasado"
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
              />

              <CardInfo
                title="Ventas comparadas con mes anterior"
                value="+12,234"
                subtitle="+19% desde el mes pasado"
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

              <CardInfo
                title="Ventas de hoy"
                value="+573"
                subtitle="+201 hace una hora"
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
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
              />

            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sels" className="space-y-4">
            <ChartSels />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
