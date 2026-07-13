# ⚡ NEXVRA DIGITAL & MAKEOVER BY THIRUMALA — Project Context Map

This file contains the complete workspace mapping, architecture, and configuration for Claude (or any LLM) to understand Likhith's project status instantly.

---

## 📂 Project Architecture

```
/Users/likhith/NEXVRA/
├── agency-website/                 # Main agency landing page
│   └── index.html                  # HTML/CSS/JS with Three.js 3D waves & booking system
├── crm-dashboard/                  # Off-line central lead tracker dashboard
│   └── index.html                  # Lead pipelines, calendar, checklists
├── makeoverbythirumala/            # Luxury salon & bridal portfolio website
│   ├── index.html                  # Warm terracotta-themed salon booking site
│   └── assets/                     # Custom-generated beauty portrait assets
│       ├── bridal_terracotta.jpg   # Main showcase portrait
│       ├── bridal_rosewood.jpg     # Bridal portrait
│       ├── editorial_gold.jpg      # Editorial beauty portrait
│       └── palette_detail.jpg      # Cosmetic detail macro photo
├── brand-assets/                   # NEXVRA Monogram Logo images
│   ├── nexvra-logo-wide.jpg
│   └── nexvra-icon-square.jpg
├── instagram-content/              # Reel videos and story post graphics
│   ├── nexvra-reel.mp4             # 10s vertical video reel
│   ├── post-1-story-cover.jpg
│   └── post-2-before-after.jpg
├── BUSINESS-PLAYBOOK.md            # Strategy, pricing tiers, scripting
├── DM-TEMPLATES.md                 # Cold DMs and follow-ups
├── LAUNCH-CHECKLIST.md             # Setup guide
└── LEARNING-PRIORITY-GUIDE.md      # Recommended study resources
```

---

## ⚙️ Technical Integrations

### 1. Central LocalStorage CRM Synchronization
Both `agency-website/index.html` and `makeoverbythirumala/index.html` synchronize their contact forms with the central offline CRM dashboard using a shared `localStorage` registry.
*   **Website Booking Registries**: `nexvra_bookings` (Agency website bookings) and `makeover_bookings` (Salon bookings).
*   **Central CRM DB Key**: `nexvra_crm_data`
    *   Holds an object schema: `{"leads": [], "events": [], "counters": {}, "checklist": {}, "dailyLog": {}}`.
    *   *Makeover bookings* are automatically categorized with `industry: "salon"`, and their deal values are calculated dynamically (₹25,000 for Bridal Package, ₹12,000 for Editorial, ₹8,500 for Occasion).
    *   All bookings automatically write a matching entry to the calendar event database inside the CRM data registry.

### 2. Makeover Theme Palette Specification
The Makeover website uses a bespoke luxury aesthetic inspired directly by the color tones of Likhith's downloads (`AKP_0207`, `AKP_3922`, `AKP_4021`, `AKP_4098`):
*   `--bg-deep`: `#120b0a` (Obsidian Shadow)
*   `--color-rose-gold`: `#c28b78` (Accent Highlights)
*   `--color-champagne`: `#e8c8b8` (Secondary Font Highlights)
*   `--color-terracotta`: `#5d302c` (Backdrop Glows)
*   `--font-serif`: `'Playfair Display', serif` (Editorial Headlines)
*   `--font-sans`: `'Outfit', sans-serif` (Body text)

---

## 📋 Outstanding Developer Tasks
1.  **Phone Number Settings**: Replace placeholder phone numbers in both index.html files.
2.  **Cal.com/Calendly Integration**: If replacing the manual date-pickers with external schedulers, swap out the form elements with `<iframe>` booking links.
3.  **GCP/Analytics Hooking**: Place Google Analytics tracking snippets in both HTML headers once domain names resolve.
