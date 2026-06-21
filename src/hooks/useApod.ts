import { useState, useEffect } from "react";
import { getApod } from "../api/nasaApi";
import type { ApodResponse } from "../types/nasa";

interface UseApodResult {
  data: ApodResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApod = (params?: {
  date?: string;
  count?: number;
}): UseApodResult => {
  const [data, setData] = useState<ApodResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getApod(params);
      const apodData = Array.isArray(result) ? result[0] : result;
      setData(apodData);
    } catch (err: any) {
      setError(err?.message || "Error fetching APOD");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params?.date, params?.count]);

  return { data, isLoading, error, refetch: fetchData };
};
