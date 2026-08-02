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
    { id: "cheat_001", nome_effetto: "Munizioni Infinite (esempio)", codice: "ESEMPIO-CODICE-01", piattaforma: "tutte", modalita: "storia", note: "Disattiva gli obiettivi mentre è attivo." },
    { id: "cheat_002", nome_effetto: "Salute Massima (esempio)", codice: "ESEMPIO-CODICE-02", piattaforma: "PC", modalita: "entrambe", note: "Nessuna limitazione nota." },
    { id: "cheat_003", nome_effetto: "Super Salto (esempio)", codice: "ESEMPIO-CODICE-03", piattaforma: "tutte", modalita: "storia", note: "Aumenta molto l'altezza dei salti, utile per raggiungere tetti e cornicioni." },
    { id: "cheat_004", nome_effetto: "Tempo Sempre Sereno (esempio)", codice: "ESEMPIO-CODICE-04", piattaforma: "PC", modalita: "storia", note: "Blocca le condizioni meteo sul sereno, utile per screenshot e voli." },
    { id: "cheat_005", nome_effetto: "Nessuna Ricercata (esempio)", codice: "ESEMPIO-CODICE-05", piattaforma: "tutte", modalita: "entrambe", note: "Rimuove immediatamente il livello di ricercato attuale." },
    { id: "cheat_006", nome_effetto: "Veicolo Casuale Istantaneo (esempio)", codice: "ESEMPIO-CODICE-06", piattaforma: "console", modalita: "storia", note: "Fa comparire un veicolo casuale vicino al giocatore." },
  ],
  missioni: [
    { id: "miss_001", nome: "Missione di Esempio", capitolo: 2, segreti_collegati: ["arma_001"], suggerimenti: "Esplora bene l'area prima di completare l'obiettivo principale, alcuni segreti diventano inaccessibili dopo." },
    { id: "miss_002", nome: "Il Segreto delle Colline", capitolo: 4, segreti_collegati: ["coll_002", "veh_003"], suggerimenti: "Torna sulle colline in diversi momenti della giornata: alcuni indizi cambiano con la luce." },
  ],
};

const CATS = [
  { key: "tutti", label: "Tutti", color: "#F2F0E9" },
  { key: "veicolo", label: "Veicoli", color: "#2DE3D6" },
  { key: "arma", label: "Armi", color: "#FF3D8A" },
  { key: "collezionabile", label: "Collez.", color: "#FFC24B" },
];
const catColor = (cat) => CATS.find((c) => c.key === cat)?.color || "#F2F0E9";

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

function searchAll(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  DATA.items.forEach((it) => {
    const hay = [it.nome, ...(it.tags || [])].join(" ").toLowerCase();
    if (hay.includes(q)) results.push({ kind: "item", id: it.id, label: it.nome, sub: it.tipo });
  });
  DATA.cheats.forEach((c) => { if (c.nome_effetto.toLowerCase().includes(q)) results.push({ kind: "cheat", id: c.id, label: c.nome_effetto, sub: "trucco" }); });
  DATA.missioni.forEach((m) => { if (m.nome.toLowerCase().includes(q)) results.push({ kind: "missione", id: m.id, label: m.nome, sub: "missione" }); });
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
  { key: "entrambe", label: "Entrambe" },
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
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ fontSize: 10, letterSpacing: 1, color: "#FFC24B", border: "1px solid #FFC24B", borderRadius: 20, padding: "2px 8px", textTransform: "uppercase" }}>{cheat.piattaforma}</span>
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
    if (!highlight) return;
    const el = cheatRefs.current[highlight.id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(onClearHighlight, 2000);
    return () => clearTimeout(t);
  }, [highlight]);

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
  { key: "mappa", label: "Mappa", shortLabel: "Mappa" },
  { key: "trucchi", label: "Trucchi", shortLabel: "Trucchi" },
  { key: "missioni", label: "Missioni & Segreti", shortLabel: "Segreti" },
  { key: "assistente", label: "Assistente IA", shortLabel: "Assistente" },
];

export default function GTA6Map() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("tutti");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("mappa"); // sezione principale: "mappa" | "trucchi" | "missioni" | "assistente"
  const [tab, setTab] = useState("dettagli"); // sotto-tab del pannello mappa su desktop: "dettagli" | "assistente"
  const [prefill, setPrefill] = useState("");
  const [highlight, setHighlight] = useState(null); // { kind: "cheat" | "missione", id } per la ricerca

  const locations = useMemo(() => (filter === "tutti" ? DATA.locations : DATA.locations.filter((l) => l.categoria === filter)), [filter]);
  const results = useMemo(() => searchAll(query), [query]);

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
    }
  }

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#0B1026", color: "#F2F0E9", fontFamily: "'Arial Narrow', 'Helvetica Neue', Arial, sans-serif", display: "flex", flexDirection: "column", paddingBottom: isMobile ? 62 : 0 }}>
      {/* Header */}
      <div style={{ padding: isMobile ? "14px 14px 10px" : "18px 24px", borderBottom: "2px solid #2DE3D6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
          <span style={{ fontWeight: 900, fontSize: isMobile ? 22 : "clamp(20px, 4vw, 30px)", letterSpacing: "1.5px", background: "linear-gradient(90deg,#FF3D8A,#FFC24B,#2DE3D6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textTransform: "uppercase" }}>
            Vice // Radar
          </span>
          {!isMobile && view === "mappa" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{locations.length} PUNTI ATTIVI</span>}
          {!isMobile && view === "trucchi" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{DATA.cheats.length} TRUCCHI</span>}
          {!isMobile && view === "missioni" && <span style={{ fontSize: 11, letterSpacing: 2, color: "#2DE3D6" }}>{DATA.missioni.length} MISSIONI</span>}
        </div>

        {/* Nav principale, solo desktop: su mobile la stessa scelta è in fondo alla pagina */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {VIEWS.map((v) => (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                style={{
                  background: view === v.key ? "#FF3D8A" : "transparent",
                  color: view === v.key ? "#0B1026" : "#F2F0E9",
                  border: "1px solid #1C2340", borderRadius: 6,
                  padding: "9px 16px", fontSize: 12, fontWeight: 800, letterSpacing: 1, cursor: "pointer", textTransform: "uppercase",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div style={{ position: "relative" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca oggetti, trucchi, missioni…"
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

        {view === "mappa" && (
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

      {/* Contenuto */}
      {view === "trucchi" ? (
        <div style={{ flex: 1 }}>
          <CheatsPage highlight={highlight} onClearHighlight={() => setHighlight(null)} onAskAI={onAskAI} />
        </div>
      ) : view === "missioni" ? (
        <div style={{ flex: 1 }}>
          <MissioniPage highlight={highlight} onClearHighlight={() => setHighlight(null)} onAskAI={onAskAI} />
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

      {/* Bottom nav mobile: Mappa / Trucchi / Missioni & Segreti / Assistente */}
      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", background: "#0F1530", borderTop: "1px solid #1C2340", zIndex: 30 }}>
          {VIEWS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              style={{ flex: 1, background: "none", border: "none", padding: "12px 0", color: view === v.key ? "#2DE3D6" : "#7A8099", fontWeight: view === v.key ? 800 : 600, fontSize: 11, letterSpacing: 0.5, cursor: "pointer" }}
            >
              {v.shortLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
