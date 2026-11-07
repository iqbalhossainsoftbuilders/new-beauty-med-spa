# New Beauty Med Spa — Complete Website Redesign
## Design Specification

**Date:** 2026-11-07  
**Project:** New Beauty Med Spa — newbeautymedicalspa.com  
**Location:** 15622 Ventura Blvd, Encino, CA 91436  

---

## 1. Project Overview

A complete greenfield rebuild of the New Beauty Med Spa website. The existing site (newbeautymedicalspa.com) provides source-of-truth content — treatment names, descriptions, prices, booking URL — which will be fetched before implementation begins. The new site replaces the existing site entirely with a premium, editorial luxury aesthetic targeting affluent clients in Encino/Los Angeles.

**Primary business goal:** Convert visitors into booked appointments.

**Creative direction:** "THE ART OF MODERN AESTHETICS" — a balance between luxury beauty editorial magazine and advanced medical aesthetics studio.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom design tokens) |
| Animation | Framer Motion + GSAP + Splitting.js (free text splitting for heading reveals) |
| Smooth scroll | Lenis (`lerp: 0.08`) |
| Carousels | Swiper.js |
| CMS | Sanity v3 (Studio at `/studio`) |
| Images | Sanity CDN + `next/image` + Unsplash (initial photography) |
| Booking | GoHighLevel / LeadConnector (existing URL, verified before launch) |
| Maps | Google Maps embed (iframe) |
| Deployment | Deployment-agnostic (Vercel-ready, also exportable) |
| Analytics | Google Analytics 4 (event tracking on all Book Now CTAs) |

**3D effects:** CSS-only — `perspective`, `rotateX/Y` transforms, `backdrop-filter: blur`, CSS keyframe floating animations. No WebGL / React Three Fiber / Three.js dependency.

**Accessibility:** `prefers-reduced-motion` respected — all animations disabled with static fallbacks. WCAG 2.1 AA color contrast. Semantic HTML, ARIA labels on interactive elements.

---

## 3. Brand Identity

### Color System

```
--ivory:      #F6F1EA   /* Primary page backgrounds */
--champagne:  #E5D5C3   /* Section backgrounds, card fills, glass panels */
--gold:       #B89B79   /* Accent lines, icon strokes, dividers, borders */
--taupe:      #A99482   /* Subheadings, captions, muted text */
--espresso:   #493A32   /* Primary body text, dark section headings */
--charcoal:   #201C19   /* Hero headlines, deepest contrast text */
--white:      #FFFFFF   /* Cards, navigation on scroll */
```

Avoid: pink tones, bright/saturated gold, generic beauty-salon aesthetics.

### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Hero headline | Cormorant Garamond | 300 | clamp(56px, 8vw, 120px) |
| Section heading | Cormorant Garamond | 400 | clamp(36px, 5vw, 72px) |
| Card title | Playfair Display | 500 | 24–32px |
| Body copy | Manrope | 400 | 16–18px, line-height 1.7 |
| Navigation | Manrope | 500 | 14px, letter-spacing 0.12em |
| Buttons | Manrope | 600 | 13px, all-caps, letter-spacing 0.15em |
| Captions / labels | Manrope | 300 | 13px |

Fonts loaded via `next/font` (Google Fonts) — no layout shift.

### Motion Design Language

| Element | Effect | Library |
|---|---|---|
| Section headings | Character-by-character fade-up reveal on scroll entry | GSAP + Splitting.js (free) |
| Images | Clip-path reveal bottom→top on scroll entry | GSAP ScrollTrigger |
| Cards | 4px Y lift + shadow deepening on hover | Framer Motion spring |
| Page transitions | 300ms opacity + Y slide | Framer Motion AnimatePresence |
| 3D card depth | CSS `perspective` + `rotateX/Y` on hover (max 8°) | CSS |
| Glass panels | `backdrop-filter: blur(20px)` + champagne tint | CSS |
| Floating elements | CSS `translateY` ±12px infinite ease-in-out at 6s | CSS keyframes |
| Before/after slider | Draggable divider, touch/swipe on mobile | Custom React hook |

---

## 4. Site Structure and Routing

```
/                           Homepage
/face                       Face Treatments landing
/face/[slug]               Individual face treatment page (38 treatments)
/body                       Body Treatments landing
/body/[slug]               Individual body treatment page (11 treatments)
/packages                   Packages overview
/before-after               Before & After gallery
/about                      About Us
/contact                    Contact + map
/faq                        FAQs
/privacy-policy             Privacy Policy
/book                       Booking entry (redirect to GoHighLevel)
/studio                     Sanity Studio (CMS, password-protected)
```

**Shared layouts:**
- `RootLayout` — font loading, Lenis init, analytics, schema markup
- `SiteHeader` — sticky, transparent over hero, solid white on scroll
- `SiteFooter` — full editorial footer
- `TreatmentLayout` — reusable shell for all 49 treatment detail pages

---

## 5. Navigation

### Header
- Logo: `NEW BEAUTY` wordmark (Cormorant Garamond) + `MED SPA` subtitle (Manrope 300)
- Nav links: Home · Face · Body · Packages · About · Contact
- CTA button: `BOOK NOW` — champagne background, espresso text, Manrope SemiBold
- Behavior: transparent with white text over hero; transitions to solid white background + espresso text on scroll (threshold: 80px)
- Sticky: `position: sticky; top: 0; z-index: 50`

### Mobile Navigation
- Hamburger icon → full-screen overlay menu (Framer Motion `AnimatePresence` slide-in)
- Menu items revealed with staggered fade-up delay
- Prominent `BOOK NOW` button at bottom of mobile menu
- Floating sticky `BOOK NOW` bar at bottom of viewport on mobile (above fold, dismissible)

---

## 6. Homepage Sections

### Section 1 — Hero (100vh)
- Full-bleed Unsplash beauty portrait (woman, radiant skin, warm natural light, luxury feel)
- Transparent header overlay
- Floating champagne glass panel (CSS backdrop-filter) containing:
  - Headline: `BEAUTY, REDEFINED.` — Cormorant Garamond 300 in charcoal
  - Supporting: *"Advanced Aesthetics. Personalized Care. Naturally Confident You."*
  - Description: *"Discover advanced facial rejuvenation, skin renewal and body contouring treatments designed around your individual beauty goals."*
  - CTAs: `EXPLORE TREATMENTS` (champagne filled) + `BOOK YOUR EXPERIENCE` (outline)
- Two slow-floating translucent circle elements (CSS animation) in champagne/gold tones
- Subtle parallax on portrait (GSAP ScrollTrigger, `y: "-15%"` at full scroll)
- Load animation sequence: portrait fade-in (500ms) → headline character reveal (800ms) → supporting text fade-up (200ms delay) → CTAs slide-up

### Section 2 — Treatment Discovery ("YOUR BEAUTY JOURNEY STARTS HERE")
- Editorial label: `YOUR BEAUTY JOURNEY STARTS HERE` — Manrope 300, gold, wide-tracked
- Two large panels side-by-side (stack on mobile):
  - `FACE` — Facial rejuvenation, skin renewal, injectables, facials
  - `BODY` — Body contouring, fat reduction, skin tightening, hair removal
- Each panel: full-height editorial image + category name (large Cormorant) + brief description + `EXPLORE →`
- Hover: CSS perspective tilt (8° rotateY) + image scale 1.03 + sepia overlay lifts to reveal full color

### Section 3 — Featured Treatments (horizontal Swiper)
- Section label: `FEATURED TREATMENTS`
- 4-card horizontal carousel (Swiper.js, free-mode, edge padding)
- Featured: HydraFacial · Botox · CoolSculpting · Microneedling RF
- Card: treatment image (4:5 ratio) + treatment name + one-line description + `LEARN MORE →`
- Card hover: 4px Y lift, shadow, gold border appearance

### Section 4 — Brand Statement (full-width dark section)
- Background: `charcoal` (#201C19)
- Large centered editorial quote (Cormorant Garamond 300, ivory): *"The Art of Modern Aesthetics"*
- Three pillars below in a horizontal row: `Advanced Technology` · `Personalized Programs` · `Expert Specialists`
- Each pillar: gold line icon + heading (Manrope 500, champagne) + 1-line description (Manrope 300, taupe)
- Thin gold divider lines between pillars

### Section 5 — Before & After Preview
- Section heading: `REAL RESULTS`
- 3 draggable comparison sliders from Sanity before/after data
- Disclaimer text (Manrope 300 italic, taupe): *"Individual results may vary."*
- CTA link: `VIEW ALL RESULTS →` to `/before-after`

### Section 6 — Packages Teaser (champagne background)
- Section heading: `CURATED TREATMENT PACKAGES`
- Two featured package cards: Full Face + Full Body
- Each card: package name (Cormorant), area, price, value, included treatments (bulleted list), `BOOK CONSULTATION` CTA
- Link to full `/packages` page

### Section 7 — Testimonials
- Section heading: `WHAT OUR CLIENTS SAY`
- 3-card Swiper carousel (autoplay 5s, pause on hover)
- Each card: 5-star rating, quoted text, client name, treatment received
- Background: ivory, espresso text

### Section 8 — About Teaser + Contact Bar
- Split layout: brand story (left) + spa photo + contact info (right)
- Full-width champagne CTA bar below: *"Ready to begin your beauty journey?"* + `BOOK A CONSULTATION` button

---

## 7. Treatment Landing Pages (/face, /body)

- Large editorial hero: full-bleed image + category name as enormous editorial headline
- Subcategory filter tabs (Face: Facials · Injectables & Rejuvenation · Skin Renewal · Other; Body: single grid)
- Masonry-style treatment grid: image card + treatment name + one-line teaser + `VIEW TREATMENT →`
- Filter: client-side filtering by subcategory using React state
- Hover: CSS 3D card tilt (perspective + rotateX/Y), gold border

---

## 8. Individual Treatment Pages (/face/[slug], /body/[slug])

All 49 pages share `TreatmentLayout`. Sections:

1. **Cinematic hero** — full-bleed treatment image, treatment name as large editorial overlay headline
2. **Quick-info bar** — Duration · Best For · Recommended Sessions (from Sanity)
3. **What is this treatment?** — 2–3 paragraph prose (Sanity portable text)
4. **Key Benefits** — 4–6 icon+text cards in horizontal row
5. **Who is a candidate?** — descriptive paragraph + callout box (Sanity)
6. **Concerns addressed** — tag cloud (e.g. Fine Lines · Pigmentation · Sagging Skin)
7. **How it works** — 3-step illustrated process (icon + step name + description)
8. **Step-by-step treatment process** — numbered timeline (Sanity portable text)
9. **Duration + recovery** — side-by-side info cards
10. **Before & After** — 2–3 draggable comparison sliders (if Sanity has results for this treatment)
11. **FAQ accordion** — Sanity-managed Q&A, expand/collapse
12. **Related treatments** — 3-card row (Sanity references)
13. **Full-width Book CTA** — gold background, `BOOK THIS TREATMENT` → GoHighLevel URL with `?service=[treatment-slug]`

---

## 9. Packages Page (/packages)

- Section header: `CURATED TREATMENT EXPERIENCES` — Cormorant Garamond
- Two groups: **Face Packages** and **Body Packages** with an editorial gold divider
- Full Face and Full Body packages: featured large card at top of each group
- All other packages: standard editorial cards in a 2-column grid

**Package card fields:**
- Name (Cormorant Garamond large)
- Target area label (Manrope 300, gold)
- Price (Manrope 600, large, espresso)
- Stated value (Manrope 300, taupe, struck-through, labeled "Value:")
- Included treatments list (bulleted, Manrope 400)
- Brief benefits (1–2 lines, Manrope 300)
- `BOOK CONSULTATION` button → GoHighLevel

**Face packages:**
| Name | Price | Value |
|---|---|---|
| Look at That Smile (Lower Face) | On inquiry | $5,250–$6,100 |
| The True You (Neck) | On inquiry | $6,500–$8,095 |
| Turn Back Time (Eyes) | On inquiry | $4,450–$4,875 |
| Full Face | On inquiry | $6,480–$10,070 |
| Gold Package (Non-Surgical Facelift) | On inquiry | $8,000–$10,700 |

**Body packages:**
| Name | Price | Value |
|---|---|---|
| The Dreamer (Abdomen) | On inquiry | $2,700–$3,400 |
| Sexy Bash (Thighs) | On inquiry | $4,000–$5,460 |
| Shake That Booty (Buttocks) | On inquiry | $4,000–$5,460 |
| Non-Surgical Arm Sculpting | On inquiry | $2,300–$2,900 |
| Full Body | On inquiry | $11,700–$17,220 |

*Note: The brief provides "stated value" ranges for each package (the total retail value of included treatments). Actual selling prices for packages must be confirmed with the business owner before launch. Until confirmed, all package cards show the stated value range and route to a consultation booking CTA rather than a purchase button.*

---

## 10. Before & After Gallery (/before-after)

- Prominent disclaimer banner: *"Individual results vary. Photos are of actual patients with their consent."*
- Filter bar: All · Face · Skin · Body (client-side React state)
- Masonry grid of draggable comparison sliders
- Mobile: touch/swipe interaction
- Each entry: treatment name label below the slider, category tag
- Empty category state: placeholder cards labeled "Photos coming soon" with Book CTA
- Full-width Book CTA at page bottom

All before/after content managed in Sanity. No AI-generated images used.

---

## 11. About Page (/about)

Sections:
1. **Brand story hero** — editorial image + headline: *"Where Science Meets Beauty"*
2. **Our philosophy** — 3-paragraph brand narrative
3. **Three pillars** — Advanced Technology · Personalized Programs · Expert Specialists
4. **Team section** — placeholder for real team bios and headshots
5. **Financing** — information about payment plans (content from existing site)
6. **Beauty Concierge** — service description

---

## 12. Contact Page (/contact)

- Split layout (desktop): left = contact form, right = info panel
- **Contact form fields:** Name · Email · Phone · Treatment Interest (dropdown of all services) · Message · Submit
- **Info panel:** address, phone (click-to-call), email, business hours (Sanity siteSettings)
- **Google Maps embed** at full business address: 15622 Ventura Blvd, Encino, CA 91436
- Form submission: Next.js API route → email notification (or forward to GoHighLevel webhook if available)
- Schema markup: `LocalBusiness` JSON-LD with full NAP

---

## 13. Sanity CMS Schema

### `treatment`
```
slug, name, category (face|body), subcategory, heroImage, intro (portable text),
quickInfo { duration, bestFor, sessions }, benefits[], candidateDescription,
concernTags[], howItWorks (3 steps), processSteps (portable text),
durationRecovery { duration, downtime, aftercare }, faqs[], relatedTreatments[],
seoTitle, seoDescription
```

### `package`
```
name, slug, area, priceDisplay, statedValueMin, statedValueMax,
includedTreatments[], benefitsSummary, heroImage, featured (bool)
```

### `beforeAfter`
```
category (face|skin|body), treatmentRef → treatment, beforeImage, afterImage,
caption, consentConfirmed (bool)
```

### `testimonial`
```
clientName, quote, rating (1-5), treatmentRef → treatment, featured (bool)
```

### `siteSettings` (singleton)
```
bookingUrl, phone, email, address, businessHours[], socialLinks[], cookiePolicy
```

### `faqItem`
```
question, answer (portable text), category (treatments|booking|pricing|aftercare|general)
```

---

## 14. Booking Integration

- **GoHighLevel URL:** Verified from existing site before implementation. Exact URL stored in `siteSettings.bookingUrl` Sanity document.
- All `BOOK NOW` buttons: `href={bookingUrl}` target `_blank` rel `noopener noreferrer`
- Treatment-specific buttons: `href={bookingUrl + '?service=' + treatment.slug}`
- Google Analytics event: `book_now_click` with `{treatment: slug, location: pageSection}` fired on every CTA click
- Mobile sticky booking bar: `position: fixed; bottom: 0` — shown on mobile only, links to booking URL

---

## 15. Footer

Sections (4-column desktop, stacked mobile):

**Column 1 — Brand**
- `NEW BEAUTY` wordmark logo (Cormorant Garamond)
- Brand statement: *"Advanced aesthetics. Personalized care. Modern luxury."*
- Social links: Instagram · Facebook · TikTok (icons, link to actual profiles)
- `BOOK NOW` button

**Column 2 — Face Treatments**
- Quick links to major face treatment subcategories and selected individual pages

**Column 3 — Body Treatments**
- Quick links to all body treatments

**Column 4 — Contact**
- Address, phone (click-to-call), email, hours summary
- Newsletter signup (email field + `SUBSCRIBE` button)

**Footer bottom bar:**
- © 2026 New Beauty Med Spa
- Privacy Policy · Terms & Conditions links
- "Results may vary. Treatments performed by trained professionals."

---

## 16. SEO and Schema Markup

- `<title>` and `<meta name="description">` on every page via Next.js Metadata API
- Open Graph + Twitter Card tags for social sharing
- `LocalBusiness` JSON-LD schema on homepage and contact page (NAP, hours, geo coordinates)
- `MedicalBusiness` schema type
- `BreadcrumbList` schema on all interior pages
- `FAQPage` schema on FAQ page and treatment page FAQ accordions
- Sitemap generated via `next-sitemap`
- `robots.txt` with Sitemap reference
- Canonical URLs on all pages

---

## 17. Face Treatments — Complete List

### Facials
24K Nano Gold Recovery Facial · Cleopatra Exclusive 24Karat Facial · Collagen Regeneration Facial · Cryogenic Correction · ME Beauty for Teens · ME Beauty Revive for Sensitive Skin · ME Beauty Therapeutic Heat Facial · Vitamin C Signature Facial · RF Aqua Facial Lift · Brightening Facial for Hyper-Pigmented Skin · ME Beauty Pre-Event Facial · Wild Caviar Restoration

### Injectables & Rejuvenation
Botox · Microneedling Radio Frequency (RF) · HIFU · Exosome Regeneration · Dermal Fillers · Facial Fillers

### Skin Renewal & Advanced Treatments
Dermaplaning · Carbon Laser Peel · Advanced Corrective Peel (Jessner Peel) · Micropeel Plus 20 Solution · Perfect Derma Peel · Pigment Balancing Peel · BB Glow Nano-Needling · Microneedling · HydraFacial · Microdermabrasion · PRX Derm Perfexion · Chemical Peel · LED Facial Treatment · Vampire Facial · Skin Tightening · LED Light Therapy · Laser Skin Rejuvenation · High-Frequency Facial

### Other
Eyelash and Brow Tinting · Teeth Whitening

---

## 18. Body Treatments — Complete List

Cryo Fat Freezing · Lipo Cavitation · EMS Sculpting · CoolSculpting · RF Aqua Body Rejuvenation · Body Sculpting · Ultrasound Body · Hair Regrowth · Hair Removal · Exilis · Vanquish

---

## 19. Business Details (Source of Truth)

```
Name:    New Beauty Med Spa
Address: 15622 Ventura Blvd, Encino, CA 91436
Phone:   (213) 223-7963
Email:   Newmedspa1@gmail.com
```

Hours: To be verified from existing website before launch.
Social profiles: To be verified from existing website before launch.

---

## 20. Implementation Notes

1. **Content extraction first:** Before writing any component, fetch the existing site (newbeautymedicalspa.com) using WebFetch to extract real treatment descriptions, GoHighLevel booking URL, business hours, social links, and existing package details.

2. **Sanity setup second:** Initialize Sanity project, define all schemas, seed with extracted content.

3. **Next.js scaffold third:** Create the App Router structure, install dependencies, configure Tailwind tokens and fonts.

4. **Build order:**
   - Design system (tokens, typography, base components)
   - Navigation + footer
   - Homepage
   - Treatment landing pages (/face, /body)
   - Individual treatment template + first 5 treatments
   - Remaining 44 treatments (data-driven, same template)
   - Packages page
   - Before & After gallery
   - About, Contact, FAQ, Privacy
   - Booking integration + CTA audit
   - SEO metadata + schema
   - Performance audit

5. **Image strategy:** Unsplash API-sourced images used throughout. Each treatment page uses a relevant beauty/skincare search term. All images fetched via the Unsplash API (not hotlinked) and downloaded + stored in the project or Sanity media library. Unsplash `download_location` endpoint hit on each use as required by their API terms.

6. **Medical compliance:** No unsupported medical claims. Descriptions sourced from existing website only. "Results may vary" disclaimer on all before/after content. No invented testimonials, doctors, or certifications.
