# Trusted Companion prototype

Mobile web prototype of an AI Trusted Companion for a C2C marketplace, built
for an interview case study. Scripted responses: no model calls, no backend,
no real data. Not affiliated with any company.

## What it shows (v0)

- Buyer and seller views on one phone (switch at the top). German by
  default, English toggle.
- The buyer's assistant answers questions about condition and price from the
  listing and a price estimate, labelled as coming from the listing.
- It never answers availability; it offers to ask the seller.
- Questions the listing can't answer become a draft to the seller that the
  buyer can edit, send or cancel.
- The seller sees the question in Messages and replies; the buyer's
  assistant reports the reply.

State is kept in the browser; the ↺ button resets it.

## Run

Open `index.html`, or visit the GitHub Pages site. No build step.
