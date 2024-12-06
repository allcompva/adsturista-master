import { useEffect, useState } from 'react';
import { fetchData } from '../services/api';

export const useLoadData = () => {
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

  return { data, loading, error };
};
