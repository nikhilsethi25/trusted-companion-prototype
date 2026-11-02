# Trusted Companion prototype

Mobile web prototype of an AI buyer agent for a C2C marketplace, built for an
interview case study. Scripted: no model calls, no backend, no real data. Not
affiliated with any company.

## What it shows (v1)

When a listing the buyer has messaged about is reserved, or the seller
hasn't replied by a cutoff, the buyer's assistant looks for alternatives:

- **Reserved listing:** a notification, then similar offers in Berlin in
  "Für dich", with how the assistant understood what the buyer wants and why
  each offer was suggested. Opening one and sending a message starts a new
  conversation.
- **No reply, nothing comparable:** the assistant offers to save a search,
  shows the criteria it would use, lets the buyer change them, and saves only
  on confirmation. A later matching listing triggers a notification.
- The assistant never writes in the chat; the chat with the original seller
  stays open, and a late reply still arrives.
- Suggestions can be switched off.

The **Demo** button fires the background events (reserved, no reply, late
reply, new matching listing) and shows the events the A/B test would
measure. In English; ↺ resets.

## Run

Open `index.html`, or visit the GitHub Pages site. No build step.
