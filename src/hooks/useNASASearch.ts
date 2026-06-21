import { useState, useEffect } from "react";
import { searchNASAImages } from "../api/nasaApi";
import type { NASASearchItem } from "../types/nasa";

interface UseNASASearchResult {
  results: NASASearchItem[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => void;
  refetch: () => void;
}

export const useNASASearch = (query: string = "mars"): UseNASASearchResult => {
  const [results, setResults] = useState<NASASearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum: number, append: boolean = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchNASAImages(query, pageNum);
      const items = data.collection?.items || [];
      setResults((prev) => (append ? [...prev, ...items] : items));
    } catch (err: any) {
      setError(err?.message || "Error searching NASA images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [query]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true);
  };

  return { results, isLoading, error, loadMore, refetch: () => fetchData(1) };
};
