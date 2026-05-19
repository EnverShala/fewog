// FEWOG Fellbach — Bestandsdaten (Aktuell, 50 Liegenschaften)
// Alle Adressen von https://www.fewog.de/verwaltung/wohnungsbestand.html

export interface Property {
  id: string;
  district: string;
  street: string;
  year: number;
  units: number;
  rooms: string;
  sanierung: number;
  imageUrl: string;
  pos?: [number, number];
}

export interface District {
  id: string;
  name: string;
  tagline: string;
  color: string;
  path: string;
  label: { x: number; y: number };
}

export interface FewogData {
  meta: {
    founded: number;
    units: number;
    members: number;
    properties: number;
    city: string;
  };
  districts: District[];
  properties: Property[];
}

export const FEWOG_DATA: FewogData = {
  meta: {
    founded: 1949,
    units: 612,
    members: 1480,
    properties: 50,
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
    // Fellbach-Kern (alle 50 Liegenschaften A–Z)
    { id: "p01", district: "kern", street: "Adalbert-Stifter-Weg 3", year: 1990, units: 12, rooms: "2–3 Zi.", sanierung: 2015, imageUrl: "https://www.fewog.de/fileadmin/_processed_/6/6/csm_Adalbert-Stifter-Weg_3_355d3b726b.jpg", pos: [240, 220] },
    { id: "p02", district: "kern", street: "Adalbert-Stifter-Weg 5", year: 1992, units: 14, rooms: "2–3 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/2/3/csm_Adalbert-Stifter-Weg_5_fa3c469536.jpg", pos: [245, 225] },
    { id: "p03", district: "kern", street: "Ahornweg 8/10/12", year: 1975, units: 28, rooms: "2–4 Zi.", sanierung: 2012, imageUrl: "https://www.fewog.de/fileadmin/_processed_/d/d/csm_ahornweg-8-19-12-fewog-wohnungsvermittlung_6327da0c4c.jpg", pos: [310, 200] },
    { id: "p04", district: "kern", street: "Albrecht-Dürer-Weg 31/33", year: 1980, units: 24, rooms: "2–4 Zi.", sanierung: 2016, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [360, 250] },
    { id: "p05", district: "kern", street: "Birkenweg 22/24/26", year: 1978, units: 30, rooms: "2–4 Zi.", sanierung: 2014, imageUrl: "https://www.fewog.de/fileadmin/_processed_/4/4/csm_birkenweg-22-24-26-fewog-wohnungsvermittlung_17fa7e72d5.jpg", pos: [330, 280] },
    { id: "p06", district: "kern", street: "Daimlerstr. 19/21", year: 1965, units: 18, rooms: "1–3 Zi.", sanierung: 2010, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [275, 280] },
    { id: "p07", district: "kern", street: "Eberhardtstr. 77/79/81", year: 1968, units: 36, rooms: "2–4 Zi.", sanierung: 2017, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [230, 305] },
    { id: "p08", district: "kern", street: "Eberhardtstr. 83/85/87", year: 1970, units: 32, rooms: "2–4 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [235, 310] },
    { id: "p09", district: "kern", street: "Friedrich-List-Str. 11/13/15", year: 1972, units: 28, rooms: "2–4 Zi.", sanierung: 2013, imageUrl: "https://www.fewog.de/fileadmin/_processed_/a/7/csm_friedrich-list-strasse-11-13-15-fewog-wohnungsvermittlung_5b414aa052.jpg", pos: [300, 290] },
    { id: "p10", district: "kern", street: "Gartenstr. 77", year: 1955, units: 8, rooms: "1–2 Zi.", sanierung: 2008, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [340, 305] },
    { id: "p11", district: "kern", street: "Gartenstr. 81", year: 1956, units: 10, rooms: "1–2 Zi.", sanierung: 2009, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [345, 310] },
    { id: "p12", district: "kern", street: "Gartenstr. 84/86", year: 1958, units: 16, rooms: "1–3 Zi.", sanierung: 2011, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [350, 315] },
    { id: "p13", district: "kern", street: "Gartenstr. 88/90", year: 1960, units: 18, rooms: "2–3 Zi.", sanierung: 2014, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [355, 320] },
    { id: "p14", district: "kern", street: "Gartenstr. 92/94", year: 1962, units: 20, rooms: "2–3 Zi.", sanierung: 2016, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [360, 325] },
    { id: "p15", district: "kern", street: "Gartenstr. 96", year: 1964, units: 12, rooms: "1–2 Zi.", sanierung: 2013, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [365, 330] },
    { id: "p16", district: "kern", street: "Goldammerweg 12/14", year: 1985, units: 22, rooms: "2–3 Zi.", sanierung: 2020, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [200, 250] },
    { id: "p17", district: "kern", street: "Goldammerweg 16/18", year: 1987, units: 24, rooms: "2–4 Zi.", sanierung: 2021, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [205, 255] },
    { id: "p18", district: "kern", street: "Goldammerweg 28/30", year: 1989, units: 20, rooms: "2–3 Zi.", sanierung: 2022, imageUrl: "https://www.fewog.de/fileadmin/_processed_/0/d/csm_Kleinfeldstr_49_Goldammerweg_28_30_0a9aa1eabb.jpg", pos: [210, 260] },
    { id: "p19", district: "kern", street: "Grünewaldweg 1", year: 1982, units: 16, rooms: "1–3 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [290, 240] },
    { id: "p20", district: "kern", street: "Gutenbergstr. 6/8", year: 1951, units: 14, rooms: "1–2 Zi.", sanierung: 2007, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [375, 290] },
    { id: "p21", district: "kern", street: "Hohenzollernstr. 1/3", year: 1953, units: 18, rooms: "1–3 Zi.", sanierung: 2008, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [390, 210] },
    { id: "p22", district: "kern", street: "Im Hetzen 1/3", year: 1949, units: 12, rooms: "1–2 Zi.", sanierung: 2006, imageUrl: "https://www.fewog.de/fileadmin/_processed_/7/7/csm_Hetzen_1_3_73adba3b17.jpg", pos: [220, 270] },
    { id: "p23", district: "kern", street: "Im Hetzen 2/4", year: 1950, units: 14, rooms: "1–2 Zi.", sanierung: 2007, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [225, 275] },
    { id: "p24", district: "kern", street: "Im Hetzen 6", year: 1952, units: 10, rooms: "1–2 Zi.", sanierung: 2009, imageUrl: "https://www.fewog.de/fileadmin/_processed_/6/1/csm_Hetzen_6_72d6cbaa51.jpg", pos: [230, 280] },
    { id: "p25", district: "kern", street: "Im Hetzen 8", year: 1954, units: 12, rooms: "1–2 Zi.", sanierung: 2010, imageUrl: "https://www.fewog.de/fileadmin/_processed_/7/0/csm_Hetzen_8_0ebe462f75.jpg", pos: [235, 285] },
    { id: "p26", district: "kern", street: "Im Vogelsang 2/4", year: 1976, units: 24, rooms: "2–4 Zi.", sanierung: 2015, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/6/csm_voglesang_2_4_1e58e0714b.jpg", pos: [280, 300] },
    { id: "p27", district: "kern", street: "Im Hetzen 12/14/16", year: 1957, units: 20, rooms: "1–3 Zi.", sanierung: 2011, imageUrl: "https://www.fewog.de/fileadmin/_processed_/d/f/csm_Hetzen_12_14_16_dd7da2e531.jpg", pos: [240, 290] },
    { id: "p28", district: "kern", street: "Kleinfeldstr. 35", year: 1979, units: 16, rooms: "2–3 Zi.", sanierung: 2017, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [270, 320] },
    { id: "p29", district: "kern", street: "Kleinfeldstr. 37", year: 1981, units: 18, rooms: "2–3 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [275, 325] },
    { id: "p30", district: "kern", street: "Kleinfeldstr. 43", year: 1983, units: 20, rooms: "2–4 Zi.", sanierung: 2020, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [280, 330] },
    { id: "p31", district: "kern", street: "Kleinfeldstr. 49", year: 1984, units: 22, rooms: "2–4 Zi.", sanierung: 2021, imageUrl: "https://www.fewog.de/fileadmin/_processed_/0/d/csm_Kleinfeldstr_49_Goldammerweg_28_30_0a9aa1eabb.jpg", pos: [285, 335] },
    { id: "p32", district: "kern", street: "Kleinfeldstr. 55", year: 1986, units: 24, rooms: "2–4 Zi.", sanierung: 2022, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/a/csm_kleinfeldstr_55_goldammerweg_32_34_84dbf63245.jpg", pos: [290, 340] },
    { id: "p33", district: "kern", street: "Lessingstr. 2", year: 1959, units: 16, rooms: "1–3 Zi.", sanierung: 2012, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [320, 210] },
    { id: "p34", district: "kern", street: "Meißner Str. 49/51", year: 1966, units: 20, rooms: "2–3 Zi.", sanierung: 2014, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [340, 230] },
    { id: "p35", district: "kern", street: "Pfarrstr. 84", year: 1961, units: 14, rooms: "1–2 Zi.", sanierung: 2009, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [370, 240] },
    { id: "p36", district: "kern", street: "Pfarrstr. 88", year: 1963, units: 16, rooms: "1–3 Zi.", sanierung: 2010, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [375, 245] },
    { id: "p37", district: "kern", street: "Rembrandtweg 1/3/5", year: 1973, units: 26, rooms: "2–4 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/a/2/csm_rembrandtweg-1-3-5-fewog-wohnungsvermittlung_d11e434805.jpg", pos: [310, 270] },
    { id: "p38", district: "kern", street: "Rembrandtweg 7/9/11", year: 1974, units: 28, rooms: "2–4 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [315, 275] },
    { id: "p39", district: "kern", street: "Rubensweg 2/4/6", year: 1977, units: 30, rooms: "2–4 Zi.", sanierung: 2016, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [330, 260] },
    { id: "p40", district: "kern", street: "Stettener Str. 24", year: 1988, units: 18, rooms: "2–3 Zi.", sanierung: 2023, imageUrl: "https://www.fewog.de/fileadmin/_processed_/7/1/csm_Stettenerstr_24_c19f301c34.jpg", pos: [260, 240] },
    { id: "p41", district: "kern", street: "Stettener Str. 26", year: 1990, units: 16, rooms: "2–3 Zi.", sanierung: 2024, imageUrl: "https://www.fewog.de/fileadmin/_processed_/b/d/csm_Stettenerstr_26_852c610710.jpg", pos: [265, 245] },
    { id: "p42", district: "kern", street: "Stettener Str. 26/1", year: 1991, units: 12, rooms: "1–2 Zi.", sanierung: 2024, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [270, 250] },
    { id: "p43", district: "kern", street: "Tizianweg 11", year: 1967, units: 18, rooms: "1–3 Zi.", sanierung: 2015, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [350, 270] },
    { id: "p44", district: "kern", street: "Ulmenweg 15/17/19/21", year: 1969, units: 32, rooms: "2–4 Zi.", sanierung: 2017, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [320, 300] },
    { id: "p45", district: "kern", street: "Ulmenweg 16/18", year: 1971, units: 24, rooms: "2–4 Zi.", sanierung: 2018, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [325, 305] },
    { id: "p46", district: "kern", street: "Ulmenweg 20/22", year: 1975, units: 26, rooms: "2–4 Zi.", sanierung: 2020, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [330, 310] },
    { id: "p47", district: "kern", street: "Ulmenweg 24/26", year: 1978, units: 28, rooms: "2–4 Zi.", sanierung: 2021, imageUrl: "https://www.fewog.de/fileadmin/_processed_/a/0/csm_ulmenweg-24-26-fewog-wohnungsvermittlung_8d81690ad6.jpg", pos: [335, 315] },
    { id: "p48", district: "kern", street: "Urbanstr. 23", year: 1980, units: 20, rooms: "2–3 Zi.", sanierung: 2019, imageUrl: "https://www.fewog.de/fileadmin/_processed_/e/1/csm_dummy_c2f4919c03.jpg", pos: [300, 250] },
    { id: "p49", district: "kern", street: "Waiblinger Str. 58-64", year: 1994, units: 36, rooms: "2–4 Zi.", sanierung: 2023, imageUrl: "https://www.fewog.de/fileadmin/_processed_/f/5/csm_Waiblingerstr_58_64_7ae569dd18.jpg", pos: [260, 220] },
    { id: "p50", district: "kern", street: "Waiblinger Str. 66", year: 1996, units: 32, rooms: "2–4 Zi.", sanierung: 2024, imageUrl: "https://www.fewog.de/fileadmin/_processed_/0/b/csm_waiblinger-strasse-58-60-62-64-66-fewog-wohnungsvermittlung_7c1b3465ba.jpg", pos: [265, 225] },
  ],
};