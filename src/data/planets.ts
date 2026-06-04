export interface PlanetData {
  id: string;
  name: string;
  search: string;
}

export const planets: PlanetData[] = [
  { id: 'mercury', name: 'Mercurio', search: 'Mercury planet NASA' },
  { id: 'venus', name: 'Venus', search: 'Venus planet NASA' },
  { id: 'earth', name: 'Tierra', search: 'Earth planet NASA' },
  { id: 'mars', name: 'Marte', search: 'Mars planet NASA' },
  { id: 'jupiter', name: 'Júpiter', search: 'Jupiter planet NASA' },
  { id: 'saturn', name: 'Saturno', search: 'Saturn planet NASA' },
  { id: 'uranus', name: 'Urano', search: 'Uranus planet NASA' },
  { id: 'neptune', name: 'Neptuno', search: 'Neptune planet NASA' },
];
