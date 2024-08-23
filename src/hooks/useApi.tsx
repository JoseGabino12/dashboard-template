import { useState, useEffect, useCallback } from 'react';
import { formatDate } from '@/lib/utilsSale';
import type { SalesData, PaymentData, BloqueraItemsData, ConcreteraItemsData } from '@/interfaces/interfaces';
import { toast } from 'sonner';

export const useApi = () => {
  // Data states
  const [sales, setSales] = useState<SalesData[]>([]);
  const [payment, setPayment] = useState<PaymentData[]>([]);
  const [bloqueraItems, setBloqueraItems] = useState<BloqueraItemsData[]>([]);
  const [concreteraItems, setConcreteraItems] = useState<ConcreteraItemsData[]>([]);

  // Loading and initialized states
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Generalized fetchData function with useCallback
  const fetchData = useCallback(async <T extends unknown>(
    url: string,
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    noDataWarning: string,
    errorMessage: string
  ) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Un error inesperado ocurrió');
      }

      if (Array.isArray(data.data) && data.data.length === 0) {
        toast.warning(noDataWarning);
      }

      setData(data.data || []);
    } catch (error) {
      console.error(error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Specific data fetching functions with useCallback
  const saleByDate = useCallback(async (from: string, to: string) => {
    await fetchData<SalesData>(
      `/api/sales?del=${from}&al=${to}`, 
      setSales, 
      'No se encontró ventas para el rango de fechas especificado.', 
      'Error al obtener los datos de vendedores.'
    );
  }, [fetchData]);

  const paymentData = useCallback(async () => {
    await fetchData<PaymentData>(
      `/api/payment`, 
      setPayment, 
      'No se encontró información de pagos.', 
      'Error al obtener los datos de pagos.'
    );
  }, [fetchData]);

  const bloqueraItemsData = useCallback(async (from: string, to: string) => {
    await fetchData<BloqueraItemsData>(
      `/api/items/bloquera?del=${from}&al=${to}`, 
      setBloqueraItems, 
      'No se encontró artículos de bloquera para el rango de fechas especificado.', 
      'Error al obtener los datos de bloquera.'
    );
  }, [fetchData]);

  const concreteraItemsData = useCallback(async (from: string, to: string) => {
    await fetchData<ConcreteraItemsData>(
      `/api/items/concretera?del=${from}&al=${to}`, 
      setConcreteraItems, 
      'No se encontró artículos de concretera para el rango de fechas especificado.', 
      'Error al obtener los datos de concretera.'
    );
  }, [fetchData]);

  // Effect for initial data loading
  useEffect(() => {
    if (!initialized) {
      const today = formatDate(new Date());

      if (today) {
        setLoading(true);
        Promise.all([
          saleByDate(today, today), 
          paymentData(), 
          bloqueraItemsData(today, today), 
          concreteraItemsData(today, today)
        ])
          .then(() => setInitialized(true))
          .catch((error) => {
            console.error(error);
            toast.error('Ocurrió un error al cargar los datos.');
          })
          .finally(() => setLoading(false));
      }
    }
  }, [initialized, saleByDate, paymentData, bloqueraItemsData, concreteraItemsData]);

  return {
    // Sales
    sales,
    saleByDate,

    // Payment
    payment,
    paymentData,

    // Bloquera Items
    bloqueraItems,
    bloqueraItemsData,

    // Concretera Items
    concreteraItems,
    concreteraItemsData,

    // Loading
    loading,
  };
};