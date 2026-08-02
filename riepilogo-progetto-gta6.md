# Riepilogo Progetto — Sito/App GTA6

## Visione
Sito web (poi app) dedicato a GTA6, pensato per sfruttare l'ondata di interesse per l'uscita del gioco. **Non** un sito "notiziario" tipo Reddit/wiki generiche, ma uno **strumento pratico** che il giocatore usa mentre gioca per trovare cose e risolvere problemi.

## Funzionalità principali
1. **Mappa interattiva** — dove trovare veicoli rari, armi, collezionabili, easter egg. Più dettagliata della minimappa in-game. Filtri per categoria, marker cliccabili.
2. **Guide/trucchi** — cheat code, tecniche, segreti per storia e modalità online.
3. **Assistente IA** — risponde alle domande dei giocatori (come raggiungere un punto, come superare una missione, quale trucco usare) basandosi sui dati del sito.

## Modello di business deciso
- L'assistente IA sarà **disponibile solo per gli abbonati premium**
- I ricavi degli abbonamenti dovranno coprire i costi delle chiamate API dell'IA, per non dover anticipare spese di tasca propria
- Da definire in futuro: prezzo abbonamento, limiti di utilizzo anche per i premium (per tenere i costi sotto controllo)

## Stato attuale del progetto
- **Schema database** progettato (tabelle: items/oggetti, locations/mappa, cheats/trucchi, missioni) — pensato per partire con semplici file JSON e poi evolvere in database vero quando necessario
- **Dati di esempio/segnaposto** popolati secondo lo schema (il gioco non è ancora uscito, quindi sono dati fittizi da sostituire al lancio)
- **Prototipo della mappa interattiva** costruito in React (file .jsx), con:
  - Ricerca che collega oggetti, trucchi e missioni
  - Filtri per categoria (veicoli/armi/collezionabili) con puntini colorati (non icone/sagome — testate ma scartate per problemi di resa)
  - Ottimizzazione mobile: layout diverso su schermi piccoli, barra di navigazione in basso
  - Quando si clicca un punto sulla mappa, i dettagli si aprono in una scheda sovrapposta (overlay) mantenendo la mappa visibile dietro — NON un cambio pagina
  - Sfondo della mappa disegnato per sembrare una vera mappa di gioco (costa, griglia stradale, isolati, quartieri etichettati, icone decorative come aeroporto/stadio/porto) — asset originali, non copiati da Rockstar per motivi di copyright
  - Assistente IA integrato nel prototipo, funzionante tramite chiamate all'API di Anthropic, che risponde solo in base ai dati caricati

## Preferenze di lavoro
- L'utente parte da zero con la programmazione: preferisce essere guidato passo passo, con spiegazioni chiare prima di ogni scelta tecnica

## Prossimi passi possibili
- Continuare a rifinire la mappa o passare alla sezione guide/trucchi
- Trasformare il prototipo in un progetto vero (file reali, non solo artifact) con Claude Code
- Impostare hosting, dominio, e più avanti il sistema di abbonamento premium
