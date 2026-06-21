import { useState, useEffect } from "react";
import { getMarsPhotos } from "../api/nasaApi";
import type { MarsPhoto } from "../types/nasa";

interface UseMarsPhotosResult {
  photos: MarsPhoto[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMarsPhotos = (
  params: { sol?: number; camera?: string; page?: number } = { sol: 1000 }
): UseMarsPhotosResult => {
  const mergedParams = { sol: 1000, ...params };
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getMarsPhotos(mergedParams);
      setPhotos(result.photos || []);
    } catch (err: any) {
      setError(err?.message || "Error fetching Mars photos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mergedParams.sol, mergedParams.camera, mergedParams.page]);

  return { photos, isLoading, error, refetch: fetchData };
};
