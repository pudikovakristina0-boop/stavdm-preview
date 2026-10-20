const stavdmProjectHistory = [
  {
    year: '2021',
    projects: [
      'Envigeo, a.s. · Galvani Home, Bratislava · zateplenie fasády, 4 650 m²',
      'Takenaka, a.s. · Lakeside Park II, Bratislava · murárske práce'
    ]
  },
  {
    year: '2022',
    projects: [
      'Súkromná osoba · Odolená Voda, Česko · dokončenie rodinného domu: zateplenie, SDK, dlažba, obklad, maľba a zámková dlažba',
      'Takenaka, a.s. · Nová Cvernovka, Bratislava · montáž SDK 7 900 m² a epoxidové nátery 620 m²',
      'Súkromná osoba · Přerov, Česko · rekonštrukcia bytu: SDK, dlažba, obklad a maľba',
      'Ingdop, s.r.o. · Tatranská Lomnica · rekonštrukcia fasády, omietka, maľba a nátery, 270 m²',
      'Súkromná osoba · Rajecké Teplice · rekonštrukcia rodinného domu: SDK, zateplenie, obklady, dlažby a maľba',
      'Nebbia, s.r.o. · Žilina · SDK, maľba a zámková dlažba'
    ]
  },
  {
    year: '2023',
    projects: [
      'Metrostav Slovakia, s.r.o. · DOAS Haly, Bratislava · SDK',
      'OC Korzo / obchod KOLO, Bratislava · SDK, maľba a rekonštrukcia',
      'ZŠ Častá · rekonštrukcia SDK a kazetového stropu',
      'SLOSSBAU, s.r.o. · Žilina · murovanie vnútorných priečok',
      'Metrostav Slovakia, s.r.o. · MEVIS Haly, Šamorín · SDK, 1 500 m²',
      'Súkromná osoba · Odolená Voda / Kralupy nad Vltavou, Česko · rekonštrukcia domu: murovanie, SDK, dlažba, obklad a maľba'
    ]
  },
  {
    year: '2024',
    projects: [
      'Metrostav Slovakia, s.r.o. · DOAS Haly, Bratislava · SDK, 2 470 m²',
      'SLOSSBAU, s.r.o. · Žilina · murovanie priečok a zateplenie DB',
      'ITB, s.r.o. / ISE, s.r.o. · polyfunkčný komplex Čerešne, Bratislava · SDK, 7 500 m²',
      'Takenaka, a.s. · Volvo Košice, haly 140 a 170 · montáž SDK, 24 780 m²'
    ]
  },
  {
    year: '2025',
    projects: [
      'Goldbeck Slovensko, s.r.o. · hala Bernolákovo · montáž SDK, 3 600 m²',
      'Konti, s.r.o. · BBC 1 Plus, kancelárie · montáž SDK, 8 200 m²',
      'Súkromná osoba · rodinný dom Rosina pri Žiline · kompletné dokončenie, 145 m²'
    ]
  },
  {
    year: '2026',
    status: 'AKTUÁLNE',
    current: true,
    projects: [
      'Dokončené · Takenaka, a.s. · Volvo Košice · montáž SDK, 6 350 m²',
      'Aktuálne v realizácii · Adifex, a.s. · ubytovacie zariadenie Saratovská 22, Bratislava · montáž SDK, 20 400 m²',
      'Aktuálne v realizácii · Penta Real Estate · Bory Home 3, Bratislava · montáž SDK, 3 980 m²',
      'Aktuálne v realizácii · Strabag · polyfunkčný bytový dom Prior, Liptovský Mikuláš · montáž SDK, 13 650 m²'
    ]
  }
];

document.querySelectorAll('[data-project-history]').forEach(grid => {
  stavdmProjectHistory.forEach(yearData => {
    const article = document.createElement('article');
    if (yearData.current) article.className = 'year-current';

    if (yearData.status) {
      const heading = document.createElement('div');
      const year = document.createElement('strong');
      const status = document.createElement('span');
      year.textContent = yearData.year;
      status.textContent = yearData.status;
      heading.append(year, status);
      article.appendChild(heading);
    } else {
      const year = document.createElement('strong');
      year.textContent = yearData.year;
      article.appendChild(year);
    }

    const list = document.createElement('ul');
    yearData.projects.forEach(project => {
      const item = document.createElement('li');
      item.textContent = project;
      list.appendChild(item);
    });
    article.appendChild(list);
    grid.appendChild(article);
  });
});
