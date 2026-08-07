import React, { useState, useMemo, useRef, useEffect, useLayoutEffect } from "react";

const DATA = {
  items: [
    { id: "veh_001", tipo: "veicolo", nome: "Furgone Corazzato (esempio)", rarita: "raro", modalita: "online", descrizione: "Veicolo resistente con blindatura leggera, utile per missioni di trasporto.", come_ottenerlo: "Completare una serie di consegne senza danni al veicolo.", location_id: "loc_001", tags: ["corazzato", "lento", "resistente"] },
    { id: "arma_001", tipo: "arma", nome: "Fucile a Pompa Modificato (esempio)", rarita: "leggendario", modalita: "storia", descrizione: "Versione potenziata trovabile solo in un capitolo specifico.", come_ottenerlo: "Nascosta in un edificio abbandonato, richiede di esplorare fuori dai percorsi principali.", location_id: "loc_002", tags: ["capitolo 2", "danno alto"] },
    { id: "coll_001", tipo: "collezionabile", nome: "Statuetta Nascosta (esempio)", rarita: "unico", modalita: "entrambe", descrizione: "Una delle 20 statuette da collezionare sparse per la mappa.", come_ottenerlo: "Trovarla esplorando l'area costiera.", location_id: "loc_003", tags: ["collezione", "costa"] },
    { id: "veh_002", tipo: "veicolo", nome: "Moto d'Acqua Sportiva (esempio)", rarita: "comune", modalita: "entrambe", descrizione: "Veloce in acqua, ottima per fughe lungo la costa.", come_ottenerlo: "Disponibile presso il molo turistico.", location_id: "loc_004", tags: ["acqua", "veloce"] },
    { id: "arma_002", tipo: "arma", nome: "Pistola Silenziata (esempio)", rarita: "raro", modalita: "online", descrizione: "Ideale per approcci furtivi nelle missioni cooperative.", come_ottenerlo: "Ricompensa completando una rapina senza allarmi.", location_id: "loc_005", tags: ["furtivo"] },
    { id: "veh_003", tipo: "veicolo", nome: "Auto Sportiva Rubata (esempio)", rarita: "leggendario", modalita: "entrambe", descrizione: "Supercar unica avvistata parcheggiata sulle colline, sparisce se non recuperata in fretta.", come_ottenerlo: "Raggiungere le colline panoramiche prima che il proprietario torni.", location_id: "loc_006", tags: ["colline", "unica", "veloce"] },
    { id: "veh_004", tipo: "veicolo", nome: "Fuoristrada Militare (esempio)", rarita: "raro", modalita: "online", descrizione: "Mezzo blindato requisito da una base militare, ottimo fuoristrada.", come_ottenerlo: "Introdursi nella zona militare recintata senza farsi scoprire.", location_id: "loc_007", tags: ["militare", "blindato"] },
    { id: "veh_005", tipo: "veicolo", nome: "Elicottero Abbandonato (esempio)", rarita: "leggendario", modalita: "storia", descrizione: "Elicottero lasciato in cima a un rilievo, funzionante ma senza pieno.", come_ottenerlo: "Salire in cima al punto panoramico più alto della mappa.", location_id: "loc_008", tags: ["montagna", "volo"] },
    { id: "arma_003", tipo: "arma", nome: "Mazza da Baseball Speciale (esempio)", rarita: "raro", modalita: "entrambe", descrizione: "Mazza personalizzata con incisioni, trovata in un vicolo pieno di graffiti.", come_ottenerlo: "Cercare dietro i cassonetti nel vicolo tra i murales.", location_id: "loc_009", tags: ["vicolo", "corpo a corpo"] },
    { id: "arma_004", tipo: "arma", nome: "Lanciarazzi Nascosto (esempio)", rarita: "leggendario", modalita: "online", descrizione: "Arma pesante custodita in un deposito militare sorvegliato.", come_ottenerlo: "Superare i controlli della base senza allarmare le sentinelle.", location_id: "loc_010", tags: ["militare", "danno alto"] },
    { id: "arma_005", tipo: "arma", nome: "Coltello da Caccia Unico (esempio)", rarita: "raro", modalita: "storia", descrizione: "Coltello artigianale nascosto in una zona rurale isolata.", come_ottenerlo: "Esplorare le campagne a ovest lontano dalle strade principali.", location_id: "loc_011", tags: ["campagna", "corpo a corpo"] },
    { id: "coll_002", tipo: "collezionabile", nome: "Murale Misterioso (esempio)", rarita: "unico", modalita: "entrambe", descrizione: "Un murale sulle colline che sembra nascondere un indizio più grande.", come_ottenerlo: "Fotografarlo da un punto di osservazione preciso sulle colline.", location_id: "loc_012", tags: ["mistero", "colline"] },
    { id: "coll_003", tipo: "collezionabile", nome: "Avvistamento Insolito (esempio)", rarita: "leggendario", modalita: "entrambe", descrizione: "Una luce strana avvistata più volte in una zona remota, di notte.", come_ottenerlo: "Tornare nella zona remota tra mezzanotte e le tre di notte.", location_id: "loc_013", tags: ["mistero", "notte", "remoto"] },
    { id: "coll_004", tipo: "collezionabile", nome: "Pacchetto Nascosto (esempio)", rarita: "comune", modalita: "entrambe", descrizione: "Uno dei tanti pacchetti sparsi per la città, in cima a un edificio.", come_ottenerlo: "Salire sul tetto dell'edificio più alto del centro.", location_id: "loc_014", tags: ["collezione", "città"] },
    { id: "coll_005", tipo: "collezionabile", nome: "Creatura Misteriosa nel Bosco (esempio)", rarita: "leggendario", modalita: "storia", descrizione: "Una sagoma insolita avvistata tra gli alberi da alcuni abitanti locali.", come_ottenerlo: "Esplorare il bosco a ovest della mappa in tarda serata.", location_id: "loc_015", tags: ["mistero", "bosco"] },
    { id: "coll_006", tipo: "collezionabile", nome: "Relitto Subacqueo (esempio)", rarita: "unico", modalita: "entrambe", descrizione: "Un relitto sommerso vicino alla costa est, pieno di oggetti di valore.", come_ottenerlo: "Immergersi nel punto più profondo vicino alla costa est.", location_id: "loc_016", tags: ["acqua", "immersione"] },
  ],
  locations: [
    { id: "loc_001", nome: "Deposito Portuale (esempio)", x: 66, y: 40, categoria: "veicolo", item_id: "veh_001" },
    { id: "loc_002", nome: "Edificio Abbandonato (esempio)", x: 40, y: 24, categoria: "arma", item_id: "arma_001" },
    { id: "loc_003", nome: "Spiaggia Sud (esempio)", x: 27, y: 74, categoria: "collezionabile", item_id: "coll_001" },
    { id: "loc_004", nome: "Molo Turistico (esempio)", x: 78, y: 58, categoria: "veicolo", item_id: "veh_002" },
    { id: "loc_005", nome: "Vicolo Centrale (esempio)", x: 50, y: 46, categoria: "arma", item_id: "arma_002" },
    { id: "loc_006", nome: "Colline Panoramiche (esempio)", x: 58, y: 20, categoria: "veicolo", item_id: "veh_003" },
    { id: "loc_007", nome: "Base Militare (esempio)", x: 70, y: 75, categoria: "veicolo", item_id: "veh_004" },
    { id: "loc_008", nome: "Vetta della Montagna (esempio)", x: 35, y: 85, categoria: "veicolo", item_id: "veh_005" },
    { id: "loc_009", nome: "Vicolo dei Murales (esempio)", x: 45, y: 55, categoria: "arma", item_id: "arma_003" },
    { id: "loc_010", nome: "Deposito Militare (esempio)", x: 72, y: 22, categoria: "arma", item_id: "arma_004" },
    { id: "loc_011", nome: "Campagna Ovest (esempio)", x: 22, y: 45, categoria: "arma", item_id: "arma_005" },
    { id: "loc_012", nome: "Belvedere delle Colline (esempio)", x: 35, y: 35, categoria: "collezionabile", item_id: "coll_002" },
    { id: "loc_013", nome: "Zona Remota Sud-Est (esempio)", x: 60, y: 70, categoria: "collezionabile", item_id: "coll_003" },
    { id: "loc_014", nome: "Grattacielo del Centro (esempio)", x: 55, y: 48, categoria: "collezionabile", item_id: "coll_004" },
    { id: "loc_015", nome: "Bosco Occidentale (esempio)", x: 20, y: 60, categoria: "collezionabile", item_id: "coll_005" },
    { id: "loc_016", nome: "Relitto Costa Est (esempio)", x: 82, y: 65, categoria: "collezionabile", item_id: "coll_006" },
  ],
  cheats: [
    { id: "cheat_001", nome_effetto: "Munizioni Infinite (esempio)", codice: "ESEMPIO-CODICE-01", piattaforma: ["PlayStation", "Xbox"], modalita: "storia", note: "Disattiva gli obiettivi mentre è attivo." },
    { id: "cheat_002", nome_effetto: "Salute Massima (esempio)", codice: "ESEMPIO-CODICE-02", piattaforma: ["PlayStation", "Xbox"], modalita: "entrambe", note: "Nessuna limitazione nota." },
    { id: "cheat_003", nome_effetto: "Super Salto (esempio)", codice: "ESEMPIO-CODICE-03", piattaforma: ["PlayStation", "Xbox"], modalita: "storia", note: "Aumenta molto l'altezza dei salti, utile per raggiungere tetti e cornicioni." },
    { id: "cheat_004", nome_effetto: "Tempo Sempre Sereno (esempio)", codice: "ESEMPIO-CODICE-04", piattaforma: ["PlayStation", "Xbox"], modalita: "storia", note: "Blocca le condizioni meteo sul sereno, utile per screenshot e voli." },
    { id: "cheat_005", nome_effetto: "Nessuna Ricercata (esempio)", codice: "ESEMPIO-CODICE-05", piattaforma: ["PlayStation", "Xbox"], modalita: "entrambe", note: "Rimuove immediatamente il livello di ricercato attuale." },
    { id: "cheat_006", nome_effetto: "Veicolo Casuale Istantaneo (esempio)", codice: "ESEMPIO-CODICE-06", piattaforma: ["PlayStation", "Xbox"], modalita: "storia", note: "Fa comparire un veicolo casuale vicino al giocatore." },
  ],
  missioni: [
    { id: "miss_001", nome: "Missione di Esempio", capitolo: 2, segreti_collegati: ["arma_001"], suggerimenti: "Esplora bene l'area prima di completare l'obiettivo principale, alcuni segreti diventano inaccessibili dopo." },
    { id: "miss_002", nome: "Il Segreto delle Colline", capitolo: 4, segreti_collegati: ["coll_002", "veh_003"], suggerimenti: "Torna sulle colline in diversi momenti della giornata: alcuni indizi cambiano con la luce." },
  ],
  news: [
    { id: "news_025", titolo: "Take-Two conferma la rotta: preordini GTA6 definiti \"senza precedenti\"", tipo: "ufficiale", categoria: "Annunci", data: "2026-08-07", testo: "Nella call sui risultati del primo trimestre fiscale 2027, Take-Two ha riportato bookings netti per 1,39 miliardi di dollari e ha confermato le previsioni per l'intero anno fiscale a 8,0-8,2 miliardi di dollari, sostenute dal lancio di GTA6. Il CEO Strauss Zelnick ha definito i preordini del gioco (aperti dal 25 giugno) \"senza precedenti\" e \"sorprendenti\", senza però alzare le stime finanziarie annuali né fornire un numero preciso di copie vendute. Dalla call non è emersa alcuna novità di gameplay o nuovo trailer: la data di uscita del 19 novembre 2026 resta confermata." },
    { id: "news_024", titolo: "Confermato: gameplay reveal in esclusiva Netflix il 27 agosto", tipo: "ufficiale", categoria: "Annunci", data: "2026-08-06", testo: "Rockstar Games ha annunciato ufficialmente \"Grand Theft Auto VI: An Extended Look\": un vero e proprio approfondimento sul gameplay con un terzo trailer, in anteprima assoluta su Netflix giovedì 27 agosto alle 15:00 ora della costa est USA. Lo stesso materiale sarà pubblicato alle 21:00 (sempre costa est) sul canale YouTube ufficiale di Rockstar e sul sito ufficiale di GTA VI. Sarà il primo sguardo approfondito al gameplay reale dopo i due trailer cinematografici già rilasciati." },
    { id: "news_022", titolo: "Verifica dell'età in Australia: Rockstar rischia una multa fino a 49,5 milioni di dollari australiani", tipo: "ufficiale", categoria: "Annunci", data: "2026-08-05", testo: "Le nuove norme australiane sulla sicurezza online (Online Safety Amendment Act) impongono la verifica dell'età per i giochi classificati R18+ come la saga GTA, con multe fino a 49,5 milioni di dollari australiani (circa 35 milioni di dollari USA) in caso di mancato rispetto. La regola riguarda però solo le componenti online: dato che GTA6 uscirà solo in modalità storia senza online al lancio, potrebbe non essere soggetto all'obbligo fin da subito. Rockstar ha già del codice di verifica dormiente nei file di GTA Online, ma non lo ha ancora attivato." },
    { id: "news_020", titolo: "Take-Two dà la caccia ai finti trailer generati con l'IA", tipo: "ufficiale", categoria: "Annunci", data: "2026-08-03", testo: "Take-Two ha iniziato a inviare notifiche DMCA contro canali YouTube (tra cui il noto \"Vice Nation\") che pubblicavano video di Jason e Lucia generati con intelligenza artificiale spacciandoli per leak reali. Il CEO Strauss Zelnick ha ribadito pubblicamente che l'IA generativa non ha alcun ruolo nello sviluppo di GTA6." },
    { id: "news_021", titolo: "Sfatato: GTA6 non uscirà su Nintendo Switch 2", tipo: "ufficiale", categoria: "Uscita", data: "2026-08-03", testo: "Nonostante le speculazioni ricorrenti online, Rockstar e Take-Two non hanno mai annunciato una versione per Nintendo Switch 2: le uniche piattaforme confermate restano PS5 e Xbox Series X|S. Qualsiasi presunto preordine o accesso beta per Switch 2 è falso." },
    { id: "news_019", titolo: "I mesi gratis di GTA+ non si accumulano", tipo: "ufficiale", categoria: "Prezzo", data: "2026-08-02", testo: "Rockstar ha chiarito che annullare e rifare un preordine non fa accumulare più mesi gratuiti di GTA+: il bonus è legato all'account ed è riscattabile una sola volta, indipendentemente da quante volte si cancella e si riordina." },
    { id: "news_001", titolo: "Data di uscita ufficiale: 19 novembre 2026", tipo: "ufficiale", categoria: "Uscita", data: "2026-08-02", testo: "GTA6 uscirà ufficialmente il 19 novembre 2026, dopo due rinvii. Sarà disponibile su PS5 e Xbox Series X|S. Nessuna versione PC è stata annunciata al lancio. Non ci sarà accesso anticipato: tutte le edizioni si sbloccano lo stesso giorno." },
    { id: "news_002", titolo: "Preordini aperti: prezzi ed edizioni", tipo: "ufficiale", categoria: "Prezzo", data: "2026-08-02", testo: "I preordini sono aperti dal 25 giugno 2026. La Standard Edition costa 79,99€ (gioco base), la Ultimate Edition 99,99€ con contenuti esclusivi sbloccati progressivamente durante la storia. È possibile fare l'upgrade da Standard a Ultimate con un supplemento di 20€. Le copie fisiche non includono un disco, solo un codice per il download." },
    { id: "news_003", titolo: "Bonus preordine: Vintage Vice City Pack", tipo: "ufficiale", categoria: "Prezzo", data: "2026-08-02", testo: "Chi preordina riceve il Vintage Vice City Pack: una Vapid Stanier '55 con garage, abiti vintage per Jason e Lucia, e una skin arma in stile Tommy Vercetti, oltre a un mese gratis di GTA+." },
    { id: "news_004", titolo: "Contenuti esclusivi della Ultimate Edition", tipo: "ufficiale", categoria: "Prezzo", data: "2026-08-02", testo: "La Ultimate Edition include tra gli altri: Grotti Cheetah '95, Vapid Dominator Buggy '67, Shitzu Squalo, Dinka Enduro, il kayak Crest, le armi Hawk & Little Morgan, pistole personalizzate per Jason (Girardi ES9) e Lucia (Klose K17), oltre alle officine esclusive Rideout Customs e One-Eyed Willie's e al salone Sara's Unisex Salon." },
    { id: "news_005", titolo: "Benvenuti nello stato di Leonida", tipo: "ufficiale", categoria: "Ambientazione", data: "2026-08-02", testo: "Il gioco è ambientato nello stato fittizio di Leonida, ispirato alla Florida, con Vice City come metropoli principale. Sono confermate 6 regioni principali, ciascuna con estetica, NPC e routine diverse: dal neon della città alle paludi rurali." },
    { id: "news_006", titolo: "Quanto sarà grande la mappa?", tipo: "rumor", categoria: "Ambientazione", data: "2026-08-02", testo: "Secondo stime della community, la mappa potrebbe essere fino al 70% più grande di quella di GTA V. Non è ancora una cifra confermata ufficialmente da Rockstar." },
    { id: "news_007", titolo: "700+ interni esplorabili, altre regioni in arrivo dopo il lancio", tipo: "ufficiale", categoria: "Ambientazione", data: "2026-08-02", testo: "Sono confermati oltre 700 interni esplorabili. Al lancio saranno disponibili Vice City e l'intera Leonida; Rockstar ha confermato che altre città/regioni, come Gloriana (ispirata alla Georgia), arriveranno dopo il lancio con aggiornamenti in stile stagionale." },
    { id: "news_008", titolo: "La fauna selvatica di Leonida", tipo: "ufficiale", categoria: "Ambientazione", data: "2026-08-02", testo: "Tra la fauna confermata: alligatori, serpenti, procioni, linci, cervi, puma e cinghiali." },
    { id: "news_009", titolo: "Lucia e Jason: i due protagonisti", tipo: "ufficiale", categoria: "Personaggi", data: "2026-08-02", testo: "Lucia Caminos è la prima protagonista femminile della saga, cresciuta a Liberty City e appena uscita di prigione. Jason Duval è cresciuto tra truffatori ed è stato coinvolto nel traffico di droga. La loro relazione ricorda la dinamica \"Bonnie & Clyde\". Sarà possibile giocare con entrambi, ciascuno con abilità e prospettiva diverse." },
    { id: "news_010", titolo: "NPC satirici confermati", tipo: "ufficiale", categoria: "Personaggi", data: "2026-08-02", testo: "Tra i personaggi non giocanti spiccano parodie in stile \"Florida Man\": Hammer Lady, Dad Bod Guy e Leonida Joker." },
    { id: "news_011", titolo: "Novità di gameplay e tecnologia", tipo: "ufficiale", categoria: "Gameplay", data: "2026-08-02", testo: "Confermati grafica iperrealistica con ray tracing, fisica dei danni avanzata sui veicoli, ritorno delle immersioni subacquee, trasporti pubblici come i treni sopraelevati ed eventi ambientali dinamici come gli uragani. Il sistema di notorietà sembra evoluto, forse legato ai social media e all'uso di maschere." },
    { id: "news_012", titolo: "Confermato: al lancio solo modalità storia, niente online", tipo: "ufficiale", categoria: "Gameplay", data: "2026-08-02", testo: "Rockstar ha confermato (comunicato ufficiale, FAQ del PlayStation Store e una dichiarazione a IGN) che GTA6 uscirà come esperienza esclusivamente single-player: nessuna modalità online al lancio. Non è stata data alcuna data né conferma che una nuova versione di GTA Online sia in sviluppo. Lo scenario più probabile, secondo gli osservatori, è che segua lo stesso schema di GTA V: storia al lancio, modalità online aggiunta in un secondo momento." },
    { id: "news_015", titolo: "Si potrà passare da Jason a Lucia in ogni momento", tipo: "ufficiale", categoria: "Gameplay", data: "2026-08-02", testo: "Rockstar ha confermato che i giocatori potranno passare dal controllo di Jason a quello di Lucia mentre esplorano il mondo di gioco e durante alcune sequenze della storia, in modo simile (ma aggiornato) al cambio personaggio già visto in GTA V." },
    { id: "news_016", titolo: "Uno smartphone in-game con social media", tipo: "ufficiale", categoria: "Gameplay", data: "2026-08-02", testo: "Confermato un sistema di social media integrato tramite lo smartphone del personaggio: si potranno guardare video virali, seguire influencer e restare aggiornati sugli eventi che accadono in giro per Leonida." },
  ],
};

const CATS = [
  { key: "tutti", label: "Tutti", color: "#F2F0E9" },
  { key: "veicolo", label: "Veicoli", color: "#2DE3D6" },
  { key: "arma", label: "Armi", color: "#FF3D8A" },
  { key: "collezionabile", label: "Collez.", color: "#FFC24B" },
];
const catColor = (cat) => CATS.find((c) => c.key === cat)?.color || "#F2F0E9";

/* ---------- Localizzazione IT/EN ---------- */
const CATEGORY_LABELS = {
  it: { Annunci: "Annunci", Prezzo: "Prezzo", Uscita: "Uscita", Ambientazione: "Ambientazione", Personaggi: "Personaggi", Gameplay: "Gameplay" },
  en: { Annunci: "Announcements", Prezzo: "Pricing", Uscita: "Release", Ambientazione: "Setting", Personaggi: "Characters", Gameplay: "Gameplay" },
};

/* Traduzioni inglesi delle notizie, indicizzate per id: DATA.news resta la fonte in italiano,
   qui teniamo solo titolo/testo in inglese per non duplicare l'intero oggetto. */
const NEWS_EN = {
  news_025: { titolo: "Take-Two stays the course: GTA6 pre-orders called \"unprecedented\"", testo: "In its fiscal Q1 2027 earnings call, Take-Two reported net bookings of $1.39 billion and reaffirmed full-year guidance of $8.0-8.2 billion, underpinned by GTA6's launch. CEO Strauss Zelnick called pre-orders for the game (open since June 25) \"unprecedented\" and \"astonishing\", though the company stopped short of raising its financial outlook or sharing an exact sales figure. No gameplay news or new trailer came out of the call: the November 19, 2026 release date remains confirmed." },
  news_024: { titolo: "Confirmed: gameplay reveal exclusively on Netflix on August 27", testo: "Rockstar Games has officially announced \"Grand Theft Auto VI: An Extended Look\": a real deep dive into gameplay with a third trailer, premiering exclusively on Netflix on Thursday, August 27 at 3:00 PM ET. The same footage will go live at 9:00 PM ET on Rockstar's official YouTube channel and the official GTA VI website. It will be the first in-depth look at real gameplay since the two cinematic trailers released so far." },
  news_022: { titolo: "Age verification in Australia: Rockstar risks a fine of up to AU$49.5 million", testo: "Australia's new online safety rules (Online Safety Amendment Act) require age verification for R18+ rated games like the GTA series, with fines of up to AU$49.5 million (about $35 million USD) for non-compliance. The rule only covers online components, though: since GTA6 will launch as a story-only, offline experience with no online mode, it may not be subject to the requirement right away. Rockstar already has dormant verification code inside GTA Online's files but hasn't activated it yet." },
  news_020: { titolo: "Take-Two cracks down on AI-generated fake trailers", testo: "Take-Two has started issuing DMCA takedown notices against YouTube channels (including the well-known \"Vice Nation\") that posted AI-generated videos of Jason and Lucia passed off as real leaks. CEO Strauss Zelnick publicly reiterated that generative AI plays no role in GTA6's development." },
  news_021: { titolo: "Debunked: GTA6 is not coming to Nintendo Switch 2", testo: "Despite recurring online speculation, Rockstar and Take-Two have never announced a Nintendo Switch 2 version: the only confirmed platforms remain PS5 and Xbox Series X|S. Any supposed pre-order or beta access for Switch 2 is fake." },
  news_019: { titolo: "Free GTA+ months don't stack", testo: "Rockstar has clarified that cancelling and re-placing a pre-order does not stack extra free GTA+ months: the bonus is tied to the account and can only be redeemed once, no matter how many times you cancel and reorder." },
  news_001: { titolo: "Official release date: November 19, 2026", testo: "GTA6 will officially release on November 19, 2026, after two delays. It will be available on PS5 and Xbox Series X|S. No PC version has been announced at launch. There will be no early access: all editions unlock the same day." },
  news_002: { titolo: "Pre-orders open: prices and editions", testo: "Pre-orders have been open since June 25, 2026. The Standard Edition costs $79.99 (base game), the Ultimate Edition $99.99 with exclusive content unlocked progressively through the story. You can upgrade from Standard to Ultimate for a $20 surcharge. Physical copies don't include a disc, only a download code." },
  news_003: { titolo: "Pre-order bonus: Vintage Vice City Pack", testo: "Pre-ordering gets you the Vintage Vice City Pack: a Vapid Stanier '55 with garage, vintage outfits for Jason and Lucia, a Tommy Vercetti-style weapon skin, plus a free month of GTA+." },
  news_004: { titolo: "Ultimate Edition exclusive content", testo: "The Ultimate Edition includes, among others: Grotti Cheetah '95, Vapid Dominator Buggy '67, Shitzu Squalo, Dinka Enduro, the Crest kayak, the Hawk & Little Morgan weapons, custom pistols for Jason (Girardi ES9) and Lucia (Klose K17), plus the exclusive Rideout Customs and One-Eyed Willie's garages and Sara's Unisex Salon." },
  news_005: { titolo: "Welcome to the state of Leonida", testo: "The game is set in the fictional state of Leonida, inspired by Florida, with Vice City as its main metropolis. 6 main regions are confirmed, each with different aesthetics, NPCs and routines: from the city's neon lights to rural swamps." },
  news_006: { titolo: "How big will the map be?", testo: "According to community estimates, the map could be up to 70% bigger than GTA V's. This is not yet an officially confirmed figure from Rockstar." },
  news_007: { titolo: "700+ explorable interiors, more regions coming post-launch", testo: "Over 700 explorable interiors are confirmed. At launch, Vice City and all of Leonida will be available; Rockstar has confirmed other cities/regions, such as Gloriana (inspired by Georgia), will arrive after launch with season-style updates." },
  news_008: { titolo: "Leonida's wildlife", testo: "Confirmed wildlife includes: alligators, snakes, raccoons, bobcats, deer, panthers and wild boars." },
  news_009: { titolo: "Lucia and Jason: the two protagonists", testo: "Lucia Caminos is the saga's first female protagonist, raised in Liberty City and freshly out of prison. Jason Duval grew up among con artists and got involved in drug trafficking. Their relationship echoes a \"Bonnie & Clyde\" dynamic. You'll be able to play as both, each with different abilities and perspective." },
  news_010: { titolo: "Satirical NPCs confirmed", testo: "Among the non-playable characters, \"Florida Man\"-style parodies stand out: Hammer Lady, Dad Bod Guy and Leonida Joker." },
  news_011: { titolo: "Gameplay and technology news", testo: "Confirmed: hyper-realistic graphics with ray tracing, advanced vehicle damage physics, the return of underwater diving, public transport like elevated trains, and dynamic environmental events like hurricanes. The wanted-level system appears more evolved, possibly tied to social media and mask usage." },
  news_012: { titolo: "Confirmed: story mode only at launch, no online", testo: "Rockstar has confirmed (official statement, PlayStation Store FAQ, and a statement to IGN) that GTA6 will launch as a single-player-only experience: no online mode at launch. No date or confirmation has been given that a new version of GTA Online is in development. The most likely scenario, according to observers, is that it will follow the same pattern as GTA V: story at launch, online mode added later." },
  news_015: { titolo: "You'll be able to switch from Jason to Lucia at any time", testo: "Rockstar has confirmed that players will be able to switch control from Jason to Lucia while exploring the game world and during certain story sequences, similar to (but updated from) the character switching already seen in GTA V." },
  news_016: { titolo: "An in-game smartphone with social media", testo: "An integrated social media system via the character's smartphone is confirmed: you'll be able to watch viral videos, follow influencers and stay updated on events happening around Leonida." },
};

/* posizioni decorative (riflessi acqua, isolati) calcolate una sola volta: se venissero ricalcolate
   a ogni render, la mappa "sfarfallerebbe" durante pan/zoom */
const WAVE_LINES = Array.from({ length: 14 }).map(() => ({
  x1: Math.random() * 100, y1: Math.random() * 100, x2: Math.random() * 100 + 3, y2: Math.random() * 100,
}));
const BUILDINGS = Array.from({ length: 26 }).map((_, i) => ({
  x: 12 + (i % 7) * 9 + (Math.random() * 2 - 1),
  y: 14 + Math.floor(i / 7) * 11 + (Math.random() * 2 - 1),
  w: 4 + Math.random() * 2,
  h: 4 + Math.random() * 2,
}));

/* piccole icone decorative "città" per arredare la mappa */
function CityIcon({ kind, size = 18, color = "#E9E4D8" }) {
  if (kind === "aeroporto") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2 16l8-2.5V6a1.5 1.5 0 013 0v7.5L21 16v2l-8-1.5V20l2.5 1.5V23l-4-1-4 1v-1.5L12 20v-3.5L2 18v-2z" fill={color} />
    </svg>
  );
  if (kind === "stadio") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="7" stroke={color} strokeWidth="1.8" fill="none" />
      <ellipse cx="12" cy="12" rx="6" ry="3.5" stroke={color} strokeWidth="1.4" fill="none" />
    </svg>
  );
  if (kind === "porto") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 14h16l-2 6H6l-2-6z" fill={color} />
      <path d="M12 3v11M8 6l4-3 4 3" stroke={color} strokeWidth="1.6" fill="none" />
    </svg>
  );
  return null;
}

/* icone dei marker per distinguere le categorie a colpo d'occhio */
function MarkerIcon({ categoria, size = 13, color = "#0B1026" }) {
  if (categoria === "veicolo") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="5" rx="2" fill={color} />
      <path d="M6.5 11l1.8-4h7.4l1.8 4" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      <circle cx="7.5" cy="17" r="2.1" fill={color} />
      <circle cx="16.5" cy="17" r="2.1" fill={color} />
    </svg>
  );
  if (categoria === "arma") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="10.2" width="14" height="3.2" rx="0.6" fill={color} />
      <rect x="13.5" y="7.6" width="4.2" height="3.4" rx="0.6" fill={color} />
      <rect x="8.6" y="12.6" width="3.4" height="7.4" rx="1" fill={color} transform="rotate(22 10.3 12.6)" />
      <path d="M13.2 13.4c-.1 1.6-1.2 2.9-2.7 3.3" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
  if (categoria === "collezionabile") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.9 6.3 6.9.8-5 4.8 1.3 6.9L12 17.6 5.9 20.8l1.3-6.9-5-4.8 6.9-.8L12 2z" fill={color} />
    </svg>
  );
  return null;
}

function PalmSilhouette({ style }) {
  return (
    <svg viewBox="0 0 100 140" width="60" height="86" style={style}>
      <path d="M50 140 L50 60" stroke="#241a3d" strokeWidth="5" fill="none" />
      <g fill="#241a3d">
        <path d="M50 60 C20 45 5 55 0 40 C25 40 40 50 50 60Z" />
        <path d="M50 60 C80 45 95 55 100 40 C75 40 60 50 50 60Z" />
        <path d="M50 60 C35 30 25 20 30 5 C45 20 48 40 50 60Z" />
        <path d="M50 60 C65 30 75 20 70 5 C55 20 52 40 50 60Z" />
        <path d="M50 60 C50 25 50 15 50 0 C50 25 50 45 50 60Z" />
      </g>
    </svg>
  );
}

function searchAll(query, lang) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  if (!LOCKED_VIEWS.includes("mappa")) {
    DATA.items.forEach((it) => {
      const hay = [it.nome, ...(it.tags || [])].join(" ").toLowerCase();
      if (hay.includes(q)) results.push({ kind: "item", id: it.id, label: it.nome, sub: it.tipo });
    });
  }
  if (!LOCKED_VIEWS.includes("trucchi")) {
    DATA.cheats.forEach((c) => { if (c.nome_effetto.toLowerCase().includes(q)) results.push({ kind: "cheat", id: c.id, label: c.nome_effetto, sub: "trucco" }); });
  }
  if (!LOCKED_VIEWS.includes("missioni")) {
    DATA.missioni.forEach((m) => { if (m.nome.toLowerCase().includes(q)) results.push({ kind: "missione", id: m.id, label: m.nome, sub: "missione" }); });
  }
  DATA.news.forEach((n) => {
    const titoloEn = NEWS_EN[n.id]?.titolo || "";
    if (n.titolo.toLowerCase().includes(q) || titoloEn.toLowerCase().includes(q)) {
      const label = lang === "en" && titoloEn ? titoloEn : n.titolo;
      results.push({ kind: "news", id: n.id, label, sub: lang === "en" ? "news" : "notizia" });
    }
  });
  return results.slice(0, 8);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 820 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 820);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

/* ---------- Contenuto dettagli (riusato sia nella scheda overlay che nel pannello desktop) ---------- */
function DetailContent({ selected, onAskAI }) {
  const selectedItem = selected ? DATA.items.find((i) => i.id === selected.item_id) : null;
  const relatedMissions = selectedItem ? DATA.missioni.filter((m) => m.segreti_collegati?.includes(selectedItem.id)) : [];
  if (!selectedItem) {
    return <div style={{ color: "#9AA0C0", fontSize: 14, lineHeight: 1.6 }}>Tocca un punto sulla mappa per vedere dove si trova, come raggiungerlo e come ottenerlo.</div>;
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: catColor(selected.categoria), flexShrink: 0 }} />
        <div style={{ fontSize: 10, letterSpacing: 2, color: catColor(selected.categoria), fontWeight: 700 }}>
          {selectedItem.tipo.toUpperCase()} · {selectedItem.rarita.toUpperCase()}
        </div>
      </div>
      <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 10 }}>{selectedItem.nome}</div>
      <div style={{ fontSize: 13, color: "#C7CBDA", marginBottom: 12, lineHeight: 1.5 }}>{selectedItem.descrizione}</div>
      <div style={{ fontSize: 11, letterSpacing: 1, color: "#7A8099", marginBottom: 4 }}>COME RAGGIUNGERLO / OTTENERLO</div>
      <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{selectedItem.come_ottenerlo}</div>
      {relatedMissions.length > 0 && (
        <>
          <div style={{ fontSize: 11, letterSpacing: 1, color: "#7A8099", marginBottom: 4 }}>MISSIONE COLLEGATA</div>
          {relatedMissions.map((m) => (
            <div key={m.id} style={{ fontSize: 13, marginBottom: 12, lineHeight: 1.5 }}>
              <strong>{m.nome}</strong> (cap. {m.capitolo}) — {m.suggerimenti}
            </div>
          ))}
        </>
      )}
      <div style={{ fontSize: 11, letterSpacing: 1, color: "#7A8099", marginBottom: 12 }}>MODALITÀ: {selectedItem.modalita.toUpperCase()}</div>
      <button
        onClick={() => onAskAI(`Come faccio a ottenere: ${selectedItem.nome}?`)}
        style={{ width: "100%", background: "transparent", border: "1px solid #2DE3D6", color: "#2DE3D6", borderRadius: 6, padding: "12px 10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
      >
        Chiedi all'assistente →
      </button>
    </div>
  );
}

/* ---------- Assistente IA ---------- */
function AIAssistant({ prefill, onConsumePrefill }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Ciao! Chiedimi come raggiungere un punto, completare una missione o quale trucco usare. Rispondo in base ai dati dimostrativi già caricati nel sito." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (prefill) { setInput(prefill); onConsumePrefill(); } }, [prefill]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }); }, [messages, loading]);

  async function send(question) {
    const text = (question ?? input).trim();
    if (!text || loading) return;
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    const systemPrompt = `Sei l'assistente del sito guida di GTA6. Rispondi SOLO in italiano, breve e pratico, come un giocatore esperto.
Usa ESCLUSIVAMENTE queste informazioni (dati dimostrativi, il gioco non è ancora uscito):
${JSON.stringify(DATA)}
Se la domanda riguarda qualcosa non presente nei dati, spiega che è un dato di esempio e che l'informazione reale arriverà all'uscita del gioco.`;
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
        }),
      });
      const data = await response.json();
      const reply = data?.content?.find((c) => c.type === "text")?.text || "Non sono riuscito a generare una risposta, riprova.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Errore di connessione, riprova tra poco." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 2, marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%", background: m.role === "user" ? "#26305a" : "#16233f", border: `1px solid ${m.role === "user" ? "#2DE3D6" : "#1C2340"}`, borderRadius: 10, padding: "10px 13px", fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
            {m.text}
          </div>
        ))}
        {loading && <div style={{ fontSize: 12, color: "#7A8099" }}>L'assistente sta scrivendo…</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Scrivi una domanda…"
          style={{ flex: 1, background: "#0F1530", border: "1px solid #1C2340", borderRadius: 8, padding: "12px 14px", color: "#F2F0E9", fontSize: 15, outline: "none" }}
        />
        <button onClick={() => send()} disabled={loading} style={{ background: "#FF3D8A", border: "none", borderRadius: 8, padding: "0 18px", color: "#0B1026", fontWeight: 800, fontSize: 13, cursor: loading ? "default" : "pointer", opacity: loading ? 0.6 : 1 }}>
          Invia
        </button>
      </div>
    </div>
  );
}

/* ---------- Pagina Trucchi & Guide ---------- */
const MODALITA_FILTERS = [
  { key: "tutte", label: "Tutte" },
  { key: "storia", label: "Storia" },
  { key: "online", label: "Online" },
];

function CheatCard({ cheat, isHighlighted, registerRef, onAskAI }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(cheat.codice).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      ref={registerRef}
      style={{
        background: "#0F1530", border: `1px solid ${isHighlighted ? "#2DE3D6" : "#1C2340"}`, borderRadius: 10,
        padding: 16, marginBottom: 12, transition: "border-color 0.3s ease",
        boxShadow: isHighlighted ? "0 0 14px rgba(45,227,214,0.4)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>{cheat.nome_effetto}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cheat.piattaforma.map((p) => (
            <span key={p} style={{ fontSize: 10, letterSpacing: 1, color: "#FFC24B", border: "1px solid #FFC24B", borderRadius: 20, padding: "2px 8px", textTransform: "uppercase" }}>{p}</span>
          ))}
          <span style={{ fontSize: 10, letterSpacing: 1, color: "#2DE3D6", border: "1px solid #2DE3D6", borderRadius: 20, padding: "2px 8px", textTransform: "uppercase" }}>{cheat.modalita}</span>
        </div>
      </div>
      <button
        onClick={copyCode}
        title="Copia il codice"
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 10,
          background: "#0B1026", border: "1px dashed #2a2350", borderRadius: 6, padding: "9px 12px",
          fontFamily: "monospace", fontSize: 14, color: "#F2F0E9", cursor: "pointer",
        }}
      >
        <span>{cheat.codice}</span>
        <span style={{ fontSize: 11, color: copied ? "#2DE3D6" : "#7A8099", fontWeight: 700 }}>{copied ? "Copiato!" : "Copia"}</span>
      </button>
      <div style={{ fontSize: 13, color: "#C7CBDA", marginTop: 10, lineHeight: 1.5 }}>{cheat.note}</div>
      <button
        onClick={() => onAskAI(`Spiegami come e quando usare il trucco: ${cheat.nome_effetto}`)}
        style={{ marginTop: 12, background: "transparent", border: "1px solid #FF3D8A", color: "#FF3D8A", borderRadius: 6, padding: "9px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
      >
        Chiedi all'assistente →
      </button>
    </div>
  );
}

function MissionCard({ mission, isHighlighted, registerRef, onAskAI }) {
  const relatedItems = (mission.segreti_collegati || []).map((id) => DATA.items.find((i) => i.id === id)).filter(Boolean);
  return (
    <div
      ref={registerRef}
      style={{
        background: "#0F1530", border: `1px solid ${isHighlighted ? "#2DE3D6" : "#1C2340"}`, borderRadius: 10,
        padding: 16, marginBottom: 12, transition: "border-color 0.3s ease",
        boxShadow: isHighlighted ? "0 0 14px rgba(45,227,214,0.4)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>{mission.nome}</div>
        <span style={{ fontSize: 10, letterSpacing: 1, color: "#7A8099" }}>CAPITOLO {mission.capitolo}</span>
      </div>
      <div style={{ fontSize: 13, color: "#C7CBDA", marginTop: 8, lineHeight: 1.5 }}>{mission.suggerimenti}</div>
      {relatedItems.length > 0 && (
        <div style={{ fontSize: 12, color: "#7A8099", marginTop: 10 }}>
          Segreti collegati: {relatedItems.map((it) => it.nome).join(", ")}
        </div>
      )}
      <button
        onClick={() => onAskAI(`Dammi consigli per superare la missione: ${mission.nome}`)}
        style={{ marginTop: 12, background: "transparent", border: "1px solid #FF3D8A", color: "#FF3D8A", borderRadius: 6, padding: "9px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
      >
        Chiedi all'assistente →
      </button>
    </div>
  );
}

function CheatsPage({ highlight, onClearHighlight, onAskAI }) {
  const [modFilter, setModFilter] = useState("tutte");
  const cheatRefs = useRef({});

  useEffect(() => {
    if (highlight) setModFilter("tutte");
  }, [highlight]);

  useEffect(() => {
    if (!highlight) return;
    const el = cheatRefs.current[highlight.id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(onClearHighlight, 2000);
    return () => clearTimeout(t);
  }, [highlight, modFilter]);

  const filteredCheats = DATA.cheats.filter((c) => modFilter === "tutte" || c.modalita === modFilter || c.modalita === "entrambe");

  return (
    <div style={{ padding: "20px 16px 40px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
        {MODALITA_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setModFilter(f.key)}
            style={{
              flexShrink: 0,
              background: modFilter === f.key ? "#2DE3D6" : "transparent",
              color: modFilter === f.key ? "#0B1026" : "#2DE3D6",
              border: "1px solid #2DE3D6", borderRadius: 20,
              padding: "6px 14px", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredCheats.length === 0 ? (
        <div style={{ color: "#7A8099", fontSize: 13 }}>Nessun trucco per questo filtro.</div>
      ) : (
        filteredCheats.map((cheat) => (
          <CheatCard
            key={cheat.id}
            cheat={cheat}
            isHighlighted={highlight?.kind === "cheat" && highlight.id === cheat.id}
            registerRef={(el) => (cheatRefs.current[cheat.id] = el)}
            onAskAI={onAskAI}
          />
        ))
      )}
    </div>
  );
}

function MissioniPage({ highlight, onClearHighlight, onAskAI }) {
  const missionRefs = useRef({});

  useEffect(() => {
    if (!highlight) return;
    const el = missionRefs.current[highlight.id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(onClearHighlight, 2000);
    return () => clearTimeout(t);
  }, [highlight]);

  return (
    <div style={{ padding: "20px 16px 40px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      {DATA.missioni.map((m) => (
        <MissionCard
          key={m.id}
          mission={m}
          isHighlighted={highlight?.kind === "missione" && highlight.id === m.id}
          registerRef={(el) => (missionRefs.current[m.id] = el)}
          onAskAI={onAskAI}
        />
      ))}
    </div>
  );
}

/* ---------- Pagina Notizie ---------- */
const NEWS_TYPE_FILTERS = [
  { key: "tutte", label: "Tutte", label_en: "All" },
  { key: "ufficiale", label: "Ufficiali", label_en: "Official" },
  { key: "rumor", label: "Rumor", label_en: "Rumors" },
];

const NEWS_PAGE_TEXT = {
  it: {
    disclaimer: "Aggiornata man mano che escono nuove informazioni ufficiali o rumor sul gioco. Le notizie \"Rumor\" non sono confermate da Rockstar.",
    officialHeading: "Notizie Ufficiali",
    rumorHeading: "Rumor",
    noOfficial: "Nessuna notizia ufficiale al momento.",
    noRumor: "Nessun rumor al momento.",
    badgeOfficial: "Ufficiale",
    badgeRumor: "Rumor",
    askAI: "Chiedi all'assistente →",
    share: "Condividi",
    copied: "Copiato!",
  },
  en: {
    disclaimer: "Updated as new official information or rumors about the game come out. \"Rumor\" news items are not confirmed by Rockstar.",
    officialHeading: "Official News",
    rumorHeading: "Rumors",
    noOfficial: "No official news at the moment.",
    noRumor: "No rumors at the moment.",
    badgeOfficial: "Official",
    badgeRumor: "Rumor",
    askAI: "Ask the assistant →",
    share: "Share",
    copied: "Copied!",
  },
};

const SHARE_URL = "https://viceradar.netlify.app";

function shareNews(news, lang, onCopied) {
  const titolo = lang === "en" ? (NEWS_EN[news.id]?.titolo || news.titolo) : news.titolo;
  const shareData = { title: titolo, text: `${titolo} — Vice // Radar`, url: SHARE_URL };
  if (typeof navigator !== "undefined" && navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(`${shareData.text} ${SHARE_URL}`).then(onCopied).catch(() => {});
  }
}

function ShareIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
      <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
    </svg>
  );
}

function formatNewsDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function NewsCard({ news, isHighlighted, registerRef, onAskAI, lang }) {
  const isRumor = news.tipo === "rumor";
  const [copied, setCopied] = useState(false);
  const t = NEWS_PAGE_TEXT[lang];
  const titolo = lang === "en" ? (NEWS_EN[news.id]?.titolo || news.titolo) : news.titolo;
  const testo = lang === "en" ? (NEWS_EN[news.id]?.testo || news.testo) : news.testo;
  const categoria = CATEGORY_LABELS[lang][news.categoria] || news.categoria;
  return (
    <div
      ref={registerRef}
      style={{
        background: "#0F1530", border: `1px solid ${isHighlighted ? "#2DE3D6" : "#1C2340"}`, borderRadius: 10,
        padding: 16, marginBottom: 12, transition: "border-color 0.3s ease",
        boxShadow: isHighlighted ? "0 0 14px rgba(45,227,214,0.4)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontSize: 15, fontWeight: 800 }}>{titolo}</div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <span style={{
            fontSize: 10, letterSpacing: 1, fontWeight: 800, borderRadius: 20, padding: "2px 8px", textTransform: "uppercase",
            color: isRumor ? "#0B1026" : "#0B1026", background: isRumor ? "#FFC24B" : "#2DE3D6",
          }}>
            {isRumor ? t.badgeRumor : t.badgeOfficial}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 11, letterSpacing: 1, color: "#7A8099", marginTop: 6 }}>
        {categoria.toUpperCase()} · {formatNewsDate(news.data)}
      </div>
      <div style={{ fontSize: 13, color: "#C7CBDA", marginTop: 10, lineHeight: 1.6 }}>{testo}</div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => onAskAI(`Parlami di questa notizia: ${news.titolo}`)}
          style={{ background: "transparent", border: "1px solid #FF3D8A", color: "#FF3D8A", borderRadius: 6, padding: "9px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          {t.askAI}
        </button>
        <button
          onClick={() => shareNews(news, lang, () => { setCopied(true); setTimeout(() => setCopied(false), 2000); })}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #2DE3D6", color: "#2DE3D6", borderRadius: 6, padding: "9px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          <ShareIcon size={13} />
          {copied ? t.copied : t.share}
        </button>
      </div>
    </div>
  );
}

function NewsPage({ highlight, onClearHighlight, onAskAI, lang }) {
  const [typeFilter, setTypeFilter] = useState("tutte");
  const newsRefs = useRef({});
  const t = NEWS_PAGE_TEXT[lang];

  useEffect(() => {
    if (highlight) setTypeFilter("tutte");
  }, [highlight]);

  useEffect(() => {
    if (!highlight) return;
    const el = newsRefs.current[highlight.id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(onClearHighlight, 2000);
    return () => clearTimeout(t);
  }, [highlight, typeFilter]);

  const officialNews = DATA.news.filter((n) => n.tipo === "ufficiale");
  const rumorNews = DATA.news.filter((n) => n.tipo === "rumor");
  const showOfficial = typeFilter === "tutte" || typeFilter === "ufficiale";
  const showRumor = typeFilter === "tutte" || typeFilter === "rumor";

  return (
    <div style={{ padding: "20px 16px 40px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ fontSize: 12, color: "#7A8099", marginBottom: 16, lineHeight: 1.5 }}>
        {t.disclaimer}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
        {NEWS_TYPE_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setTypeFilter(f.key)}
            style={{
              flexShrink: 0,
              background: typeFilter === f.key ? "#2DE3D6" : "transparent",
              color: typeFilter === f.key ? "#0B1026" : "#2DE3D6",
              border: "1px solid #2DE3D6", borderRadius: 20,
              padding: "6px 14px", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {lang === "en" ? f.label_en : f.label}
          </button>
        ))}
      </div>

      {showOfficial && (
        <>
          <div style={{ fontSize: 13, letterSpacing: 2, color: "#2DE3D6", fontWeight: 800, marginBottom: 12, textTransform: "uppercase" }}>{t.officialHeading}</div>
          {officialNews.length === 0 ? (
            <div style={{ color: "#7A8099", fontSize: 13, marginBottom: 20 }}>{t.noOfficial}</div>
          ) : (
            officialNews.map((n, i) => (
              <React.Fragment key={n.id}>
                <NewsCard
                  news={n}
                  isHighlighted={highlight?.kind === "news" && highlight.id === n.id}
                  registerRef={(el) => (newsRefs.current[n.id] = el)}
                  onAskAI={onAskAI}
                  lang={lang}
                />
                {/* newsletter inserita dopo la 3a notizia: l'utente ha già visto contenuto vero
                   prima della richiesta di iscrizione, invece di trovarsela subito in cima */}
                {i === 2 && (
                  <div style={{ marginBottom: 20 }}>
                    <NewsletterSignup lang={lang} />
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </>
      )}

      {showRumor && (
        <>
          <div style={{ fontSize: 13, letterSpacing: 2, color: "#FFC24B", fontWeight: 800, margin: showOfficial ? "28px 0 12px" : "0 0 12px", textTransform: "uppercase" }}>{t.rumorHeading}</div>
          {rumorNews.length === 0 ? (
            <div style={{ color: "#7A8099", fontSize: 13 }}>{t.noRumor}</div>
          ) : (
            rumorNews.map((n) => (
              <NewsCard
                key={n.id}
                news={n}
                isHighlighted={highlight?.kind === "news" && highlight.id === n.id}
                registerRef={(el) => (newsRefs.current[n.id] = el)}
                onAskAI={onAskAI}
                lang={lang}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}

/* ---------- Pagina Info / Assistenza ---------- */
const SUPPORT_EMAIL = "viceradarsupport@gmail.com";

const UPCOMING_SECTIONS = [
  { icona: "🗺️", colore: "#FF3D8A", titolo: "Mappa Interattiva", titolo_en: "Interactive Map", testo: "Dove trovare veicoli rari, armi, collezionabili ed easter egg in giro per Leonida, più dettagliata della minimappa in-game. Con filtri per categoria e ricerca.", testo_en: "Where to find rare vehicles, weapons, collectibles and easter eggs around Leonida, more detailed than the in-game minimap. With category filters and search." },
  { icona: "🎮", colore: "#FFC24B", titolo: "Trucchi", titolo_en: "Cheats", testo: "Tutti i codici e le tecniche per la modalità storia e online, con le piattaforme su cui funzionano.", testo_en: "All the codes and techniques for story mode and online, with the platforms they work on." },
  { icona: "🕵️", colore: "#2DE3D6", titolo: "Missioni & Segreti", titolo_en: "Missions & Secrets", testo: "Suggerimenti per superare i capitoli della storia e scoprire i segreti collegati agli oggetti nascosti nella mappa.", testo_en: "Tips for beating story chapters and uncovering the secrets linked to items hidden on the map." },
  { icona: "🐛", colore: "#B24BFF", titolo: "Glitch Online", titolo_en: "Online Glitches", testo: "Duplicazione veicoli, soldi infiniti e altri exploit dell'online scoperti dalla community, spiegati passo passo. Funzione riservata agli abbonati premium.", testo_en: "Vehicle duplication, money glitches and other online exploits found by the community, explained step by step. A feature reserved for premium subscribers." },
  { icona: "🤖", colore: "#FF3D8A", titolo: "Assistente IA", titolo_en: "AI Assistant", testo: "Un assistente che risponde alle tue domande mentre giochi (\"come raggiungo questo punto?\", \"come supero questa missione?\"), basandosi sui dati reali del sito. Sarà una funzione riservata agli abbonati premium.", testo_en: "An assistant that answers your questions while you play (\"how do I get to this spot?\", \"how do I beat this mission?\"), based on the site's real data. It will be a feature reserved for premium subscribers." },
];

const LAUNCH_DATE = new Date("2026-11-19T00:00:00");

const GAME_HERO_TEXT = {
  it: {
    tag: "🔥 GTA6 · 19 Novembre 2026",
    titleLine1: "Leonida ti aspetta.",
    titleLine2: "Tu sarai pronto?",
    subtitle: "Il prossimo capitolo di Grand Theft Auto: ambientato nello stato fittizio di Leonida, tra il neon di Vice City e le paludi della provincia. Tutto quello che sappiamo finora, in un posto solo.",
    countdownLabel: "⏳ Mancano all'uscita",
    unitDays: "Giorni",
    unitHours: "Ore",
    unitMinutes: "Minuti",
    unitSeconds: "Secondi",
    btnNews: "Segui le Notizie →",
    btnFeatures: "Prezzo & piattaforme",
  },
  en: {
    tag: "🔥 GTA6 · November 19, 2026",
    titleLine1: "Leonida is waiting.",
    titleLine2: "Will you be ready?",
    subtitle: "The next chapter of Grand Theft Auto: set in the fictional state of Leonida, between the neon of Vice City and the swamps of the countryside. Everything we know so far, in one place.",
    countdownLabel: "⏳ Countdown to release",
    unitDays: "Days",
    unitHours: "Hours",
    unitMinutes: "Minutes",
    unitSeconds: "Seconds",
    btnNews: "Follow the News →",
    btnFeatures: "Price & platforms",
  },
};

const SITE_HERO_TEXT = {
  it: {
    tag: "🎮 Creato dai fan, per i fan",
    titleLine1: "Vice // Radar",
    titleLine2: "Il tuo compagno per Leonida",
    subtitle: "Mappa dei segreti, trucchi, missioni e un assistente IA: tutto quello che ti serve mentre giochi, in un unico posto. Niente notizie riciclate: solo strumenti pratici, pronti per il lancio.",
    pills: ["🗺️ Mappa", "🎮 Trucchi", "🕵️ Missioni", "🐛 Glitch", "🤖 Assistente IA"],
    btnFeatures: "Scopri le funzionalità",
    btnGame: "Tutto sul gioco →",
  },
  en: {
    tag: "🎮 Made by fans, for fans",
    titleLine1: "Vice // Radar",
    titleLine2: "Your companion for Leonida",
    subtitle: "A map of secrets, cheats, missions and an AI assistant: everything you need while you play, all in one place. No recycled news — just practical tools, ready for launch.",
    pills: ["🗺️ Map", "🎮 Cheats", "🕵️ Missions", "🐛 Glitches", "🤖 AI Assistant"],
    btnFeatures: "Discover the features",
    btnGame: "All about the game →",
  },
};

/* countdown "vivo": ricalcola ogni secondo scomponendo il tempo residuo in giorni/ore/minuti/secondi */
function useCountdown(target) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const totalSeconds = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/* scroll fluido verso una sezione della stessa pagina, con un bagliore temporaneo
   sull'arrivo per far capire subito a cosa si riferiva il bottone cliccato */
function scrollToSectionWithHighlight(id) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.remove("vr-highlight");
  void el.offsetWidth; // forza il reflow per poter ripetere l'animazione anche se già mostrata prima
  el.classList.add("vr-highlight");
  setTimeout(() => el.classList.remove("vr-highlight"), 1600);
}

function GameHero({ onGoToNews, lang }) {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const t = GAME_HERO_TEXT[lang];
  const countdownUnits = [
    { value: days, label: t.unitDays },
    { value: hours, label: t.unitHours },
    { value: minutes, label: t.unitMinutes },
    { value: seconds, label: t.unitSeconds },
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0B1026 0%, #171E45 55%, #0B1026 100%)", padding: "clamp(48px, 9vw, 96px) 20px clamp(56px, 8vw, 88px)", textAlign: "center" }}>
      {/* bagliore dietro al titolo, effetto "sole" synthwave */}
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,61,138,0.35) 0%, rgba(255,194,75,0.18) 40%, rgba(45,227,214,0) 70%)", filter: "blur(10px)", pointerEvents: "none" }} />

      {/* griglia prospettica in fondo, stile skyline al tramonto */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", overflow: "hidden", pointerEvents: "none", opacity: 0.5 }}>
        <div style={{
          position: "absolute", left: "-25%", right: "-25%", bottom: "-10%", height: "220%",
          backgroundImage: "linear-gradient(90deg, rgba(45,227,214,0.5) 1px, transparent 1px), linear-gradient(0deg, rgba(45,227,214,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "perspective(280px) rotateX(62deg)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
        }} />
      </div>

      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: 12, letterSpacing: 3, color: "#FFC24B", fontWeight: 800, marginBottom: 16, textTransform: "uppercase", border: "1px solid rgba(255,194,75,0.4)", borderRadius: 20, padding: "6px 16px" }}>
          {t.tag}
        </div>
        <h1 style={{ fontSize: "clamp(34px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: 0.5, margin: "0 0 16px", textTransform: "uppercase", background: "linear-gradient(90deg,#FF3D8A,#FFC24B,#2DE3D6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t.titleLine1}<br />{t.titleLine2}
        </h1>
        <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#E4E6F2", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 28px" }}>
          {t.subtitle}
        </p>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6", fontWeight: 800, marginBottom: 12, textTransform: "uppercase" }}>
          {t.countdownLabel}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {countdownUnits.map((u) => (
            <div key={u.label} style={{ background: "rgba(15,21,48,0.75)", border: "1px solid rgba(45,227,214,0.4)", borderRadius: 10, padding: "12px 16px", minWidth: 66 }}>
              <div style={{ fontSize: "clamp(24px, 4.5vw, 34px)", fontWeight: 900, fontVariantNumeric: "tabular-nums", background: "linear-gradient(90deg,#FF3D8A,#FFC24B,#2DE3D6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {String(u.value).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#9AA0C0", textTransform: "uppercase", marginTop: 2 }}>{u.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={onGoToNews}
            style={{ background: "#FF3D8A", border: "none", borderRadius: 8, padding: "14px 26px", color: "#0B1026", fontWeight: 900, fontSize: 14, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase", boxShadow: "0 8px 24px rgba(255,61,138,0.35)" }}
          >
            {t.btnNews}
          </button>
          <button
            onClick={() => scrollToSectionWithHighlight("prezzo")}
            style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid #2DE3D6", borderRadius: 8, padding: "14px 26px", color: "#2DE3D6", fontWeight: 800, fontSize: 14, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase" }}
          >
            {t.btnFeatures}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ordine dei pill nell'hero, allineato a SITE_HERO_TEXT.pills: mappa a ciascuna funzione
   la view corrispondente per portare l'utente direttamente alla sua pagina "Prossimamente" */
const HERO_PILL_VIEWS = ["mappa", "trucchi", "missioni", "glitch", "assistente"];

/* hero della home: presenta il sito Vice // Radar, niente countdown né hype sul gioco
   (quello vive nella pagina dedicata "Il Gioco", vedi GameHero) */
function SiteHero({ onGoToGame, onSelectFeature, lang }) {
  const t = SITE_HERO_TEXT[lang];

  return (
    <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0B1026 0%, #171E45 55%, #0B1026 100%)", padding: "clamp(48px, 9vw, 96px) 20px clamp(56px, 8vw, 88px)", textAlign: "center" }}>
      {/* bagliore dietro al titolo, effetto "sole" synthwave */}
      <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,227,214,0.35) 0%, rgba(255,61,138,0.18) 40%, rgba(255,194,75,0) 70%)", filter: "blur(10px)", pointerEvents: "none" }} />

      {/* griglia prospettica in fondo, stile skyline al tramonto */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", overflow: "hidden", pointerEvents: "none", opacity: 0.5 }}>
        <div style={{
          position: "absolute", left: "-25%", right: "-25%", bottom: "-10%", height: "220%",
          backgroundImage: "linear-gradient(90deg, rgba(45,227,214,0.5) 1px, transparent 1px), linear-gradient(0deg, rgba(45,227,214,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "perspective(280px) rotateX(62deg)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
        }} />
      </div>

      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: 12, letterSpacing: 3, color: "#2DE3D6", fontWeight: 800, marginBottom: 16, textTransform: "uppercase", border: "1px solid rgba(45,227,214,0.4)", borderRadius: 20, padding: "6px 16px" }}>
          {t.tag}
        </div>
        <h1 style={{ fontSize: "clamp(34px, 7vw, 64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: 0.5, margin: "0 0 16px", textTransform: "uppercase", background: "linear-gradient(90deg,#2DE3D6,#FFC24B,#FF3D8A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t.titleLine1}<br />{t.titleLine2}
        </h1>
        <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#E4E6F2", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 24px" }}>
          {t.subtitle}
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {t.pills.map((p, i) => (
            <button
              key={p}
              onClick={() => onSelectFeature(HERO_PILL_VIEWS[i])}
              style={{ font: "inherit", fontSize: 12, fontWeight: 800, color: "#F2F0E9", background: "rgba(15,21,48,0.75)", border: "1px solid rgba(45,227,214,0.4)", borderRadius: 20, padding: "7px 14px", cursor: "pointer" }}
            >
              {p}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollToSectionWithHighlight("funzioni")}
            style={{ display: "inline-flex", alignItems: "center", background: "#2DE3D6", border: "none", borderRadius: 8, padding: "14px 26px", color: "#0B1026", fontWeight: 900, fontSize: 14, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase", boxShadow: "0 8px 24px rgba(45,227,214,0.35)" }}
          >
            {t.btnFeatures}
          </button>
          <button
            onClick={onGoToGame}
            style={{ background: "transparent", border: "1px solid #FFC24B", borderRadius: 8, padding: "14px 26px", color: "#FFC24B", fontWeight: 800, fontSize: 14, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase" }}
          >
            {t.btnGame}
          </button>
        </div>
      </div>
    </div>
  );
}

const PLATFORMS_PRICE_TEXT = {
  it: {
    eyebrow: "Piattaforme & Prezzo",
    title: "Su cosa gira e quanto costa",
    intro: "Le informazioni ufficiali di Rockstar e Take-Two, riassunte in breve — utile se stai ancora decidendo quale edizione prendere.",
    standardName: "Standard Edition",
    standardPrice: "79,99€",
    standardDesc: "Il gioco base, senza contenuti aggiuntivi.",
    ultimateName: "Ultimate Edition",
    ultimatePrice: "99,99€",
    ultimateDesc: "Come la Standard, più contenuti esclusivi sbloccati progressivamente durante la storia:",
    ultimateBullets: [
      "Veicoli esclusivi: Grotti Cheetah '95, Vapid Dominator Buggy '67, Shitzu Squalo, Dinka Enduro",
      "Armi e pistole personalizzate per Jason e Lucia",
      "Garage e saloni esclusivi: Rideout Customs, One-Eyed Willie's, Sara's Unisex Salon",
    ],
    upgradeNote: "Upgrade da Standard a Ultimate: +20€, in qualsiasi momento.",
    platformsLabel: "Piattaforme",
    platforms: ["PlayStation 5", "Xbox Series X|S"],
    noPcNote: "Nessuna versione PC annunciata al lancio. Nessun accesso anticipato: tutte le edizioni si sbloccano lo stesso giorno.",
    physicalNote: "Le copie fisiche non includono un disco: solo un codice per il download.",
    preorderNote: "📦 Chi preordina riceve anche il Vintage Vice City Pack (auto, abiti vintage, skin arma) e un mese gratis di GTA+.",
    cta: "Tutti i dettagli nelle Notizie →",
  },
  en: {
    eyebrow: "Platforms & Price",
    title: "What it runs on and what it costs",
    intro: "Official info from Rockstar and Take-Two, summed up — useful if you're still deciding which edition to get.",
    standardName: "Standard Edition",
    standardPrice: "$79.99",
    standardDesc: "The base game, no extra content.",
    ultimateName: "Ultimate Edition",
    ultimatePrice: "$99.99",
    ultimateDesc: "Everything in Standard, plus exclusive content unlocked progressively through the story:",
    ultimateBullets: [
      "Exclusive vehicles: Grotti Cheetah '95, Vapid Dominator Buggy '67, Shitzu Squalo, Dinka Enduro",
      "Custom weapons and pistols for Jason and Lucia",
      "Exclusive garages and salon: Rideout Customs, One-Eyed Willie's, Sara's Unisex Salon",
    ],
    upgradeNote: "Upgrade from Standard to Ultimate: +$20, anytime.",
    platformsLabel: "Platforms",
    platforms: ["PlayStation 5", "Xbox Series X|S"],
    noPcNote: "No PC version announced at launch. No early access: all editions unlock the same day.",
    physicalNote: "Physical copies don't include a disc, only a download code.",
    preorderNote: "📦 Pre-ordering also gets you the Vintage Vice City Pack (car, vintage outfits, weapon skin) and a free month of GTA+.",
    cta: "Full details in the News →",
  },
};

function PlatformsPricing({ onGoToNews, lang }) {
  const t = PLATFORMS_PRICE_TEXT[lang];
  return (
    <div id="prezzo" style={{ padding: "8px 16px 48px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#2DE3D6", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>{t.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, letterSpacing: 0.5, margin: "0 0 14px", textTransform: "uppercase", color: "#F2F0E9" }}>
          {t.title}
        </h2>
        <div style={{ fontSize: 14, color: "#C7CBDA", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>{t.intro}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 20 }}>
        <div style={{ background: "#0F1530", border: "1px solid #1C2340", borderTop: "3px solid #2DE3D6", borderRadius: 12, padding: "22px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{t.standardName}</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#2DE3D6", marginBottom: 10 }}>{t.standardPrice}</div>
          <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.55 }}>{t.standardDesc}</div>
        </div>
        <div style={{ background: "#0F1530", border: "1px solid #1C2340", borderTop: "3px solid #FFC24B", borderRadius: 12, padding: "22px 20px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{t.ultimateName}</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#FFC24B", marginBottom: 10 }}>{t.ultimatePrice}</div>
          <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.55, marginBottom: 10 }}>{t.ultimateDesc}</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "#9AA0C0", lineHeight: 1.7 }}>
            {t.ultimateBullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

      <div style={{ fontSize: 12.5, color: "#C7CBDA", textAlign: "center", marginBottom: 20 }}>{t.upgradeNote}</div>

      <div style={{ background: "#0F1530", border: "1px solid #1C2340", borderRadius: 12, padding: "20px 22px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#7A8099", fontWeight: 800, textTransform: "uppercase", marginBottom: 10 }}>{t.platformsLabel}</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {t.platforms.map((p) => (
            <span key={p} style={{ fontSize: 12, fontWeight: 800, color: "#F2F0E9", border: "1px solid #2DE3D6", borderRadius: 20, padding: "6px 14px" }}>{p}</span>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: "#9AA0C0", lineHeight: 1.6 }}>{t.noPcNote}</div>
        <div style={{ fontSize: 12.5, color: "#9AA0C0", lineHeight: 1.6, marginTop: 4 }}>{t.physicalNote}</div>
      </div>

      <div style={{ fontSize: 12.5, color: "#FFC24B", textAlign: "center", marginBottom: 20 }}>{t.preorderNote}</div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={onGoToNews}
          style={{ background: "transparent", border: "1px solid #FF3D8A", borderRadius: 8, padding: "12px 22px", color: "#FF3D8A", fontWeight: 800, fontSize: 13, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase" }}
        >
          {t.cta}
        </button>
      </div>
    </div>
  );
}

const MAILERLITE_FORM_ACTION = "https://assets.mailerlite.com/jsonp/2551771/forms/194780182349874214/subscribe";

const NEWSLETTER_TEXT = {
  it: {
    heading: "Non perderti il lancio",
    subtitle: "Ricevi un avviso quando il sito si sblocca davvero, con Mappa, Trucchi, Missioni, Glitch e Assistente IA attivi. Niente spam, solo l'essenziale.",
    placeholder: "La tua email",
    btnSubmit: "Avvisami →",
    btnSending: "Invio…",
    success: "Fatto! Ti avviseremo a questo indirizzo. 🎉",
    footnote: "Puoi cancellarti quando vuoi.",
  },
  en: {
    heading: "Don't miss the launch",
    subtitle: "Get notified when the site fully unlocks, with Map, Cheats, Missions, Glitches and AI Assistant active. No spam, just the essentials.",
    placeholder: "Your email",
    btnSubmit: "Notify me →",
    btnSending: "Sending…",
    success: "Done! We'll notify you at this address. 🎉",
    footnote: "You can unsubscribe anytime.",
  },
};

function NewsletterSignup({ lang }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const t = NEWSLETTER_TEXT[lang];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    try {
      await fetch(MAILERLITE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "fields[email]": email, "ml-submit": "1", anticsrf: "true" }).toString(),
      });
    } catch (err) {
      // no-cors: la risposta è opaca comunque, ignoriamo eventuali errori di rete
    }
    setSending(false);
    setSubmitted(true);
  }

  return (
    <div style={{ margin: "0 16px 56px", maxWidth: 620, marginLeft: "auto", marginRight: "auto", position: "relative", background: "linear-gradient(135deg, #131A3A, #0F1530)", border: "1px solid #1C2340", borderRadius: 16, padding: "36px 28px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,227,214,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>📡</div>
        <div style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 900, marginBottom: 10, textTransform: "uppercase" }}>{t.heading}</div>
        <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 20px" }}>
          {t.subtitle}
        </div>
        {submitted ? (
          <div style={{ color: "#2DE3D6", fontWeight: 800, fontSize: 14 }}>{t.success}</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              style={{ flex: "1 1 240px", maxWidth: 320, background: "#0B1026", border: "1px solid #1C2340", borderRadius: 8, padding: "12px 14px", color: "#F2F0E9", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
            <button
              type="submit"
              disabled={sending}
              style={{ background: "#FF3D8A", border: "none", borderRadius: 8, padding: "12px 22px", color: "#0B1026", fontWeight: 900, fontSize: 13, letterSpacing: 0.5, cursor: sending ? "default" : "pointer", textTransform: "uppercase", opacity: sending ? 0.7 : 1 }}
            >
              {sending ? t.btnSending : t.btnSubmit}
            </button>
          </form>
        )}
        <div style={{ fontSize: 11, color: "#7A8099", marginTop: 14 }}>{t.footnote}</div>
      </div>
    </div>
  );
}

const PRESENTATION_TEXT = {
  it: {
    eyebrow: "Cosa sarà",
    introPre: "Non un sito di notizie generico: uno ",
    introStrong: "strumento pratico",
    introPost: " da tenere aperto mentre giochi. Le sezioni qui sotto si sbloccano con dati reali al lancio, il 19 novembre 2026 — nel frattempo trovi tutto il resto tra le Notizie.",
    comingSoon: "Prossimamente",
    discoverMore: "Scopri di più →",
  },
  en: {
    eyebrow: "What's coming",
    introPre: "Not just another generic news site: a ",
    introStrong: "practical tool",
    introPost: " to keep open while you play. The sections below unlock with real data at launch, on November 19, 2026 — in the meantime you'll find everything else under News.",
    comingSoon: "Coming soon",
    discoverMore: "Learn more →",
  },
};

/* Home: presentazione del solo sito Vice // Radar (nessun contenuto sul gioco qui,
   quello vive nella pagina separata "Il Gioco", vedi GiocoPage) */
function PresentazionePage({ onGoToGame, onGoToFeatures, onSelectFeature, lang }) {
  const t = PRESENTATION_TEXT[lang];
  return (
    <div>
      <SiteHero onGoToGame={onGoToGame} onSelectFeature={onSelectFeature} lang={lang} />

      <div id="funzioni" style={{ padding: "48px 16px 48px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#2DE3D6", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>{t.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 900, letterSpacing: 0.5, margin: "0 0 14px", textTransform: "uppercase", color: "#F2F0E9" }}>
            Vice <span style={{ color: "#FF3D8A" }}>//</span> Radar
          </h2>
          <div style={{ fontSize: 14, color: "#C7CBDA", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
            {t.introPre}<strong style={{ color: "#F2F0E9" }}>{t.introStrong}</strong>{t.introPost}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {UPCOMING_SECTIONS.map((s) => (
            <button
              key={s.titolo}
              onClick={onGoToFeatures}
              style={{ textAlign: "left", position: "relative", background: "#0F1530", border: "1px solid #1C2340", borderTop: `3px solid ${s.colore}`, borderRadius: 12, padding: "20px 18px", overflow: "hidden", cursor: "pointer", font: "inherit", color: "inherit" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 22, width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.colore}22`, flexShrink: 0 }}>
                  {s.icona}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{lang === "en" ? s.titolo_en : s.titolo}</div>
              </div>
              <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.55, marginBottom: 14 }}>{lang === "en" ? s.testo_en : s.testo}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ display: "inline-block", fontSize: 10, letterSpacing: 1.5, fontWeight: 800, color: s.colore, border: `1px solid ${s.colore}`, borderRadius: 20, padding: "4px 10px", textTransform: "uppercase" }}>
                  {t.comingSoon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: s.colore }}>{t.discoverMore}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <NewsletterSignup lang={lang} />
    </div>
  );
}

/* pagina separata con le info sul gioco vero e proprio (hero + countdown + prezzo/piattaforme),
   tenuta distinta dalla home per non mischiare hype sul gioco e presentazione del sito */
function GiocoPage({ onGoToNews, lang }) {
  return (
    <div>
      <GameHero onGoToNews={onGoToNews} lang={lang} />
      <PlatformsPricing onGoToNews={onGoToNews} lang={lang} />
      <NewsletterSignup lang={lang} />
    </div>
  );
}

const SUPPORT_TEXT = {
  it: { eyebrow: "Assistenza", intro: "Hai trovato un problema sul sito o hai un suggerimento? Scrivici, ti rispondiamo il prima possibile." },
  en: { eyebrow: "Support", intro: "Found a problem on the site or have a suggestion? Write to us, we'll get back to you as soon as possible." },
};

function SupportoPage({ lang }) {
  const t = SUPPORT_TEXT[lang];
  return (
    <div style={{ padding: "20px 16px 40px", maxWidth: 700, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ fontSize: 13, letterSpacing: 2, color: "#FFC24B", fontWeight: 800, marginBottom: 12, textTransform: "uppercase" }}>{t.eyebrow}</div>
      <div style={{ background: "#0F1530", border: "1px solid #1C2340", borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.6, marginBottom: 12 }}>
          {t.intro}
        </div>
        <a href={`mailto:${SUPPORT_EMAIL}`} style={{ display: "inline-block", color: "#2DE3D6", border: "1px solid #2DE3D6", borderRadius: 6, padding: "9px 14px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
          {SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
}

/* ---------- Sezioni non ancora attive ("Prossimamente") ---------- */
const COMING_SOON_COPY = {
  it: {
    mappa: {
      titolo: "Mappa Interattiva", testo: "Qui troverai veicoli rari, armi, collezionabili ed easter egg sparsi per Leonida. La sezione si attiva con dati reali al lancio del gioco.",
      tagline: "Più dettagliata della minimappa in-game, sempre a portata di clic mentre giochi.",
      bullets: [
        "Posizione precisa di veicoli rari, armi e collezionabili in ogni angolo di Leonida",
        "Filtri per categoria e ricerca istantanea, per trovare subito quello che ti serve",
        "Zoom e trascinamento fluidi: la tieni aperta in un'altra finestra mentre giochi",
        "Aggiornata con le scoperte della community ad ogni patch del gioco",
      ],
    },
    trucchi: {
      titolo: "Trucchi", testo: "Codici e tecniche per la storia e l'online. La sezione si attiva con dati reali al lancio del gioco.",
      tagline: "Tutti i codici in un posto solo, senza popup e pubblicità invadente.",
      bullets: [
        "Codici per storia e modalità online, con le piattaforme su cui funziona ciascuno",
        "Effetti spiegati chiaramente, incluse eventuali controindicazioni (es. achievement disattivati)",
        "Ricerca rapida per trovare il trucco giusto in pochi secondi",
        "Lista aggiornata ad ogni patch: niente codici obsoleti",
      ],
    },
    missioni: {
      titolo: "Missioni & Segreti", testo: "Consigli per superare i capitoli della storia e i segreti collegati. La sezione si attiva con dati reali al lancio del gioco.",
      tagline: "Non restare bloccato: guide chiare, senza spoiler inutili.",
      bullets: [
        "Walkthrough sintetico per ogni capitolo della storia",
        "Segreti ed easter egg collegati agli oggetti nascosti sulla mappa",
        "Percorso consigliato per completare la storia al 100%",
        "Scritte per essere lette al volo, senza girare tra dieci tab del browser",
      ],
    },
    glitch: {
      titolo: "Glitch Online", testo: "Bug ed exploit della modalità online: duplicazione veicoli, soldi infiniti e altri trucchi scoperti dalla community. Riservato agli abbonati premium, la sezione si attiva con dati reali al lancio del gioco.",
      tagline: "Gli exploit online più usati, spiegati passo passo, riservati ai Premium.",
      bullets: [
        "Duplicazione di veicoli e oggetti rari in modalità online",
        "Glitch per soldi infiniti e altri exploit economici",
        "Rischio di ban spiegato per ogni glitch, per giocare con consapevolezza",
        "Aggiornati appena Rockstar rilascia una patch: sappiamo cosa funziona ancora",
      ],
    },
    assistente: {
      titolo: "Assistente IA", testo: "L'assistente che risponde alle tue domande mentre giochi, riservato agli abbonati premium. Si attiva insieme ai dati reali del gioco.",
      tagline: "Il tuo copilota mentre giochi, riservato agli abbonati Premium.",
      bullets: [
        "Chiedi in linguaggio naturale: \"come raggiungo questo punto?\", \"come supero questa missione?\"",
        "Risposte basate sui dati reali del sito, non generiche come un chatbot qualsiasi",
        "Suggerimenti su misura in base a dove sei arrivato nella storia",
        "Sempre a disposizione, anche mentre sei ancora in partita",
      ],
    },
  },
  en: {
    mappa: {
      titolo: "Interactive Map", testo: "Here you'll find rare vehicles, weapons, collectibles and easter eggs scattered across Leonida. This section unlocks with real data at the game's launch.",
      tagline: "More detailed than the in-game minimap, always one click away while you play.",
      bullets: [
        "Precise location of rare vehicles, weapons and collectibles across every corner of Leonida",
        "Category filters and instant search, to find exactly what you need right away",
        "Smooth zoom and drag: keep it open in another window while you play",
        "Updated with community discoveries after every game patch",
      ],
    },
    trucchi: {
      titolo: "Cheats", testo: "Codes and techniques for story mode and online. This section unlocks with real data at the game's launch.",
      tagline: "Every code in one place, no popups and no intrusive ads.",
      bullets: [
        "Codes for story mode and online, with the platforms each one works on",
        "Effects explained clearly, including any drawbacks (e.g. disabled achievements)",
        "Quick search to find the right cheat in seconds",
        "List updated after every patch: no outdated codes",
      ],
    },
    missioni: {
      titolo: "Missions & Secrets", testo: "Tips for beating story chapters and their related secrets. This section unlocks with real data at the game's launch.",
      tagline: "Never get stuck again: clear guides, without unnecessary spoilers.",
      bullets: [
        "Concise walkthrough for every chapter of the story",
        "Secrets and easter eggs tied to items hidden on the map",
        "Recommended route to complete the story 100%",
        "Written to be skimmed fast, without ten browser tabs open",
      ],
    },
    glitch: {
      titolo: "Online Glitches", testo: "Bugs and exploits for online mode: vehicle duplication, money glitches and other tricks found by the community. Reserved for premium subscribers, this section unlocks with real data at the game's launch.",
      tagline: "The most-used online exploits, explained step by step, for Premium members only.",
      bullets: [
        "Vehicle and rare item duplication in online mode",
        "Money glitches and other economic exploits",
        "Ban risk explained for each glitch, so you can play with awareness",
        "Updated the moment Rockstar ships a patch: we track what still works",
      ],
    },
    assistente: {
      titolo: "AI Assistant", testo: "The assistant that answers your questions while you play, reserved for premium subscribers. It unlocks together with the game's real data.",
      tagline: "Your co-pilot while you play, reserved for Premium subscribers.",
      bullets: [
        "Ask in plain language: \"how do I get to this point?\", \"how do I beat this mission?\"",
        "Answers based on the site's real data, not generic like any other chatbot",
        "Tailored suggestions based on where you are in the story",
        "Always available, even while you're mid-session",
      ],
    },
  },
};

const COMING_SOON_BADGE = { it: "Prossimamente", en: "Coming soon" };
const GO_TO_NEWS_BTN = { it: "Vai alle Notizie", en: "Go to News" };
const BACK_TO_FEATURES_BTN = { it: "← Torna alle funzionalità", en: "← Back to features" };

/* tema visivo per ogni sezione bloccata: colore accento, icona grande e set di icone sparse sullo sfondo */
const LOCK_THEME = {
  mappa: { accent: "#2DE3D6", heroIcon: "🗺️", icons: ["📍", "🧭", "📌", "🚗"] },
  trucchi: { accent: "#FFC24B", heroIcon: "🎮", icons: ["⌨️", "🕹️", "💾", "🔢"] },
  missioni: { accent: "#FF3D8A", heroIcon: "🕵️", icons: ["🔍", "🗝️", "👁️", "❓"] },
  glitch: { accent: "#B24BFF", heroIcon: "🐛", icons: ["💰", "🚗", "🐛", "♾️"] },
  assistente: { accent: "#2DE3D6", heroIcon: "🤖", icons: ["💬", "⚡", "🔮", "📡"] },
};

/* posizioni fisse (non casuali, per evitare sfarfallii ad ogni render) delle icone sfocate sullo sfondo */
const SCATTER_POSITIONS = [
  { top: 8, left: 10, size: 54, rot: -12 },
  { top: 18, left: 78, size: 70, rot: 10 },
  { top: 62, left: 6, size: 60, rot: 8 },
  { top: 72, left: 84, size: 50, rot: -8 },
  { top: 38, left: 45, size: 90, rot: 4 },
  { top: 4, left: 48, size: 40, rot: -6 },
  { top: 82, left: 40, size: 46, rot: 14 },
  { top: 50, left: 92, size: 38, rot: -4 },
];

function ComingSoonBackdrop({ theme }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${theme.accent}33 0%, transparent 70%)`, filter: "blur(4px)" }} />

      {SCATTER_POSITIONS.map((p, i) => (
        <div key={i} style={{ position: "absolute", top: `${p.top}%`, left: `${p.left}%`, fontSize: p.size, transform: `rotate(${p.rot}deg)`, filter: "blur(3px) grayscale(20%)", opacity: 0.16 }}>
          {theme.icons[i % theme.icons.length]}
        </div>
      ))}

      <div style={{
        position: "absolute", bottom: 0, left: "-25%", right: "-25%", height: "50%",
        backgroundImage: `linear-gradient(90deg, ${theme.accent}55 1px, transparent 1px), linear-gradient(0deg, ${theme.accent}55 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        transform: "perspective(280px) rotateX(62deg)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
        opacity: 0.5,
      }} />
    </div>
  );
}

function ComingSoonPage({ view, onGoToNews, onBack, lang }) {
  const copy = COMING_SOON_COPY[lang][view];
  const theme = LOCK_THEME[view];
  return (
    <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px 0", background: "linear-gradient(180deg, #0B1026 0%, #10173A 100%)" }}>
      <ComingSoonBackdrop theme={theme} />
      <div style={{ position: "relative", maxWidth: 440, textAlign: "center", background: "rgba(11,16,38,0.82)", border: `1px solid ${theme.accent}55`, borderRadius: 16, padding: "32px 28px", boxShadow: `0 0 40px ${theme.accent}22`, marginBottom: 48 }}>
        <div style={{ fontSize: 40, marginBottom: 14 }}>{theme.heroIcon}</div>
        <div style={{ display: "inline-block", fontSize: 11, letterSpacing: 2, color: theme.accent, fontWeight: 800, marginBottom: 12, textTransform: "uppercase", border: `1px solid ${theme.accent}`, borderRadius: 20, padding: "4px 14px" }}>
          {COMING_SOON_BADGE[lang]}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>{copy.titolo}</div>
        <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.6, marginBottom: 22 }}>{copy.testo}</div>
        <button
          onClick={onGoToNews}
          style={{ background: "#FF3D8A", border: "none", borderRadius: 6, padding: "11px 20px", color: "#0B1026", fontWeight: 800, fontSize: 12, letterSpacing: 0.5, cursor: "pointer", textTransform: "uppercase" }}
        >
          {GO_TO_NEWS_BTN[lang]}
        </button>
        {onBack && (
          <div style={{ marginTop: 16 }}>
            <button
              onClick={onBack}
              style={{ background: "none", border: "none", color: "#7A8099", fontSize: 12, fontWeight: 700, letterSpacing: 0.3, cursor: "pointer", padding: 4 }}
            >
              {BACK_TO_FEATURES_BTN[lang]}
            </button>
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: "100%" }}>
        <NewsletterSignup lang={lang} />
      </div>
    </div>
  );
}

const FEATURES_HUB_TEXT = {
  it: {
    eyebrow: "Perché Vice // Radar",
    title: "Funzionalità",
    intro: "Non un'altra wiki disordinata o un sito pieno di pubblicità: cinque strumenti pensati per restare aperti mentre giochi, con dati precisi e sempre aggiornati. Si sbloccano tutti il 19 novembre 2026, giorno del lancio.",
    premiumBadge: "✨ Premium",
    ctaHeading: "Vuoi essere il primo a provarli?",
    ctaText: "Iscriviti alla newsletter qui sotto: ti avvisiamo il giorno stesso in cui Mappa, Trucchi, Missioni, Glitch e Assistente IA si sbloccano.",
  },
  en: {
    eyebrow: "Why Vice // Radar",
    title: "Features",
    intro: "Not another cluttered wiki or an ad-stuffed site: five tools built to stay open while you play, with precise, always up-to-date data. All five unlock on November 19, 2026, launch day.",
    premiumBadge: "✨ Premium",
    ctaHeading: "Want to be the first to try them?",
    ctaText: "Sign up for the newsletter below: we'll notify you the moment Map, Cheats, Missions, Glitches and AI Assistant unlock.",
  },
};

const PLANS_TEXT = {
  it: {
    eyebrow: "Free vs Premium",
    title: "Cosa include ogni piano",
    intro: "Il prezzo non è ancora deciso: lo confermeremo più vicino al lancio. Ecco intanto cosa include ciascun piano.",
    freeName: "Free",
    freeDesc: "Gli strumenti base per giocare meglio, sempre gratuiti.",
    premiumName: "Premium",
    premiumDesc: "Tutto il Free, più gli strumenti avanzati per l'online.",
    premiumBadge: "✨ Premium",
    priceNote: "Prezzo da annunciare",
  },
  en: {
    eyebrow: "Free vs Premium",
    title: "What each plan includes",
    intro: "Pricing isn't decided yet — we'll confirm it closer to launch. Here's what to expect from each plan in the meantime.",
    freeName: "Free",
    freeDesc: "The essential tools to play better, always free.",
    premiumName: "Premium",
    premiumDesc: "Everything in Free, plus the advanced tools for online.",
    premiumBadge: "✨ Premium",
    priceNote: "Price to be announced",
  },
};

/* tabella di confronto Free/Premium: riusa titoli/tema delle stesse 5 funzioni bloccate
   (COMING_SOON_COPY / LOCK_THEME / PREMIUM_VIEWS) per non duplicare i testi altrove */
function PlansComparison({ lang }) {
  const t = PLANS_TEXT[lang];
  const freeKeys = LOCKED_VIEWS.filter((k) => !PREMIUM_VIEWS.includes(k));

  function renderFeature(key) {
    const isPremiumOnly = PREMIUM_VIEWS.includes(key);
    return (
      <li key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#E4E6F2" }}>
        <span style={{ color: isPremiumOnly ? "#FFC24B" : "#2DE3D6", fontWeight: 900 }}>✓</span>
        <span>{LOCK_THEME[key].heroIcon} {COMING_SOON_COPY[lang][key].titolo}</span>
      </li>
    );
  }

  return (
    <div style={{ padding: "8px 16px 40px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#2DE3D6", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>{t.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, letterSpacing: 0.5, margin: "0 0 12px", textTransform: "uppercase", color: "#F2F0E9" }}>{t.title}</h2>
        <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>{t.intro}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        <div style={{ background: "#0F1530", border: "1px solid #1C2340", borderRadius: 12, padding: "24px 22px" }}>
          <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>{t.freeName}</div>
          <div style={{ fontSize: 13, color: "#C7CBDA", marginBottom: 18 }}>{t.freeDesc}</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {freeKeys.map(renderFeature)}
          </ul>
        </div>
        <div style={{ position: "relative", background: "linear-gradient(135deg, #1A1440, #0F1530)", border: "1px solid rgba(255,194,75,0.45)", borderRadius: 12, padding: "24px 22px" }}>
          <div style={{ position: "absolute", top: 14, right: 14, fontSize: 10, letterSpacing: 1.5, fontWeight: 800, color: "#0B1026", background: "#FFC24B", borderRadius: 20, padding: "4px 10px", textTransform: "uppercase" }}>
            {t.premiumBadge}
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 4 }}>{t.premiumName}</div>
          <div style={{ fontSize: 13, color: "#C7CBDA", marginBottom: 18 }}>{t.premiumDesc}</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {LOCKED_VIEWS.map(renderFeature)}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: "#7A8099", marginTop: 18, textTransform: "uppercase", letterSpacing: 1 }}>{t.priceNote}</div>
    </div>
  );
}

/* pagina hub che raggruppa le 4 funzioni ancora bloccate (mappa, trucchi, missioni, assistente):
   card dettagliate con tagline e benefici concreti (a differenza del riassunto rapido in home),
   pensate per convincere a tornare/iscriversi prima del lancio. Ogni card apre comunque la
   relativa ComingSoonPage per chi vuole solo la versione breve. */
function FeaturesHubPage({ onSelect, lang }) {
  const t = FEATURES_HUB_TEXT[lang];
  return (
    <div style={{ flex: 1, padding: "40px 16px 48px", maxWidth: 820, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#2DE3D6", fontWeight: 800, marginBottom: 10, textTransform: "uppercase" }}>{t.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontWeight: 900, letterSpacing: 0.5, margin: "0 0 14px", textTransform: "uppercase", color: "#F2F0E9" }}>{t.title}</h2>
        <div style={{ fontSize: 14, color: "#C7CBDA", lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>{t.intro}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
        {LOCKED_VIEWS.map((key) => {
          const theme = LOCK_THEME[key];
          const copy = COMING_SOON_COPY[lang][key];
          const isPremium = PREMIUM_VIEWS.includes(key);
          return (
            <div
              key={key}
              style={{ textAlign: "left", position: "relative", background: "#0F1530", border: "1px solid #1C2340", borderTop: `3px solid ${theme.accent}`, borderRadius: 12, padding: "22px 20px", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 22, width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${theme.accent}22`, flexShrink: 0 }}>
                  {theme.heroIcon}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{copy.titolo}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: theme.accent, fontWeight: 700, lineHeight: 1.5, marginBottom: 14 }}>{copy.tagline}</div>
              <ul style={{ margin: "0 0 16px", paddingLeft: 18, fontSize: 12.5, color: "#C7CBDA", lineHeight: 1.75, flex: 1 }}>
                {copy.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                <div style={{ display: "inline-block", fontSize: 10, letterSpacing: 1.5, fontWeight: 800, color: theme.accent, border: `1px solid ${theme.accent}`, borderRadius: 20, padding: "4px 10px", textTransform: "uppercase" }}>
                  {COMING_SOON_BADGE[lang]}
                </div>
                {isPremium && (
                  <div style={{ display: "inline-block", fontSize: 10, letterSpacing: 1.5, fontWeight: 800, color: "#0B1026", background: "#FFC24B", borderRadius: 20, padding: "4px 10px", textTransform: "uppercase" }}>
                    {t.premiumBadge}
                  </div>
                )}
              </div>
              <button
                onClick={() => onSelect(key)}
                style={{ alignSelf: "flex-start", background: "none", border: "none", color: theme.accent, fontSize: 12, fontWeight: 800, letterSpacing: 0.3, cursor: "pointer", padding: 0, textTransform: "uppercase" }}
              >
                {lang === "en" ? "Details →" : "Dettagli →"}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 48 }}>
        <PlansComparison lang={lang} />
      </div>

      <div style={{ textAlign: "center", marginTop: 8, marginBottom: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 6 }}>{t.ctaHeading}</div>
        <div style={{ fontSize: 13, color: "#C7CBDA", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>{t.ctaText}</div>
      </div>

      <NewsletterSignup lang={lang} />
    </div>
  );
}

/* ---------- Mappa illustrata stile gioco, con zoom e pan ---------- */
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const BUTTON_ZOOM_STEP = 0.25;
const WHEEL_ZOOM_STEP = 0.08;

function MapCanvas({ locations, selected, onSelect, height }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [squareSize, setSquareSize] = useState(0);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  /* la mappa (viewBox 100x100) è quadrata: qui misuriamo lo spazio disponibile e
     mostriamo un riquadro quadrato al suo interno, così l'isola non viene mai tagliata */
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function updateSize() {
      const rect = el.getBoundingClientRect();
      setSquareSize(Math.max(0, Math.min(rect.width, rect.height)));
    }
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function clampPan(p, z) {
    if (!squareSize || z <= 1) return { x: 0, y: 0 };
    const maxX = (squareSize * (z - 1)) / 2;
    const maxY = (squareSize * (z - 1)) / 2;
    return { x: Math.min(maxX, Math.max(-maxX, p.x)), y: Math.min(maxY, Math.max(-maxY, p.y)) };
  }

  function applyZoom(nextZoomRaw) {
    const nextZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nextZoomRaw));
    setZoom(nextZoom);
    setPan((p) => clampPan(p, nextZoom));
  }

  function handleWheel(e) {
    e.preventDefault();
    applyZoom(zoom + (e.deltaY > 0 ? -WHEEL_ZOOM_STEP : WHEEL_ZOOM_STEP));
  }

  function handlePointerDown(e) {
    if (zoom <= 1) return;
    draggingRef.current = true;
    setIsDragging(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setPan((p) => clampPan({ x: p.x + dx, y: p.y + dy }, zoom));
  }
  function handlePointerUp() {
    draggingRef.current = false;
    setIsDragging(false);
  }

  const zoomBtnStyle = {
    width: 30, height: 30, borderRadius: 6, border: "1px solid #2DE3D6", background: "#0F1530",
    color: "#2DE3D6", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
  };
  function stopBtnPropagation(e) {
    e.stopPropagation();
  }

  function handleMarkerClick(loc) {
    if (zoom > 1) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
    onSelect(loc);
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ position: "relative", width: "100%", height, minHeight: 380, borderRadius: 10, overflow: "hidden", border: "1px solid #2a2350", touchAction: "none", cursor: zoom > 1 ? "grab" : "default", background: "#0e2038", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div style={{ position: "relative", width: squareSize || "100%", height: squareSize || "100%", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center center", transition: isDragging ? "none" : "transform 120ms ease-out" }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c3d5e" />
            <stop offset="100%" stopColor="#0e2038" />
          </linearGradient>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d9c98f" />
            <stop offset="100%" stopColor="#c3ae72" />
          </linearGradient>
          <clipPath id="landClip">
            <path d="M18,20 C10,30 8,45 14,58 C18,68 16,80 26,88 C40,96 58,94 66,84 C72,76 68,68 76,60 C86,50 88,36 78,24 C68,12 50,8 38,10 C28,12 24,14 18,20 Z" />
          </clipPath>
        </defs>

        {/* acqua di sfondo */}
        <rect x="0" y="0" width="100" height="100" fill="url(#water)" />
        {/* riflessi acqua */}
        {WAVE_LINES.map((w, i) => (
          <line key={"wave" + i} x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} stroke="#3a6a8f" strokeWidth="0.3" opacity="0.5" />
        ))}

        {/* terraferma */}
        <path d="M18,20 C10,30 8,45 14,58 C18,68 16,80 26,88 C40,96 58,94 66,84 C72,76 68,68 76,60 C86,50 88,36 78,24 C68,12 50,8 38,10 C28,12 24,14 18,20 Z" fill="url(#land)" stroke="#8f7a3f" strokeWidth="0.4" />

        {/* griglia stradale, clippata sulla terraferma */}
        <g clipPath="url(#landClip)" opacity="0.55">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={"sv" + i} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="#8a7540" strokeWidth="0.35" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={"sh" + i} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#8a7540" strokeWidth="0.35" />
          ))}
          {/* isolati/edifici */}
          {BUILDINGS.map((b, i) => (
            <rect key={"b" + i} x={b.x} y={b.y} width={b.w} height={b.h} fill="#a68f52" opacity="0.6" />
          ))}
          {/* svincoli/autostrade più marcate */}
          <path d="M12,50 C30,45 50,55 88,48" stroke="#5b4a24" strokeWidth="1.1" fill="none" opacity="0.8" />
          <path d="M35,10 C40,35 42,60 40,92" stroke="#5b4a24" strokeWidth="1.1" fill="none" opacity="0.8" />
        </g>

        {/* bordo costa evidenziato */}
        <path d="M18,20 C10,30 8,45 14,58 C18,68 16,80 26,88 C40,96 58,94 66,84 C72,76 68,68 76,60 C86,50 88,36 78,24 C68,12 50,8 38,10 C28,12 24,14 18,20 Z" fill="none" stroke="#FFC24B" strokeWidth="0.5" opacity="0.6" />
      </svg>

      {/* etichette quartieri (fittizie) */}
      {[
        { label: "Distretto Nord (esempio)", x: 42, y: 16 },
        { label: "Centro (esempio)", x: 48, y: 46 },
        { label: "Zona Costiera Sud (esempio)", x: 26, y: 78 },
        { label: "Area Portuale (esempio)", x: 70, y: 42 },
      ].map((d) => (
        <div key={d.label} style={{ position: "absolute", left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%,-50%)", fontSize: 9, letterSpacing: 1, color: "#3a2f14", fontWeight: 700, textTransform: "uppercase", pointerEvents: "none", textShadow: "0 1px 0 rgba(255,255,255,0.25)" }}>
          {d.label}
        </div>
      ))}

      {/* icone decorative città */}
      <div style={{ position: "absolute", left: "70%", top: "20%" }}><CityIcon kind="aeroporto" color="#3a2f14" /></div>
      <div style={{ position: "absolute", left: "52%", top: "58%" }}><CityIcon kind="stadio" color="#3a2f14" /></div>
      <div style={{ position: "absolute", left: "80%", top: "50%" }}><CityIcon kind="porto" color="#3a2f14" /></div>

      <PalmSilhouette style={{ position: "absolute", left: "2%", bottom: "2%", opacity: 0.85 }} />
      <PalmSilhouette style={{ position: "absolute", right: "3%", top: "4%", opacity: 0.6, transform: "scale(0.6)" }} />

      {/* marker */}
      {locations.map((loc) => {
        const color = catColor(loc.categoria);
        const isSel = selected?.id === loc.id;
        return (
          <button
            key={loc.id}
            onClick={() => handleMarkerClick(loc)}
            onPointerDown={stopBtnPropagation}
            onPointerMove={stopBtnPropagation}
            onPointerUp={stopBtnPropagation}
            title={loc.nome}
            style={{
              position: "absolute", left: `${loc.x}%`, top: `${loc.y}%`,
              transform: "translate(-50%, -50%)",
              width: isSel ? 30 : 24, height: isSel ? 30 : 24,
              borderRadius: "50%",
              background: color,
              border: isSel ? "2.5px solid #F2F0E9" : "1.5px solid rgba(11,16,38,0.5)",
              boxShadow: `0 0 ${isSel ? 16 : 9}px ${color}`,
              cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <MarkerIcon categoria={loc.categoria} size={isSel ? 17 : 14} color="#0B1026" />
          </button>
        );
      })}
      </div>
      </div>

      {/* controlli zoom, fuori dal livello trasformato */}
      <div
        style={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column", gap: 6, zIndex: 25 }}
        onPointerDown={stopBtnPropagation}
        onPointerMove={stopBtnPropagation}
        onPointerUp={stopBtnPropagation}
      >
        <button style={zoomBtnStyle} onClick={() => applyZoom(zoom + BUTTON_ZOOM_STEP)} title="Zoom avanti">+</button>
        <button style={zoomBtnStyle} onClick={() => applyZoom(zoom - BUTTON_ZOOM_STEP)} title="Zoom indietro">−</button>
        <button style={{ ...zoomBtnStyle, fontSize: 11 }} onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} title="Reset zoom">1:1</button>
      </div>
    </div>
  );
}

/* ---------- App principale ---------- */
const VIEWS = [
  { key: "presentazione", label: "Home", label_en: "Home", shortLabel: "Home", shortLabel_en: "Home" },
  { key: "gioco", label: "Il Gioco", label_en: "The Game", shortLabel: "Gioco", shortLabel_en: "Game" },
  { key: "news", label: "Notizie", label_en: "News", shortLabel: "Notizie", shortLabel_en: "News" },
  { key: "funzionalita", label: "Funzionalità", label_en: "Features", shortLabel: "Funzioni", shortLabel_en: "Features" },
  { key: "supporto", label: "Assistenza", label_en: "Support", shortLabel: "Supporto", shortLabel_en: "Support" },
];

/* le 4 voci prima erano separate nel menu: ora sono raggruppate sotto "funzionalita",
   che mostra una pagina hub con una card cliccabile per ciascuna (vedi FeaturesHubPage) */

/* sezioni senza dati reali ancora: restano nel menu ma mostrano "Prossimamente".
   Quando avremo contenuti veri per una sezione, basta toglierla da questo elenco. */
const LOCKED_VIEWS = ["mappa", "trucchi", "missioni", "glitch", "assistente"];
const PREMIUM_VIEWS = ["glitch", "assistente"];

const HEADER_TEXT = {
  it: {
    searchLockedPlaceholder: "Cerca nelle notizie…",
    searchFullPlaceholder: "Cerca oggetti, trucchi, missioni…",
    activePoints: "PUNTI ATTIVI",
    newsCount: "NOTIZIE",
    cheatsCount: "TRUCCHI",
    missionsCount: "MISSIONI",
  },
  en: {
    searchLockedPlaceholder: "Search the news…",
    searchFullPlaceholder: "Search items, cheats, missions…",
    activePoints: "ACTIVE POINTS",
    newsCount: "NEWS",
    cheatsCount: "CHEATS",
    missionsCount: "MISSIONS",
  },
};

/* rileva la lingua del browser solo alla primissima visita; dopo vince sempre la scelta manuale salvata */
function detectInitialLang() {
  if (typeof window === "undefined") return "it";
  try {
    const saved = window.localStorage.getItem("vr_lang");
    if (saved === "it" || saved === "en") return saved;
  } catch (e) {}
  const nav = typeof navigator !== "undefined" ? navigator.language : "it";
  return nav && nav.toLowerCase().startsWith("en") ? "en" : "it";
}

const FOOTER_TEXT = {
  it: { tiktok: "Seguici su TikTok", youtube: "Iscriviti su YouTube" },
  en: { tiktok: "Follow us on TikTok", youtube: "Subscribe on YouTube" },
};

function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82c-1.02-.9-1.6-2.2-1.6-3.6h-3.05v13.7c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1-2.72-2.72 2.72 2.72 0 0 1 2.72-2.72c.28 0 .55.04.8.12v-3.1a5.8 5.8 0 0 0-.8-.06 5.78 5.78 0 0 0-5.78 5.78A5.78 5.78 0 0 0 9.23 21.6a5.78 5.78 0 0 0 5.78-5.78V9.4a7.5 7.5 0 0 0 4.4 1.42V7.77a4.5 4.5 0 0 1-2.81-1.95Z" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.97C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33ZM9.75 15.02V8.48l5.75 3.27-5.75 3.27Z" />
    </svg>
  );
}

const STICKY_COUNTDOWN_TEXT = {
  it: (days) => `🔥 Mancano ${days} giorni al lancio di GTA6`,
  en: (days) => `🔥 ${days} days left until GTA6 launches`,
};
const STICKY_COUNTDOWN_CTA = { it: "Scopri di più →", en: "Learn more →" };

/* barra countdown compatta, visibile in cima a tutte le pagine tranne "Il Gioco"
   (che mostra già il countdown grande): rinforza l'urgenza mentre l'utente legge
   notizie o naviga le altre sezioni, non solo sulla pagina dedicata al gioco */
function StickyCountdownBar({ onGoToGame, lang }) {
  const { days } = useCountdown(LAUNCH_DATE);
  return (
    <button
      onClick={onGoToGame}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%",
        background: "linear-gradient(90deg, #FF3D8A, #FFC24B)", border: "none", color: "#0B1026",
        fontWeight: 800, fontSize: 12, letterSpacing: 0.3, padding: "8px 12px", cursor: "pointer",
        position: "sticky", top: 0, zIndex: 40,
      }}
    >
      {STICKY_COUNTDOWN_TEXT[lang](days)}
      <span style={{ textDecoration: "underline" }}>{STICKY_COUNTDOWN_CTA[lang]}</span>
    </button>
  );
}

export default function GTA6Map() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("tutti");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("presentazione"); // sezione principale, vedi VIEWS
  const [tab, setTab] = useState("dettagli"); // sotto-tab del pannello mappa su desktop: "dettagli" | "assistente"
  const [prefill, setPrefill] = useState("");
  const [highlight, setHighlight] = useState(null); // { kind: "cheat" | "missione", id } per la ricerca
  const [lang, setLang] = useState(detectInitialLang);
  const ht = HEADER_TEXT[lang];

  /* niente scatto secco quando si cambia pagina dal menu: si torna dolcemente in cima */
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  function changeLang(next) {
    setLang(next);
    try { window.localStorage.setItem("vr_lang", next); } catch (e) {}
  }

  const locations = useMemo(() => (filter === "tutti" ? DATA.locations : DATA.locations.filter((l) => l.categoria === filter)), [filter]);
  const results = useMemo(() => searchAll(query, lang), [query, lang]);

  function onAskAI(q) {
    setPrefill(q);
    if (!isMobile && view === "mappa") {
      setTab("assistente");
    } else {
      setView("assistente");
    }
  }

  function pickResult(r) {
    setQuery("");
    if (r.kind === "item") {
      const loc = DATA.locations.find((l) => l.item_id === r.id);
      if (loc) { setSelected(loc); setFilter("tutti"); setView("mappa"); setTab("dettagli"); }
    } else if (r.kind === "cheat") {
      setView("trucchi");
      setHighlight({ kind: "cheat", id: r.id });
    } else if (r.kind === "missione") {
      setView("missioni");
      setHighlight({ kind: "missione", id: r.id });
    } else if (r.kind === "news") {
      setView("news");
      setHighlight({ kind: "news", id: r.id });
    }
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#0B1026", color: "#F2F0E9", fontFamily: "'Arial Narrow', 'Helvetica Neue', Arial, sans-serif", display: "flex", flexDirection: "column", paddingBottom: isMobile ? 62 : 0 }}>
      {view !== "gioco" && <StickyCountdownBar onGoToGame={() => setView("gioco")} lang={lang} />}
      {/* Header */}
      <div style={{ padding: isMobile ? "14px 14px 10px" : "18px 24px", borderBottom: "2px solid #2DE3D6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
          <span style={{ fontWeight: 900, fontSize: isMobile ? 22 : "clamp(20px, 4vw, 30px)", letterSpacing: "1.5px", background: "linear-gradient(90deg,#FF3D8A,#FFC24B,#2DE3D6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "uppercase" }}>
            Vice // Radar
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {!isMobile && !LOCKED_VIEWS.includes(view) && view === "mappa" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{locations.length} {ht.activePoints}</span>}
            {!isMobile && view === "news" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{DATA.news.length} {ht.newsCount}</span>}
            {!isMobile && !LOCKED_VIEWS.includes(view) && view === "trucchi" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{DATA.cheats.length} {ht.cheatsCount}</span>}
            {!isMobile && !LOCKED_VIEWS.includes(view) && view === "missioni" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{DATA.missioni.length} {ht.missionsCount}</span>}
            <div style={{ display: "flex", border: "1px solid #1C2340", borderRadius: 20, overflow: "hidden" }}>
              <button
                onClick={() => changeLang("it")}
                style={{ background: lang === "it" ? "#2DE3D6" : "transparent", color: lang === "it" ? "#0B1026" : "#F2F0E9", border: "none", padding: "5px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 1, cursor: "pointer" }}
              >
                IT
              </button>
              <button
                onClick={() => changeLang("en")}
                style={{ background: lang === "en" ? "#2DE3D6" : "transparent", color: lang === "en" ? "#0B1026" : "#F2F0E9", border: "none", padding: "5px 12px", fontSize: 11, fontWeight: 800, letterSpacing: 1, cursor: "pointer" }}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Nav principale, solo desktop: su mobile la stessa scelta è in fondo alla pagina */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {VIEWS.map((v) => {
              const active = view === v.key || (v.key === "funzionalita" && LOCKED_VIEWS.includes(view));
              return (
                <button
                  key={v.key}
                  onClick={() => setView(v.key)}
                  style={{
                    background: active ? "#FF3D8A" : "transparent",
                    color: active ? "#0B1026" : "#F2F0E9",
                    border: "1px solid #1C2340", borderRadius: 6,
                    padding: "9px 16px", fontSize: 12, fontWeight: 800, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase",
                  }}
                >
                  {lang === "en" ? v.label_en : v.label}
                </button>
              );
            })}
          </div>
        )}

        <div style={{ position: "relative" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={LOCKED_VIEWS.includes("mappa") && LOCKED_VIEWS.includes("trucchi") && LOCKED_VIEWS.includes("missioni") ? ht.searchLockedPlaceholder : ht.searchFullPlaceholder}
            style={{ width: "100%", background: "#0F1530", border: "1px solid #1C2340", borderRadius: 8, padding: isMobile ? "12px 14px" : "9px 12px", color: "#F2F0E9", fontSize: isMobile ? 15 : 13, outline: "none", boxSizing: "border-box" }}
          />
          {results.length > 0 && (
            <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "#0F1530", border: "1px solid #1C2340", borderRadius: 8, overflow: "hidden", zIndex: 20 }}>
              {results.map((r) => (
                <div key={r.kind + r.id} onClick={() => pickResult(r)} style={{ padding: "12px 14px", fontSize: 14, cursor: "pointer", borderBottom: "1px solid #1C2340" }}>
                  <span style={{ color: "#7A8099" }}>[{r.sub}]</span> {r.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {view === "mappa" && !LOCKED_VIEWS.includes("mappa") && (
        <div style={{ display: "flex", gap: 8, marginTop: 12, overflowX: isMobile ? "auto" : "visible", paddingBottom: 2 }}>
          {CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => { setFilter(c.key); }}
              style={{
                display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
                background: filter === c.key ? c.color : "transparent",
                color: filter === c.key ? "#0B1026" : c.color,
                border: `1px solid ${c.color}`, borderRadius: 20,
                padding: isMobile ? "8px 14px" : "6px 14px",
                fontSize: 12, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              {c.key !== "tutti" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: filter === c.key ? "#0B1026" : c.color, flexShrink: 0 }} />}
              {c.label}
            </button>
          ))}
        </div>
        )}
      </div>

      {/* Contenuto: key={view} fa ripartire la dissolvenza vr-fade-in ad ogni cambio pagina */}
      <div key={view} className="vr-fade-in" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
      {view === "presentazione" ? (
        <div style={{ flex: 1 }}>
          <PresentazionePage onGoToGame={() => setView("gioco")} onGoToFeatures={() => setView("funzionalita")} onSelectFeature={(key) => setView(key)} lang={lang} />
        </div>
      ) : view === "gioco" ? (
        <div style={{ flex: 1 }}>
          <GiocoPage onGoToNews={() => setView("news")} lang={lang} />
        </div>
      ) : view === "supporto" ? (
        <div style={{ flex: 1 }}>
          <SupportoPage lang={lang} />
        </div>
      ) : view === "funzionalita" ? (
        <FeaturesHubPage onSelect={(key) => setView(key)} lang={lang} />
      ) : LOCKED_VIEWS.includes(view) ? (
        <ComingSoonPage view={view} onGoToNews={() => setView("news")} onBack={() => setView("funzionalita")} lang={lang} />
      ) : view === "news" ? (
        <div style={{ flex: 1 }}>
          <NewsPage highlight={highlight} onClearHighlight={() => setHighlight(null)} onAskAI={onAskAI} lang={lang} />
        </div>
      ) : isMobile ? (
        <div style={{ padding: 14, flex: 1 }}>
          {view === "mappa" && (
            <div style={{ position: "relative" }}>
              <MapCanvas locations={locations} selected={selected} onSelect={setSelected} height="62vh" />
              {/* scheda overlay: la mappa resta visibile dietro */}
              {selected && (
                <div
                  style={{
                    position: "absolute", left: 0, right: 0, bottom: 0,
                    maxHeight: "58%", overflowY: "auto",
                    background: "#0F1530", borderTop: "2px solid #2DE3D6",
                    borderRadius: "14px 14px 0 0",
                    padding: "14px 16px 18px",
                    boxShadow: "0 -8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                    <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#7A8099", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
                  </div>
                  <DetailContent selected={selected} onAskAI={onAskAI} />
                </div>
              )}
            </div>
          )}
          {view === "assistente" && (
            <div style={{ background: "#0F1530", border: "1px solid #1C2340", borderRadius: 10, padding: 16, height: "70vh" }}>
              <AIAssistant prefill={prefill} onConsumePrefill={() => setPrefill("")} />
            </div>
          )}
        </div>
      ) : view === "assistente" ? (
        <div style={{ flex: 1, padding: 20, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 700, padding: 18, border: "1px solid #1C2340", borderRadius: 10, background: "#0F1530", height: "calc(100vh - 220px)", display: "flex", flexDirection: "column" }}>
            <AIAssistant prefill={prefill} onConsumePrefill={() => setPrefill("")} />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 600px", margin: 20, position: "relative" }}>
            <MapCanvas locations={locations} selected={selected} onSelect={setSelected} height="calc(100vh - 220px)" />
          </div>
          <div style={{ flex: "0 1 340px", margin: "20px 20px 20px 0", padding: 18, border: "1px solid #1C2340", borderRadius: 10, background: "#0F1530", minHeight: 480, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {["dettagli", "assistente"].map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  style={{ flex: 1, background: tab === k ? "#FF3D8A" : "transparent", color: tab === k ? "#0B1026" : "#F2F0E9", border: "1px solid #1C2340", borderRadius: 6, padding: "8px 0", fontSize: 11, fontWeight: 800, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase" }}
                >
                  {k === "dettagli" ? "Dettagli" : "Assistente IA"}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              {tab === "assistente" ? (
                <AIAssistant prefill={prefill} onConsumePrefill={() => setPrefill("")} />
              ) : (
                <DetailContent selected={selected} onAskAI={onAskAI} />
              )}
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Footer: link social, visibile su tutte le pagine */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 24, padding: "20px 16px", borderTop: "1px solid #1C2340" }}>
        <a
          href="https://www.tiktok.com/@vice.radar.gta.VI"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7A8099", fontSize: 13, fontWeight: 700, textDecoration: "none" }}
        >
          <TikTokIcon size={16} />
          {FOOTER_TEXT[lang].tiktok}
        </a>
        <a
          href="https://www.youtube.com/@ViceRadar-GTAVI"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7A8099", fontSize: 13, fontWeight: 700, textDecoration: "none" }}
        >
          <YouTubeIcon size={16} />
          {FOOTER_TEXT[lang].youtube}
        </a>
      </div>

      {/* Bottom nav mobile: stesse voci del nav desktop, generate da VIEWS */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", background: "#0F1530", borderTop: "1px solid #1C2340", zIndex: 30 }}>
          {VIEWS.map((v) => {
            const active = view === v.key || (v.key === "funzionalita" && LOCKED_VIEWS.includes(view));
            return (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                style={{ flex: 1, background: "none", border: "none", padding: "12px 0", color: active ? "#2DE3D6" : "#7A8099", fontWeight: active ? 800 : 600, fontSize: 11, letterSpacing: 0.5, cursor: "pointer" }}
              >
                {lang === "en" ? v.shortLabel_en : v.shortLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
