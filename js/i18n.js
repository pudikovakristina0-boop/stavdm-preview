(function () {
  'use strict';

  const STORAGE_KEY = 'stavdm-language';
  const supportedLanguages = new Set(['sk', 'de']);
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  const de = {
    'Domov': 'Startseite',
    'O nás': 'Über uns',
    'Realizácie': 'Referenzen',
    'Služby': 'Leistungen',
    'Partner': 'Partner',
    'pre': 'für',
    'stavebné projekty': 'Bauprojekte',
    'Spoľahlivý partner pre komerčné, priemyselné a verejné': 'Zuverlässiger Partner für gewerbliche, industrielle und öffentliche',
    'stavebné projekty.': 'Bauprojekte.',
    'Naše realizácie': 'Unsere Referenzen',
    'O NÁS': 'ÜBER UNS',
    'Staviame s dôrazom na': 'Wir bauen mit Fokus auf',
    'kvalitu a spoľahlivosť.': 'Qualität und Zuverlässigkeit.',
    'Od roku': 'Seit',
    'realizujeme stavebné a dokončovacie práce pre veľké komerčné, priemyselné aj verejné projekty.': 'realisieren wir Bau- und Ausbauarbeiten für große gewerbliche, industrielle und öffentliche Projekte.',
    'Ku každej zákazke pristupujeme zodpovedne a individuálne s cieľom dosiahnuť spokojnosť obchodného partnera, dodávateľa a zákazníka.': 'Jeden Auftrag bearbeiten wir verantwortungsvoll und individuell – mit dem Ziel, Geschäftspartner, Auftraggeber und Kunden nachhaltig zufriedenzustellen.',
    'Viac o spoločnosti': 'Mehr über unser Unternehmen',
    'NAŠE SLUŽBY': 'UNSERE LEISTUNGEN',
    'Sadrokartón a podhľady': 'Trockenbau und abgehängte Decken',
    'Murovacie práce': 'Mauerarbeiten',
    'Maľovanie': 'Malerarbeiten',
    'Obklady a dlažby': 'Wand- und Bodenfliesen',
    'Zateplenie budov': 'Wärmedämmung von Gebäuden',
    'Zámkové dlažby': 'Verbundpflasterarbeiten',
    'NAŠE REALIZÁCIE': 'UNSERE REFERENZEN',
    'Všetky realizácie': 'Alle Referenzen',
    'PREHĽAD REALIZÁCIÍ': 'REFERENZÜBERSICHT',
    'Realizácie stavieb': 'Bauprojekte',
    'v poslednom období.': 'der vergangenen Jahre.',
    'Kompletný prehľad realizácií je dostupný po povolení JavaScriptu.': 'Die vollständige Referenzübersicht ist verfügbar, sobald JavaScript aktiviert ist.',
    'rok založenia': 'Gründungsjahr',
    'rokov skúseností': 'Jahre Erfahrung',
    'm² doloženého rozsahu prác': 'm² dokumentierter Leistungsumfang',
    'MAPA REALIZÁCIÍ': 'PROJEKTKARTE',
    'Projekty realizované na': 'Realisierte Projekte in',
    'Slovensku a v Čechách': 'der Slowakei und Tschechien',
    'Dokončenie rodinného domu': 'Fertigstellung eines Einfamilienhauses',
    'Rekonštrukcia domu': 'Sanierung eines Wohnhauses',
    'Rekonštrukcia bytu': 'Wohnungssanierung',
    'Rekonštrukcia rodinného domu': 'Sanierung eines Einfamilienhauses',
    'Nebbia · murovanie priečok · zateplenie DB': 'Nebbia · Mauern von Trennwänden · Dämmung eines Wohngebäudes',
    'Rekonštrukcia fasády': 'Fassadensanierung',
    'SPOLUPRÁCA': 'ZUSAMMENARBEIT',
    'Máte záujem': 'Interesse an einer',
    'o spoluprácu?': 'Zusammenarbeit?',
    'Neváhajte nás kontaktovať. Radi s vami preberieme všetky možnosti a detaily.': 'Kontaktieren Sie uns. Gerne besprechen wir mit Ihnen alle Möglichkeiten und Details.',
    'Kontaktovať nás': 'Kontakt aufnehmen',
    'Partner pre komerčné, priemyselné a verejné stavebné projekty.': 'Partner für gewerbliche, industrielle und öffentliche Bauprojekte.',
    'IČO: 438 523 19 · IČ DPH: SK 2022 511 953': 'Firmen-ID (IČO): 438 523 19 · USt-IdNr.: SK 2022 511 953',
    'IČO: 438 523 19': 'Firmen-ID (IČO): 438 523 19',
    'IČ DPH: SK 2022 511 953': 'USt-IdNr.: SK 2022 511 953',

    'O SPOLOČNOSTI StavDM s.r.o.': 'ÜBER StavDM s.r.o.',
    'Stavebné realizácie': 'Bauausführungen',
    'od roku 2008.': 'seit 2008.',
    'Realizujeme stavebné a dokončovacie práce pre komerčné, priemyselné aj verejné projekty na Slovensku a v Česku.': 'Wir führen Bau- und Ausbauarbeiten für gewerbliche, industrielle und öffentliche Projekte in der Slowakei und in Tschechien aus.',
    'Spoznajte náš príbeh': 'Lernen Sie unsere Geschichte kennen',
    'Kvalita': 'Qualität',
    'a spoľahlivosť': 'und Zuverlässigkeit',
    'v každom projekte.': 'bei jedem Projekt.',
    'Staviame kvalitne a spoľahlivo od roku 2008.': 'Seit 2008 bauen wir qualitätsbewusst und zuverlässig.',
    'NÁŠ PRÍBEH': 'UNSERE GESCHICHTE',
    'Firma StavDM, s.r.o. pôsobí na trhu od roku 2008 a venuje sa stavebným prácam na Slovensku a v Čechách. Svoje pôsobenie postupne rozširuje s dôrazom na kvalitu, spoľahlivosť a profesionálny prístup.': 'StavDM, s.r.o. ist seit 2008 am Markt tätig und führt Bauarbeiten in der Slowakei und in Tschechien aus. Dabei erweitern wir unser Tätigkeitsfeld kontinuierlich – mit konsequentem Fokus auf Qualität, Zuverlässigkeit und eine professionelle Arbeitsweise.',
    'Za roky pôsobenia sme získali množstvo skúseností a vybudovali si stabilné vzťahy so zákazníkmi a obchodnými partnermi. Našou prioritou je kvalitne a spoľahlivo odvedená práca, spokojnosť zákazníkov a dodržiavanie dohodnutých termínov.': 'Im Laufe der Jahre haben wir umfassende Erfahrung gesammelt und langfristige Beziehungen zu Kunden und Geschäftspartnern aufgebaut. Unsere Prioritäten sind eine fachgerechte, zuverlässige Ausführung, zufriedene Kunden und die Einhaltung vereinbarter Termine.',
    'PREDSTAVITELIA SPOLOČNOSTI': 'GESCHÄFTSLEITUNG',
    'Spoznajte vedenie': 'Lernen Sie die Geschäftsleitung von',
    'Fotografia zamestnanca': 'Mitarbeiterfoto',
    'Konateľ': 'Geschäftsführer',
    'Zástupca konateľa': 'Stellvertretender Geschäftsführer',

    'Každý detail má': 'Jedes Detail',
    'svoj význam.': 'macht den Unterschied.',
    'Od sadrokartónu a murovania až po fasády a spevnené plochy. Spoľahlivo, precízne a s dôrazom na kvalitný výsledok.': 'Vom Trockenbau und Mauerwerk bis zu Fassaden und befestigten Flächen. Zuverlässig, präzise und mit dem Anspruch an ein hochwertiges Ergebnis.',
    'Pozrite si naše služby': 'Unsere Leistungen entdecken',
    'ROZSAH PRÁC': 'LEISTUNGSSPEKTRUM',
    'Všetko pod jednou strechou.': 'Alles aus einer Hand.',
    'Zabezpečujeme stavebné a dokončovacie práce pre komerčné, priemyselné, verejné aj súkromné projekty.': 'Wir übernehmen Bau- und Ausbauarbeiten für gewerbliche, industrielle, öffentliche und private Projekte.',
    'Sadrokartónové konštrukcie a podhľady': 'Trockenbaukonstruktionen und abgehängte Decken',
    'Kazetové stropy': 'Rasterdecken',
    'Murovanie priečok': 'Mauern von Trennwänden',
    'Realizácia murovaných konštrukcií': 'Herstellung von Mauerwerkskonstruktionen',
    'Úpravy a dispozičné zmeny priestorov': 'Umbauten und Grundrissanpassungen',
    'Maľovanie stien a stropov': 'Malerarbeiten an Wänden und Decken',
    'Ručné nanášanie náterov': 'Manueller Farbauftrag',
    'Strojové striekanie náterov': 'Maschineller Spritzauftrag',
    'Pokládka obkladov a dlažieb': 'Verlegung von Wand- und Bodenfliesen',
    'Dokončovacie práce v interiéri aj exteriéri': 'Ausbauarbeiten im Innen- und Außenbereich',
    'Zatepľovanie fasád': 'Fassadendämmung',
    'Kompletné práce spojené so zateplením objektov': 'Komplettleistungen rund um die Gebäudedämmung',
    'Pokládka zámkovej dlažby': 'Verlegung von Verbundpflaster',
    'Realizácia spevnených plôch a chodníkov': 'Herstellung befestigter Flächen und Gehwege',

    'Projekty, ktoré': 'Projekte, die',
    'hovoria za nás.': 'für uns sprechen.',
    'Pozrite si realizácie komerčných, priemyselných, verejných aj rezidenčných projektov na Slovensku a v Čechách.': 'Entdecken Sie unsere gewerblichen, industriellen, öffentlichen und Wohnbauprojekte in der Slowakei und in Tschechien.',
    'Pozrite si naše projekty': 'Unsere Projekte ansehen',
    'Aktuálne v realizácii': 'Aktuell in Ausführung',
    'AKTUÁLNE': 'AKTUELL',
    'Katalóg projektov': 'Projektkatalog',
    'Vybrané projekty a fotogalérie.': 'Ausgewählte Projekte und Fotogalerien.',
    'Na zobrazenie galérií je potrebné povoliť JavaScript.': 'Zum Anzeigen der Galerien muss JavaScript aktiviert sein.',

    '← Všetky realizácie': '← Alle Referenzen',
    'Realizácia': 'Referenz',
    'O REALIZÁCII': 'ÜBER DAS PROJEKT',
    'Kvalita viditeľná': 'Sichtbare Qualität',
    'v každom detaile.': 'bis ins Detail.',
    'Lokalita': 'Standort',
    'Rok': 'Jahr',
    'Typ projektu': 'Projektart',
    'Fotografie': 'Fotos',
    'FOTOGALÉRIA': 'FOTOGALERIE',
    'Priebeh a výsledok realizácie.': 'Ausführung und Ergebnis im Überblick.',
    'REALIZÁCIA': 'REFERENZ',
    'Projekt sa nenašiel.': 'Projekt nicht gefunden.',
    'Späť na všetky realizácie →': 'Zurück zu allen Referenzen →',

    'NAPÍŠTE NÁM': 'SCHREIBEN SIE UNS',
    'Povedzte nám o vašom projekte.': 'Erzählen Sie uns von Ihrem Projekt.',
    'Máte projekt, otázku alebo záujem o spoluprácu? Napíšte nám. Prejdeme si s vami všetky možnosti a ozveme sa čo najskôr.': 'Haben Sie ein Projekt, eine Frage oder Interesse an einer Zusammenarbeit? Schreiben Sie uns. Wir besprechen mit Ihnen alle Möglichkeiten und melden uns schnellstmöglich.',
    'Meno a priezvisko': 'Vor- und Nachname',
    'Meno': 'Name',
    'Telefón': 'Telefon',
    'Správa': 'Nachricht',
    'Správa:': 'Nachricht:',
    'neuvedený': 'nicht angegeben',
    'Pripraviť e-mail': 'E-Mail vorbereiten',
    'Po kliknutí sa otvorí váš e-mailový program. Správa sa neodošle automaticky.': 'Nach dem Klick öffnet sich Ihr E-Mail-Programm. Die Nachricht wird nicht automatisch gesendet.',
    'Otváram váš e-mailový program. Správu odošlete až po vlastnom potvrdení.': 'Ihr E-Mail-Programm wird geöffnet. Die Nachricht wird erst nach Ihrer Bestätigung gesendet.',
    'Dopyt z webu StavDM': 'Anfrage über die StavDM-Website',
    'Vyplňte, prosím, toto pole.': 'Bitte füllen Sie dieses Feld aus.',
    'Zadajte platnú e-mailovú adresu.': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    'PRIAMY KONTAKT': 'DIREKTER KONTAKT',
    'Ako vám môžeme pomôcť?': 'Wie können wir Ihnen helfen?',

    'Priemyselný projekt': 'Industrieprojekt',
    'Komerčný projekt': 'Gewerbeprojekt',
    'Rezidenčný projekt': 'Wohnbauprojekt',
    'Polyfunkčný projekt': 'Mischnutzungsprojekt',
    'Verejný projekt': 'Öffentliches Bauprojekt',
    'Archív': 'Archiv',
    '2024 a 2026': '2024 und 2026',
    'V roku 2024 montáž sadrokartónových konštrukcií v halách 140 a 170 v rozsahu 24 780 m²; v roku 2026 montáž SDK v rozsahu 6 350 m².': '2024 Montage von Trockenbaukonstruktionen in den Hallen 140 und 170 mit einem Umfang von 24.780 m²; 2026 weitere Trockenbauarbeiten mit einem Umfang von 6.350 m².',
    'Realizácia sadrokartónových konštrukcií v moderných kancelárskych priestoroch v rozsahu 8 200 m².': 'Ausführung von Trockenbaukonstruktionen in modernen Büroflächen mit einem Umfang von 8.200 m².',
    'Kompletné dokončovacie práce na rodinnom dome v rozsahu 145 m² vrátane interiérových povrchov a konštrukcií.': 'Komplette Ausbauarbeiten an einem Einfamilienhaus mit 145 m², einschließlich Innenoberflächen und Konstruktionen.',
    'Realizácia sadrokartónových konštrukcií v rokoch 2023 a 2024; pre rok 2024 je doložený rozsah 2 470 m².': 'Ausführung von Trockenbaukonstruktionen in den Jahren 2023 und 2024; für 2024 ist ein Umfang von 2.470 m² dokumentiert.',
    'Sadrokartónové práce na polyfunkčnom komplexe Čerešne v rozsahu 7 500 m².': 'Trockenbauarbeiten am gemischt genutzten Komplex Čerešne mit einem Umfang von 7.500 m².',
    'Rekonštrukcia fasády železničnej stanice, omietky, maľby a nátery v rozsahu 270 m².': 'Sanierung der Bahnhofsfassade einschließlich Putz-, Maler- und Beschichtungsarbeiten auf 270 m².',
    'Zateplenie a realizácia fasády bytového projektu Galvani Home v rozsahu 4 650 m².': 'Wärmedämmung und Fassadenausführung für das Wohnprojekt Galvani Home auf 4.650 m².',
    'Murárske a súvisiace stavebné práce na administratívnom komplexe Lakeside Park II.': 'Mauerarbeiten und zugehörige Bauleistungen am Bürokomplex Lakeside Park II.',
    'Stavebné a dokončovacie práce v priestoroch základnej a materskej školy.': 'Bau- und Ausbauarbeiten in den Räumen einer Grundschule und eines Kindergartens.',
    'Stavebné a dokončovacie práce na rezidenčnom projekte Euroterrace v Žiline.': 'Bau- und Ausbauarbeiten am Wohnprojekt Euroterrace in Žilina.',
    'Stavebné a dokončovacie práce v areáli základnej a materskej školy v Budatíne.': 'Bau- und Ausbauarbeiten auf dem Gelände der Grundschule und des Kindergartens in Budatín.',
    'Realizácia kazetových stropov a interiérových dokončovacích prác v akademickej knižnici.': 'Ausführung von Rasterdecken und Innenausbauarbeiten in der akademischen Bibliothek.',

    'Envigeo, a.s. · Galvani Home, Bratislava · zateplenie fasády, 4 650 m²': 'Envigeo, a.s. · Galvani Home, Bratislava · Fassadendämmung, 4.650 m²',
    'Takenaka, a.s. · Lakeside Park II, Bratislava · murárske práce': 'Takenaka, a.s. · Lakeside Park II, Bratislava · Mauerarbeiten',
    'Súkromná osoba · Odolená Voda, Česko · dokončenie rodinného domu: zateplenie, SDK, dlažba, obklad, maľba a zámková dlažba': 'Privatauftraggeber · Odolená Voda, Tschechien · Fertigstellung eines Einfamilienhauses: Wärmedämmung, Trockenbau, Boden- und Wandfliesen, Malerarbeiten und Verbundpflaster',
    'Takenaka, a.s. · Nová Cvernovka, Bratislava · montáž SDK 7 900 m² a epoxidové nátery 620 m²': 'Takenaka, a.s. · Nová Cvernovka, Bratislava · Montage von Trockenbaukonstruktionen, 7.900 m², und Epoxidbeschichtungen, 620 m²',
    'Súkromná osoba · Přerov, Česko · rekonštrukcia bytu: SDK, dlažba, obklad a maľba': 'Privatauftraggeber · Přerov, Tschechien · Wohnungssanierung: Trockenbau, Boden- und Wandfliesen sowie Malerarbeiten',
    'Ingdop, s.r.o. · Tatranská Lomnica · rekonštrukcia fasády, omietka, maľba a nátery, 270 m²': 'Ingdop, s.r.o. · Tatranská Lomnica · Fassadensanierung, Putz-, Maler- und Beschichtungsarbeiten, 270 m²',
    'Súkromná osoba · Rajecké Teplice · rekonštrukcia rodinného domu: SDK, zateplenie, obklady, dlažby a maľba': 'Privatauftraggeber · Rajecké Teplice · Sanierung eines Einfamilienhauses: Trockenbau, Wärmedämmung, Wand- und Bodenfliesen sowie Malerarbeiten',
    'Nebbia, s.r.o. · Žilina · SDK, maľba a zámková dlažba': 'Nebbia, s.r.o. · Žilina · Trockenbau, Malerarbeiten und Verbundpflaster',
    'Metrostav Slovakia, s.r.o. · DOAS Haly, Bratislava · SDK': 'Metrostav Slovakia, s.r.o. · DOAS Haly, Bratislava · Trockenbau',
    'OC Korzo / obchod KOLO, Bratislava · SDK, maľba a rekonštrukcia': 'OC Korzo / Geschäft KOLO, Bratislava · Trockenbau, Malerarbeiten und Sanierung',
    'ZŠ Častá · rekonštrukcia SDK a kazetového stropu': 'ZŠ Častá · Sanierung von Trockenbaukonstruktionen und Rasterdecke',
    'SLOSSBAU, s.r.o. · Žilina · murovanie vnútorných priečok': 'SLOSSBAU, s.r.o. · Žilina · Mauern von Innenwänden',
    'Metrostav Slovakia, s.r.o. · MEVIS Haly, Šamorín · SDK, 1 500 m²': 'Metrostav Slovakia, s.r.o. · MEVIS Haly, Šamorín · Trockenbau, 1.500 m²',
    'Súkromná osoba · Odolená Voda / Kralupy nad Vltavou, Česko · rekonštrukcia domu: murovanie, SDK, dlažba, obklad a maľba': 'Privatauftraggeber · Odolená Voda / Kralupy nad Vltavou, Tschechien · Haussanierung: Mauerwerk, Trockenbau, Boden- und Wandfliesen sowie Malerarbeiten',
    'Metrostav Slovakia, s.r.o. · DOAS Haly, Bratislava · SDK, 2 470 m²': 'Metrostav Slovakia, s.r.o. · DOAS Haly, Bratislava · Trockenbau, 2.470 m²',
    'SLOSSBAU, s.r.o. · Žilina · murovanie priečok a zateplenie DB': 'SLOSSBAU, s.r.o. · Žilina · Mauern von Trennwänden und Dämmung eines Wohngebäudes',
    'ITB, s.r.o. / ISE, s.r.o. · polyfunkčný komplex Čerešne, Bratislava · SDK, 7 500 m²': 'ITB, s.r.o. / ISE, s.r.o. · Mischnutzungskomplex Čerešne, Bratislava · Trockenbau, 7.500 m²',
    'Takenaka, a.s. · Volvo Košice, haly 140 a 170 · montáž SDK, 24 780 m²': 'Takenaka, a.s. · Volvo Košice, Hallen 140 und 170 · Montage von Trockenbaukonstruktionen, 24.780 m²',
    'Goldbeck Slovensko, s.r.o. · hala Bernolákovo · montáž SDK, 3 600 m²': 'Goldbeck Slovensko, s.r.o. · Halle Bernolákovo · Montage von Trockenbaukonstruktionen, 3.600 m²',
    'Konti, s.r.o. · BBC 1 Plus, kancelárie · montáž SDK, 8 200 m²': 'Konti, s.r.o. · BBC 1 Plus, Büroflächen · Montage von Trockenbaukonstruktionen, 8.200 m²',
    'Súkromná osoba · rodinný dom Rosina pri Žiline · kompletné dokončenie, 145 m²': 'Privatauftraggeber · Einfamilienhaus Rosina bei Žilina · kompletter Ausbau, 145 m²',
    'Dokončené · Takenaka, a.s. · Volvo Košice · montáž SDK, 6 350 m²': 'Abgeschlossen · Takenaka, a.s. · Volvo Košice · Montage von Trockenbaukonstruktionen, 6.350 m²',
    'Aktuálne v realizácii · Adifex, a.s. · ubytovacie zariadenie Saratovská 22, Bratislava · montáž SDK, 20 400 m²': 'Aktuell in Ausführung · Adifex, a.s. · Beherbergungsgebäude Saratovská 22, Bratislava · Montage von Trockenbaukonstruktionen, 20.400 m²',
    'Aktuálne v realizácii · Penta Real Estate · Bory Home 3, Bratislava · montáž SDK, 3 980 m²': 'Aktuell in Ausführung · Penta Real Estate · Bory Home 3, Bratislava · Montage von Trockenbaukonstruktionen, 3.980 m²',
    'Aktuálne v realizácii · Strabag · polyfunkčný bytový dom Prior, Liptovský Mikuláš · montáž SDK, 13 650 m²': 'Aktuell in Ausführung · Strabag · polyfunktionales Wohngebäude Prior, Liptovský Mikuláš · Montage von Trockenbaukonstruktionen, 13.650 m²',

    'StavDM – stavebné realizácie na Slovensku a v Čechách.': 'StavDM – professionelle Bauausführungen in der Slowakei und in Tschechien.',
    'StavDM | Stavebné realizácie': 'StavDM | Bauausführungen',
    'Spoznajte spoločnosť StavDM, s.r.o., jej skúsenosti a vedenie. Stavebné realizácie na Slovensku a v Česku od roku 2008.': 'Lernen Sie StavDM, s.r.o., seine Erfahrung und Geschäftsleitung kennen. Bauausführungen in der Slowakei und in Tschechien seit 2008.',
    'O nás | StavDM': 'Über uns | StavDM',
    'Sadrokartón, murovanie, maľovanie, obklady, zateplenie a zámkové dlažby od StavDM.': 'Trockenbau, Mauer-, Maler- und Fliesenarbeiten, Wärmedämmung und Verbundpflaster von StavDM.',
    'Služby | StavDM': 'Leistungen | StavDM',
    'Kompletný prehľad stavebných realizácií StavDM': 'Vollständige Übersicht der von StavDM ausgeführten Bauprojekte.',
    'Aktuálne a dokončené stavebné projekty StavDM na Slovensku a v Česku. Fotogalérie a prehľad stavebných realizácií StavDM': 'Aktuelle und abgeschlossene Bauprojekte von StavDM in der Slowakei und in Tschechien. Fotogalerien und Referenzübersicht.',
    'Projekty a realizácie | StavDM': 'Projekte und Referenzen | StavDM',
    'Fotogaléria stavebnej realizácie spoločnosti StavDM.': 'Fotogalerie eines von StavDM ausgeführten Bauprojekts.',
    'Realizácia | StavDM': 'Referenz | StavDM',
    'Kontaktujte StavDM. Radi s vami preberieme váš stavebný projekt, jeho možnosti a všetky dôležité detaily.': 'Kontaktieren Sie StavDM. Gerne besprechen wir Ihr Bauprojekt, die möglichen Lösungen und alle wichtigen Details.',

    'Otvoriť menu': 'Menü öffnen',
    'Zavrieť menu': 'Menü schließen',
    'Hlavná navigácia': 'Hauptnavigation',
    'Prehľad služieb StavDM': 'Leistungsübersicht von StavDM',
    'Vybrané realizácie': 'Ausgewählte Referenzen',
    'Ovládanie slidera': 'Karussellsteuerung',
    'Predchádzajúce realizácie': 'Vorherige Referenzen',
    'Ďalšie realizácie': 'Weitere Referenzen',
    'StavDM v číslach': 'StavDM in Zahlen',
    'Mapa realizácií StavDM v Česku a na Slovensku': 'Karte der StavDM-Projekte in Tschechien und der Slowakei',
    'Lokality realizácií': 'Projektstandorte',
    'Ukážky stavebných realizácií StavDM': 'Beispiele ausgeführter Bauprojekte von StavDM',
    'Kontaktný formulár a kontakty': 'Kontaktformular und Ansprechpartner',
    'Náhľad fotografie': 'Fotoansicht',
    'Zavrieť náhľad': 'Fotoansicht schließen',
    'Predchádzajúca fotografia': 'Vorheriges Foto',
    'Nasledujúca fotografia': 'Nächstes Foto',
    'Administratívny komplex BBC v Bratislave': 'Bürokomplex BBC in Bratislava',
    'Výstavba projektu Čerešne Residence': 'Bau des Projekts Čerešne Residence',
    'Rozostavaný bytový dom Euroterrace v Žiline': 'Wohngebäude Euroterrace im Bau in Žilina',
    'Pracovník StavDM pri realizácii muriva': 'StavDM-Mitarbeiter bei Mauerarbeiten',
    'Letecký pohľad na priemyselné haly DOAS': 'Luftaufnahme der Industriehallen DOAS',
    'Priestor pre fotografiu Dušana Majerčíka': 'Platzhalter für ein Foto von Dušan Majerčík',
    'Priestor pre fotografiu Lukáša Majerčíka': 'Platzhalter für ein Foto von Lukáš Majerčík',
    'Priestor pre fotografiu Dušana Majerčíka ml.': 'Platzhalter für ein Foto von Dušan Majerčík jun.',
    'Vežové žeriavy nad rozostavanou administratívnou budovou': 'Turmdrehkräne über einem Bürogebäude im Bau',
    'Zatepľovanie fasády budovy': 'Wärmedämmung einer Gebäudefassade',
    'Moderný bytový komplex s mestským námestím': 'Moderner Wohnkomplex mit urbanem Platz'
  };

  const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();

  const readStoredLanguage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return supportedLanguages.has(stored) ? stored : 'sk';
    } catch {
      return 'sk';
    }
  };

  let currentLanguage = readStoredLanguage();
  document.documentElement.lang = currentLanguage;
  document.documentElement.dataset.language = currentLanguage;

  const translatePattern = value => {
    let match = value.match(/^Pozrieť realizáciu (.+)$/);
    if (match) return `Referenz ${match[1]} ansehen`;
    match = value.match(/^Otvoriť fotografiu (\d+)$/);
    if (match) return `Foto ${match[1]} öffnen`;
    match = value.match(/^(.+) – fotografia (\d+)$/);
    if (match) return `${match[1]} – Foto ${match[2]}`;
    match = value.match(/^(\d+) fotografií$/);
    if (match) return `${match[1]} Fotos`;
    return null;
  };

  const t = (source, language = currentLanguage) => {
    if (language !== 'de') return source;
    const normalized = normalize(source);
    return de[normalized] || translatePattern(normalized) || source;
  };

  const withOriginalWhitespace = (original, translated) => {
    if (translated === original) return original;
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    return `${leading}${translated}${trailing}`;
  };

  const translateTextNode = node => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const normalized = normalize(source);
    if (!normalized) return;
    const translated = t(normalized);
    node.nodeValue = currentLanguage === 'de'
      ? withOriginalWhitespace(source, translated)
      : source;
  };

  const translatableAttributes = ['aria-label', 'placeholder', 'title', 'alt'];
  const translateElementAttributes = element => {
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = new Map();
      originalAttributes.set(element, originals);
    }

    translatableAttributes.forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      if (!originals.has(attribute)) originals.set(attribute, element.getAttribute(attribute));
      const source = originals.get(attribute);
      element.setAttribute(attribute, currentLanguage === 'de' ? t(source) : source);
    });
  };

  const translateTree = root => {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) {
      const element = root;
      if (element.matches('script, style, .material-symbols-outlined')) return;
      translateElementAttributes(element);
    }

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.matches('script, style, .material-symbols-outlined')
          ) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      else translateElementAttributes(node);
      node = walker.nextNode();
    }
  };

  const updateMetadata = () => {
    const title = document.querySelector('title');
    if (title) translateTree(title);
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      let originals = originalAttributes.get(description);
      if (!originals) {
        originals = new Map();
        originalAttributes.set(description, originals);
      }
      if (!originals.has('content')) originals.set('content', description.content);
      const source = originals.get('content');
      description.content = currentLanguage === 'de' ? t(source) : source;
    }
  };

  const updateLanguageSwitcher = () => {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return;
    switcher.setAttribute('aria-label', currentLanguage === 'de' ? 'Sprachauswahl' : 'Výber jazyka');
    switcher.querySelectorAll('button[data-language]').forEach(button => {
      const isActive = button.dataset.language === currentLanguage;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute(
        'aria-label',
        button.dataset.language === 'sk'
          ? (currentLanguage === 'de' ? 'Slowakisch auswählen' : 'Zvoliť slovenčinu')
          : (currentLanguage === 'de' ? 'Deutsch auswählen' : 'Zvoliť nemčinu')
      );
    });
  };

  const applyLanguage = () => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dataset.language = currentLanguage;
    translateTree(document.body);
    updateMetadata();
    updateLanguageSwitcher();
  };

  const setLanguage = language => {
    if (!supportedLanguages.has(language)) return;
    currentLanguage = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The selected language still applies for the current page.
    }
    applyLanguage();
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(field => {
      field.setCustomValidity('');
    });
    window.dispatchEvent(new CustomEvent('stavdm:languagechange', { detail: { language } }));
  };

  const createLanguageSwitcher = () => {
    const navigation = document.querySelector('.main-nav');
    if (!navigation || navigation.querySelector('.language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('role', 'group');

    ['sk', 'de'].forEach((language, index) => {
      if (index) {
        const separator = document.createElement('span');
        separator.className = 'language-separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '|';
        switcher.appendChild(separator);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.language = language;
      button.lang = language;
      button.textContent = language.toUpperCase();
      button.addEventListener('click', () => setLanguage(language));
      switcher.appendChild(button);
    });

    navigation.appendChild(switcher);
  };

  const initialize = () => {
    createLanguageSwitcher();
    applyLanguage();
  };

  window.StavDMI18n = {
    getLanguage: () => currentLanguage,
    setLanguage,
    t,
    formatNumber(value) {
      return new Intl.NumberFormat(currentLanguage === 'de' ? 'de-DE' : 'sk-SK').format(value);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
