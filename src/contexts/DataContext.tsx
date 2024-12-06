import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from '../services/api';

type DataContextType = {
  data: {
    firstRoute: any[];
    secondRoute: any[];
    thirdRoute: any[];
    fourthRoute: any[];
  };
  loading: boolean;
  error: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState({
    firstRoute: [],
    secondRoute: [],
    thirdRoute: [],
    fourthRoute: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const firstData = await fetchData('https://api.example.com/firstRoute');
        const secondData = await fetchData('https://api.example.com/secondRoute');
        const thirdData = await fetchData('https://api.example.com/thirdRoute');
        const fourthData = await fetchData('https://api.example.com/fourthRoute');

        setData({
          firstRoute: firstData,
          secondRoute: secondData,
          thirdRoute: thirdData,
          fourthRoute: fourthData,
        });
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de un DataProvider');
  }
  return context;
};
