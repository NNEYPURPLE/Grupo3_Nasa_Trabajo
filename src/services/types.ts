export interface ApodResponse {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface AsteroidResponse {
  links: { next: string; prev: string; self: string };
  element_count: number;
  near_earth_objects: Record<string, Asteroid[]>;
}

export interface Asteroid {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
    meters: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  close_approach_data: {
    close_approach_date: string;
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
  }[];
  is_potentially_hazardous_asteroid: boolean;
}

export interface MarsRoverResponse {
  photos: MarsPhoto[];
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: { name: string; full_name: string };
  img_src: string;
  earth_date: string;
  rover: { name: string; status: string; landing_date: string; launch_date: string };
}

export interface ExoplanetResponse {
  count: number;
  data?: Exoplanet[];
}

export interface Exoplanet {
  pl_name: string;
  hostname: string;
  discovery_year: number;
  pl_orbital_period: number;
  pl_rade: number;
  sy_dist: number;
}

export interface NasaSearchResponse {
  collection: {
    items: NasaSearchItem[];
    metadata: { total_hits: number };
  };
}

export interface NasaSearchItem {
  data: {
    nasa_id: string;
    title: string;
    description: string;
    date_created: string;
    media_type: string;
  }[];
  links?: { href: string; rel: string; render?: string }[];
}
