# Schema Database — Sito GTA6

## Filosofia
Iniziamo con file JSON semplici (niente server/database vero richiesto per partire). Quando il sito cresce, questa struttura si trasforma facilmente in un database reale (es. Supabase, Firebase) senza cambiare la logica.

---

## 1. Tabella `items` (oggetti rari, veicoli, armi — tabella unica con "tipo")

| Campo | Tipo | Descrizione |
|---|---|---|
| id | stringa | identificativo univoco (es. "veh_001") |
| tipo | enum | "veicolo" \| "arma" \| "collezionabile" \| "easter_egg" |
| nome | stringa | nome dell'oggetto |
| rarità | enum | "comune" \| "raro" \| "leggendario" \| "unico" |
| modalità | enum | "storia" \| "online" \| "entrambe" |
| descrizione | testo | cosa lo rende speciale |
| come_ottenerlo | testo | condizioni/passaggi per sbloccarlo |
| immagine | url | screenshot/immagine |
| location_id | riferimento | collegamento a `locations` (dove si trova) |
| tags | lista | es. ["veloce", "corazzato", "capitolo 3"] |

## 2. Tabella `locations` (per la mappa interattiva)

| Campo | Tipo | Descrizione |
|---|---|---|
| id | stringa | identificativo univoco |
| nome | stringa | nome del luogo |
| coordinate_x / coordinate_y | numero | posizione sulla mappa (0-100, percentuale) |
| categoria | enum | "veicolo" \| "arma" \| "collezionabile" \| "missione" \| "segreto" |
| item_id | riferimento | collegamento a `items` se applicabile |
| descrizione | testo | note utili per il giocatore |
| icona | stringa | nome icona da mostrare sulla mappa |

## 3. Tabella `cheats` (trucchi)

| Campo | Tipo | Descrizione |
|---|---|---|
| id | stringa | identificativo univoco |
| nome_effetto | stringa | es. "Munizioni infinite" |
| codice | stringa | il cheat code vero e proprio |
| piattaforma | enum | "PS5" \| "Xbox" \| "PC" \| "tutte" |
| modalità | enum | "storia" \| "online" \| "entrambe" |
| note | testo | eventuali limitazioni/avvertenze |

## 4. Tabella `missioni`

| Campo | Tipo | Descrizione |
|---|---|---|
| id | stringa | identificativo univoco |
| nome | stringa | nome missione |
| capitolo | numero | posizione nella storia |
| segreti_collegati | lista | riferimenti a `items`/`locations` legati a quella missione |
| suggerimenti | testo | consigli utili (non spoiler pesanti) |

## 5. Tabella `categorie/tags` (per filtri e ricerca)
Lista semplice di etichette riutilizzabili in tutte le tabelle sopra, per permettere filtri incrociati sul sito (es. "mostrami tutte le auto rare del capitolo 3").

---

## Come si collega tutto
- La **mappa interattiva** legge da `locations`, mostra marker cliccabili collegati a `items`
- Le **guide/trucchi** leggono da `cheats` e `missioni`
- L'**IA del sito** userà tutte queste tabelle come "base di conoscenza" per rispondere alle domande dei giocatori

## Prossimo passo consigliato
Popolare questa struttura fin da ora con dati ipotetici/segnaposto, così il sito è già funzionante e pronto — il giorno dell'uscita di GTA6 basterà sostituire i dati finti con quelli veri.
