import { useState, useEffect, useCallback } from "react";
import { getApod } from "../api/nasaApi";
import type { ApodResponse } from "../types/nasa";

interface UseApodGalleryResult {
  items: ApodResponse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApodGallery = (count: number = 8): UseApodGalleryResult => {
  const [items, setItems] = useState<ApodResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getApod({ count });
      const data = Array.isArray(result) ? result : [result];
      setItems(data);
    } catch (err: any) {
      setError(err?.message || "Error fetching APOD gallery");
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { items, isLoading, error, refetch: fetchData };
};
