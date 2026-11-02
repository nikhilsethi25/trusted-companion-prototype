/* Trusted Companion prototype, v1 (2026-11-02): the buyer agent.
   Scripted: no model calls, no backend, no real data.
   Flow (agent spec, 2026-11-02): a trigger fires on a conversation the buyer
   started (T1 reserved, T2 no reply) -> the agent turns the listing into a
   demand profile -> searches and checks relevance -> shows suggestions, or
   offers an alert that is saved only when the buyer confirms. The agent never
   writes in the chat. Triggers are fired from the Demo panel. */

const LISTINGS = {
  L1: { title: 'Sony WH-1000XM4', price: 140, vb: true, cond: 'good', loc: 'Neukölln', km: 0, icon: '🎧', seller: 'Jana',
        desc: { en: 'Great noise cancelling, small scratch on the headband. With case and cable.' } },
  L2: { title: 'Teenage Engineering OP-1', price: 890, vb: false, cond: 'verygood', loc: 'Prenzlauer Berg', km: 0, icon: '🎹', seller: 'Tom',
        desc: { en: 'Very good condition, with original box.' } },
  S1: { title: 'Bose QuietComfort 45', price: 130, vb: true, cond: 'verygood', loc: 'Kreuzberg', km: 4, icon: '🎧', seller: 'Mehmet',
        desc: { en: 'Barely used, battery is great. Original box included.' },
        why: { en: 'Over-ear, noise cancelling, very good condition, €130, 4 km' } },
  S2: { title: 'Sony WH-1000XM3', price: 105, vb: true, cond: 'good', loc: 'Friedrichshain', km: 5, icon: '🎧', seller: 'Lena',
        desc: { en: 'Works perfectly, light wear on the ear pads.' },
        why: { en: 'Over-ear, noise cancelling, previous model, good condition, €105, 5 km' } },
  S3: { title: 'Sennheiser Momentum 4', price: 165, vb: false, cond: 'good', loc: 'Mitte', km: 7, icon: '🎧', seller: 'Paul',
        desc: { en: 'One year old, very long battery life.' },
        why: { en: 'Over-ear, noise cancelling, good condition, €165, 7 km' } },
  M1: { title: 'Teenage Engineering OP-1', price: 780, vb: true, cond: 'good', loc: 'Wedding', km: 6, icon: '🎹', seller: 'Sven',
        desc: { en: 'Used, fully working, small scratches on the case.' },
        why: { en: 'Portable synthesizer, good condition, €780, 6 km' } },
};

const T = {
  en: {
    brand: 'Trusted Companion', demo: 'Demo',
    navInbox: 'Messages', navForYou: 'For you',
    inboxH: 'Messages', inboxSub: 'Your conversations as a buyer.',
    forYouH: 'For you', forYouSub: 'Your assistant works for you as a buyer. It never writes in the chat and saves nothing without your OK.',
    forYouEmpty: 'When a listing you’re interested in gets reserved, or the seller doesn’t reply, I look for alternatives here.',
    cond: { good: 'Good', verygood: 'Very good' },
    vb: 'negotiable',
    tagReserved: 'reserved', tagNoReply: 'no reply yet', tagAgent: '✦ alternatives', tagFromSugg: '✦ via suggestion',
    you: 'You', sysReserved: (n) => `${n} marked the listing as reserved.`,
    msgPh: 'Write a message …',
    cardReserved: (n) => `<b>${n}’s listing is reserved.</b> Your chat with ${n} stays open. Here are similar offers in Berlin:`,
    cardNoReply: (n) => `<b>No reply from ${n} yet.</b> Your chat stays open. There’s nothing comparable in Berlin right now.`,
    understood: 'How I understood what you’re looking for',
    prof1: ['Over-ear headphones with noise cancelling', 'Condition: good or better', '€100–170', 'Berlin'],
    alertAsk: 'Shall I save a search and let you know as soon as something suitable is listed? These are the criteria I’d use:',
    critProduct: 'Product', critCond: 'Condition', critPrice: 'Price', critLoc: 'Location',
    product2: 'Portable synthesizer',
    condOpts: { goodplus: 'good or better', any: 'any condition' },
    priceOpts: { a: '€650–950', b: 'up to €1,100' },
    locOpts: { berlin: 'Berlin', ship: 'Berlin + shipping' },
    save: 'Save search', noThanks: 'No thanks',
    onlyOnConfirm: 'I only save the search if you confirm. You can change the criteria first.',
    saved: '✓ Search saved. I’ll let you know when something matches.',
    dismissed: 'OK, no search saved.',
    newMatch: 'Newly listed and matching your search:',
    whyH: 'Suggested because:', km: (n) => `${n} km`,
    write: 'Send a message', back: '‹',
    settingT: 'Suggestions from the assistant', settingS: 'Alternatives when a listing is reserved or there’s no reply.',
    toastLabel: 'Assistant',
    toastReserved: (n) => `${n}’s listing is reserved. I found 3 similar offers in Berlin.`,
    toastNoReply: (n) => `No reply from ${n} yet. Nothing comparable in Berlin: shall I save a search for you?`,
    toastMatch: 'A new listing matches your saved search: Teenage Engineering OP-1, €780.',
    demoTitle: 'Demo controls',
    demoSub: 'Simulates what happens in the background. Not part of the product.',
    step1: 'Jana marks the Sony headphones as reserved', step1s: 'Trigger T1: listing reserved',
    step2: '2 days pass with no reply from Tom', step2s: 'Trigger T2: no reply by the cutoff; no matching offers',
    step3: 'Jana replies after all', step3s: 'The chat with Jana stays open',
    step4: 'A new matching listing is posted', step4s: 'Matches the saved search from step 2',
    step4Need2: 'Run step 2 first', step4NeedSave: 'First tap “Save search” in For you (step 2’s card)',
    step4Dismissed: 'The search wasn’t saved (“No thanks”). Tap ↺ to start again',
    step4Off: 'Suggestions are switched off, so no search was offered',
    step4Removed: 'The saved search was removed',
    step5: '2 weeks pass with no match', step5s: 'No match in n days (n set from data; 2 weeks here): keep or remove?',
    step5Need: 'First save the search (step 2’s card in For you)', step5Done: 'Already asked, or a match arrived',
    reviewAsk: 'No new matches for this search in the last 2 weeks. Keep looking, or remove it?',
    keep: 'Keep looking', remove: 'Remove search',
    kept: 'OK, I’ll keep looking and let you know when something matches.',
    removed: 'Search removed. Nothing more will be sent for it.',
    toastReview: 'No new matches for your saved search in 2 weeks. Keep it or remove it?',
    mRemoved: 'Searches removed',
    off: 'Assistant is off: triggers create no suggestions.',
    metricsH: 'Measured (events)',
    mShown: 'Suggestions shown', mClicked: 'Suggestions opened', mStarted: 'Conversations from suggestions',
    mOffered: 'Searches offered', mSaved: 'Searches saved', mMatches: 'Matches notified',
    janaReply: 'Sorry, it’s reserved. If it falls through, I’ll get back to you!',
    footnote: 'Prototype for a case study. Scripted, no real data. Not affiliated with any company.',
    resetConfirm: 'Reset the prototype?',
  },
};

const STORE_KEY = 'tc-proto-v1-en-2';

function freshState() {
  return {
    lang: 'en', screen: 'inbox', chatId: null, listingId: null, sheet: false, enabled: true,
    convs: [
      { id: 'c1', listing: 'L1', status: 'open', msgs: [{ from: 'me', text: 'Hi! Are the headphones still available?', time: '09:12' }] },
      { id: 'c2', listing: 'L2', status: 'open', msgs: [{ from: 'me', text: 'Hi Tom, is the OP-1 still available? I’d like to come and see it.', time: 'Mon' }] },
    ],
    cards: [], // {conv, trigger: 'reserved'|'no_reply', kind: 'suggestions'|'alert', alert: 'offered'|'saved'|'dismissed', crit, match}
    done: { s1: false, s2: false, s3: false, s4: false, s5: false },
    unread: 0,
    toast: null,
    m: { shown: 0, clicked: 0, started: 0, offered: 0, saved: 0, matches: 0, removed: 0 },
  };
}

let state = load() || freshState();
let toastTimer = null;

function load() { try { const s = localStorage.getItem(STORE_KEY); return s ? JSON.parse(s) : null; } catch { return null; } }
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* run in memory */ } }

const $ = (s) => document.querySelector(s);
const L = () => T[state.lang];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const now = () => new Date().toTimeString().slice(0, 5);
const conv = (id) => state.convs.find((c) => c.id === id);
const euro = (n) => `€${n.toLocaleString('en-GB')}`;

/* ---------- Background events (fired from the demo panel) ---------- */

function notify(text) {
  state.toast = text;
  state.unread += 1;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { state.toast = null; save(); render(); }, 6500);
}

function step1() { // T1: reserved
  const c = conv('c1');
  c.status = 'reserved';
  c.msgs.push({ sys: 'reserved' });
  state.done.s1 = true;
  if (state.enabled) {
    state.cards.unshift({ conv: 'c1', trigger: 'reserved', kind: 'suggestions' });
    state.m.shown += 1;
    notify('reserved');
  }
}
function step2() { // T2: no reply, no viable alternatives
  const c = conv('c2');
  c.status = 'noreply';
  state.done.s2 = true;
  if (state.enabled) {
    state.cards.unshift({ conv: 'c2', trigger: 'no_reply', kind: 'alert', alert: 'offered', crit: { cond: 'goodplus', price: 'a', loc: 'berlin' } });
    state.m.offered += 1;
    notify('noreply');
  }
}
function step3() { // late seller reply: chat stays open
  conv('c1').msgs.push({ from: 'them', text: L().janaReply, time: now() });
  state.done.s3 = true;
}
function step4() { // alert match
  const card = state.cards.find((k) => k.conv === 'c2' && k.alert === 'saved');
  if (!card) return;
  card.match = 'M1';
  state.done.s4 = true;
  state.m.matches += 1;
  notify('match');
}
function step5() { // saved search, no match in n days: ask keep or remove
  const card = state.cards.find((k) => k.conv === 'c2' && k.alert === 'saved');
  if (!card || card.match || card.review) return;
  card.review = 'asked';
  state.done.s5 = true;
  notify('review');
}

/* ---------- Rendering ---------- */

function listingRow(id, opts = {}) {
  const x = LISTINGS[id];
  return `
    <button type="button" class="sugg" data-open-listing="${id}">
      <div class="thumb">${x.icon}</div>
      <div class="main"><div class="t">${esc(x.title)}</div><div class="why">${esc(x.why[state.lang])}</div></div>
      <div class="p">${esc(euro(x.price))}</div>
    </button>`;
}

function renderInbox() {
  const l = L();
  const rows = state.convs.map((c) => {
    const x = LISTINGS[c.listing];
    const last = [...c.msgs].reverse().find((m) => m.text);
    const tags = [];
    if (c.status === 'reserved') tags.push(`<span class="tag warn">${esc(l.tagReserved)}</span>`);
    if (c.status === 'noreply') tags.push(`<span class="tag">${esc(l.tagNoReply)}</span>`);
    if (state.cards.some((k) => k.conv === c.id)) tags.push(`<span class="tag agent">${esc(l.tagAgent)}</span>`);
    if (c.fromSugg) tags.push(`<span class="tag agent">${esc(l.tagFromSugg)}</span>`);
    return `
      <button type="button" class="conv" data-open-chat="${c.id}">
        <div class="thumb">${x.icon}</div>
        <div class="main">
          <div class="row1"><span>${esc(x.seller)} · ${esc(x.title)}</span><span>${esc(last ? last.time : '')}</span></div>
          <div class="row2">${last ? (last.from === 'me' ? esc(l.you) + ': ' : '') + esc(last.text) : ''}</div>
          ${tags.join(' ')}
        </div>
      </button>`;
  }).join('');
  return `<h1 class="screen-h">${esc(l.inboxH)}</h1><p class="screen-sub">${esc(l.inboxSub)}</p>${rows}`;
}

function renderCard(k, i) {
  const l = L();
  const c = conv(k.conv);
  const x = LISTINGS[c.listing];
  if (k.kind === 'suggestions') {
    return `
      <div class="card">
        <div class="card-head">${l.cardReserved(esc(x.seller))}</div>
        <div class="card-body">
          <div class="lbl-sm">${esc(l.understood)}</div>
          <div class="chips">${l.prof1.map((p) => `<span class="chip agent">${esc(p)}</span>`).join('')}</div>
          <div class="lbl-sm">&nbsp;</div>
          ${['S1', 'S2', 'S3'].map((id) => listingRow(id)).join('')}
        </div>
      </div>`;
  }
  // alert card
  const crit = k.crit;
  const sel = (name, opts) => `<select data-crit="${name}" data-i="${i}" ${k.alert !== 'offered' ? 'disabled' : ''}>${
    Object.entries(opts).map(([v, t]) => `<option value="${v}" ${crit[name] === v ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
  let body = `
    <div class="note" style="margin-top:0">${esc(l.alertAsk)}</div>
    <div style="margin-top:8px">
      <div class="crit"><span>${esc(l.critProduct)}</span><span>${esc(l.product2)}</span></div>
      <div class="crit"><span>${esc(l.critCond)}</span>${sel('cond', l.condOpts)}</div>
      <div class="crit"><span>${esc(l.critPrice)}</span>${sel('price', l.priceOpts)}</div>
      <div class="crit"><span>${esc(l.critLoc)}</span>${sel('loc', l.locOpts)}</div>
    </div>`;
  if (k.alert === 'offered') {
    body += `
      <div class="btn-row">
        <button type="button" class="btn btn-ghost" data-alert-no="${i}">${esc(l.noThanks)}</button>
        <button type="button" class="btn btn-agent" data-alert-yes="${i}">${esc(l.save)}</button>
      </div>
      <div class="note">${esc(l.onlyOnConfirm)}</div>`;
  } else if (k.alert === 'saved') {
    body += `<div class="done">${esc(l.saved)}</div>`;
    if (k.review === 'asked') {
      body += `<div class="note">${esc(l.reviewAsk)}</div>
        <div class="btn-row">
          <button type="button" class="btn btn-ghost" data-review-remove="${i}">${esc(l.remove)}</button>
          <button type="button" class="btn btn-agent" data-review-keep="${i}">${esc(l.keep)}</button>
        </div>`;
    } else if (k.review === 'kept') {
      body += `<div class="note">${esc(l.kept)}</div>`;
    }
    if (k.match) body += `<div class="lbl-sm">${esc(l.newMatch)}</div>${listingRow(k.match)}`;
  } else if (k.alert === 'removed') {
    body += `<div class="note">${esc(l.removed)}</div>`;
  } else {
    body += `<div class="note">${esc(l.dismissed)}</div>`;
  }
  return `<div class="card"><div class="card-head">${l.cardNoReply(esc(x.seller))}</div><div class="card-body">${body}</div></div>`;
}

function renderForYou() {
  const l = L();
  const cards = state.enabled && state.cards.length
    ? state.cards.map(renderCard).join('')
    : `<div class="empty">${esc(l.forYouEmpty)}</div>`;
  return `
    <h1 class="screen-h">${esc(l.forYouH)}</h1>
    <p class="screen-sub">${esc(l.forYouSub)}</p>
    ${cards}
    <div class="setting">
      <div><div><b>${esc(l.settingT)}</b></div><div style="color:var(--muted);margin-top:2px">${esc(l.settingS)}</div></div>
      <button type="button" class="switch" role="switch" aria-checked="${state.enabled}" id="toggle-enabled" aria-label="${esc(l.settingT)}"></button>
    </div>`;
}

function renderChat() {
  const l = L();
  const c = conv(state.chatId);
  const x = LISTINGS[c.listing];
  const msgs = c.msgs.map((m) => m.sys
    ? `<div class="sys">${esc(l.sysReserved(x.seller))}</div>`
    : `<div class="msg ${m.from === 'me' ? 'me' : 'them'}">${esc(m.text)}<span class="time">${esc(m.time)}</span></div>`).join('');
  return `
    <div class="chat-head">
      <button type="button" class="back" data-go="inbox">${l.back}</button>
      <div><div class="t">${esc(x.seller)}</div><div class="s">${esc(x.title)} · ${esc(euro(x.price))}</div></div>
    </div>
    <div class="thread">${msgs}</div>
    <form class="composer" id="chat-form">
      <input id="chat-input" autocomplete="off" placeholder="${esc(l.msgPh)}">
      <button type="submit" aria-label="Send">➤</button>
    </form>`;
}

function renderListing() {
  const l = L();
  const x = LISTINGS[state.listingId];
  return `
    <div class="chat-head">
      <button type="button" class="back" data-go="foryou">${l.back}</button>
      <div><div class="t">${esc(x.title)}</div><div class="s">${esc(x.seller)}</div></div>
    </div>
    <div class="photo">${x.icon}</div>
    <div class="detail">
      <div class="price">${esc(euro(x.price))} ${x.vb ? `<small style="font-size:14px;color:var(--muted);font-weight:500">${esc(l.vb)}</small>` : ''}</div>
      <h2 class="title">${esc(x.title)}</h2>
      <div class="meta"><span>${esc(l.cond[x.cond])}</span><span>📍 ${esc(x.loc)} · ${esc(l.km(x.km))}</span></div>
      ${x.why ? `<div class="why-box"><b>✦ ${esc(l.whyH)}</b> ${esc(x.why[state.lang])}</div>` : ''}
      <p class="desc">${esc(x.desc[state.lang])}</p>
      <div class="btn-row"><button type="button" class="btn btn-primary" data-start-chat="${state.listingId}">${esc(l.write)}</button></div>
    </div>`;
}

function step4Hint(savedAlert) {
  const l = L();
  if (savedAlert || state.done.s4) return l.step4s;
  if (!state.done.s2) return l.step4Need2;
  const card = state.cards.find((k) => k.conv === 'c2');
  if (!card) return l.step4Off;
  if (card.alert === 'removed') return l.step4Removed;
  return card.alert === 'dismissed' ? l.step4Dismissed : l.step4NeedSave;
}

function step5State() {
  const l = L();
  const card = state.cards.find((k) => k.conv === 'c2');
  const ready = !!card && card.alert === 'saved' && !card.match && !card.review;
  if (ready) return [l.step5s, true];
  if (card && (card.review || card.match)) return [l.step5Done, false];
  return [l.step5Need, false];
}

function renderDemo() {
  const l = L();
  const savedAlert = state.cards.some((k) => k.conv === 'c2' && k.alert === 'saved');
  const steps = [
    ['s1', l.step1, l.step1s, !state.done.s1],
    ['s2', l.step2, l.step2s, !state.done.s2],
    ['s3', l.step3, l.step3s, state.done.s1 && !state.done.s3],
    ['s4', l.step4, step4Hint(savedAlert), savedAlert && !state.done.s4],
    ['s5', l.step5, step5State()[0], step5State()[1]],
  ];
  const m = state.m;
  $('#demo-title').textContent = l.demoTitle;
  $('#demo-sub').textContent = l.demoSub;
  $('#demo-body').innerHTML = steps.map(([id, t, s, on], n) =>
    `<button type="button" class="demo-step" data-step="${id}" ${on ? '' : 'disabled'}>${n + 1}. ${esc(t)}<small>${esc(s)}</small></button>`).join('')
    + (state.enabled ? '' : `<div class="note">${esc(l.off)}</div>`)
    + `<div class="metrics"><b>${esc(l.metricsH)}</b><br>
        ${esc(l.mShown)}: <b>${m.shown}</b> · ${esc(l.mClicked)}: <b>${m.clicked}</b> · ${esc(l.mStarted)}: <b>${m.started}</b><br>
        ${esc(l.mOffered)}: <b>${m.offered}</b> · ${esc(l.mSaved)}: <b>${m.saved}</b> · ${esc(l.mMatches)}: <b>${m.matches}</b> · ${esc(l.mRemoved)}: <b>${m.removed || 0}</b></div>`;
}

function render() {
  const l = L();
  document.documentElement.lang = state.lang;
  $('#brand').textContent = l.brand;
  $('#demo-open').textContent = l.demo;
  if (state.screen === 'foryou' && state.unread) { state.unread = 0; save(); }
  document.querySelectorAll('.bottom-nav button').forEach((b) => {
    const s = b.dataset.screen;
    b.querySelector('.lbl').textContent = s === 'inbox' ? l.navInbox : l.navForYou;
    const active = s === state.screen || (s === 'inbox' && state.screen === 'chat') || (s === 'foryou' && state.screen === 'listing');
    if (active) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    const badge = b.querySelector('.badge');
    if (badge) { badge.hidden = !(state.unread > 0); badge.textContent = state.unread; }
  });
  const views = { inbox: renderInbox, foryou: renderForYou, chat: renderChat, listing: renderListing };
  $('#screen').innerHTML = views[state.screen]();
  const toast = $('#toast');
  if (state.toast) {
    const text = state.toast === 'reserved' ? l.toastReserved('Jana') : state.toast === 'noreply' ? l.toastNoReply('Tom') : state.toast === 'review' ? l.toastReview : l.toastMatch;
    toast.innerHTML = `<span class="spark">✦</span><div><b>${esc(l.toastLabel)}</b>${esc(text)}</div>`;
    toast.hidden = false;
  } else toast.hidden = true;
  renderDemo();
  $('#demo-sheet').classList.toggle('open', state.sheet);
  $('#demo-sheet').setAttribute('aria-hidden', String(!state.sheet));
  $('#sheet-backdrop').hidden = !state.sheet;
  $('#footnote').textContent = l.footnote;
  const thread = document.querySelector('.thread');
  if (thread) thread.scrollIntoView({ block: 'end' });
}

/* ---------- Events ---------- */

document.addEventListener('click', (e) => {
  const b = e.target.closest('button, .toast');
  if (!b) return;
  if (b.id === 'toast') { state.toast = null; state.screen = 'foryou'; save(); render(); return; }
  if (b.dataset.screen) { state.screen = b.dataset.screen; save(); render(); return; }
  if (b.id === 'reset') { if (confirm(L().resetConfirm)) { state = freshState(); save(); render(); } return; }
  if (b.id === 'demo-open') { state.sheet = true; save(); render(); return; }
  if (b.id === 'demo-close') { state.sheet = false; save(); render(); return; }
  if (b.dataset.step) {
    ({ s1: step1, s2: step2, s3: step3, s4: step4, s5: step5 })[b.dataset.step]();
    state.sheet = false; save(); render(); return;
  }
  if (b.id === 'toggle-enabled') { state.enabled = !state.enabled; save(); render(); return; }
  if (b.dataset.go) { state.screen = b.dataset.go; save(); render(); return; }
  if (b.dataset.openChat) { state.chatId = b.dataset.openChat; state.screen = 'chat'; save(); render(); return; }
  if (b.dataset.openListing) { state.listingId = b.dataset.openListing; state.screen = 'listing'; state.m.clicked += 1; save(); render(); return; }
  if (b.dataset.startChat) {
    const id = b.dataset.startChat;
    let c = state.convs.find((x) => x.listing === id);
    if (!c) { c = { id: 'n' + id, listing: id, status: 'open', fromSugg: true, msgs: [] }; state.convs.unshift(c); }
    state.chatId = c.id; state.screen = 'chat'; save(); render();
    const input = $('#chat-input'); if (input) input.focus();
    return;
  }
  if (b.dataset.alertYes) {
    const k = state.cards[Number(b.dataset.alertYes)];
    if (k && k.alert === 'offered') { k.alert = 'saved'; state.m.saved += 1; }
    save(); render(); return;
  }
  if (b.dataset.reviewKeep) {
    const k = state.cards[Number(b.dataset.reviewKeep)];
    if (k && k.review === 'asked') k.review = 'kept';
    save(); render(); return;
  }
  if (b.dataset.reviewRemove) {
    const k = state.cards[Number(b.dataset.reviewRemove)];
    if (k && k.review === 'asked') { k.review = 'removed'; k.alert = 'removed'; state.m.removed = (state.m.removed || 0) + 1; }
    save(); render(); return;
  }
  if (b.dataset.alertNo) {
    const k = state.cards[Number(b.dataset.alertNo)];
    if (k && k.alert === 'offered') k.alert = 'dismissed';
    save(); render(); return;
  }
});

document.addEventListener('change', (e) => {
  const s = e.target.closest('select[data-crit]');
  if (!s) return;
  const k = state.cards[Number(s.dataset.i)];
  if (k && k.alert === 'offered') { k.crit[s.dataset.crit] = s.value; save(); }
});

$('#sheet-backdrop').addEventListener('click', () => { state.sheet = false; save(); render(); });

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id !== 'chat-form') return;
  const input = $('#chat-input');
  const v = input.value.trim();
  if (!v) return;
  const c = conv(state.chatId);
  if (c.fromSugg && !c.msgs.some((m) => m.from === 'me')) state.m.started += 1;
  c.msgs.push({ from: 'me', text: v, time: now() });
  save(); render();
});

state.toast = null; // a stale toast never survives a reload
render();
