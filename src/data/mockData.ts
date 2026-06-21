export interface ArticleData {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  category: "estrellas" | "planetas" | "nebulosas" | "todo";
}

export interface ExploreItemData {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  facts: string[];
  distance: string;
  type: string;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  imageUrl?: string;
  explanation: string;
}

export interface LibraryItemData {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
  mission?: string;
  source?: string;
}

export const articles: ArticleData[] = [
  {
    id: "art-1",
    title: "El Sol: Nuestra Estrella",
    summary:
      "El Sol es una estrella de tipo espectral G2 que contiene más del 99% de la masa del sistema solar.",
    content:
      "El Sol es la estrella en el centro del sistema solar. Es una esfera casi perfecta de plasma caliente, con un movimiento convectivo interno que genera un campo magnético a través de un proceso de dinamo. Su diámetro es de aproximadamente 1.39 millones de kilómetros, unas 109 veces el de la Tierra. Su masa es de aproximadamente 330,000 veces la masa terrestre. Representa alrededor del 99.86% de la masa total del sistema solar. Químicamente, aproximadamente tres cuartas partes de la masa del Sol consisten en hidrógeno, mientras que el resto es principalmente helio. El Sol se formó hace aproximadamente 4,600 millones de años a partir del colapso gravitacional de una región dentro de una gran nube molecular.",
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA03149/PIA03149~thumb.jpg",
    date: "2024-01-15",
    category: "estrellas",
  },
  {
    id: "art-2",
    title: "Marte: El Planeta Rojo",
    summary:
      "Marte es el cuarto planeta del sistema solar y ha sido objeto de numerosas misiones espaciales.",
    content:
      "Marte es el cuarto planeta en orden de distancia al Sol y el segundo más pequeño del sistema solar, después de Mercurio. Recibe su nombre en honor al dios de la guerra de la mitología romana, y también es conocido como 'el Planeta Rojo' debido a la apariencia rojiza que le confiere el óxido de hierro predominante en su superficie. Marte posee una atmósfera delgada compuesta principalmente de dióxido de carbono, y dos lunas pequeñas e irregulares: Fobos y Deimos. En Marte se encuentra el volcán más grande del sistema solar, el Monte Olimpo, y el cañón más grande, Valles Marineris.",
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA26313/PIA26313~thumb.jpg",
    date: "2024-02-20",
    category: "planetas",
  },
  {
    id: "art-3",
    title: "La Nebulosa de Orión",
    summary:
      "La Nebulosa de Orión es una de las nebulosas más brillantes y activas del cielo nocturno.",
    content:
      "La Nebulosa de Orión, también conocida como Messier 42, M42 o NGC 1976, es una nebulosa difusa situada al sur del Cinturón de Orión. Es una de las nebulosas más brillantes que existen, y puede ser observada a simple vista en el cielo nocturno. Se encuentra a aproximadamente 1,344 años luz de la Tierra y tiene aproximadamente 24 años luz de diámetro. La nebulosa de Orión es una de las regiones de formación estelar más activas que se pueden ver a simple vista, y alberga un cúmulo de estrellas jóvenes conocido como el Cúmulo del Trapecio.",
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA08653/PIA08653~thumb.jpg",
    date: "2024-03-10",
    category: "nebulosas",
  },
  {
    id: "art-4",
    title: "Júpiter: El Gigante del Sistema Solar",
    summary:
      "Júpiter es el planeta más grande del sistema solar, con una masa más del doble que todos los otros planetas juntos.",
    content:
      "Júpiter es el quinto planeta del sistema solar y el más grande. Forma parte de los denominados planetas exteriores o gaseosos. Es un planeta masivo, con un diámetro de 142,984 kilómetros en su ecuador. Su masa es aproximadamente 318 veces la de la Tierra y 2.5 veces la de todos los demás planetas juntos. Júpiter tiene 95 lunas confirmadas, incluyendo las cuatro grandes lunas galileanas: Ío, Europa, Ganímedes y Calisto. La Gran Mancha Roja de Júpiter es una tormenta anticiclónica persistente en la atmósfera del planeta, que ha sido observada desde hace más de 350 años.",
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA22946/PIA22946~thumb.jpg",
    date: "2024-04-05",
    category: "planetas",
  },
  {
    id: "art-5",
    title: "Agujeros Negros: Misterios del Universo",
    summary:
      "Los agujeros negros son regiones del espacio-tiempo con una gravedad tan intensa que nada puede escapar.",
    content:
      "Un agujero negro es una región finita del espacio-tiempo provocada por una gran concentración de masa en su interior, con un aumento enorme de la densidad, lo que genera un campo gravitatorio tal que ninguna partícula material, ni siquiera la luz, puede escapar de dicha región. La teoría de la relatividad general de Albert Einstein predice que una masa suficientemente compacta puede deformar el espacio-tiempo para formar un agujero negro. El límite de la región de la cual no puede escapar la luz se conoce como horizonte de sucesos. En 2019, el proyecto Event Horizon Telescope capturó la primera imagen directa de un agujero negro, en el centro de la galaxia M87.",
    imageUrl:
      "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000261/GSFC_20171208_Archive_e000261~thumb.jpg",
    date: "2024-05-18",
    category: "estrellas",
  },
  {
    id: "art-6",
    title: "La Nebulosa del Águila",
    summary:
      "La Nebulosa del Águila es un cúmulo estelar joven famoso por sus 'Pilares de la Creación'.",
    content:
      "La Nebulosa del Águila, también conocida como Messier 16 o M16, es un joven cúmulo estelar abierto rodeado de una nebulosa de emisión, ubicado en la constelación de Serpens. Fue descubierta por el astrónomo suizo Jean-Philippe de Cheseaux en 1745. La nebulosa es especialmente famosa por los 'Pilares de la Creación', fotografías tomadas por el Telescopio Espacial Hubble en 1995, que muestran columnas de gas y polvo interestelar donde se están formando nuevas estrellas. Los pilares tienen aproximadamente 4-5 años luz de altura y son una de las imágenes más icónicas de la astronomía moderna.",
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA05481/PIA05481~thumb.jpg",
    date: "2024-06-22",
    category: "nebulosas",
  },
];

export const exploreItems: ExploreItemData[] = [
  {
    id: "exp-1",
    name: "Tierra",
    imageUrl:
      "https://images-assets.nasa.gov/image/iss040e090540/iss040e090540~thumb.jpg",
    description:
      "La Tierra es el tercer planeta del sistema solar y el único conocido que alberga vida. Su superficie está cubierta en un 71% por agua líquida, lo que le da su característico color azul visto desde el espacio. Posee una atmósfera rica en nitrógeno y oxígeno que protege la vida de la radiación solar.",
    facts: [
      "Diámetro: 12,742 km",
      "Distancia al Sol: 149.6 millones de km",
      "Período orbital: 365.25 días",
      "Lunas: 1 (La Luna)",
      "Temperatura media: 15°C",
    ],
    distance: "0 UA",
    type: "Planeta rocoso",
  },
  {
    id: "exp-2",
    name: "Marte",
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA26313/PIA26313~thumb.jpg",
    description:
      "Marte es el cuarto planeta del sistema solar, conocido como el Planeta Rojo por su color característico debido al óxido de hierro en su superficie. Ha sido el destino de numerosas misiones robóticas y es el principal candidato para futuras misiones tripuladas.",
    facts: [
      "Diámetro: 6,779 km",
      "Distancia al Sol: 227.9 millones de km",
      "Período orbital: 687 días",
      "Lunas: 2 (Fobos y Deimos)",
      "Temperatura media: -65°C",
    ],
    distance: "1.52 UA",
    type: "Planeta rocoso",
  },
  {
    id: "exp-3",
    name: "Luna",
    imageUrl:
      "https://images-assets.nasa.gov/image/as11-44-6642/as11-44-6642~thumb.jpg",
    description:
      "La Luna es el único satélite natural de la Tierra y el quinto satélite más grande del sistema solar. Es el cuerpo celeste más estudiado después de la Tierra y el único donde los seres humanos han realizado un aterrizaje tripulado. Su superficie está marcada por cráteres de impacto y mares de basalto oscuro.",
    facts: [
      "Diámetro: 3,474 km",
      "Distancia a la Tierra: 384,400 km",
      "Período orbital: 27.3 días",
      "Gravedad superficial: 1.62 m/s²",
      "Temperatura: -173°C a 127°C",
    ],
    distance: "384,400 km",
    type: "Satélite natural",
  },
];

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿En qué año el ser humano pisó la Luna por primera vez?",
    options: ["1965", "1969", "1972", "1967"],
    correctAnswer: 1,
    imageUrl: "https://images-assets.nasa.gov/image/as11-44-6642/as11-44-6642~thumb.jpg",
    explanation: "La misión Apolo 11 de la NASA, con Neil Armstrong y Buzz Aldrin, aterrizó en la Luna el 20 de julio de 1969. Armstrong fue el primer ser humano en caminar sobre la superficie lunar.",
  },
  {
    id: 2,
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Saturno", "Neptuno", "Júpiter", "Urano"],
    correctAnswer: 2,
    imageUrl: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~thumb.jpg",
    explanation: "Júpiter es el planeta más grande del sistema solar, con un diámetro de 142,984 km. Su masa es 318 veces la de la Tierra y 2.5 veces la de todos los demás planetas juntos.",
  },
  {
    id: 3,
    question: "¿Cómo se llama la galaxia en la que se encuentra nuestro sistema solar?",
    options: ["Andrómeda", "Vía Láctea", "Triángulo", "Sombrero"],
    correctAnswer: 1,
    explanation: "La Vía Láctea es una galaxia espiral barrada que contiene entre 100,000 y 400,000 millones de estrellas, incluido nuestro Sol. Tiene un diámetro de aproximadamente 100,000 años luz.",
  },
  {
    id: 4,
    question: "¿Qué planeta es conocido como el 'Planeta Rojo'?",
    options: ["Venus", "Marte", "Mercurio", "Júpiter"],
    correctAnswer: 1,
    imageUrl: "https://images-assets.nasa.gov/image/PIA26313/PIA26313~thumb.jpg",
    explanation: "Marte debe su color rojizo al óxido de hierro (herrumbra) presente en su superficie. Es el cuarto planeta del sistema solar y alberga el volcán más grande: el Monte Olimpo.",
  },
  {
    id: 5,
    question: "¿Cuál es la estrella más cercana a la Tierra?",
    options: ["Sirius", "Alfa Centauri", "El Sol", "Próxima Centauri"],
    correctAnswer: 2,
    explanation: "El Sol es la estrella más cercana a la Tierra, a una distancia de aproximadamente 149.6 millones de km (1 UA). Es una estrella de tipo espectral G2 que contiene el 99.86% de la masa del sistema solar.",
  },
  {
    id: 6,
    question: "¿Cuántas lunas tiene el planeta Marte?",
    options: ["1", "2", "3", "Ninguna"],
    correctAnswer: 1,
    explanation: "Marte tiene dos lunas pequeñas e irregulares: Fobos y Deimos. Fueron descubiertas en 1877 por el astrónomo estadounidense Asaph Hall. Probablemente son asteroides capturados por la gravedad marciana.",
  },
  {
    id: 7,
    question: "¿Qué telescopio espacial fue lanzado en 1990 y ha proporcionado imágenes icónicas del universo?",
    options: ["James Webb", "Hubble", "Kepler", "Spitzer"],
    correctAnswer: 1,
    imageUrl: "https://images-assets.nasa.gov/image/0101446/0101446~thumb.jpg",
    explanation: "El Telescopio Espacial Hubble fue lanzado el 24 de abril de 1990 a bordo del transbordador Discovery. Ha realizado más de 1.5 millones de observaciones y sus imágenes han revolucionado la astronomía moderna.",
  },
  {
    id: 8,
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Marte", "Mercurio", "Tierra"],
    correctAnswer: 2,
    explanation: "Mercurio es el planeta más cercano al Sol, orbitando a una distancia media de 57.9 millones de km. Completa una órbita en solo 88 días terrestres y no tiene atmósfera significativa.",
  },
  {
    id: 9,
    question: "¿Qué nombre recibe el fenómeno donde la Luna se interpone entre la Tierra y el Sol?",
    options: ["Eclipse lunar", "Eclipse solar", "Marea alta", "Solsticio"],
    correctAnswer: 1,
    explanation: "Un eclipse solar ocurre cuando la Luna pasa entre la Tierra y el Sol, bloqueando total o parcialmente la luz solar. Solo puede ocurrir durante la luna nueva y es visible desde áreas específicas de la Tierra.",
  },
  {
    id: 10,
    question: "¿Cuál de estos NO es un planeta del sistema solar?",
    options: ["Plutón", "Neptuno", "Urano", "Ceres"],
    correctAnswer: 3,
    explanation: "Ceres es un planeta enano ubicado en el cinturón de asteroides entre Marte y Júpiter. Plutón también fue reclasificado como planeta enano en 2006 por la Unión Astronómica Internacional.",
  },
];

export const libraryItems: LibraryItemData[] = [
  {
    id: "lib-1",
    title: "Nebulosa Cabeza de Caballo",
    imageUrl: "https://images-assets.nasa.gov/image/PIA26580/PIA26580~thumb.jpg",
    description: "Una de las nebulosas más reconocibles del cielo, ubicada en la constelación de Orión. La silueta oscura del polvo interestelar crea la forma característica de cabeza de caballo.",
    date: "2024-01-10",
    mission: "Hubble Space Telescope",
    source: "NASA/ESA Hubble",
  },
  {
    id: "lib-2",
    title: "Galaxia del Remolino",
    imageUrl: "https://images-assets.nasa.gov/image/PIA22059/PIA22059~thumb.jpg",
    description: "Una galaxia espiral clásica ubicada a 23 millones de años luz de la Tierra, interactuando gravitacionalmente con su compañera más pequeña.",
    date: "2024-02-14",
    mission: "Hubble Space Telescope",
    source: "NASA/ESA Hubble",
  },
  {
    id: "lib-3",
    title: "Puesta de Sol en Marte",
    imageUrl: "https://images-assets.nasa.gov/image/PIA19421/PIA19421~thumb.jpg",
    description: "Imagen capturada por el rover Curiosity mostrando el atardecer marciano con un tono azulado característico debido al polvo fino en la atmósfera.",
    date: "2024-03-22",
    mission: "Mars Science Laboratory (Curiosity)",
    source: "NASA/JPL-Caltech",
  },
  {
    id: "lib-4",
    title: "Anillos de Saturno",
    imageUrl: "https://images-assets.nasa.gov/image/PIA17170/PIA17170~thumb.jpg",
    description: "Vista detallada de los impresionantes anillos del planeta Saturno, compuestos principalmente de partículas de hielo y roca que orbitan el planeta gigante.",
    date: "2024-04-18",
    mission: "Cassini-Huygens",
    source: "NASA/JPL-Caltech",
  },
  {
    id: "lib-5",
    title: "Nebulosa del Cangrejo",
    imageUrl: "https://images-assets.nasa.gov/image/PIA06944/PIA06944~thumb.jpg",
    description: "Los restos de una explosión de supernova observada por astrónomos chinos en 1054 d.C. En su centro alberga un púlsar que gira 30 veces por segundo.",
    date: "2024-05-30",
    mission: "Chandra X-ray Observatory",
    source: "NASA/CXC",
  },
  {
    id: "lib-6",
    title: "La Tierra Vista desde la Luna",
    imageUrl: "https://images-assets.nasa.gov/image/as11-44-6548/as11-44-6548~thumb.jpg",
    description: "La icónica imagen de la Tierra saliendo sobre el horizonte lunar, tomada durante la misión Apolo 11. Una de las fotografías más importantes de la historia.",
    date: "2024-06-12",
    mission: "Apollo 11",
    source: "NASA/JSC",
  },
  {
    id: "lib-7",
    title: "Tormenta en Júpiter",
    imageUrl: "https://images-assets.nasa.gov/image/PIA21984/PIA21984~thumb.jpg",
    description: "La Gran Mancha Roja de Júpiter, una tormenta anticiclónica masiva que ha durado cientos de años. Es más grande que el diámetro de la Tierra.",
    date: "2024-07-04",
    mission: "Juno",
    source: "NASA/JPL-Caltech/SwRI",
  },
  {
    id: "lib-8",
    title: "Cúmulo de Galaxias de Virgo",
    imageUrl: "https://images-assets.nasa.gov/image/PIA17973/PIA17973~thumb.jpg",
    description: "Un cúmulo de miles de galaxias a unos 54 millones de años luz de distancia, que contiene la galaxia elíptica gigante M87 en su centro.",
    date: "2024-08-19",
    mission: "Hubble Space Telescope",
    source: "NASA/ESA Hubble",
  },
];
