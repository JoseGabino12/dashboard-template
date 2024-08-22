import { useState, useEffect } from 'react';

import { formatDate } from '@/lib/utilsSale';
import { SalesData } from '@/interfaces/interfaces';
import { toast } from 'sonner';

export const useSales = () => {
  const [sales, setSales] = useState<SalesData[]>([])
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  const saleByDate = async (from: string, to: string) => {
    try {
      const res = await fetch(`/api/sales?del=${from}&al=${to}`, {
        method: 'GET',
      });
      const data = await res.json()

       if (!res.ok) {
        // Mostrar el error específico en la alerta
        toast.error(data.error || 'An unexpected error occurred');
      } else {
        // Manejar los datos normalmente
        setSales(data.data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   if (!initialized) {
  //     const today = new Date()
  //     const formattedToday = formatDate(today)

  //     formattedToday !== undefined && saleByDate(formattedToday, formattedToday).then(() => {
  //       setInitialized(true);
  //     });
  //   }
  // }, [initialized])

  return {
    sales,
    loading,
    saleByDate,
  }
}