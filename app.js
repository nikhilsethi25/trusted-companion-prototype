/* Trusted Companion prototype, v0 (2026-11-01).
   Scripted agent: no model calls, no backend. One listing, one buyer, one seller.
   v0 covers the parts likely to survive a strategy change: product page, chat,
   agent panel, and the buyer-question flow (answer from the listing, or ask the
   seller with the buyer's confirmation). */

const LISTING = {
  price: 140,
  estimate: [115, 145],
  photos: 3,
  seller: 'Jana',
  buyer: 'Max',
};

const T = {
  de: {
    roleBuyer: 'Käufer:in', roleSeller: 'Verkäufer:in',
    navListing: 'Anzeige', navMyListing: 'Meine Anzeige', navChat: 'Nachrichten',
    fab: 'Assistent',
    title: 'Sony WH-1000XM4 Kopfhörer, schwarz',
    vb: 'VB', location: 'Berlin-Neukölln', posted: 'Online seit 2 Tagen',
    attrCondition: 'Zustand', condition: 'Gut',
    attrShipping: 'Versand', shipping: 'Möglich',
    attrPickup: 'Abholung', pickup: 'Berlin-Neukölln',
    attrCategory: 'Kategorie', category: 'Audio & HiFi',
    descH: 'Beschreibung',
    desc: 'Verkaufe meine Sony WH-1000XM4. Funktionieren einwandfrei, Noise Cancelling top.\nKleiner Kratzer am Kopfbügel (siehe Foto 3).\nOriginalverpackung, Ladekabel und Transporttasche dabei.\nAbholung in Neukölln oder Versand.',
    photo: ['Vorderseite', 'Zubehör und Verpackung', 'Kratzer am Kopfbügel'],
    photoOf: (i, n) => `Foto ${i} von ${n}`,
    sellerSub: 'Privat · Berlin-Neukölln',
    ctaMessage: 'Nachricht schreiben', ctaAsk: 'Assistent fragen',
    statsH: 'Deine Anzeige', stats: '48 Aufrufe · 1 Merkliste',
    chatWith: (n) => `Chat mit ${n}`,
    chatEmptyBuyer: 'Noch keine Nachrichten. Du kannst selbst schreiben oder den Assistenten bitten, den Verkäufer zu fragen.',
    chatEmptySeller: 'Noch keine Nachrichten zu dieser Anzeige.',
    replyPh: 'Nachricht schreiben …',
    viaAgent: 'über den Assistenten gesendet',
    sheetBuyer: 'Dein Assistent',
    sheetSeller: 'Dein Assistent',
    subBuyer: 'Arbeitet für dich als Käufer:in. Antworten kommen aus der Anzeige, nicht vom Verkäufer.',
    subSeller: 'Arbeitet für dich als Verkäufer:in.',
    inputPh: 'Frag etwas zu dieser Anzeige …',
    greetBuyer: 'Hallo! Ich beantworte Fragen zu dieser Anzeige anhand der Beschreibung und der Fotos. Was ich nicht weiß, frage ich gern beim Verkäufer nach, wenn du zustimmst.',
    greetSeller: 'Hallo Jana! Ich helfe dir mit deiner Anzeige und deinen Nachrichten.',
    sellerV1: 'Prototyp v0: Die Verkäufer-Funktionen (Angebote prüfen, Abholtermine, fehlende Infos ergänzen) folgen in v1.',
    chipCondition: 'Wie ist der Zustand?', chipPrice: 'Ist der Preis fair?',
    chipAge: 'Wie alt sind sie?', chipAvail: 'Noch verfügbar?',
    srcListing: 'Aus der Anzeige, nicht vom Verkäufer bestätigt.',
    srcEstimate: 'Preisschätzung, basiert auf dem Zustand laut Anzeige.',
    ansCondition: 'Laut Anzeige ist der Zustand „Gut“. Der Verkäufer erwähnt einen kleinen Kratzer am Kopfbügel, auf Foto 3 zu sehen. Zum Akku und zum Alter steht nichts in der Anzeige.',
    ansPrice: (lo, hi, p) => `Die Preisschätzung für dieses Modell im Zustand „Gut“ liegt bei ${lo}–${hi} €. ${p} € liegt im oberen Bereich. Das ist eine Schätzung, keine Garantie.`,
    ansAvail: 'Ob die Kopfhörer noch verfügbar sind, kann nur der Verkäufer sagen. Soll ich nachfragen?',
    ansUnknown: 'Das steht nicht in der Anzeige. Soll ich den Verkäufer für dich fragen?',
    offerAsk: 'Soll ich den Verkäufer etwas dazu fragen?',
    askBattery: 'Verkäufer zum Akku fragen',
    draftLbl: 'Entwurf an Jana: du kannst ihn ändern',
    send: 'Senden', cancel: 'Abbrechen',
    hello: 'Hallo! ',
    draftAvail: 'Hallo! Sind die Kopfhörer noch verfügbar?',
    draftBattery: 'Hallo! Wie lange hält der Akku noch mit einer Ladung?',
    sent: 'Gesendet. Ich sage dir Bescheid, sobald Jana antwortet.',
    cancelled: 'Okay, nichts gesendet.',
    replied: (n, txt) => `${n} hat geantwortet: „${txt}“`,
    newQuestion: (n) => `${n} hat eine Frage zu deiner Anzeige gestellt. Du findest sie unter Nachrichten.`,
    quickSeller: ['Ja, noch da!', 'Etwa 2 Jahre alt.', 'Der Akku hält noch rund 25 Stunden.'],
    footnote: 'Prototyp für eine Fallstudie. Skriptgesteuerte Antworten, keine echten Daten. Nicht mit einem Unternehmen verbunden.',
    resetConfirm: 'Prototyp zurücksetzen?',
  },
  en: {
    roleBuyer: 'Buyer', roleSeller: 'Seller',
    navListing: 'Listing', navMyListing: 'My listing', navChat: 'Messages',
    fab: 'Assistant',
    title: 'Sony WH-1000XM4 headphones, black',
    vb: 'negotiable', location: 'Berlin-Neukölln', posted: 'Online for 2 days',
    attrCondition: 'Condition', condition: 'Good',
    attrShipping: 'Shipping', shipping: 'Available',
    attrPickup: 'Pickup', pickup: 'Berlin-Neukölln',
    attrCategory: 'Category', category: 'Audio & hi-fi',
    descH: 'Description',
    desc: 'Selling my Sony WH-1000XM4. Work perfectly, noise cancelling is great.\nSmall scratch on the headband (see photo 3).\nOriginal box, charging cable and travel case included.\nPickup in Neukölln or shipping.',
    photo: ['Front', 'Accessories and box', 'Scratch on the headband'],
    photoOf: (i, n) => `Photo ${i} of ${n}`,
    sellerSub: 'Private seller · Berlin-Neukölln',
    ctaMessage: 'Send a message', ctaAsk: 'Ask the assistant',
    statsH: 'Your listing', stats: '48 views · 1 saved',
    chatWith: (n) => `Chat with ${n}`,
    chatEmptyBuyer: 'No messages yet. Write yourself, or ask the assistant to ask the seller.',
    chatEmptySeller: 'No messages about this listing yet.',
    replyPh: 'Write a message …',
    viaAgent: 'sent via the assistant',
    sheetBuyer: 'Your assistant',
    sheetSeller: 'Your assistant',
    subBuyer: 'Works for you as the buyer. Answers come from the listing, not from the seller.',
    subSeller: 'Works for you as the seller.',
    inputPh: 'Ask something about this listing …',
    greetBuyer: 'Hi! I answer questions about this listing from its description and photos. Anything I don’t know, I can ask the seller, if you agree.',
    greetSeller: 'Hi Jana! I help you with your listing and your messages.',
    sellerV1: 'Prototype v0: the seller features (evaluating offers, pickup slots, adding missing details) come in v1.',
    chipCondition: 'What condition is it in?', chipPrice: 'Is the price fair?',
    chipAge: 'How old are they?', chipAvail: 'Still available?',
    srcListing: 'From the listing, not confirmed by the seller.',
    srcEstimate: 'Price estimate, based on the condition stated in the listing.',
    ansCondition: 'The listing says the condition is “Good”. The seller mentions a small scratch on the headband, visible in photo 3. The listing says nothing about the battery or the age.',
    ansPrice: (lo, hi, p) => `The price estimate for this model in “Good” condition is €${lo}–${hi}. €${p} is at the upper end. It’s an estimate, not a guarantee.`,
    ansAvail: 'Only the seller can say whether they’re still available. Shall I ask?',
    ansUnknown: 'That isn’t in the listing. Shall I ask the seller for you?',
    offerAsk: 'Shall I ask the seller about it?',
    askBattery: 'Ask the seller about the battery',
    draftLbl: 'Draft to Jana: you can edit it',
    send: 'Send', cancel: 'Cancel',
    hello: 'Hi! ',
    draftAvail: 'Hi! Are the headphones still available?',
    draftBattery: 'Hi! How long does the battery last on a charge these days?',
    sent: 'Sent. I’ll let you know as soon as Jana replies.',
    cancelled: 'OK, nothing sent.',
    replied: (n, txt) => `${n} replied: “${txt}”`,
    newQuestion: (n) => `${n} asked a question about your listing. It’s in Messages.`,
    quickSeller: ['Yes, still here!', 'About 2 years old.', 'The battery still lasts around 25 hours.'],
    footnote: 'Prototype for a case study. Scripted responses, no real data. Not affiliated with any company.',
    resetConfirm: 'Reset the prototype?',
  },
};

const STORE_KEY = 'tc-proto-v0';

function freshState() {
  return {
    role: 'buyer',
    lang: 'de',
    screen: 'listing',
    sheetOpen: false,
    chat: [],                 // {from: 'buyer'|'seller', text, via, time}
    agent: { buyer: [], seller: [] }, // {who: 'agent'|'user', key|text, src, draft}
    unread: { buyer: 0, seller: 0 },
    started: { buyer: false, seller: false },
  };
}

let state = load() || freshState();

function load() {
  try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* storage unavailable: run in memory */ }
}

const $ = (sel) => document.querySelector(sel);
const t = () => T[state.lang];
const now = () => new Date().toTimeString().slice(0, 5);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const other = (role) => (role === 'buyer' ? 'seller' : 'buyer');

/* ---------- Intent: a scripted stand-in for the model ---------- */

function classify(text) {
  const q = text.toLowerCase();
  if (/(verfügbar|verfuegbar|noch da|noch zu haben|available|still there)/.test(q)) return 'avail';
  if (/(preis|price|fair|teuer|günstig|guenstig|wert|worth|deal)/.test(q)) return 'price';
  if (/(zustand|kratzer|defekt|kaputt|beschädig|condition|scratch|damage|broken|wear)/.test(q)) return 'condition';
  return 'unknown';
}

function buyerAsk(text) {
  const log = state.agent.buyer;
  log.push({ who: 'user', text });
  const intent = classify(text);
  if (intent === 'condition') {
    log.push({ who: 'agent', key: 'ansCondition', src: 'srcListing' });
    log.push({ who: 'agent', key: 'offerAsk', actions: ['askBattery'] });
  } else if (intent === 'price') {
    log.push({ who: 'agent', key: 'ansPrice', src: 'srcEstimate' });
  } else if (intent === 'avail') {
    log.push({ who: 'agent', key: 'ansAvail', draft: { key: 'draftAvail' } });
  } else {
    log.push({ who: 'agent', key: 'ansUnknown', draft: { text: t().hello + text.replace(/^\s+/, '') } });
  }
  save(); render();
}

function agentText(m) {
  const L = t();
  if (m.text) return m.text;
  if (m.key === 'ansPrice') return L.ansPrice(LISTING.estimate[0], LISTING.estimate[1], LISTING.price);
  if (m.key === 'replied') return L.replied(m.name, m.reply);
  if (m.key === 'newQuestion') return L.newQuestion(m.name);
  return L[m.key];
}

/* ---------- Actions ---------- */

function sendToChat(from, text, via) {
  state.chat.push({ from, text, via: !!via, time: now() });
  state.unread[other(from)] += 1;
  if (from === 'buyer') {
    state.agent.seller.push({ who: 'agent', key: 'newQuestion', name: LISTING.buyer });
  } else {
    state.agent.buyer.push({ who: 'agent', key: 'replied', name: LISTING.seller, reply: text });
  }
}

function resolveDraft(index, send, text) {
  const m = state.agent.buyer[index];
  if (!m || !m.draft || m.draft.done) return;
  m.draft.done = true;
  if (send) {
    sendToChat('buyer', text, true);
    state.agent.buyer.push({ who: 'agent', key: 'sent' });
  } else {
    state.agent.buyer.push({ who: 'agent', key: 'cancelled' });
  }
  save(); render();
}

function openSheet(open) {
  state.sheetOpen = open;
  const role = state.role;
  if (open && !state.started[role]) {
    state.started[role] = true;
    state.agent[role].unshift({ who: 'agent', key: role === 'buyer' ? 'greetBuyer' : 'greetSeller' });
    if (role === 'seller') state.agent.seller.splice(1, 0, { who: 'agent', key: 'sellerV1', note: true });
  }
  save(); render();
  if (open) setTimeout(() => { const log = $('#agent-log'); log.scrollTop = log.scrollHeight; }, 30);
}

/* ---------- Rendering ---------- */

function renderListing() {
  const L = t();
  const photos = L.photo.map((p, i) => `
    <div class="photo"><span class="glyph">🎧</span><span>${esc(L.photoOf(i + 1, L.photo.length))}: ${esc(p)}</span></div>`).join('');
  const sellerView = state.role === 'seller';
  return `
    <div class="gallery">${photos}</div>
    <div class="photo-count">${esc(L.photoOf(1, L.photo.length))} · ←→</div>
    <div class="listing-body">
      ${sellerView ? `<div class="section-h">${esc(L.statsH)}</div><div class="meta">${esc(L.stats)}</div>` : ''}
      <div class="price">${LISTING.price} € <small>${esc(L.vb)}</small></div>
      <h1 class="title">${esc(L.title)}</h1>
      <div class="meta"><span>📍 ${esc(L.location)}</span><span>${esc(L.posted)}</span></div>
      <div class="attrs">
        <div class="attr"><b>${esc(L.attrCondition)}</b>${esc(L.condition)}</div>
        <div class="attr"><b>${esc(L.attrShipping)}</b>${esc(L.shipping)}</div>
        <div class="attr"><b>${esc(L.attrPickup)}</b>${esc(L.pickup)}</div>
        <div class="attr"><b>${esc(L.attrCategory)}</b>${esc(L.category)}</div>
      </div>
      <div class="section-h">${esc(L.descH)}</div>
      <div class="desc">${esc(L.desc)}</div>
      ${sellerView ? '' : `
      <div class="seller-card"><div class="avatar">J</div><div><div class="who">${esc(LISTING.seller)}</div><div class="sub">${esc(L.sellerSub)}</div></div></div>
      <div class="cta-row">
        <button type="button" class="btn btn-primary" data-act="goto-chat">${esc(L.ctaMessage)}</button>
        <button type="button" class="btn btn-agent" data-act="open-agent">✦ ${esc(L.ctaAsk)}</button>
      </div>`}
    </div>`;
}

function renderChat() {
  const L = t();
  const role = state.role;
  const counterpart = role === 'buyer' ? LISTING.seller : LISTING.buyer;
  const msgs = state.chat.map((m) => `
    <div class="msg ${m.from === role ? 'me' : 'them'}">
      ${esc(m.text)}
      ${m.via ? `<span class="via">✦ ${esc(L.viaAgent)}</span>` : ''}
      <span class="time">${esc(m.time)}</span>
    </div>`).join('');
  const empty = `<div class="empty">${esc(role === 'buyer' ? L.chatEmptyBuyer : L.chatEmptySeller)}</div>`;
  const quick = role === 'seller' && state.chat.length
    ? `<div class="quick">${L.quickSeller.map((q) => `<button type="button" class="chip" data-quick="${esc(q)}">${esc(q)}</button>`).join('')}</div>`
    : '';
  return `
    <div class="chat-head">
      <div class="chat-thumb">🎧</div>
      <div><div class="t">${esc(L.chatWith(counterpart))}</div><div class="s">${esc(L.title)} · ${LISTING.price} €</div></div>
    </div>
    <div class="thread">${state.chat.length ? msgs : empty}</div>
    <div class="reply-bar">
      ${quick}
      <form class="composer" id="chat-form">
        <input id="chat-input" autocomplete="off" placeholder="${esc(L.replyPh)}">
        <button type="submit" aria-label="Send">➤</button>
      </form>
    </div>`;
}

function renderAgent() {
  const L = t();
  const role = state.role;
  $('#sheet-title').textContent = role === 'buyer' ? L.sheetBuyer : L.sheetSeller;
  $('#sheet-sub').textContent = role === 'buyer' ? L.subBuyer : L.subSeller;
  $('#agent-input').placeholder = L.inputPh;
  const log = state.agent[role];
  $('#agent-log').innerHTML = log.map((m, i) => {
    if (m.who === 'user') return `<div class="a-msg user">${esc(m.text)}</div>`;
    let extra = '';
    if (m.src) extra += `<span class="src">${esc(L[m.src])}</span>`;
    if (m.note) return `<div class="a-msg agent"><div class="note">${esc(agentText(m))}</div></div>`;
    if (m.actions && !m.used) {
      extra += `<div class="quick" style="margin-top:8px">${m.actions.map((a) => `<button type="button" class="chip agent" data-action="${a}" data-i="${i}">${esc(L[a])}</button>`).join('')}</div>`;
    }
    if (m.draft) {
      const txt = m.draft.text || L[m.draft.key];
      extra += m.draft.done
        ? ''
        : `<div class="draft"><span class="lbl">${esc(L.draftLbl)}</span>
             <textarea data-draft="${i}">${esc(txt)}</textarea>
             <div class="row">
               <button type="button" class="btn btn-ghost" data-draft-cancel="${i}">${esc(L.cancel)}</button>
               <button type="button" class="btn btn-primary" data-draft-send="${i}">${esc(L.send)}</button>
             </div></div>`;
    }
    return `<div class="a-msg agent">${esc(agentText(m))}${extra}</div>`;
  }).join('');
  const chips = role === 'buyer' ? ['chipCondition', 'chipPrice', 'chipAge', 'chipAvail'] : [];
  $('#agent-chips').innerHTML = chips.map((c) => `<button type="button" class="chip" data-chip="${c}">${esc(L[c])}</button>`).join('');
  $('#agent-form').style.display = role === 'buyer' ? '' : 'none';
}

function render() {
  const L = t();
  document.documentElement.lang = state.lang;
  document.querySelectorAll('.role-switch button').forEach((b) => {
    b.textContent = b.dataset.role === 'buyer' ? L.roleBuyer : L.roleSeller;
    b.setAttribute('aria-selected', String(b.dataset.role === state.role));
  });
  $('#lang-toggle').textContent = state.lang === 'de' ? 'EN' : 'DE';
  document.querySelectorAll('.bottom-nav button').forEach((b) => {
    const s = b.dataset.screen;
    b.querySelector('.lbl').textContent = s === 'listing' ? (state.role === 'seller' ? L.navMyListing : L.navListing) : L.navChat;
    b.toggleAttribute('aria-current', s === state.screen);
    if (s === state.screen) b.setAttribute('aria-current', 'page');
    const badge = b.querySelector('.badge');
    if (badge) {
      const n = state.unread[state.role];
      badge.hidden = !(n > 0 && state.screen !== 'chat');
      badge.textContent = n;
    }
  });
  if (state.screen === 'chat' && state.unread[state.role]) { state.unread[state.role] = 0; save(); }
  $('#screen').innerHTML = state.screen === 'listing' ? renderListing() : renderChat();
  $('#agent-fab-label').textContent = L.fab;
  renderAgent();
  $('#sheet').classList.toggle('open', state.sheetOpen);
  $('#sheet').setAttribute('aria-hidden', String(!state.sheetOpen));
  $('#sheet-backdrop').hidden = !state.sheetOpen;
  $('#footnote').textContent = L.footnote;
  const thread = document.querySelector('.thread');
  if (thread) thread.scrollIntoView({ block: 'end' });
  if (state.sheetOpen) { const log = $('#agent-log'); log.scrollTop = log.scrollHeight; }
}

/* ---------- Events ---------- */

document.addEventListener('click', (e) => {
  const el = e.target.closest('button');
  if (!el) return;
  if (el.dataset.role) { state.role = el.dataset.role; state.sheetOpen = false; save(); render(); return; }
  if (el.dataset.screen) { state.screen = el.dataset.screen; save(); render(); return; }
  if (el.id === 'lang-toggle') { state.lang = state.lang === 'de' ? 'en' : 'de'; save(); render(); return; }
  if (el.id === 'reset') { if (confirm(t().resetConfirm)) { state = freshState(); save(); render(); } return; }
  if (el.id === 'agent-fab' || el.dataset.act === 'open-agent') { openSheet(true); return; }
  if (el.id === 'sheet-close') { openSheet(false); return; }
  if (el.dataset.act === 'goto-chat') { state.screen = 'chat'; save(); render(); return; }
  if (el.dataset.chip) { buyerAsk(t()[el.dataset.chip]); return; }
  if (el.dataset.action === 'askBattery') {
    const m = state.agent.buyer[Number(el.dataset.i)];
    if (m) m.used = true;
    state.agent.buyer.push({ who: 'agent', key: 'ansUnknown', draft: { key: 'draftBattery' } });
    save(); render(); return;
  }
  if (el.dataset.draftSend) {
    const i = Number(el.dataset.draftSend);
    const ta = document.querySelector(`textarea[data-draft="${i}"]`);
    const text = ta ? ta.value.trim() : '';
    if (text) resolveDraft(i, true, text);
    return;
  }
  if (el.dataset.draftCancel) { resolveDraft(Number(el.dataset.draftCancel), false); return; }
  if (el.dataset.quick) { sendToChat(state.role, el.dataset.quick, false); save(); render(); return; }
});

$('#sheet-backdrop').addEventListener('click', () => openSheet(false));

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id === 'agent-form') {
    const input = $('#agent-input');
    const v = input.value.trim();
    if (v) { input.value = ''; buyerAsk(v); }
  } else if (e.target.id === 'chat-form') {
    const input = $('#chat-input');
    const v = input.value.trim();
    if (v) { sendToChat(state.role, v, false); save(); render(); }
  }
});

render();
