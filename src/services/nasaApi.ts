const API_KEY = 'DEMO_KEY'; // Reemplaza con tu clave real
const BASE_URL = 'https://api.nasa.gov';
const SEARCH_URL = 'https://images-api.nasa.gov';

// Capa centralizada de peticiones (Manejo de errores unificado)
async function apiClient<T>(endpoint: string, isSearchApi = false): Promise<T> {
  const baseUrl = isSearchApi ? SEARCH_URL : BASE_URL;
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = isSearchApi 
    ? `${baseUrl}${endpoint}` 
    : `${baseUrl}${endpoint}${separator}api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[API Error - ${endpoint}]:`, error);
    throw error;
  }
}

// Catálogo de Endpoints disponibles para escalar el proyecto
export const NASA_SERVICES = {
  // 1. APOD (Imagen del día)
  getApod: () => apiClient<any>('/planetary/apod'),
  
  // 2. Búsqueda de Imágenes y Videos
  search: (query: string) => apiClient<any>(`/search?q=${query}&media_type=image`, true),
  
  // 3. Asteroides (NeoWs) - Cercanos a la Tierra
  getAsteroids: (startDate: string, endDate: string) => 
    apiClient<any>(`/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}`),
  
  // 4. Mars Rovers Photos (Perseverance, Curiosity)
  getMarsPhotos: (rover: string = 'perseverance') => 
    apiClient<any>(`/mars-photos/api/v1/rovers/${rover}/latest_photos`),
    
  // 5. DONKI (Clima Espacial / Tormentas solares)
  getSpaceWeather: () => apiClient<any>('/DONKI/CME?startDate=2024-01-01')
};