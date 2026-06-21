import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  ApodResponse,
  MarsPhotosResponse,
  NASASearchResponse,
  NeoFeedResponse,
} from "../types/nasa";

// Load from environment variables
const NASA_API_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY || "";
const NASA_BASE_URL = process.env.EXPO_PUBLIC_NASA_BASE_URL || "https://api.nasa.gov/";
const IMAGES_BASE_URL = process.env.EXPO_PUBLIC_IMAGES_BASE_URL || "https://images-api.nasa.gov/";
const API_TIMEOUT = parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "10000", 10);
const CACHE_EXPIRY_TIME = 1000 * 60 * 60 * 24;

if (!NASA_API_KEY) {
  console.warn(
    "⚠️ NASA_API_KEY no definida. Las llamadas a la API fallarán. " +
    "Asegúrate de crear un archivo .env con EXPO_PUBLIC_NASA_API_KEY"
  );
}

export const nasaClient = axios.create({
  baseURL: NASA_BASE_URL,
  timeout: API_TIMEOUT,
});

// Add response interceptor for logging
nasaClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🔴 NASA API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

nasaClient.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: NASA_API_KEY };
  return config;
});

const fetchWithCache = async (endpoint: string, params = {}) => {
  const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
  try {
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
        return data;
      }
    }
    const response = await nasaClient.get(endpoint, { params });
    const cachePayload = { timestamp: Date.now(), data: response.data };
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cachePayload));
    return response.data;
  } catch (error) {
    const fallbackData = await AsyncStorage.getItem(cacheKey);
    if (fallbackData) {
      const { data } = JSON.parse(fallbackData);
      return data;
    }
    throw error;
  }
};

export const getApod = async (
  params?: { date?: string; count?: number; thumbs?: boolean }
): Promise<ApodResponse | ApodResponse[]> => {
  return fetchWithCache("planetary/apod", params);
};

export const getMarsPhotos = async (
  params: {
    sol?: number;
    camera?: string;
    page?: number;
  } = {}
): Promise<MarsPhotosResponse> => {
  return fetchWithCache("mars-photos/api/v1/rovers/curiosity/photos", params);
};

export const searchNASAImages = async (
  query: string,
  page: number = 1
): Promise<NASASearchResponse> => {
  const url = `${IMAGES_BASE_URL}search`;
  const params = { q: query, page };
  const cacheKey = `search:${query}:${page}`;
  try {
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
        return data;
      }
    }
    const response = await axios.get(url, { params });
    const cachePayload = { timestamp: Date.now(), data: response.data };
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cachePayload));
    return response.data;
  } catch (error) {
    const fallbackData = await AsyncStorage.getItem(cacheKey);
    if (fallbackData) {
      const { data } = JSON.parse(fallbackData);
      return data;
    }
    throw error;
  }
};

export const getNearEarthAsteroids = async (
  params: { start_date?: string; end_date?: string } = {}
): Promise<NeoFeedResponse> => {
  const today = new Date().toISOString().split("T")[0];
  const defaultParams = {
    start_date: params.start_date || today,
    end_date: params.end_date || today,
  };
  return fetchWithCache("neo/rest/v1/feed", defaultParams);
};
