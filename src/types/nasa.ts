export interface ApodResponse {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
}

export interface MarsCamera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface MarsRover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: MarsCamera;
  img_src: string;
  earth_date: string;
  rover: MarsRover;
}

export interface MarsPhotosResponse {
  photos: MarsPhoto[];
}

export interface NASASearchItem {
  href: string;
  data: Array<{
    center: string;
    title: string;
    nasa_id: string;
    media_type: string;
    keywords: string[];
    date_created: string;
    description: string;
  }>;
  links: Array<{
    href: string;
    rel: string;
    render: string;
  }>;
}

export interface NASASearchResponse {
  collection: {
    items: NASASearchItem[];
    metadata: { total_hits: number };
    links: Array<{ rel: string; href: string }>;
  };
}

export interface NeoApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
  };
  orbiting_body: string;
}

export interface NeoFeedAsteroid {
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
    meters: { estimated_diameter_min: number; estimated_diameter_max: number };
    miles: { estimated_diameter_min: number; estimated_diameter_max: number };
    feet: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: NeoApproachData[];
  orbital_data?: Record<string, unknown>;
}

export interface NeoFeedResponse {
  element_count: number;
  near_earth_objects: Record<string, NeoFeedAsteroid[]>;
}

export type NASAItem = ApodResponse | MarsPhoto | NASASearchItem;

export const getNASAItemId = (item: NASAItem): string => {
  if ("date" in item) {
    return (item as ApodResponse).date;
  }
  if ("nasa_id" in (item as any).data?.[0]) {
    return (item as any).data[0].nasa_id;
  }
  return String((item as MarsPhoto).id);
};

export const getNASAItemImage = (item: NASAItem): string => {
  if ("url" in item) return (item as ApodResponse).url;
  if ("img_src" in item) return (item as MarsPhoto).img_src;
  if ("links" in item && (item as NASASearchItem).links?.length > 0) {
    return (item as NASASearchItem).links[0].href;
  }
  return "";
};

export const getNASAItemTitle = (item: NASAItem): string => {
  if ("title" in item) return (item as ApodResponse).title;
  if ("data" in item && (item as NASASearchItem).data?.length > 0) {
    return (item as NASASearchItem).data[0].title;
  }
  return "NASA Image";
};

export const getNASAItemDescription = (item: NASAItem): string => {
  if ("explanation" in item) return (item as ApodResponse).explanation;
  if ("data" in item && (item as NASASearchItem).data?.length > 0) {
    return (item as NASASearchItem).data[0].description;
  }
  return "";
};

export const getNASAItemDate = (item: NASAItem): string => {
  if ("date" in item) return (item as ApodResponse).date;
  if ("earth_date" in item) return (item as MarsPhoto).earth_date;
  if ("data" in item && (item as NASASearchItem).data?.length > 0) {
    return (item as NASASearchItem).data[0].date_created;
  }
  return "";
};
