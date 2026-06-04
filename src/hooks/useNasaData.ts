import { useState, useEffect, useRef } from 'react';
import { NASA_SERVICES } from '../services/nasaApi';
import type { ApodResponse, Asteroid, MarsPhoto } from '../services/types';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function useApod() {
  const [data, setData] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    NASA_SERVICES.getApod()
      .then((res) => { if (!cancelled) setData(res); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export function useAsteroids() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    NASA_SERVICES.getAsteroids()
      .then((res) => {
        if (cancelled) return;
        const all: Asteroid[] = [];
        for (const date in res.near_earth_objects) {
          all.push(...res.near_earth_objects[date]);
        }
        all.sort((a, b) => {
          const distA = parseFloat(a.close_approach_data[0]?.miss_distance.kilometers || '0');
          const distB = parseFloat(b.close_approach_data[0]?.miss_distance.kilometers || '0');
          return distA - distB;
        });
        setAsteroids(all.slice(0, 5));
        setCount(res.element_count);
      })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { asteroids, count, loading, error };
}

const ASSETS = 'https://images-assets.nasa.gov';

async function fetchImageUrl(query: string): Promise<string | null> {
  try {
    const search = await NASA_SERVICES.search(query);
    const item = search.collection?.items?.[0];
    const nasaId = item?.data?.[0]?.nasa_id;
    if (!nasaId) return null;

    const res = await fetch(`${ASSETS}/image/${nasaId}/collection.json`);
    const urls: string[] = await res.json();
    const img = urls.find((u) => u.includes('~large.jpg')) || urls.find((u) => u.includes('~orig.jpg')) || null;
    return img;
  } catch {
    return null;
  }
}

export function usePlanetImages(searches: string[]) {
  const [images, setImages] = useState<Record<string, string>>({});
  const cache = useRef<Record<string, string>>({});

  useEffect(() => {
    const pending = searches.filter((s) => !cache.current[s]);
    if (pending.length === 0) { setImages({ ...cache.current }); return; }

    let cancelled = false;
    (async () => {
      for (const q of pending) {
        if (cancelled) break;
        const url = await fetchImageUrl(q);
        if (url) cache.current[q] = url;
        if (!cancelled) setImages({ ...cache.current });
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return images;
}

export function useMarsPhotos(rover = 'perseverance') {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    NASA_SERVICES.getMarsPhotos(rover)
      .then((res) => { if (!cancelled) setPhotos(res.photos.slice(0, 5)); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [rover]);

  return { photos, loading, error };
}
