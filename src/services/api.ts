const API_BASE_URL = 'https://api.example.com';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_TOKEN_HERE', // Si necesitas autenticación
      },
    });
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchData:', error);
    return [];
  }
};
