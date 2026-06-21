import { useState, useEffect, useCallback } from "react";
import { getNearEarthAsteroids } from "../api/nasaApi";
import type { NeoFeedResponse, NeoFeedAsteroid } from "../types/nasa";

interface UseNearEarthAsteroidsResult {
  asteroids: NeoFeedAsteroid[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  hazardousCount: number;
  refetch: () => void;
}

export const useNearEarthAsteroids = (): UseNearEarthAsteroidsResult => {
  const [asteroids, setAsteroids] = useState<NeoFeedAsteroid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hazardousCount, setHazardousCount] = useState(0);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: NeoFeedResponse = await getNearEarthAsteroids();
      const nearEarthObjects = data.near_earth_objects || {};
      const allAsteroids: NeoFeedAsteroid[] = [];

      Object.values(nearEarthObjects).forEach((dayAsteroids) => {
        allAsteroids.push(...dayAsteroids);
      });

      allAsteroids.sort(
        (a, b) =>
          new Date(a.close_approach_data[0]?.close_approach_date_full || 0).getTime() -
          new Date(b.close_approach_data[0]?.close_approach_date_full || 0).getTime()
      );

      setAsteroids(allAsteroids);
      setTotalCount(data.element_count || allAsteroids.length);
      setHazardousCount(
        allAsteroids.filter((a) => a.is_potentially_hazardous_asteroid).length
      );
    } catch (err: any) {
      setError(err?.message || "Error fetching near-Earth asteroids");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    asteroids,
    isLoading,
    error,
    totalCount,
    hazardousCount,
    refetch: fetchData,
  };
};
