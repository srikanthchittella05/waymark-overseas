/** Local views; locations, authors and licenses checked against Commons file records. */
export type CountryScene = {
  image: string;
  location: string;
  alt: string;
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
};

const file = (title: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replaceAll(" ", "_"))}`;
const bySa4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0" };
const bySa3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0" };
const by3 = { license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0" };

// Both photographs are genuinely different places. Singapore is a city-state,
// so its pair identifies separate landmarks, not invented second cities.
// The converted WebP files remain under the photographs' original CC licenses;
// see docs/country-gallery-photos.md for file-by-file provenance and changes.
export const COUNTRY_SCENES: Record<string, readonly CountryScene[]> = {
  US: [
    {
      image: "/destinations/views/us-brooklyn.webp",
      location: "Brooklyn Bridge · New York City",
      alt: "Lower Manhattan skyline framed beneath the Brooklyn Bridge in New York City",
      author: "Christian David",
      source: file("Lower Manhattan skyline from under the Brooklyn Bridge deck, New York City.jpg"),
      ...bySa4,
    },
    {
      image: "/destinations/views/us-golden-gate.webp",
      location: "Marshall’s Beach · San Francisco",
      alt: "Golden Gate Bridge from Marshall’s Beach above the surf in San Francisco",
      author: "Frank Schulenburg",
      source: file("Golden Gate Bridge as seen from Marshall’s Beach, March 2018.jpg"),
      ...bySa4,
    },
  ],
  GB: [
    {
      image: "/destinations/views/gb-london.webp",
      location: "Tower Bridge · London",
      alt: "Tower Bridge lit up at dusk over the River Thames in London",
      author: "David Iliff (Diliff)",
      source: file("Tower Bridge London Dusk Feb 2006.jpg"),
      ...bySa3,
    },
    {
      image: "/destinations/views/gb-edinburgh.webp",
      location: "Edinburgh Castle · Edinburgh",
      alt: "Edinburgh Castle on its hill above the rooftops of Edinburgh",
      author: "Saffron Blaze",
      source: file("Edinburgh Castle Overview.jpg"),
      ...bySa3,
    },
  ],
  CA: [
    {
      image: "/destinations/views/ca-toronto.webp",
      location: "Snake Island · Toronto",
      alt: "Toronto skyline and CN Tower at sunset, seen across the water from Snake Island",
      author: "Jchmrt",
      source: file("Sunset Toronto Skyline Panorama Crop from Snake Island.jpg"),
      ...bySa4,
    },
    {
      image: "/destinations/views/ca-vancouver.webp",
      location: "Granville Island · Vancouver",
      alt: "Vancouver skyline and Burrard Street Bridge beyond Granville Island",
      author: "DXR",
      source: file("Vancouver Skyline, Granville Island and Burrard St Bridge 20240831 1.jpg"),
      ...bySa4,
    },
  ],
  AU: [
    {
      image: "/destinations/views/au-sydney.webp",
      location: "Circular Quay · Sydney",
      alt: "Sydney Harbour Bridge illuminated at night above harbour water",
      author: "JJ Harrison",
      source: file("Sydney Harbour Bridge from Circular Quay.jpg"),
      ...bySa3,
    },
    {
      image: "/destinations/views/au-melbourne.webp",
      location: "Princes Bridge · Melbourne",
      alt: "Princes Bridge over the Yarra River with the Melbourne skyline behind it",
      author: "DXR",
      source: file("Princes Bridge and Melbourne skyline, southwest view 20230219 1.jpg"),
      ...bySa4,
    },
  ],
  DE: [
    {
      image: "/destinations/views/de-berlin.webp",
      location: "Brandenburg Gate · Berlin",
      alt: "Brandenburg Gate and its quadriga sculpture in Berlin",
      author: "Norbert Nagel",
      source: file("Brandenburg Gate - Brandenburger Tor - Berlin - Germany - 02.jpg"),
      ...bySa3,
    },
    {
      image: "/destinations/views/de-munich.webp",
      location: "Marienplatz · Munich",
      alt: "New Town Hall at Marienplatz square in Munich",
      author: "Guido Radig",
      source: file("Neues Rathaus in München - Panorama.jpg"),
      ...by3,
    },
  ],
  FR: [
    {
      image: "/destinations/views/fr-paris.webp",
      location: "Trocadéro · Paris",
      alt: "Eiffel Tower seen over the Trocadéro gardens in Paris",
      author: "NonOmnisMoriar",
      source: file("Eiffel tower from trocadero.jpg"),
      ...bySa3,
    },
    {
      image: "/destinations/views/fr-nice.webp",
      location: "Promenade des Anglais · Nice",
      alt: "Pebble beach and blue Mediterranean beside the Promenade des Anglais in Nice",
      author: "Zairon",
      source: file("Nice Promenade des Anglais Plage 3.jpg"),
      ...bySa4,
    },
  ],
  SG: [
    {
      image: "/destinations/views/sg-marina-bay.webp",
      location: "Marina Bay · Singapore",
      alt: "Helix Bridge, Marina Bay Sands and the ArtScience Museum at dusk in Singapore",
      author: "Diego Delso",
      source: file("Puente Helix, museo ArtScience y hotel Marina Bay Sands, Marina Bay, Singapur, 2023-08-17, DD 67-69 HDR.jpg"),
      ...bySa4,
    },
    {
      image: "/destinations/views/sg-supertree.webp",
      location: "Gardens by the Bay · Singapore",
      alt: "Supertree Grove rising over gardens at Gardens by the Bay in Singapore",
      author: "Dietmar Rabich",
      source: file("Singapore (SG), Gardens by the Bay, Supertree Grove -- 2019 -- 4752.jpg"),
      ...bySa4,
    },
  ],
};
