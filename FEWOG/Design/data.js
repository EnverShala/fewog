// FEWOG Fellbach — Bestandsdaten (Demo/Platzhalter)
// Drei Stadtteile mit Adressen und Wohnungs-Kennzahlen.

window.FEWOG_DATA = {
  meta: {
    founded: 1949,
    units: 612,
    members: 1480,
    properties: 27,
    city: "Fellbach",
  },
  districts: [
    {
      id: "kern",
      name: "Fellbach-Kern",
      tagline: "Stadtmitte, Rathaus, Schwabenlandhalle",
      color: "kappelberg",
      // SVG-Pfad (stilisierter Stadtteil — nicht geografisch exakt)
      path: "M 180 160 L 320 140 L 410 170 L 440 250 L 400 330 L 300 350 L 200 320 L 160 240 Z",
      label: { x: 290, y: 245 },
    },
    {
      id: "schmiden",
      name: "Schmiden",
      tagline: "Historischer Ortskern, Kappelberg-Nähe",
      color: "salbei",
      path: "M 440 90 L 580 110 L 620 180 L 580 240 L 470 245 L 430 180 Z",
      label: { x: 520, y: 170 },
    },
    {
      id: "oeffingen",
      name: "Oeffingen",
      tagline: "Ländlich, Streuobstwiesen",
      color: "sand",
      path: "M 580 280 L 700 270 L 750 350 L 700 430 L 590 440 L 540 370 Z",
      label: { x: 645, y: 355 },
    },
  ],
  properties: [
    // Fellbach-Kern
    { id: "p01", district: "kern",  street: "Bahnhofstraße 12–18",   year: 1953, units: 28, rooms: "1–4 Zi.", sanierung: 2019, pos: [240, 220] },
    { id: "p02", district: "kern",  street: "Bismarckstraße 4",       year: 1957, units: 18, rooms: "2–3 Zi.", sanierung: 2021, pos: [310, 200] },
    { id: "p03", district: "kern",  street: "Cannstatter Straße 88",  year: 1962, units: 36, rooms: "2–4 Zi.", sanierung: 2018, pos: [360, 250] },
    { id: "p04", district: "kern",  street: "Eisenbahnstraße 22",     year: 1955, units: 14, rooms: "1–3 Zi.", sanierung: 2017, pos: [275, 280] },
    { id: "p05", district: "kern",  street: "Esslinger Straße 47",    year: 1968, units: 22, rooms: "2–4 Zi.", sanierung: 2022, pos: [230, 305] },
    { id: "p06", district: "kern",  street: "Hintere Straße 9–13",    year: 1951, units: 24, rooms: "1–3 Zi.", sanierung: 2016, pos: [340, 305] },
    { id: "p07", district: "kern",  street: "Stuttgarter Straße 156", year: 1971, units: 42, rooms: "2–4 Zi.", sanierung: 2023, pos: [390, 210] },
    { id: "p08", district: "kern",  street: "Theodor-Heuss-Straße 3", year: 1965, units: 30, rooms: "2–4 Zi.", sanierung: 2020, pos: [200, 250] },
    { id: "p09", district: "kern",  street: "Untere Burgstraße 18",   year: 1958, units: 16, rooms: "1–3 Zi.", sanierung: 2015, pos: [375, 290] },
    { id: "p10", district: "kern",  street: "Wernerstraße 7",         year: 1972, units: 20, rooms: "2–3 Zi.", sanierung: 2024, pos: [285, 245] },

    // Schmiden
    { id: "p11", district: "schmiden", street: "Brühlstraße 11",        year: 1960, units: 18, rooms: "2–4 Zi.", sanierung: 2020, pos: [480, 165] },
    { id: "p12", district: "schmiden", street: "Fellbacher Straße 64",  year: 1955, units: 26, rooms: "1–3 Zi.", sanierung: 2018, pos: [535, 145] },
    { id: "p13", district: "schmiden", street: "Hauptstraße 99",        year: 1969, units: 32, rooms: "2–4 Zi.", sanierung: 2023, pos: [560, 195] },
    { id: "p14", district: "schmiden", street: "Im Brand 5",            year: 1974, units: 14, rooms: "2–3 Zi.", sanierung: 2017, pos: [505, 215] },
    { id: "p15", district: "schmiden", street: "Tannenbergstraße 28",   year: 1963, units: 22, rooms: "1–4 Zi.", sanierung: 2021, pos: [580, 165] },
    { id: "p16", district: "schmiden", street: "Wilhelmstraße 14",      year: 1958, units: 16, rooms: "2–3 Zi.", sanierung: 2019, pos: [470, 200] },

    // Oeffingen
    { id: "p17", district: "oeffingen", street: "Birkenwaldstraße 6",     year: 1976, units: 12, rooms: "2–4 Zi.", sanierung: 2022, pos: [610, 320] },
    { id: "p18", district: "oeffingen", street: "Mühlsteige 21",          year: 1981, units: 18, rooms: "2–4 Zi.", sanierung: 2024, pos: [665, 360] },
    { id: "p19", district: "oeffingen", street: "Pflugfelder Straße 4",   year: 1970, units: 14, rooms: "1–3 Zi.", sanierung: 2019, pos: [595, 380] },
    { id: "p20", district: "oeffingen", street: "Rommelshauser Straße 17", year: 1973, units: 22, rooms: "2–4 Zi.", sanierung: 2023, pos: [690, 305] },
    { id: "p21", district: "oeffingen", street: "Schillerstraße 9",        year: 1967, units: 16, rooms: "2–3 Zi.", sanierung: 2018, pos: [635, 410] },
  ],
};
