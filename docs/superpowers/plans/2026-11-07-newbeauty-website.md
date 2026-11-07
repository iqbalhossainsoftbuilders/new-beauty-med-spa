# New Beauty Med Spa — Complete Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete New Beauty Med Spa website — Next.js 14 App Router, Sanity v3 CMS, 12 pages including 49 template-driven treatment pages, GoHighLevel booking integration, and CSS-driven luxury animations.

**Architecture:** Next.js 14 App Router with static generation (generateStaticParams) for all 49 treatment pages. Content managed in Sanity v3; queries use GROQ and run at build time (SSG with 60s ISR revalidation). No WebGL — all 3D effects are CSS transform + backdrop-filter only. TypeScript data files (`src/data/`) seed Sanity and serve as local fallbacks.

**Tech Stack:** Next.js 14, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, GSAP 3, Splitting.js 1, Lenis 1, Swiper 11, Sanity v3, next-sanity 7, @sanity/image-url, Vitest 1, Playwright 1

## Global Constraints

- Booking URL (all CTAs): `https://api.leadconnectorhq.com/widget/group/ChfhJbuZKv0tpddfdb0E` — open in new tab, `rel="noopener noreferrer"`
- Color tokens: ivory `#F6F1EA`, champagne `#E5D5C3`, gold `#B89B79`, taupe `#A99482`, espresso `#493A32`, charcoal `#201C19`, white `#FFFFFF`
- Fonts (via `next/font/google`): Cormorant Garamond (headings), Playfair Display (card titles), Manrope (body/UI)
- All copy sourced from existing website — never invent medical claims, results, doctors, or testimonials
- `prefers-reduced-motion`: all GSAP/Framer animations disabled, static fallbacks shown
- No WebGL, Three.js, or React Three Fiber — CSS 3D transforms only
- Mobile sticky booking bar visible on all pages (mobile viewport only)
- Business: 15622 Ventura Blvd, Encino, CA 91436 | (213) 223-7963 | Newmedspa1@gmail.com
- Working directory: `/Users/apple/Desktop/Projects/fa-task-web-design`
- Node.js 20+, npm 10+

---

## File Structure

```
fa-task-web-design/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
├── sanity.config.ts
├── sanity.cli.ts
├── .env.local.example
├── vitest.config.ts
├── playwright.config.ts
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg          ← Unsplash beauty portrait (download separately)
│   │   ├── face-category.jpg    ← Unsplash face/skincare
│   │   ├── body-category.jpg    ← Unsplash body/spa
│   │   └── about-spa.jpg        ← Unsplash luxury spa interior
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── face/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── body/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── packages/page.tsx
│   │   ├── before-after/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── book/page.tsx
│   │   ├── studio/[[...tool]]/page.tsx
│   │   └── api/contact/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── MobileBookingBar.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── AnimatedHeading.tsx
│   │   │   ├── ImageReveal.tsx
│   │   │   ├── GlassPanel.tsx
│   │   │   ├── BeforeAfterSlider.tsx
│   │   │   ├── TreatmentCard.tsx
│   │   │   ├── PackageCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   └── FAQAccordion.tsx
│   │   ├── homepage/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TreatmentDiscovery.tsx
│   │   │   ├── FeaturedTreatments.tsx
│   │   │   ├── BrandStatement.tsx
│   │   │   ├── BeforeAfterPreview.tsx
│   │   │   ├── PackagesTeaser.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── AboutContactTeaser.tsx
│   │   ├── treatments/
│   │   │   ├── TreatmentLayout.tsx
│   │   │   ├── TreatmentHero.tsx
│   │   │   ├── QuickInfoBar.tsx
│   │   │   ├── BenefitsGrid.tsx
│   │   │   ├── ProcessTimeline.tsx
│   │   │   ├── ConcernsTags.tsx
│   │   │   └── RelatedTreatments.tsx
│   │   └── forms/
│   │       └── ContactForm.tsx
│   ├── data/
│   │   ├── treatments.ts
│   │   └── packages.ts
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts
│   │   ├── analytics.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useBeforeAfterSlider.ts
│   │   └── useHeaderScroll.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── treatment.ts
│   │   ├── package.ts
│   │   ├── beforeAfter.ts
│   │   ├── testimonial.ts
│   │   ├── siteSettings.ts
│   │   └── faqItem.ts
│   └── lib/
│       └── structure.ts
└── __tests__/
    ├── unit/
    │   ├── utils.test.ts
    │   └── useBeforeAfterSlider.test.ts
    └── e2e/
        └── booking-cta.spec.ts
```

---

### Task 1: Bootstrap Next.js project + install all dependencies

**Files:**
- Create: `package.json` (auto-generated, then extended)
- Create: `next.config.ts`
- Create: `tsconfig.json` (auto-generated)
- Create: `.env.local.example`
- Create: `sanity.cli.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`

**Interfaces:**
- Produces: working `npm run dev`, `npm run build`, `npm test`, `npm run type-check`

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd /Users/apple/Desktop/Projects/fa-task-web-design
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Expected: Next.js 14 project scaffolded in current directory.

- [ ] **Step 2: Install all dependencies**

```bash
npm install \
  framer-motion \
  gsap \
  splitting \
  @studio-freight/lenis \
  swiper \
  next-sanity \
  @sanity/image-url \
  @sanity/client \
  sanity \
  @portabletext/react

npm install -D \
  vitest \
  @vitejs/plugin-react \
  @testing-library/react \
  @testing-library/jest-dom \
  jsdom \
  @playwright/test \
  @types/splitting
```

- [ ] **Step 3: Write `next.config.ts`**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: Write `.env.local.example`**

```bash
# Sanity CMS — create project at sanity.io, then fill these in
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token

# Contact form — optional email forwarding
CONTACT_EMAIL_TO=Newmedspa1@gmail.com
```

Copy to `.env.local` and fill in Sanity credentials before running.

- [ ] **Step 5: Write `sanity.cli.ts`**

```typescript
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
```

- [ ] **Step 6: Write `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 7: Write `vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Write `playwright.config.ts`**

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './__tests__/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
})
```

- [ ] **Step 9: Add scripts to `package.json`**

Add these to the `scripts` object (merge with existing):

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

- [ ] **Step 10: Verify project boots**

```bash
npm run dev
```

Expected: `✓ Ready in Xms` — visit `http://localhost:3000`, see default Next.js page.

- [ ] **Step 11: Commit**

```bash
git init
git add .
git commit -m "feat: bootstrap Next.js 14 project with full dependency set"
```

---

### Task 2: Tailwind design system configuration

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/styles/globals.css`

**Interfaces:**
- Produces: Tailwind classes `bg-ivory`, `text-espresso`, `font-cormorant`, `animate-float`, etc. available globally

- [ ] **Step 1: Replace `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F6F1EA',
        champagne: '#E5D5C3',
        gold: '#B89B79',
        taupe: '#A99482',
        espresso: '#493A32',
        charcoal: '#201C19',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide-xl': '0.12em',
        'wide-2xl': '0.18em',
      },
      fontSize: {
        'display': ['clamp(3.5rem, 8vw, 7.5rem)', { lineHeight: '1' }],
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05' }],
        'editorial': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1' }],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite 1.5s',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'clip-reveal': 'clipReveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        clipReveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0% 0 0 0)' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(73, 58, 50, 0.08)',
        'card-hover': '0 8px 40px rgba(73, 58, 50, 0.16)',
        'glass': '0 4px 24px rgba(73, 58, 50, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace `src/styles/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-cormorant: 'Cormorant Garamond', Georgia, serif;
    --font-playfair: 'Playfair Display', Georgia, serif;
    --font-manrope: 'Manrope', system-ui, sans-serif;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-ivory text-espresso font-manrope;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Lenis smooth scroll */
  html.lenis {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
}

@layer components {
  /* Glass morphism panel */
  .glass-panel {
    background: rgba(230, 213, 195, 0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(184, 155, 121, 0.2);
    box-shadow: 0 4px 24px rgba(73, 58, 50, 0.1), inset 0 1px 0 rgba(255,255,255,0.4);
  }

  /* 3D card tilt on hover — CSS only */
  .card-3d {
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-3d:hover {
    transform: perspective(800px) rotateY(4deg) rotateX(-2deg) translateY(-4px);
  }

  /* Gold accent line */
  .gold-line {
    @apply block w-12 h-px bg-gold mx-auto my-4;
  }

  /* Section label — small tracked uppercase */
  .section-label {
    @apply font-manrope text-xs tracking-wide-2xl uppercase text-gold;
  }

  /* Button base */
  .btn {
    @apply inline-flex items-center justify-center font-manrope font-semibold text-xs tracking-wide-xl uppercase
      transition-all duration-300 ease-luxury cursor-pointer;
  }
  .btn-primary {
    @apply btn bg-champagne text-espresso px-8 py-4 hover:bg-gold hover:text-white;
  }
  .btn-outline {
    @apply btn border border-current px-8 py-4 hover:bg-espresso hover:text-ivory hover:border-espresso;
  }
  .btn-dark {
    @apply btn bg-espresso text-ivory px-8 py-4 hover:bg-charcoal;
  }
  .btn-gold {
    @apply btn bg-gold text-white px-8 py-4 hover:bg-espresso;
  }
}

@layer utilities {
  /* Respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Text clip gradient */
  .text-gradient-gold {
    background: linear-gradient(135deg, #B89B79, #E5D5C3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Full bleed image with object-cover */
  .img-cover {
    @apply w-full h-full object-cover;
  }
}
```

- [ ] **Step 3: Verify Tailwind classes compile**

```bash
npm run build
```

Expected: Build succeeds, no Tailwind errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/styles/globals.css
git commit -m "feat: add luxury design system tokens to Tailwind config"
```

---

### Task 3: TypeScript types + utility functions

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/analytics.ts`
- Create: `__tests__/unit/utils.test.ts`

**Interfaces:**
- Produces: `Treatment`, `Package`, `BeforeAfter`, `Testimonial`, `FaqItem` types; `cn()`, `slugify()`, `formatPrice()` utils; `trackBookingClick()` analytics

- [ ] **Step 1: Write `src/types/index.ts`**

```typescript
export type TreatmentCategory = 'face' | 'body'

export type FaceSubcategory =
  | 'facials'
  | 'injectables'
  | 'skin-renewal'
  | 'other'

export type BodySubcategory = 'body'

export interface QuickInfo {
  duration: string
  bestFor: string
  sessions: string
}

export interface Benefit {
  title: string
  description: string
  icon?: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface Treatment {
  name: string
  slug: string
  category: TreatmentCategory
  subcategory: FaceSubcategory | BodySubcategory
  intro: string
  quickInfo: QuickInfo
  benefits: Benefit[]
  candidateDescription: string
  concernTags: string[]
  howItWorks: ProcessStep[]
  duration: string
  downtime: string
  aftercare: string
  faqs: FaqEntry[]
  relatedSlugs: string[]
  seoTitle: string
  seoDescription: string
  heroImageQuery: string
}

export interface PackageIncluded {
  item: string
}

export interface SpaPackage {
  name: string
  slug: string
  area: string
  category: TreatmentCategory
  price: number
  statedValue: number
  priceDisplay: string
  valueDisplay: string
  included: string[]
  benefits: string
  featured: boolean
  heroImageQuery: string
}

export interface BeforeAfter {
  id: string
  category: TreatmentCategory | 'skin'
  treatmentName: string
  treatmentSlug: string
  caption?: string
}

export interface Testimonial {
  clientName: string
  quote: string
  rating: number
  treatmentName: string
  featured: boolean
}

export interface FaqItem {
  question: string
  answer: string
  category: 'treatments' | 'booking' | 'pricing' | 'aftercare' | 'general'
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  treatmentInterest: string
  message: string
}
```

- [ ] **Step 2: Write `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Install clsx and tailwind-merge: npm install clsx tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents)
}

export const BOOKING_URL =
  'https://api.leadconnectorhq.com/widget/group/ChfhJbuZKv0tpddfdb0E'

export function getBookingUrl(treatmentSlug?: string): string {
  if (!treatmentSlug) return BOOKING_URL
  return `${BOOKING_URL}?service=${encodeURIComponent(treatmentSlug)}`
}
```

- [ ] **Step 3: Install clsx + tailwind-merge**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 4: Write `src/lib/analytics.ts`**

```typescript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackBookingClick(params: {
  treatmentSlug?: string
  location: string
}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'book_now_click', {
    treatment: params.treatmentSlug ?? 'general',
    cta_location: params.location,
  })
}
```

- [ ] **Step 5: Write failing test `__tests__/unit/utils.test.ts`**

```typescript
import { describe, it, expect } from 'vitest'
import { slugify, formatPrice, getBookingUrl, BOOKING_URL } from '@/lib/utils'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('HydraFacial Treatment')).toBe('hydrafacial-treatment')
  })
  it('removes special characters', () => {
    expect(slugify('Microneedling (RF)')).toBe('microneedling-rf')
  })
  it('collapses multiple hyphens', () => {
    expect(slugify('24K  Gold  Facial')).toBe('24k-gold-facial')
  })
})

describe('formatPrice', () => {
  it('formats integer as USD', () => {
    expect(formatPrice(5250)).toBe('$5,250')
  })
})

describe('getBookingUrl', () => {
  it('returns base URL when no slug', () => {
    expect(getBookingUrl()).toBe(BOOKING_URL)
  })
  it('appends service param when slug provided', () => {
    const url = getBookingUrl('hydrafacial')
    expect(url).toContain('service=hydrafacial')
    expect(url).toContain(BOOKING_URL)
  })
})
```

- [ ] **Step 6: Run test — expect fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '@/lib/utils'`

- [ ] **Step 7: Run test after implementation**

```bash
npm test
```

Expected: 5 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/types src/lib/__tests__
git commit -m "feat: add TypeScript types, utility functions, and analytics helpers"
```

---

### Task 4: Sanity CMS setup + all schemas

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity/schemas/index.ts`
- Create: `sanity/schemas/treatment.ts`
- Create: `sanity/schemas/package.ts`
- Create: `sanity/schemas/beforeAfter.ts`
- Create: `sanity/schemas/testimonial.ts`
- Create: `sanity/schemas/siteSettings.ts`
- Create: `sanity/schemas/faqItem.ts`
- Create: `sanity/lib/structure.ts`
- Create: `src/app/studio/[[...tool]]/page.tsx`

**Prerequisite:** Create a free Sanity project at https://sanity.io → new project → name "New Beauty Med Spa" → dataset "production". Copy the Project ID into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.

**Interfaces:**
- Produces: Sanity Studio at `/studio`, all content types defined

- [ ] **Step 1: Write `sanity/schemas/treatment.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const treatmentSchema = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Treatment Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Face', value: 'face' }, { title: 'Body', value: 'body' }] }, validation: (R) => R.required() }),
    defineField({ name: 'subcategory', title: 'Subcategory', type: 'string', options: { list: [
      { title: 'Facials', value: 'facials' },
      { title: 'Injectables & Rejuvenation', value: 'injectables' },
      { title: 'Skin Renewal & Advanced', value: 'skin-renewal' },
      { title: 'Other', value: 'other' },
      { title: 'Body', value: 'body' },
    ] } }),
    defineField({ name: 'intro', title: 'Short Introduction', type: 'text', rows: 3 }),
    defineField({ name: 'quickInfo', title: 'Quick Info Bar', type: 'object', fields: [
      defineField({ name: 'duration', type: 'string', title: 'Duration (e.g. 60 min)' }),
      defineField({ name: 'bestFor', type: 'string', title: 'Best For' }),
      defineField({ name: 'sessions', type: 'string', title: 'Recommended Sessions' }),
    ] }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'benefits', title: 'Key Benefits', type: 'array', of: [{ type: 'object', name: 'benefit', fields: [
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'description', type: 'string' }),
    ] }] }),
    defineField({ name: 'candidateDescription', title: 'Who is a Candidate?', type: 'text' }),
    defineField({ name: 'concernTags', title: 'Concerns Addressed', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'howItWorks', title: 'How It Works (3 Steps)', type: 'array', of: [{ type: 'object', name: 'step', fields: [
      defineField({ name: 'stepNumber', type: 'number' }),
      defineField({ name: 'title', type: 'string' }),
      defineField({ name: 'description', type: 'string' }),
    ] }] }),
    defineField({ name: 'duration', title: 'Treatment Duration', type: 'string' }),
    defineField({ name: 'downtime', title: 'Downtime / Recovery', type: 'string' }),
    defineField({ name: 'aftercare', title: 'Aftercare Info', type: 'text' }),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'object', name: 'faq', fields: [
      defineField({ name: 'question', type: 'string' }),
      defineField({ name: 'answer', type: 'text' }),
    ] }] }),
    defineField({ name: 'relatedTreatments', title: 'Related Treatments', type: 'array', of: [{ type: 'reference', to: [{ type: 'treatment' }] }] }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
  ],
})
```

- [ ] **Step 2: Write `sanity/schemas/package.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const packageSchema = defineType({
  name: 'package',
  title: 'Treatment Package',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'area', title: 'Target Area', type: 'string' }),
    defineField({ name: 'category', type: 'string', options: { list: [{ title: 'Face', value: 'face' }, { title: 'Body', value: 'body' }] } }),
    defineField({ name: 'price', title: 'Price (USD)', type: 'number' }),
    defineField({ name: 'statedValue', title: 'Stated Value (USD)', type: 'number' }),
    defineField({ name: 'included', title: 'Included Treatments', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'benefits', title: 'Benefits Summary', type: 'text' }),
    defineField({ name: 'featured', title: 'Featured Package', type: 'boolean', initialValue: false }),
  ],
})
```

- [ ] **Step 3: Write `sanity/schemas/beforeAfter.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const beforeAfterSchema = defineType({
  name: 'beforeAfter',
  title: 'Before & After',
  type: 'document',
  fields: [
    defineField({ name: 'category', type: 'string', options: { list: ['face', 'skin', 'body'] }, validation: (R) => R.required() }),
    defineField({ name: 'treatmentName', type: 'string' }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'consentConfirmed', title: 'Patient Consent Confirmed', type: 'boolean', initialValue: false, validation: (R) => R.required() }),
  ],
})
```

- [ ] **Step 4: Write `sanity/schemas/testimonial.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'clientName', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'quote', type: 'text', validation: (R) => R.required() }),
    defineField({ name: 'rating', type: 'number', validation: (R) => R.required().min(1).max(5) }),
    defineField({ name: 'treatmentName', type: 'string' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
})
```

- [ ] **Step 5: Write `sanity/schemas/siteSettings.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url', initialValue: 'https://api.leadconnectorhq.com/widget/group/ChfhJbuZKv0tpddfdb0E' }),
    defineField({ name: 'phone', type: 'string', initialValue: '(213) 223-7963' }),
    defineField({ name: 'email', type: 'string', initialValue: 'Newmedspa1@gmail.com' }),
    defineField({ name: 'address', type: 'string', initialValue: '15622 Ventura Blvd, Encino, CA 91436' }),
    defineField({ name: 'businessHours', type: 'array', of: [{ type: 'object', name: 'hours', fields: [
      defineField({ name: 'days', type: 'string' }),
      defineField({ name: 'hours', type: 'string' }),
    ] }] }),
    defineField({ name: 'instagramUrl', type: 'url' }),
    defineField({ name: 'facebookUrl', type: 'url' }),
    defineField({ name: 'tiktokUrl', type: 'url' }),
  ],
})
```

- [ ] **Step 6: Write `sanity/schemas/faqItem.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const faqItemSchema = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'answer', type: 'text', validation: (R) => R.required() }),
    defineField({ name: 'category', type: 'string', options: { list: ['treatments', 'booking', 'pricing', 'aftercare', 'general'] } }),
    defineField({ name: 'sortOrder', type: 'number' }),
  ],
})
```

- [ ] **Step 7: Write `sanity/schemas/index.ts`**

```typescript
import { treatmentSchema } from './treatment'
import { packageSchema } from './package'
import { beforeAfterSchema } from './beforeAfter'
import { testimonialSchema } from './testimonial'
import { siteSettingsSchema } from './siteSettings'
import { faqItemSchema } from './faqItem'

export const schemaTypes = [
  treatmentSchema,
  packageSchema,
  beforeAfterSchema,
  testimonialSchema,
  siteSettingsSchema,
  faqItemSchema,
]
```

- [ ] **Step 8: Write `sanity/lib/structure.ts`**

```typescript
import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('New Beauty Med Spa CMS')
    .items([
      S.documentTypeListItem('treatment').title('Treatments'),
      S.documentTypeListItem('package').title('Packages'),
      S.documentTypeListItem('beforeAfter').title('Before & After'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faqItem').title('FAQ Items'),
      S.divider(),
      S.documentTypeListItem('siteSettings').title('Site Settings'),
    ])
```

- [ ] **Step 9: Write `sanity.config.ts`**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/lib/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 10: Write `src/app/studio/[[...tool]]/page.tsx`**

```typescript
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 11: Verify build**

```bash
npm run type-check
```

Expected: No TypeScript errors.

- [ ] **Step 12: Commit**

```bash
git add sanity/ sanity.config.ts src/app/studio
git commit -m "feat: add Sanity v3 CMS with all schemas and Studio route"
```

---

### Task 5: Sanity client + GROQ queries + data layer

**Files:**
- Create: `src/lib/sanity/client.ts`
- Create: `src/lib/sanity/queries.ts`
- Create: `src/lib/sanity/image.ts`
- Create: `src/data/treatments.ts`
- Create: `src/data/packages.ts`

**Interfaces:**
- Produces: `sanityClient`, `getAllTreatments()`, `getTreatmentBySlug()`, `getPackages()`, `localTreatments[]`, `localPackages[]`

- [ ] **Step 1: Write `src/lib/sanity/client.ts`**

```typescript
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

- [ ] **Step 2: Write `src/lib/sanity/image.ts`**

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

- [ ] **Step 3: Write `src/lib/sanity/queries.ts`**

```typescript
import { sanityClient } from './client'
import type { Treatment, SpaPackage } from '@/types'
import { localTreatments } from '@/data/treatments'
import { localPackages } from '@/data/packages'

const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder'

export async function getAllTreatments(): Promise<Treatment[]> {
  if (!hasSanity) return localTreatments
  try {
    const data = await sanityClient.fetch(`*[_type == "treatment"] | order(name asc)`)
    return data.length > 0 ? data : localTreatments
  } catch {
    return localTreatments
  }
}

export async function getTreatmentBySlug(slug: string): Promise<Treatment | null> {
  if (!hasSanity) return localTreatments.find(t => t.slug === slug) ?? null
  try {
    const data = await sanityClient.fetch(
      `*[_type == "treatment" && slug.current == $slug][0]`,
      { slug }
    )
    return data ?? (localTreatments.find(t => t.slug === slug) ?? null)
  } catch {
    return localTreatments.find(t => t.slug === slug) ?? null
  }
}

export async function getTreatmentsByCategory(category: 'face' | 'body'): Promise<Treatment[]> {
  const all = await getAllTreatments()
  return all.filter(t => t.category === category)
}

export async function getPackages(): Promise<SpaPackage[]> {
  if (!hasSanity) return localPackages
  try {
    const data = await sanityClient.fetch(`*[_type == "package"] | order(category asc, price asc)`)
    return data.length > 0 ? data : localPackages
  } catch {
    return localPackages
  }
}
```

- [ ] **Step 4: Write `src/data/packages.ts`** (all 10 packages with real prices from site)

```typescript
import type { SpaPackage } from '@/types'

export const localPackages: SpaPackage[] = [
  {
    name: 'Look at That Smile',
    slug: 'look-at-that-smile',
    area: 'Lower Face',
    category: 'face',
    price: 5250,
    statedValue: 6100,
    priceDisplay: '$5,250',
    valueDisplay: '$6,100',
    included: [
      '1 Microneedling with PRP',
      '4 Skin Tightening Sessions',
      '2 Ultrasound 7D',
      '2 HydraFacials',
    ],
    benefits: 'Targets the lower face including lips, chin, and jaw for a lifted, youthful appearance.',
    featured: false,
    heroImageQuery: 'facial treatment spa luxury',
  },
  {
    name: 'The True You',
    slug: 'the-true-you',
    area: 'Neck',
    category: 'face',
    price: 6500,
    statedValue: 8095,
    priceDisplay: '$6,500',
    valueDisplay: '$8,095',
    included: [
      '4 Skin Tightening Sessions',
      '1 Sculptra via Neck Lift',
      '3 Ultrasound Face & Neck',
      '2 Microneedling with RF',
      'Complimentary Neck Duo Lifting Cream',
    ],
    benefits: 'Comprehensive neck rejuvenation restoring firmness and reducing signs of aging on the neck.',
    featured: false,
    heroImageQuery: 'neck treatment beauty spa',
  },
  {
    name: 'Turn Back Time',
    slug: 'turn-back-time',
    area: 'Eyes',
    category: 'face',
    price: 4450,
    statedValue: 4875,
    priceDisplay: '$4,450',
    valueDisplay: '$4,875',
    included: [
      '4 Skin Tightening Sessions',
      '1 Microneedling RF',
      'Eye Cream',
      'Eye Serum',
    ],
    benefits: 'Reduces fine lines, puffiness, and dark circles around the eye area for a refreshed look.',
    featured: false,
    heroImageQuery: 'eye treatment skincare luxury',
  },
  {
    name: 'Full Face',
    slug: 'full-face',
    area: 'Full Face',
    category: 'face',
    price: 6480,
    statedValue: 10070,
    priceDisplay: '$6,480',
    valueDisplay: '$10,070',
    included: [
      'Everything in Look at That Smile',
      'Everything in The True You',
      'Everything in Turn Back Time',
      'Skincare Products',
    ],
    benefits: 'The complete facial rejuvenation experience addressing lower face, neck, and eyes in one comprehensive package.',
    featured: true,
    heroImageQuery: 'luxury facial treatment woman glow',
  },
  {
    name: 'Gold Package',
    slug: 'gold-package',
    area: 'Full Face & Neck',
    category: 'face',
    price: 8000,
    statedValue: 10700,
    priceDisplay: '$8,000',
    valueDisplay: '$10,700',
    included: [
      '8 Morpheus8 Treatments',
      '8 HIFU Face & Neck',
      '8 Full Face Skin Tightening',
      '3 Laser PRX Sessions',
    ],
    benefits: 'The ultimate non-surgical facelift. Advanced combination therapy for maximum rejuvenation with zero downtime.',
    featured: true,
    heroImageQuery: 'anti-aging luxury spa treatment',
  },
  {
    name: 'The Dreamer',
    slug: 'the-dreamer',
    area: 'Abdomen',
    category: 'body',
    price: 2700,
    statedValue: 3400,
    priceDisplay: '$2,700',
    valueDisplay: '$3,400',
    included: [
      '4 Abdomen Sessions',
      '4 Love Handle Sessions (or alternative treatments)',
    ],
    benefits: 'Targets stubborn abdominal fat and love handles for a flatter, more contoured midsection.',
    featured: false,
    heroImageQuery: 'body contouring treatment spa',
  },
  {
    name: 'Sexy Bash',
    slug: 'sexy-bash',
    area: 'Thighs',
    category: 'body',
    price: 4000,
    statedValue: 5460,
    priceDisplay: '$4,000',
    valueDisplay: '$5,460',
    included: [
      '4 Thigh Sessions',
      '2 Vials Sculptra',
      '1 Medium Area Laser Hair Removal Package',
    ],
    benefits: 'Slims and smooths the thighs with targeted fat reduction and skin tightening.',
    featured: false,
    heroImageQuery: 'body sculpting legs spa',
  },
  {
    name: 'Shake That Booty',
    slug: 'shake-that-booty',
    area: 'Buttocks',
    category: 'body',
    price: 4000,
    statedValue: 5460,
    priceDisplay: '$4,000',
    valueDisplay: '$5,460',
    included: [
      '4 RF Butt Lift Sessions',
      '5 Vials Sculptra',
      'Additional complementary treatments',
    ],
    benefits: 'Lifts and contours the buttocks non-surgically for a firmer, more sculpted silhouette.',
    featured: false,
    heroImageQuery: 'body sculpting treatment luxury',
  },
  {
    name: 'Non-Surgical Arm Sculpting',
    slug: 'non-surgical-arm-sculpting',
    area: 'Arms',
    category: 'body',
    price: 2300,
    statedValue: 2900,
    priceDisplay: '$2,300',
    valueDisplay: '$2,900',
    included: [
      '4 RF Body Sessions',
      '2 Vials Sculptra',
      'LHR or eMatrix options',
    ],
    benefits: 'Tightens and tones the arms without surgery, reducing underarm looseness and improving skin texture.',
    featured: false,
    heroImageQuery: 'arms body treatment skincare',
  },
  {
    name: 'Full Body',
    slug: 'full-body',
    area: 'Full Body',
    category: 'body',
    price: 11700,
    statedValue: 17220,
    priceDisplay: '$11,700',
    valueDisplay: '$17,220',
    included: [
      'Everything in The Dreamer (Abdomen)',
      'Everything in Sexy Bash (Thighs)',
      'Everything in Shake That Booty (Buttocks)',
      'Everything in Non-Surgical Arm Sculpting',
    ],
    benefits: 'The complete body transformation package. Comprehensive contouring, lifting, and tightening for the entire body.',
    featured: true,
    heroImageQuery: 'luxury spa body treatment full',
  },
]
```

- [ ] **Step 5: Verify TypeScript**

```bash
npm run type-check
```

Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sanity src/data/packages.ts
git commit -m "feat: add Sanity client, GROQ queries, and package data"
```

---

### Task 6: Treatment data file (all 49 treatments)

**Files:**
- Create: `src/data/treatments.ts`

- [ ] **Step 1: Write `src/data/treatments.ts`**

```typescript
import type { Treatment } from '@/types'

export const localTreatments: Treatment[] = [
  // ── FACE: FACIALS ───────────────────────────────────────────────────
  {
    name: '24K Nano Gold Recovery Facial',
    slug: '24k-nano-gold-recovery-facial',
    category: 'face', subcategory: 'facials',
    intro: 'Uses real gold to infuse the skin with radiance and diminish the appearance of fine lines and wrinkles.',
    quickInfo: { duration: '75 min', bestFor: 'Aging skin, dullness', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Radiance Boost', description: 'Real gold nanoparticles deliver instant luminosity.' },
      { title: 'Anti-Aging', description: 'Diminishes fine lines and wrinkles.' },
      { title: 'Skin Tightening', description: 'RF/ultrasound firms and lifts.' },
      { title: 'LED Therapy', description: 'Calms and rejuvenates at a cellular level.' },
    ],
    candidateDescription: 'Ideal for clients seeking a luxurious anti-aging treatment with visible radiance improvement. Suitable for most skin types.',
    concernTags: ['Fine Lines', 'Dullness', 'Uneven Tone', 'Loss of Firmness'],
    howItWorks: [
      { stepNumber: 1, title: 'Gold Infusion', description: 'Real gold is applied to cleansed skin to stimulate circulation.' },
      { stepNumber: 2, title: 'RF/Ultrasound Tightening', description: 'Energy devices firm and lift the underlying tissue.' },
      { stepNumber: 3, title: 'LED Therapy', description: 'Light wavelengths complete the rejuvenation process.' },
    ],
    duration: '75 minutes', downtime: 'None', aftercare: 'Avoid direct sun exposure for 24 hours. Apply SPF 30+.',
    faqs: [
      { question: 'Is real gold safe on skin?', answer: 'Yes. 24K gold nanoparticles are biocompatible and have been used in skincare for decades.' },
      { question: 'How soon will I see results?', answer: 'Skin appears more radiant immediately. Optimal results develop over 2–4 weeks.' },
    ],
    relatedSlugs: ['cleopatra-exclusive-24karat-facial', 'hydrafacial', 'led-facial-treatment'],
    seoTitle: '24K Nano Gold Recovery Facial | New Beauty Med Spa Encino',
    seoDescription: 'Luxurious 24K gold facial that infuses real gold nanoparticles to restore radiance and reduce fine lines at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'gold facial luxury skincare treatment',
  },
  {
    name: 'Cleopatra Exclusive 24Karat Facial',
    slug: 'cleopatra-exclusive-24karat-facial',
    category: 'face', subcategory: 'facials',
    intro: 'A three-step royal treatment using 24K gold sheets to deliver unparalleled radiance and skin tightening.',
    quickInfo: { duration: '90 min', bestFor: 'Dull, aging skin', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Gold Sheet Mask', description: '24K gold sheets deliver deep radiance.' },
      { title: 'Chemical Peel', description: 'Light peel refreshes the skin surface.' },
      { title: 'RF/Ultrasound', description: 'Non-invasive tightening and lifting.' },
      { title: 'Localized LED', description: 'Targeted light therapy for rejuvenation.' },
    ],
    candidateDescription: 'Perfect for clients seeking a signature luxury facial with multi-step rejuvenation. All skin types welcome.',
    concernTags: ['Dullness', 'Fine Lines', 'Loss of Firmness', 'Uneven Texture'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep & Peel', description: 'A light chemical peel removes surface impurities.' },
      { stepNumber: 2, title: 'Gold Application', description: '24K gold sheets are applied to boost radiance.' },
      { stepNumber: 3, title: 'Energy & Light', description: 'RF/ultrasound and LED complete the treatment.' },
    ],
    duration: '90 minutes', downtime: 'None', aftercare: 'Use gentle cleanser for 48 hours. Wear SPF daily.',
    faqs: [
      { question: 'How is this different from the 24K Nano Gold?', answer: 'The Cleopatra uses full gold sheets for a deeper infusion and includes a more comprehensive three-step protocol.' },
    ],
    relatedSlugs: ['24k-nano-gold-recovery-facial', 'wild-caviar-restoration'],
    seoTitle: 'Cleopatra Exclusive 24K Facial | New Beauty Med Spa Encino',
    seoDescription: 'The ultimate royal facial with 24K gold sheets, RF tightening, and LED therapy at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'luxury gold facial spa woman',
  },
  {
    name: 'Collagen Regeneration Facial',
    slug: 'collagen-regeneration-facial',
    category: 'face', subcategory: 'facials',
    intro: 'Restores skin volume and elasticity using seaweed extracts and advanced collagen boosters.',
    quickInfo: { duration: '75 min', bestFor: 'Volume loss, aging skin', sessions: '6 sessions' },
    benefits: [
      { title: 'Volume Restoration', description: 'Seaweed and collagen boosters plump depleted skin.' },
      { title: 'Peel Prep', description: 'Mild chemical peel optimizes product absorption.' },
      { title: 'Tightening Energy', description: 'RF/ultrasound firms the skin matrix.' },
      { title: 'Advanced LED', description: 'Stimulates collagen at a cellular level.' },
    ],
    candidateDescription: 'Best for clients experiencing volume loss or early signs of aging who want non-injectable collagen support.',
    concernTags: ['Volume Loss', 'Fine Lines', 'Sagging', 'Dryness'],
    howItWorks: [
      { stepNumber: 1, title: 'Exfoliation', description: 'Mild peel removes dead cells to maximize absorption.' },
      { stepNumber: 2, title: 'Collagen Infusion', description: 'Seaweed and collagen serums penetrate deeply.' },
      { stepNumber: 3, title: 'Energy Activation', description: 'RF/ultrasound and LED lock in results.' },
    ],
    duration: '75 minutes', downtime: 'None', aftercare: 'Hydrate well. Avoid actives for 48 hours.',
    faqs: [
      { question: 'Will this replace fillers?', answer: 'This facial boosts natural collagen production but is not a substitute for injectable dermal fillers.' },
    ],
    relatedSlugs: ['hydrafacial', 'microneedling', 'skin-tightening'],
    seoTitle: 'Collagen Regeneration Facial | New Beauty Med Spa Encino',
    seoDescription: 'Restore skin volume and elasticity with our Collagen Regeneration Facial at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'collagen facial skincare woman glow',
  },
  {
    name: 'Cryogenic Correction',
    slug: 'cryogenic-correction',
    category: 'face', subcategory: 'facials',
    intro: 'Infused with green tea, caffeine, chamomile, and diamond dust for a cooling, corrective skin experience.',
    quickInfo: { duration: '60 min', bestFor: 'Redness, puffiness, oily skin', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Cooling Effect', description: 'Cryo technology instantly reduces redness and puffiness.' },
      { title: 'Antioxidant Boost', description: 'Green tea and chamomile calm inflammation.' },
      { title: 'Brightening', description: 'Diamond dust gently resurfaces and brightens.' },
      { title: 'Pore Refinement', description: 'Tightens enlarged pores and balances oil.' },
    ],
    candidateDescription: 'Ideal for sensitive or reactive skin, oily skin types, and anyone seeking a cooling, calming facial.',
    concernTags: ['Redness', 'Puffiness', 'Oily Skin', 'Enlarged Pores'],
    howItWorks: [
      { stepNumber: 1, title: 'Cryo Application', description: 'Cold infusion calms the skin and reduces inflammation.' },
      { stepNumber: 2, title: 'Active Infusion', description: 'Green tea, caffeine, and diamond dust are applied.' },
      { stepNumber: 3, title: 'Energy Finish', description: 'RF/ultrasound and LED complete the correction.' },
    ],
    duration: '60 minutes', downtime: 'None', aftercare: 'Avoid heat (saunas, hot showers) for 24 hours.',
    faqs: [
      { question: 'Is cryotherapy painful?', answer: 'No. The cooling sensation is gentle and most clients find it relaxing.' },
    ],
    relatedSlugs: ['led-facial-treatment', 'brightening-facial-for-hyper-pigmented-skin'],
    seoTitle: 'Cryogenic Correction Facial | New Beauty Med Spa Encino',
    seoDescription: 'Cooling cryogenic facial with green tea, caffeine, and diamond dust at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'cryotherapy facial cooling spa',
  },
  {
    name: 'ME Beauty for Teens',
    slug: 'me-beauty-for-teens',
    category: 'face', subcategory: 'facials',
    intro: 'A gentle, targeted facial designed for teen skin — addressing acne, blackheads, redness, and excess oil.',
    quickInfo: { duration: '45 min', bestFor: 'Teen acne, oily skin', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Acne Control', description: 'Salicylic peel targets acne-causing bacteria.' },
      { title: 'Blackhead Removal', description: 'Deep cleansing extractions.' },
      { title: 'Redness Reduction', description: 'Calms inflamed skin.' },
      { title: 'Oil Balancing', description: 'Regulates sebum production.' },
    ],
    candidateDescription: 'Specially formulated for teenage skin experiencing acne, oiliness, blackheads, or sensitivity.',
    concernTags: ['Acne', 'Blackheads', 'Oily Skin', 'Redness'],
    howItWorks: [
      { stepNumber: 1, title: 'Salicylic Peel', description: 'BHA peel unclogs pores and treats acne.' },
      { stepNumber: 2, title: 'High Frequency', description: 'Kills bacteria and reduces inflammation.' },
      { stepNumber: 3, title: 'LED Therapy', description: 'Blue light finishes the antibacterial treatment.' },
    ],
    duration: '45 minutes', downtime: 'None', aftercare: 'Use oil-free moisturizer. Avoid picking or touching treated areas.',
    faqs: [
      { question: 'Is this safe for teenage skin?', answer: 'Yes. This treatment is specifically formulated for young, sensitive skin using gentle, proven ingredients.' },
    ],
    relatedSlugs: ['led-facial-treatment', 'high-frequency-facial', 'hydrafacial'],
    seoTitle: 'ME Beauty Teen Facial | New Beauty Med Spa Encino',
    seoDescription: 'Gentle acne and oil control facial designed for teens at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'teen acne facial skincare treatment',
  },
  {
    name: 'ME Beauty Revive for Sensitive Skin',
    slug: 'me-beauty-revive-for-sensitive-skin',
    category: 'face', subcategory: 'facials',
    intro: 'Gentle cleansing with hypoallergenic products and peptides designed for reactive and sensitive skin.',
    quickInfo: { duration: '60 min', bestFor: 'Sensitive, reactive skin', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Hypoallergenic Formula', description: 'Fragrance-free, dermatologist-safe ingredients.' },
      { title: 'Peptide Boost', description: 'Peptides strengthen and repair the skin barrier.' },
      { title: 'Gentle Peel', description: 'Mild exfoliation without irritation.' },
      { title: 'Calming LED', description: 'Red light reduces redness and sensitivity.' },
    ],
    candidateDescription: 'Designed for clients with rosacea, eczema, or highly reactive skin who need a gentle but effective treatment.',
    concernTags: ['Sensitivity', 'Redness', 'Rosacea', 'Dry Skin', 'Reactive Skin'],
    howItWorks: [
      { stepNumber: 1, title: 'Gentle Cleanse', description: 'Hypoallergenic cleansers remove impurities.' },
      { stepNumber: 2, title: 'Peptide Infusion', description: 'Barrier-repairing peptides are applied.' },
      { stepNumber: 3, title: 'Light Therapy', description: 'Calming LED red light reduces inflammation.' },
    ],
    duration: '60 minutes', downtime: 'None', aftercare: 'Use prescribed gentle moisturizer only for 48 hours.',
    faqs: [
      { question: 'Can I have this if I have rosacea?', answer: 'Yes, this facial is specifically designed with rosacea and sensitive conditions in mind. Please mention it at consultation.' },
    ],
    relatedSlugs: ['led-light-therapy', 'cryogenic-correction'],
    seoTitle: 'ME Beauty Revive Sensitive Skin Facial | New Beauty Med Spa',
    seoDescription: 'Gentle hypoallergenic facial for sensitive and reactive skin at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'sensitive skin facial spa gentle',
  },
  {
    name: 'ME Beauty Therapeutic Heat Facial',
    slug: 'me-beauty-therapeutic-heat-facial',
    category: 'face', subcategory: 'facials',
    intro: 'A triple-action heat facial that opens pores and boosts the efficacy of every step that follows.',
    quickInfo: { duration: '75 min', bestFor: 'Deep cleansing, all skin types', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Deep Pore Opening', description: 'Therapeutic heat primes pores for extraction.' },
      { title: 'Boosted Absorption', description: 'Warm skin absorbs actives more effectively.' },
      { title: 'Triple-Action', description: 'Heat, peel, and energy work in synergy.' },
      { title: 'Circulation Boost', description: 'Improves skin tone and overall radiance.' },
    ],
    candidateDescription: 'Suitable for clients wanting a deep cleanse and enhanced product penetration. Not recommended for rosacea.',
    concernTags: ['Clogged Pores', 'Dullness', 'Congested Skin', 'Uneven Texture'],
    howItWorks: [
      { stepNumber: 1, title: 'Heat Application', description: 'Therapeutic warmth opens pores and softens skin.' },
      { stepNumber: 2, title: 'Chemical Peel', description: 'Gentle peel removes impurities.' },
      { stepNumber: 3, title: 'RF/Ultrasound + LED', description: 'Energy devices firm and complete the treatment.' },
    ],
    duration: '75 minutes', downtime: 'None', aftercare: 'Avoid saunas or steam for 24 hours.',
    faqs: [],
    relatedSlugs: ['me-beauty-revive-for-sensitive-skin', 'hydrafacial', 'microdermabrasion'],
    seoTitle: 'ME Beauty Therapeutic Heat Facial | New Beauty Med Spa Encino',
    seoDescription: 'Triple-action heat facial for deep cleansing and enhanced results at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'facial treatment heat steam spa luxury',
  },
  {
    name: 'Vitamin C Signature Facial',
    slug: 'vitamin-c-signature-facial',
    category: 'face', subcategory: 'facials',
    intro: 'A nourishing blend of Vitamin C and Retinyl Palmitate targets dark spots, fine lines, and puffy eyes.',
    quickInfo: { duration: '75 min', bestFor: 'Pigmentation, fine lines', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Brightening', description: 'Vitamin C evens tone and fades dark spots.' },
      { title: 'Anti-Aging', description: 'Retinyl Palmitate reduces fine lines.' },
      { title: 'Depuffing', description: 'Reduces under-eye puffiness.' },
      { title: 'Antioxidant Shield', description: 'Protects against environmental damage.' },
    ],
    candidateDescription: 'Ideal for clients with pigmentation, sun damage, fine lines, or tired-looking skin.',
    concernTags: ['Dark Spots', 'Fine Lines', 'Puffiness', 'Sun Damage', 'Dullness'],
    howItWorks: [
      { stepNumber: 1, title: 'Detox Mask', description: 'Removes impurities and primes skin.' },
      { stepNumber: 2, title: 'Vitamin C Infusion', description: 'High-potency C and Retinyl Palmitate applied.' },
      { stepNumber: 3, title: 'RF + LED', description: 'Locks in actives and boosts results.' },
    ],
    duration: '75 minutes', downtime: 'None', aftercare: 'SPF 30+ daily. Avoid Vitamin A products for 48 hours.',
    faqs: [
      { question: 'Will Vitamin C irritate my skin?', answer: 'We use a stabilized form of Vitamin C appropriate for all skin types.' },
    ],
    relatedSlugs: ['brightening-facial-for-hyper-pigmented-skin', 'carbon-laser-peel', 'pigment-balancing-peel'],
    seoTitle: 'Vitamin C Signature Facial | New Beauty Med Spa Encino',
    seoDescription: 'Brightening Vitamin C facial targeting dark spots, fine lines and dullness at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'vitamin c brightening facial skincare',
  },
  {
    name: 'RF Aqua Facial Lift',
    slug: 'rf-aqua-facial-lift',
    category: 'face', subcategory: 'facials',
    intro: 'The only hydradermabrasion method that delivers clearer, hydrated skin with no pain and no downtime.',
    quickInfo: { duration: '60 min', bestFor: 'All skin types, dehydration', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Hydradermabrasion', description: 'Cleanses, exfoliates, and hydrates simultaneously.' },
      { title: 'Pain-Free', description: 'No needles, no downtime.' },
      { title: 'RF Lifting', description: 'Radiofrequency tightens and lifts.' },
      { title: 'Instant Results', description: 'Visibly clearer skin from the first session.' },
    ],
    candidateDescription: 'Suitable for all skin types, especially those with dehydration, texture irregularities, or mild laxity.',
    concernTags: ['Dehydration', 'Texture', 'Dullness', 'Fine Lines'],
    howItWorks: [
      { stepNumber: 1, title: 'Aqua Cleanse', description: 'Vortex technology removes debris from pores.' },
      { stepNumber: 2, title: 'Hydration Infusion', description: 'Serums are delivered deep into the skin.' },
      { stepNumber: 3, title: 'RF Tightening', description: 'Radiofrequency lifts and firms.' },
    ],
    duration: '60 minutes', downtime: 'None', aftercare: 'Stay hydrated. Avoid makeup for 4 hours.',
    faqs: [],
    relatedSlugs: ['hydrafacial', 'microdermabrasion', 'skin-tightening'],
    seoTitle: 'RF Aqua Facial Lift | New Beauty Med Spa Encino',
    seoDescription: 'Hydradermabrasion facial lift with RF technology — no pain, no downtime at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'hydrafacial aqua facial treatment',
  },
  {
    name: 'Brightening Facial for Hyper-Pigmented Skin',
    slug: 'brightening-facial-for-hyper-pigmented-skin',
    category: 'face', subcategory: 'facials',
    intro: 'Formulated with kojic acid, Vitamin A, and Vitamin C to visibly brighten pigmented and uneven skin.',
    quickInfo: { duration: '60 min', bestFor: 'Hyperpigmentation, sun damage', sessions: '6 sessions' },
    benefits: [
      { title: 'Kojic Acid', description: 'Inhibits melanin production to fade dark spots.' },
      { title: 'Vitamin Complex', description: 'A and C vitamins even skin tone.' },
      { title: 'RF Tightening', description: 'Firms while brightening.' },
      { title: 'LED Therapy', description: 'Green light targets pigmentation at a cellular level.' },
    ],
    candidateDescription: 'Ideal for skin types prone to melasma, post-inflammatory hyperpigmentation, or sun damage.',
    concernTags: ['Hyperpigmentation', 'Melasma', 'Dark Spots', 'Sun Damage', 'Uneven Tone'],
    howItWorks: [
      { stepNumber: 1, title: 'Active Prep', description: 'Mild peel primes skin for brightening actives.' },
      { stepNumber: 2, title: 'Brightening Infusion', description: 'Kojic acid and vitamin complex applied.' },
      { stepNumber: 3, title: 'RF + Green LED', description: 'Energy devices maximize pigmentation correction.' },
    ],
    duration: '60 minutes', downtime: 'Minimal — slight redness 2–4 hours', aftercare: 'SPF 50+ daily is essential. Avoid sun exposure.',
    faqs: [],
    relatedSlugs: ['vitamin-c-signature-facial', 'pigment-balancing-peel', 'carbon-laser-peel'],
    seoTitle: 'Brightening Facial for Hyperpigmentation | New Beauty Med Spa',
    seoDescription: 'Targeted brightening facial with kojic acid and vitamins for hyperpigmented skin at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'brightening facial pigmentation skincare',
  },
  {
    name: 'ME Beauty Pre-Event Facial',
    slug: 'me-beauty-pre-event-facial',
    category: 'face', subcategory: 'facials',
    intro: 'Includes DMAE for immediate anti-wrinkle benefits — the perfect treatment before a special event.',
    quickInfo: { duration: '60 min', bestFor: 'Event prep, instant glow', sessions: 'Single or series' },
    benefits: [
      { title: 'DMAE Filler', description: 'Immediate skin firming and wrinkle reduction.' },
      { title: 'Instant Glow', description: 'Visible radiance from a single session.' },
      { title: 'No Downtime', description: 'Walk out red-carpet ready.' },
      { title: 'Pore Refinement', description: 'Smooth, camera-ready finish.' },
    ],
    candidateDescription: 'Anyone preparing for a wedding, event, photoshoot, or special occasion who wants immediate results.',
    concernTags: ['Dullness', 'Fine Lines', 'Puffiness', 'Uneven Texture'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep', description: 'Gentle cleanse and mild peel.' },
      { stepNumber: 2, title: 'DMAE Application', description: 'Topical DMAE firms and smooths instantly.' },
      { stepNumber: 3, title: 'Energy Finish', description: 'RF/ultrasound and LED seal in results.' },
    ],
    duration: '60 minutes', downtime: 'None', aftercare: 'Avoid harsh actives or strong makeup for 24 hours.',
    faqs: [
      { question: 'How far in advance should I book before my event?', answer: 'We recommend 48–72 hours before your event for optimal results.' },
    ],
    relatedSlugs: ['vitamin-c-signature-facial', 'rf-aqua-facial-lift', 'hydrafacial'],
    seoTitle: 'Pre-Event Facial | New Beauty Med Spa Encino',
    seoDescription: 'Get red-carpet-ready with our DMAE pre-event facial at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'luxury facial treatment glow woman',
  },
  {
    name: 'Wild Caviar Restoration',
    slug: 'wild-caviar-restoration',
    category: 'face', subcategory: 'facials',
    intro: 'Combats sun damage using wild American caviar, tea tree oil, and a restorative treatment protocol.',
    quickInfo: { duration: '90 min', bestFor: 'Sun damage, aging skin', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Caviar Proteins', description: 'Wild American caviar restores and nourishes.' },
      { title: 'Sun Damage Repair', description: 'Targeted treatment for photo-damaged skin.' },
      { title: 'Tea Tree Healing', description: 'Antibacterial and calming properties.' },
      { title: 'Restorative Mask', description: 'Deep conditioning caviar mask.' },
    ],
    candidateDescription: 'Ideal for clients with sun-damaged, prematurely aged, or depleted skin seeking restoration.',
    concernTags: ['Sun Damage', 'Premature Aging', 'Dullness', 'Loss of Firmness'],
    howItWorks: [
      { stepNumber: 1, title: 'Caviar Mask', description: 'Wild caviar mask is applied for deep nourishment.' },
      { stepNumber: 2, title: 'Light Peel', description: 'Removes damaged surface cells.' },
      { stepNumber: 3, title: 'RF/Ultrasound + LED', description: 'Firms and completes the restoration.' },
    ],
    duration: '90 minutes', downtime: 'None', aftercare: 'SPF 50+ daily. Avoid retinols for 48 hours.',
    faqs: [],
    relatedSlugs: ['24k-nano-gold-recovery-facial', 'cleopatra-exclusive-24karat-facial', 'collagen-regeneration-facial'],
    seoTitle: 'Wild Caviar Restoration Facial | New Beauty Med Spa Encino',
    seoDescription: 'Luxurious caviar restoration facial for sun-damaged and aging skin at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'luxury caviar facial restoration spa',
  },

  // ── FACE: INJECTABLES & REJUVENATION ────────────────────────────────
  {
    name: 'Botox',
    slug: 'botox',
    category: 'face', subcategory: 'injectables',
    intro: 'A fast and effective treatment administered by trained professionals to smooth wrinkles and expression lines.',
    quickInfo: { duration: '30 min', bestFor: 'Dynamic wrinkles, forehead lines', sessions: '1 session, repeat every 3–4 months' },
    benefits: [
      { title: 'Wrinkle Reduction', description: 'Visibly smooths forehead, crow\'s feet, and frown lines.' },
      { title: 'Fast Treatment', description: 'Most sessions complete in under 30 minutes.' },
      { title: 'Natural Results', description: 'Administered by trained doctors for subtle, natural-looking outcomes.' },
      { title: 'Preventative', description: 'Regular treatment helps prevent new lines from forming.' },
    ],
    candidateDescription: 'Adults with dynamic wrinkles caused by facial expressions — forehead lines, crow\'s feet, frown lines. Not suitable during pregnancy or for those with certain neuromuscular conditions.',
    concernTags: ['Forehead Lines', 'Crow\'s Feet', 'Frown Lines', '11 Lines', 'Dynamic Wrinkles'],
    howItWorks: [
      { stepNumber: 1, title: 'Consultation', description: 'Your specialist assesses facial dynamics and discusses goals.' },
      { stepNumber: 2, title: 'Precision Injection', description: 'Botulinum toxin is injected into targeted muscles.' },
      { stepNumber: 3, title: 'Results Develop', description: 'Full effects visible within 7–14 days, lasting 3–4 months.' },
    ],
    duration: '20–30 minutes', downtime: 'None. Avoid lying down for 4 hours post-treatment.',
    aftercare: 'No rubbing treated areas. Avoid strenuous exercise for 24 hours. No facials for 2 weeks.',
    faqs: [
      { question: 'Is Botox painful?', answer: 'Most clients describe a brief pinching sensation. Topical numbing cream is available on request.' },
      { question: 'How long do results last?', answer: 'Typically 3–4 months. With regular treatments, results can last longer.' },
    ],
    relatedSlugs: ['dermal-fillers', 'hifu', 'skin-tightening'],
    seoTitle: 'Botox Injections Encino | New Beauty Med Spa',
    seoDescription: 'Professional Botox treatments by trained doctors at New Beauty Med Spa, 15622 Ventura Blvd, Encino CA.',
    heroImageQuery: 'botox injection facial treatment professional',
  },
  {
    name: 'Microneedling Radio Frequency (RF)',
    slug: 'microneedling-radio-frequency',
    category: 'face', subcategory: 'injectables',
    intro: 'Combines microneedling with RF energy to stimulate deep collagen production, tighten skin, and reduce scars.',
    quickInfo: { duration: '60–90 min', bestFor: 'Scars, laxity, texture', sessions: '3–6 sessions' },
    benefits: [
      { title: 'Deep Collagen', description: 'RF energy reaches deeper layers than standard microneedling.' },
      { title: 'Scar Reduction', description: 'Remodels acne scars and stretch marks.' },
      { title: 'Skin Tightening', description: 'Firms and lifts sagging areas.' },
      { title: 'Minimal Downtime', description: 'Recovery is 24–48 hours.' },
    ],
    candidateDescription: 'Suitable for acne scarring, fine lines, skin laxity, enlarged pores, and uneven texture. Not suitable for active acne or keloid-prone skin.',
    concernTags: ['Acne Scars', 'Fine Lines', 'Loose Skin', 'Enlarged Pores', 'Stretch Marks'],
    howItWorks: [
      { stepNumber: 1, title: 'Numbing', description: 'Topical anaesthetic applied 30–45 minutes before.' },
      { stepNumber: 2, title: 'RF Microneedling', description: 'Micro-needles deliver RF energy precisely into the dermis.' },
      { stepNumber: 3, title: 'Recovery', description: 'Skin enters repair mode, building new collagen over weeks.' },
    ],
    duration: '60–90 minutes', downtime: '24–48 hours redness and mild swelling.',
    aftercare: 'Use prescribed gentle cleanser and moisturizer. No active ingredients for 1 week. SPF daily.',
    faqs: [
      { question: 'How is this different from regular microneedling?', answer: 'RF microneedling delivers radiofrequency energy through the needles, stimulating deeper collagen and providing greater tightening than standard microneedling alone.' },
    ],
    relatedSlugs: ['microneedling', 'hifu', 'skin-tightening'],
    seoTitle: 'Microneedling RF | New Beauty Med Spa Encino',
    seoDescription: 'RF Microneedling for scars, skin tightening and collagen stimulation at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'microneedling rf treatment facial',
  },
  {
    name: 'HIFU',
    slug: 'hifu',
    category: 'face', subcategory: 'injectables',
    intro: 'High-Intensity Focused Ultrasound — a non-invasive, non-surgical treatment that lifts and tightens skin using ultrasound waves.',
    quickInfo: { duration: '60–90 min', bestFor: 'Lifting, tightening, anti-aging', sessions: '1–2 sessions per year' },
    benefits: [
      { title: 'Non-Surgical Lift', description: 'Lifts brows, jowls, and neck without surgery.' },
      { title: 'Collagen Stimulation', description: 'Triggers deep collagen production that lasts months.' },
      { title: 'No Downtime', description: 'Resume normal activities immediately.' },
      { title: 'Long-Lasting', description: 'Results develop over 3 months and last up to 1–2 years.' },
    ],
    candidateDescription: 'Adults with mild to moderate skin laxity who want a non-surgical facelift alternative. Best for ages 30–65.',
    concernTags: ['Jowls', 'Brow Drooping', 'Neck Laxity', 'Nasolabial Folds', 'Loss of Firmness'],
    howItWorks: [
      { stepNumber: 1, title: 'Mapping', description: 'Ultrasound imaging identifies optimal treatment depths.' },
      { stepNumber: 2, title: 'Energy Delivery', description: 'Focused ultrasound energy is delivered to SMAS layer.' },
      { stepNumber: 3, title: 'Collagen Response', description: 'Natural collagen production begins, results appear over 3 months.' },
    ],
    duration: '60–90 minutes', downtime: 'None — slight tenderness 2–3 days',
    aftercare: 'No special aftercare required. SPF daily.',
    faqs: [
      { question: 'Is HIFU painful?', answer: 'Most clients feel mild discomfort during delivery of ultrasound energy. This is completely normal and signals the treatment is working.' },
      { question: 'When will I see results?', answer: 'Initial results appear in 2–4 weeks. Full results develop over 3–6 months.' },
    ],
    relatedSlugs: ['botox', 'skin-tightening', 'microneedling-radio-frequency'],
    seoTitle: 'HIFU Treatment Encino | New Beauty Med Spa',
    seoDescription: 'Non-surgical HIFU face and neck lifting at New Beauty Med Spa, 15622 Ventura Blvd, Encino CA.',
    heroImageQuery: 'hifu ultrasound facial lifting treatment',
  },
  {
    name: 'Exosome Regeneration',
    slug: 'exosome-regeneration',
    category: 'face', subcategory: 'injectables',
    intro: 'Uses exosomes containing growth factors to accelerate tissue regeneration and deliver profound skin rejuvenation.',
    quickInfo: { duration: '60 min', bestFor: 'Rejuvenation, repair, anti-aging', sessions: '3–6 sessions' },
    benefits: [
      { title: 'Growth Factors', description: 'Exosomes deliver concentrated regenerative signals.' },
      { title: 'Deep Repair', description: 'Accelerates cellular turnover and tissue healing.' },
      { title: 'Collagen Boost', description: 'Stimulates natural collagen and elastin production.' },
      { title: 'Minimal Invasiveness', description: 'Far less invasive than PRP with comparable results.' },
    ],
    candidateDescription: 'Clients seeking cutting-edge regenerative treatments for aging skin, scarring, or post-procedure recovery.',
    concernTags: ['Aging Skin', 'Scars', 'Loss of Elasticity', 'Dull Skin'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep', description: 'Skin is cleansed and numbed as needed.' },
      { stepNumber: 2, title: 'Exosome Application', description: 'Growth-factor-rich exosomes are delivered into the skin.' },
      { stepNumber: 3, title: 'Recovery', description: 'Regenerative process continues over weeks.' },
    ],
    duration: '60 minutes', downtime: '24–48 hours mild redness',
    aftercare: 'Gentle skincare only. No sun exposure for 48 hours.',
    faqs: [
      { question: 'What are exosomes?', answer: 'Exosomes are nano-sized vesicles naturally produced by cells that carry growth factors and signaling molecules to stimulate regeneration.' },
    ],
    relatedSlugs: ['vampire-facial', 'microneedling', 'microneedling-radio-frequency'],
    seoTitle: 'Exosome Regeneration Treatment | New Beauty Med Spa Encino',
    seoDescription: 'Advanced exosome skin regeneration with growth factors at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'regeneration facial treatment luxury spa',
  },
  {
    name: 'Dermal Fillers',
    slug: 'dermal-fillers',
    category: 'face', subcategory: 'injectables',
    intro: 'Add volume, smooth wrinkles, and restore youthful contours using hyaluronic acid and other premium fillers.',
    quickInfo: { duration: '30–60 min', bestFor: 'Volume loss, nasolabial folds, lips', sessions: '1 session, repeat every 9–18 months' },
    benefits: [
      { title: 'Instant Volume', description: 'Immediate plumping of treated areas.' },
      { title: 'Wrinkle Smoothing', description: 'Fills nasolabial folds, marionette lines.' },
      { title: 'Natural-Looking', description: 'Administered by trained professionals for natural results.' },
      { title: 'Reversible', description: 'Hyaluronic acid fillers can be dissolved if needed.' },
    ],
    candidateDescription: 'Adults experiencing volume loss, deep folds, or wishing to enhance facial contours. Not suitable during pregnancy.',
    concernTags: ['Nasolabial Folds', 'Marionette Lines', 'Thin Lips', 'Hollow Cheeks', 'Volume Loss'],
    howItWorks: [
      { stepNumber: 1, title: 'Consultation', description: 'Facial analysis and treatment planning.' },
      { stepNumber: 2, title: 'Injection', description: 'Premium filler injected with fine cannula or needle.' },
      { stepNumber: 3, title: 'Instant Results', description: 'Volume and contour visible immediately.' },
    ],
    duration: '30–60 minutes', downtime: 'Mild swelling/bruising 24–72 hours',
    aftercare: 'Avoid alcohol, vigorous exercise, and extreme heat for 24 hours. No facials for 2 weeks.',
    faqs: [
      { question: 'What types of fillers do you use?', answer: 'We use premium hyaluronic acid fillers and select calcium hydroxylapatite-based fillers depending on the treatment area.' },
      { question: 'How long do fillers last?', answer: 'Typically 9–18 months depending on the product and area treated.' },
    ],
    relatedSlugs: ['botox', 'facial-fillers', 'hifu'],
    seoTitle: 'Dermal Fillers Encino | New Beauty Med Spa',
    seoDescription: 'Professional dermal filler injections for volume, contouring and wrinkle correction at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'dermal filler injection facial rejuvenation',
  },
  {
    name: 'Facial Fillers',
    slug: 'facial-fillers',
    category: 'face', subcategory: 'injectables',
    intro: 'Reduces wrinkles and restores lost facial volume, addressing skin sagging caused by aging and muscle changes.',
    quickInfo: { duration: '30–60 min', bestFor: 'Sagging skin, wrinkles, volume', sessions: '1 session, repeat every 12–18 months' },
    benefits: [
      { title: 'Volume Restoration', description: 'Replaces volume lost through natural aging.' },
      { title: 'Wrinkle Correction', description: 'Smooths static and deep wrinkles.' },
      { title: 'Lifting Effect', description: 'Repositions descended facial fat pads.' },
      { title: 'Natural Appearance', description: 'Subtle enhancement preserving natural expression.' },
    ],
    candidateDescription: 'Suitable for adults with static wrinkles, volume loss, or facial sagging who want non-surgical correction.',
    concernTags: ['Sagging Skin', 'Deep Wrinkles', 'Volume Loss', 'Facial Contour'],
    howItWorks: [
      { stepNumber: 1, title: 'Assessment', description: 'Detailed facial mapping identifies optimal injection sites.' },
      { stepNumber: 2, title: 'Treatment', description: 'Filler is precisely placed to restore volume and lift.' },
      { stepNumber: 3, title: 'Refinement', description: 'Contour is assessed and refined for natural results.' },
    ],
    duration: '30–60 minutes', downtime: 'Mild swelling/bruising 24–72 hours',
    aftercare: 'Avoid pressure on treated areas. No extreme temperatures for 24 hours.',
    faqs: [],
    relatedSlugs: ['dermal-fillers', 'botox', 'skin-tightening'],
    seoTitle: 'Facial Fillers Encino | New Beauty Med Spa',
    seoDescription: 'Facial filler treatments to restore volume and reduce wrinkles at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'facial filler treatment beauty spa',
  },

  // ── FACE: SKIN RENEWAL & ADVANCED ───────────────────────────────────
  {
    name: 'Dermaplaning',
    slug: 'dermaplaning',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Uses a sterile surgical scalpel to remove dead skin cells and fine vellus hair, revealing smoother skin.',
    quickInfo: { duration: '30–45 min', bestFor: 'Texture, peach fuzz, dull skin', sessions: 'Monthly' },
    benefits: [
      { title: 'Instant Smoothness', description: 'Removes peach fuzz and dead skin in one pass.' },
      { title: 'Better Absorption', description: 'Serums and products penetrate more effectively.' },
      { title: 'Brighter Complexion', description: 'Removes dull surface layer for instant glow.' },
      { title: 'No Downtime', description: 'Immediate return to activities and makeup.' },
    ],
    candidateDescription: 'All skin types except active acne. Excellent pre-treatment for other facials or events.',
    concernTags: ['Dullness', 'Texture', 'Peach Fuzz', 'Dry Skin'],
    howItWorks: [
      { stepNumber: 1, title: 'Cleanse', description: 'Skin thoroughly cleansed and dried.' },
      { stepNumber: 2, title: 'Blade Treatment', description: 'Sterile scalpel removes dead cells and fine hair.' },
      { stepNumber: 3, title: 'Serum Application', description: 'Nourishing serums applied to freshly exposed skin.' },
    ],
    duration: '30–45 minutes', downtime: 'None',
    aftercare: 'SPF 30+. Avoid retinols for 48 hours. No waxing for 2 weeks.',
    faqs: [
      { question: 'Will hair grow back thicker?', answer: 'No. Dermaplaning removes vellus (peach fuzz) hair. It has no effect on hair follicles and hair grows back the same.' },
    ],
    relatedSlugs: ['hydrafacial', 'chemical-peel', 'microdermabrasion'],
    seoTitle: 'Dermaplaning Treatment Encino | New Beauty Med Spa',
    seoDescription: 'Professional dermaplaning for smooth, glowing skin at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'dermaplaning facial treatment smooth skin',
  },
  {
    name: 'Carbon Laser Peel',
    slug: 'carbon-laser-peel',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A painless, virtually zero-downtime laser treatment targeting oily skin, blackheads, enlarged pores, and dullness.',
    quickInfo: { duration: '30–45 min', bestFor: 'Oily skin, blackheads, pores', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Zero Downtime', description: 'Resume normal activities immediately.' },
      { title: 'Pore Refinement', description: 'Visibly minimizes enlarged pores.' },
      { title: 'Acne Control', description: 'Targets blackheads and acne-causing bacteria.' },
      { title: 'Instant Glow', description: 'Brilliant complexion from the first session.' },
    ],
    candidateDescription: 'Oily, acne-prone, or congested skin types. Suitable for all skin tones.',
    concernTags: ['Oily Skin', 'Blackheads', 'Enlarged Pores', 'Acne', 'Dullness'],
    howItWorks: [
      { stepNumber: 1, title: 'Carbon Application', description: 'Carbon lotion is applied and allowed to dry.' },
      { stepNumber: 2, title: 'Laser Pass', description: 'Q-switched laser vaporizes carbon and debris.' },
      { stepNumber: 3, title: 'Toning Pass', description: 'Second laser pass tightens pores and smooths skin.' },
    ],
    duration: '30–45 minutes', downtime: 'None — mild warmth for a few hours',
    aftercare: 'SPF 30+. Avoid harsh cleansers for 24 hours.',
    faqs: [
      { question: 'Is the laser painful?', answer: 'Most clients feel only a warm, snapping sensation. The treatment causes no significant discomfort.' },
    ],
    relatedSlugs: ['laser-skin-rejuvenation', 'hydrafacial', 'chemical-peel'],
    seoTitle: 'Carbon Laser Peel Encino | New Beauty Med Spa',
    seoDescription: 'Carbon laser peel for oily skin, blackheads, and pore refinement at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'carbon laser peel facial treatment',
  },
  {
    name: 'Advanced Corrective Peel (Jessner Peel)',
    slug: 'advanced-corrective-peel-jessner',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A painless corrective peel with minimal recovery targeting acne, blackheads, enlarged pores, and dullness.',
    quickInfo: { duration: '45 min', bestFor: 'Acne, texture, oily skin', sessions: '4–6 sessions spaced 4 weeks apart' },
    benefits: [
      { title: 'Acne Correction', description: 'Salicylic and lactic acids target acne at its source.' },
      { title: 'Pore Refinement', description: 'Reduces appearance of enlarged pores.' },
      { title: 'Exfoliation', description: 'Multi-acid formula resurfaces skin.' },
      { title: 'Minimal Downtime', description: 'Light peeling only, no significant recovery.' },
    ],
    candidateDescription: 'Acne-prone skin, oily skin, skin with visible texture irregularities. Not for sensitive/reactive skin.',
    concernTags: ['Acne', 'Blackheads', 'Oily Skin', 'Enlarged Pores', 'Dullness'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep', description: 'Skin degreased for maximum penetration.' },
      { stepNumber: 2, title: 'Peel Application', description: 'Jessner solution applied in controlled layers.' },
      { stepNumber: 3, title: 'Neutralization & Post-Care', description: 'Neutralized and soothing mask applied.' },
    ],
    duration: '45 minutes', downtime: '3–5 days light peeling',
    aftercare: 'No picking. Use prescribed gentle cleanser. SPF 50 daily.',
    faqs: [],
    relatedSlugs: ['chemical-peel', 'perfect-derma-peel', 'micropeel-plus-20'],
    seoTitle: 'Jessner Peel Encino | New Beauty Med Spa',
    seoDescription: 'Advanced Corrective Jessner Peel for acne and texture at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'chemical peel facial treatment skincare',
  },
  {
    name: 'Micropeel Plus 20 Solution',
    slug: 'micropeel-plus-20',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Formulated with 20% salicylic acid for effective acne control and pore refinement.',
    quickInfo: { duration: '30–45 min', bestFor: 'Acne, oily skin, pores', sessions: '4 sessions spaced 4 weeks apart' },
    benefits: [
      { title: '20% Salicylic Acid', description: 'Deep pore penetration for acne and blackheads.' },
      { title: 'Oil Control', description: 'Regulates sebum production.' },
      { title: 'Exfoliation', description: 'Removes congestion from pores.' },
      { title: 'Brightening', description: 'Reveals clearer, more even skin.' },
    ],
    candidateDescription: 'Oily, acne-prone skin types. Not suitable for sensitive skin or aspirin allergy.',
    concernTags: ['Acne', 'Oily Skin', 'Blackheads', 'Enlarged Pores'],
    howItWorks: [
      { stepNumber: 1, title: 'Cleanse & Prep', description: 'Skin is degreased for optimal penetration.' },
      { stepNumber: 2, title: 'Peel Application', description: '20% salicylic solution applied for set duration.' },
      { stepNumber: 3, title: 'Neutralize', description: 'Peel neutralized and soothing treatment applied.' },
    ],
    duration: '30–45 minutes', downtime: '2–4 days light flaking',
    aftercare: 'No actives for 1 week. SPF 50 daily. Gentle cleanser only.',
    faqs: [],
    relatedSlugs: ['carbon-laser-peel', 'advanced-corrective-peel-jessner', 'hydrafacial'],
    seoTitle: 'Micropeel Plus 20 Salicylic Peel | New Beauty Med Spa Encino',
    seoDescription: '20% salicylic acid micropeel for acne-prone and oily skin at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'salicylic acid peel acne treatment facial',
  },
  {
    name: 'Perfect Derma Peel',
    slug: 'perfect-derma-peel',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A medium-depth medical grade peel infused with Glutathione antioxidant. Works on all skin types and ethnicities.',
    quickInfo: { duration: '30–45 min', bestFor: 'All skin types, pigmentation, aging', sessions: '2–4 sessions spaced 4 weeks apart' },
    benefits: [
      { title: 'Medical Grade', description: 'Professional-only formula for superior results.' },
      { title: 'Glutathione', description: 'Powerful antioxidant brightens and protects.' },
      { title: 'Universal', description: 'Safe and effective for all skin types and tones.' },
      { title: 'Comprehensive', description: 'Addresses acne, aging, and pigmentation.' },
    ],
    candidateDescription: 'Suitable for all skin types. Excellent for melasma, hyperpigmentation, acne scarring, and aging.',
    concernTags: ['Pigmentation', 'Acne Scars', 'Fine Lines', 'Melasma', 'Dullness'],
    howItWorks: [
      { stepNumber: 1, title: 'Application', description: 'Medical-grade peel solution applied by specialist.' },
      { stepNumber: 2, title: 'Penetration', description: 'Medium-depth penetration targets multiple layers.' },
      { stepNumber: 3, title: 'At-Home Care', description: 'Take-home post-peel kit supports healing.' },
    ],
    duration: '30–45 minutes', downtime: '5–7 days peeling',
    aftercare: 'Use only provided take-home kit. Strict SPF 50+. No sun exposure.',
    faqs: [
      { question: 'Is peeling guaranteed?', answer: 'Most clients experience noticeable peeling from days 3–7. The extent varies by individual skin type.' },
    ],
    relatedSlugs: ['advanced-corrective-peel-jessner', 'pigment-balancing-peel', 'chemical-peel'],
    seoTitle: 'Perfect Derma Peel Encino | New Beauty Med Spa',
    seoDescription: 'Medical-grade Perfect Derma Peel with Glutathione for all skin types at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'medical peel facial treatment luxury',
  },
  {
    name: 'Pigment Balancing Peel',
    slug: 'pigment-balancing-peel',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Formulated with 40% Glycolic Acid by SkinCeuticals to reduce hyperpigmentation and photo-damage.',
    quickInfo: { duration: '30–45 min', bestFor: 'Hyperpigmentation, sun damage', sessions: '4 sessions spaced 4 weeks apart' },
    benefits: [
      { title: '40% Glycolic Acid', description: 'High-potency AHA for deep exfoliation.' },
      { title: 'Pigment Reduction', description: 'Fades stubborn hyperpigmentation and melasma.' },
      { title: 'SkinCeuticals Formula', description: 'Trusted medical-grade brand.' },
      { title: 'Resurfacing', description: 'Reveals brighter, more even-toned skin.' },
    ],
    candidateDescription: 'Clients with hyperpigmentation, sun damage, uneven skin tone, or melasma. Fitzpatrick I–IV.',
    concernTags: ['Hyperpigmentation', 'Sun Damage', 'Melasma', 'Uneven Tone'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep', description: 'Skin degreased and pH balanced.' },
      { stepNumber: 2, title: 'Glycolic Application', description: '40% glycolic acid applied for precise duration.' },
      { stepNumber: 3, title: 'Neutralize & Calm', description: 'Neutralized and brightening mask applied.' },
    ],
    duration: '30–45 minutes', downtime: '3–5 days light peeling',
    aftercare: 'SPF 50+ essential. No vitamin A products for 1 week.',
    faqs: [],
    relatedSlugs: ['brightening-facial-for-hyper-pigmented-skin', 'perfect-derma-peel', 'vitamin-c-signature-facial'],
    seoTitle: 'Pigment Balancing Peel | New Beauty Med Spa Encino',
    seoDescription: 'SkinCeuticals 40% Glycolic Acid peel for hyperpigmentation and sun damage at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'glycolic acid peel brightening skincare',
  },
  {
    name: 'BB Glow Nano-Needling',
    slug: 'bb-glow-nano-needling',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Addresses hyperpigmentation, redness, dark circles, and enlarged pores while stimulating collagen production.',
    quickInfo: { duration: '60 min', bestFor: 'Pigmentation, redness, pores', sessions: '3–6 sessions' },
    benefits: [
      { title: 'Instant Glow', description: 'BB serum delivers an immediate luminous finish.' },
      { title: 'Collagen Stimulation', description: 'Nano-needling triggers natural collagen production.' },
      { title: 'Pore Refinement', description: 'Visibly reduces enlarged pores.' },
      { title: 'Color Correction', description: 'Evens out hyperpigmentation and redness.' },
    ],
    candidateDescription: 'Suitable for all skin types seeking a no-makeup glow with long-term skin benefits.',
    concernTags: ['Hyperpigmentation', 'Redness', 'Dark Circles', 'Enlarged Pores', 'Dullness'],
    howItWorks: [
      { stepNumber: 1, title: 'Nano-Needling', description: 'Nano-needles create micro-channels in the skin.' },
      { stepNumber: 2, title: 'BB Serum Infusion', description: 'Tinted serum is driven deep for color correction.' },
      { stepNumber: 3, title: 'Collagen Activation', description: 'Healing response stimulates collagen production.' },
    ],
    duration: '60 minutes', downtime: 'Minimal — 24 hours mild redness',
    aftercare: 'Avoid makeup for 24 hours. Gentle cleanser only.',
    faqs: [],
    relatedSlugs: ['microneedling', 'brightening-facial-for-hyper-pigmented-skin', 'hydrafacial'],
    seoTitle: 'BB Glow Nano-Needling | New Beauty Med Spa Encino',
    seoDescription: 'BB Glow nano-needling for instant radiance and pigmentation correction at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'bb glow nano needling facial glow',
  },
  {
    name: 'Microneedling',
    slug: 'microneedling',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A minimally invasive procedure using fine needles to trigger the skin\'s natural healing and collagen production.',
    quickInfo: { duration: '60–75 min', bestFor: 'Scars, texture, fine lines', sessions: '3–6 sessions' },
    benefits: [
      { title: 'Collagen Induction', description: 'Micro-injuries trigger natural collagen and elastin.' },
      { title: 'Scar Improvement', description: 'Visibly reduces acne scars and stretch marks.' },
      { title: 'Fine Line Reduction', description: 'Smoother, younger-looking skin.' },
      { title: 'Pore Refinement', description: 'Minimizes enlarged pores.' },
    ],
    candidateDescription: 'Suitable for acne scars, fine lines, uneven texture, and mild skin laxity. Not for active acne.',
    concernTags: ['Acne Scars', 'Fine Lines', 'Texture', 'Enlarged Pores', 'Stretch Marks'],
    howItWorks: [
      { stepNumber: 1, title: 'Numbing', description: 'Topical anaesthetic applied 30–45 minutes before.' },
      { stepNumber: 2, title: 'Needling', description: 'Fine-tipped device creates controlled micro-channels.' },
      { stepNumber: 3, title: 'Recovery', description: 'Healing response builds new collagen over weeks.' },
    ],
    duration: '60–75 minutes', downtime: '24–48 hours redness',
    aftercare: 'Gentle cleanser and moisturizer only for 1 week. SPF daily.',
    faqs: [],
    relatedSlugs: ['microneedling-radio-frequency', 'vampire-facial', 'exosome-regeneration'],
    seoTitle: 'Microneedling Encino | New Beauty Med Spa',
    seoDescription: 'Professional microneedling for scars, texture, and anti-aging at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'microneedling facial treatment collagen',
  },
  {
    name: 'HydraFacial',
    slug: 'hydrafacial',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A multi-step patented facial that cleanses, extracts, and hydrates while infusing antioxidants, peptides, and hyaluronic acid.',
    quickInfo: { duration: '45–60 min', bestFor: 'All skin types, dehydration, dullness', sessions: 'Monthly' },
    benefits: [
      { title: 'Instant Results', description: 'Visibly improved skin from the first session.' },
      { title: 'Deep Cleanse', description: 'Vortex technology removes debris painlessly.' },
      { title: 'Hydration', description: 'Hyaluronic acid and peptides deeply hydrate.' },
      { title: 'Customizable', description: 'Boosters added to address specific concerns.' },
    ],
    candidateDescription: 'All skin types. One of the most versatile facials for any skin concern.',
    concernTags: ['Dehydration', 'Dullness', 'Fine Lines', 'Acne', 'Blackheads', 'Texture'],
    howItWorks: [
      { stepNumber: 1, title: 'Cleanse & Peel', description: 'Exfoliating tip removes dead skin.' },
      { stepNumber: 2, title: 'Extract & Hydrate', description: 'Vortex extracts debris while infusing serums.' },
      { stepNumber: 3, title: 'Fuse & Protect', description: 'Antioxidants and peptides seal in results.' },
    ],
    duration: '45–60 minutes', downtime: 'None',
    aftercare: 'SPF 30+. Avoid heavy makeup for 4 hours.',
    faqs: [
      { question: 'Is HydraFacial suitable for sensitive skin?', answer: 'Yes. The HydraFacial is gentle enough for even the most sensitive skin types.' },
    ],
    relatedSlugs: ['rf-aqua-facial-lift', 'dermaplaning', 'microdermabrasion'],
    seoTitle: 'HydraFacial Encino | New Beauty Med Spa',
    seoDescription: 'Award-winning HydraFacial treatments for all skin types at New Beauty Med Spa, 15622 Ventura Blvd, Encino CA.',
    heroImageQuery: 'hydrafacial treatment luxury spa woman',
  },
  {
    name: 'Microdermabrasion',
    slug: 'microdermabrasion',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A non-invasive exfoliation procedure using crystals or diamond-tip technology to reveal smoother, brighter skin with zero downtime.',
    quickInfo: { duration: '45 min', bestFor: 'Texture, dullness, fine lines', sessions: 'Monthly' },
    benefits: [
      { title: 'No Downtime', description: 'Resume activities and makeup immediately.' },
      { title: 'Instant Brightness', description: 'Removes dull surface layer instantly.' },
      { title: 'Fine Line Reduction', description: 'Gradual improvement with each session.' },
      { title: 'Pore Refinement', description: 'Clears congestion and tightens pores.' },
    ],
    candidateDescription: 'All skin types except active rosacea or open acne. Great first treatment for new clients.',
    concernTags: ['Dullness', 'Texture', 'Fine Lines', 'Enlarged Pores'],
    howItWorks: [
      { stepNumber: 1, title: 'Crystal/Diamond Exfoliation', description: 'Handpiece removes dead skin cells.' },
      { stepNumber: 2, title: 'Suction', description: 'Vacuum removes exfoliated debris simultaneously.' },
      { stepNumber: 3, title: 'Serum Application', description: 'Nourishing serums applied to fresh skin.' },
    ],
    duration: '45 minutes', downtime: 'None',
    aftercare: 'SPF 30+. Gentle moisturizer.',
    faqs: [],
    relatedSlugs: ['hydrafacial', 'dermaplaning', 'chemical-peel'],
    seoTitle: 'Microdermabrasion Encino | New Beauty Med Spa',
    seoDescription: 'Professional microdermabrasion for smooth, bright skin at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'microdermabrasion facial treatment skin',
  },
  {
    name: 'PRX Derm Perfexion',
    slug: 'prx-derm-perfexion',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A no-downtime regenerative treatment using TCA, hydrogen peroxide, and kojic acid — deeply effective without peeling.',
    quickInfo: { duration: '45 min', bestFor: 'Anti-aging, dullness, all skin types', sessions: '4–6 sessions' },
    benefits: [
      { title: 'No Peeling', description: 'TCA stimulates deep collagen without surface peeling.' },
      { title: 'Brightening', description: 'Kojic acid fades dark spots.' },
      { title: 'Collagen Boost', description: 'Triggers deep dermal remodeling.' },
      { title: 'Zero Downtime', description: 'Immediate return to normal activities.' },
    ],
    candidateDescription: 'All skin types including darker tones. Excellent for those who cannot afford downtime.',
    concernTags: ['Dullness', 'Fine Lines', 'Pigmentation', 'Loss of Elasticity'],
    howItWorks: [
      { stepNumber: 1, title: 'Application', description: 'PRX serum massaged into cleansed skin.' },
      { stepNumber: 2, title: 'Activation', description: 'TCA and H2O2 work synergistically without penetrating superficially.' },
      { stepNumber: 3, title: 'Neutralization', description: 'Neutralized and WGF booster applied.' },
    ],
    duration: '45 minutes', downtime: 'None',
    aftercare: 'Use prescribed W-GSF booster. SPF 50 daily.',
    faqs: [],
    relatedSlugs: ['perfect-derma-peel', 'chemical-peel', 'microneedling'],
    seoTitle: 'PRX Derm Perfexion | New Beauty Med Spa Encino',
    seoDescription: 'PRX Derm Perfexion no-downtime regenerative treatment at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'prx treatment facial rejuvenation luxury',
  },
  {
    name: 'Chemical Peel',
    slug: 'chemical-peel',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Removes the outer layer of skin to reveal a smoother, brighter complexion. Available in superficial, medium, and deep strengths.',
    quickInfo: { duration: '30–60 min', bestFor: 'Texture, aging, pigmentation', sessions: '1–6 sessions' },
    benefits: [
      { title: 'Customizable Depth', description: 'Superficial, medium or deep options.' },
      { title: 'Resurfacing', description: 'Removes damaged surface cells.' },
      { title: 'Anti-Aging', description: 'Reduces fine lines and wrinkles.' },
      { title: 'Brightening', description: 'Evens tone and fades pigmentation.' },
    ],
    candidateDescription: 'Most skin types depending on peel strength chosen. Consultation required for deeper peels.',
    concernTags: ['Texture', 'Fine Lines', 'Pigmentation', 'Sun Damage', 'Acne'],
    howItWorks: [
      { stepNumber: 1, title: 'Consultation', description: 'Skin assessed to determine appropriate peel depth.' },
      { stepNumber: 2, title: 'Application', description: 'Peel solution applied for precise duration.' },
      { stepNumber: 3, title: 'Post-Care', description: 'Neutralized and aftercare protocol initiated.' },
    ],
    duration: '30–60 minutes', downtime: '2–7 days depending on depth',
    aftercare: 'No picking. SPF 50 essential. Prescribed gentle skincare only.',
    faqs: [],
    relatedSlugs: ['perfect-derma-peel', 'advanced-corrective-peel-jessner', 'pigment-balancing-peel'],
    seoTitle: 'Chemical Peel Encino | New Beauty Med Spa',
    seoDescription: 'Professional chemical peels for texture, pigmentation and anti-aging at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'chemical peel facial treatment spa',
  },
  {
    name: 'LED Facial Treatment',
    slug: 'led-facial-treatment',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Uses specific wavelengths of light — red, blue, and green — to target different skin concerns from anti-aging to acne.',
    quickInfo: { duration: '30–45 min', bestFor: 'Acne, anti-aging, pigmentation', sessions: '6–10 sessions' },
    benefits: [
      { title: 'Red Light', description: 'Boosts collagen and reduces fine lines.' },
      { title: 'Blue Light', description: 'Kills acne-causing bacteria.' },
      { title: 'Green Light', description: 'Targets hyperpigmentation.' },
      { title: 'Pain-Free', description: 'Completely non-invasive and relaxing.' },
    ],
    candidateDescription: 'All skin types. Can be combined with any other treatment as an add-on.',
    concernTags: ['Acne', 'Fine Lines', 'Hyperpigmentation', 'Redness', 'Inflammation'],
    howItWorks: [
      { stepNumber: 1, title: 'Wavelength Selection', description: 'Appropriate light frequency selected for concern.' },
      { stepNumber: 2, title: 'LED Exposure', description: 'Panel or wand delivers light for 20–30 minutes.' },
      { stepNumber: 3, title: 'Cellular Response', description: 'Photobiomodulation stimulates cellular repair.' },
    ],
    duration: '30–45 minutes', downtime: 'None',
    aftercare: 'No special aftercare required.',
    faqs: [],
    relatedSlugs: ['led-light-therapy', 'hydrafacial', 'vampire-facial'],
    seoTitle: 'LED Facial Treatment Encino | New Beauty Med Spa',
    seoDescription: 'LED light facial for acne, anti-aging and pigmentation at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'led light facial treatment spa',
  },
  {
    name: 'Vampire Facial',
    slug: 'vampire-facial',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Also known as the PRP Facial — uses your own platelet-rich plasma to rejuvenate skin via microneedling.',
    quickInfo: { duration: '75–90 min', bestFor: 'Anti-aging, scars, dullness', sessions: '3–4 sessions' },
    benefits: [
      { title: 'Autologous', description: 'Uses your own plasma — 100% natural.' },
      { title: 'Growth Factors', description: 'PRP stimulates collagen and cellular repair.' },
      { title: 'Minimal Downtime', description: 'Resume activities within 24–48 hours.' },
      { title: 'Natural Results', description: 'Gradual, natural-looking improvements.' },
    ],
    candidateDescription: 'Clients seeking natural rejuvenation using their own biology. Suitable for aging skin, scars, and hair regrowth.',
    concernTags: ['Fine Lines', 'Acne Scars', 'Dullness', 'Loss of Firmness'],
    howItWorks: [
      { stepNumber: 1, title: 'Blood Draw', description: 'Small blood sample taken from your arm.' },
      { stepNumber: 2, title: 'PRP Preparation', description: 'Centrifuge isolates platelet-rich plasma.' },
      { stepNumber: 3, title: 'Microneedling Infusion', description: 'PRP injected and microneedled into skin.' },
    ],
    duration: '75–90 minutes', downtime: '24–48 hours redness and mild swelling',
    aftercare: 'Gentle cleanser only for 48 hours. Avoid actives for 1 week.',
    faqs: [],
    relatedSlugs: ['microneedling', 'exosome-regeneration', 'microneedling-radio-frequency'],
    seoTitle: 'Vampire Facial PRP Treatment | New Beauty Med Spa Encino',
    seoDescription: 'Platelet-Rich Plasma vampire facial for natural rejuvenation at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'prp vampire facial treatment spa',
  },
  {
    name: 'Skin Tightening',
    slug: 'skin-tightening',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A non-surgical procedure to improve loose, sagging skin using RF, ultrasound, or laser energy.',
    quickInfo: { duration: '45–60 min', bestFor: 'Sagging skin, jowls, neck laxity', sessions: '3–6 sessions' },
    benefits: [
      { title: 'Non-Surgical', description: 'No incisions, no anesthesia, no surgery.' },
      { title: 'Collagen Stimulation', description: 'Triggers natural collagen remodeling.' },
      { title: 'Lifting Effect', description: 'Firms sagging areas of face and neck.' },
      { title: 'No Downtime', description: 'Return to normal activities immediately.' },
    ],
    candidateDescription: 'Adults with mild to moderate skin laxity on face, neck, or body.',
    concernTags: ['Sagging Skin', 'Jowls', 'Neck Laxity', 'Loss of Firmness'],
    howItWorks: [
      { stepNumber: 1, title: 'Energy Application', description: 'RF, ultrasound or laser energy heats dermis.' },
      { stepNumber: 2, title: 'Collagen Response', description: 'Controlled heat triggers collagen contraction.' },
      { stepNumber: 3, title: 'Remodeling', description: 'New collagen forms over weeks for lasting results.' },
    ],
    duration: '45–60 minutes', downtime: 'None to minimal',
    aftercare: 'SPF 30+. Stay hydrated.',
    faqs: [],
    relatedSlugs: ['hifu', 'microneedling-radio-frequency', 'rf-aqua-facial-lift'],
    seoTitle: 'Skin Tightening Encino | New Beauty Med Spa',
    seoDescription: 'Non-surgical skin tightening with RF, ultrasound and laser at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'skin tightening rf treatment facial',
  },
  {
    name: 'LED Light Therapy',
    slug: 'led-light-therapy',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'A non-invasive method using light wavelengths to treat acne, stimulate collagen, and promote skin health.',
    quickInfo: { duration: '20–30 min', bestFor: 'Acne, inflammation, anti-aging', sessions: '8–10 sessions' },
    benefits: [
      { title: 'Photobiomodulation', description: 'Light energy triggers cellular repair.' },
      { title: 'Acne Reduction', description: 'Blue light destroys acne-causing bacteria.' },
      { title: 'Anti-Aging', description: 'Red light stimulates collagen production.' },
      { title: 'Pain-Free', description: 'No heat, no needles, no discomfort.' },
    ],
    candidateDescription: 'All skin types. Excellent as a standalone or add-on to any facial treatment.',
    concernTags: ['Acne', 'Inflammation', 'Fine Lines', 'Redness'],
    howItWorks: [
      { stepNumber: 1, title: 'Color Selection', description: 'Red, blue or combination light selected.' },
      { stepNumber: 2, title: 'Exposure', description: 'Skin exposed to LED panel for 20–30 minutes.' },
      { stepNumber: 3, title: 'Cellular Activation', description: 'Light energy absorbed by skin cells.' },
    ],
    duration: '20–30 minutes', downtime: 'None',
    aftercare: 'No special aftercare required. Apply moisturizer and SPF.',
    faqs: [],
    relatedSlugs: ['led-facial-treatment', 'me-beauty-for-teens', 'high-frequency-facial'],
    seoTitle: 'LED Light Therapy Encino | New Beauty Med Spa',
    seoDescription: 'Professional LED light therapy for acne, anti-aging and skin health at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'led light therapy facial spa relaxing',
  },
  {
    name: 'Laser Skin Rejuvenation',
    slug: 'laser-skin-rejuvenation',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Uses Q-Switched laser technology to lighten scars, sun spots, and vascular lesions effectively.',
    quickInfo: { duration: '30–45 min', bestFor: 'Scars, sun spots, pigmentation', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Q-Switch Precision', description: 'Ultra-precise laser targets pigment without damage.' },
      { title: 'Scar Lightening', description: 'Significantly improves surgical and acne scars.' },
      { title: 'Sun Spot Removal', description: 'Fades stubborn age and sun spots.' },
      { title: 'Even Tone', description: 'Delivers noticeably more uniform complexion.' },
    ],
    candidateDescription: 'Clients with sun spots, acne scars, surgical scars, or vascular lesions. Suitable for Fitzpatrick I–IV.',
    concernTags: ['Sun Spots', 'Acne Scars', 'Pigmentation', 'Vascular Lesions'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep', description: 'Skin cleansed and goggles applied.' },
      { stepNumber: 2, title: 'Laser Treatment', description: 'Q-switched laser targets pigmented areas.' },
      { stepNumber: 3, title: 'Cooling', description: 'Cooling gel applied to calm the skin.' },
    ],
    duration: '30–45 minutes', downtime: '2–5 days mild redness and darkening of spots before they fade',
    aftercare: 'SPF 50+ essential. Avoid sun. No picking treated areas.',
    faqs: [],
    relatedSlugs: ['carbon-laser-peel', 'pigment-balancing-peel', 'brightening-facial-for-hyper-pigmented-skin'],
    seoTitle: 'Laser Skin Rejuvenation Encino | New Beauty Med Spa',
    seoDescription: 'Q-switched laser treatment for scars, sun spots and pigmentation at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'laser skin treatment rejuvenation spa',
  },
  {
    name: 'High-Frequency Facial',
    slug: 'high-frequency-facial',
    category: 'face', subcategory: 'skin-renewal',
    intro: 'Uses mild electrical current oscillating up to 250,000 times per second to stimulate skin, increase circulation, and heal acne.',
    quickInfo: { duration: '45–60 min', bestFor: 'Acne, oily skin, circulation', sessions: '6–8 sessions' },
    benefits: [
      { title: 'Bacteria Elimination', description: 'Ozone produced kills acne-causing bacteria.' },
      { title: 'Circulation Boost', description: 'Increased blood flow improves skin tone.' },
      { title: 'Oxygenation', description: 'Enhanced oxygen delivery revitalizes skin.' },
      { title: 'Healing', description: 'Accelerates healing of blemishes.' },
    ],
    candidateDescription: 'Acne-prone, oily, and congested skin. Not for pacemaker users or during pregnancy.',
    concernTags: ['Acne', 'Oily Skin', 'Dull Skin', 'Blemishes'],
    howItWorks: [
      { stepNumber: 1, title: 'Electrode Application', description: 'Glass electrode filled with argon or neon applied.' },
      { stepNumber: 2, title: 'Current Treatment', description: 'Gentle electrical current applied over face.' },
      { stepNumber: 3, title: 'Ozone Production', description: 'Current produces germicidal ozone on skin surface.' },
    ],
    duration: '45–60 minutes', downtime: 'None',
    aftercare: 'Gentle cleanser. No makeup for 2 hours.',
    faqs: [],
    relatedSlugs: ['me-beauty-for-teens', 'carbon-laser-peel', 'led-facial-treatment'],
    seoTitle: 'High-Frequency Facial Encino | New Beauty Med Spa',
    seoDescription: 'High-frequency facial for acne, oily skin and improved circulation at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'high frequency facial treatment spa',
  },

  // ── FACE: OTHER ──────────────────────────────────────────────────────
  {
    name: 'Eyelash and Brow Tinting',
    slug: 'eyelash-and-brow-tinting',
    category: 'face', subcategory: 'other',
    intro: 'Transform your look in just 15 minutes. Semi-permanent tint defines brows and lashes with results lasting 3–6 weeks.',
    quickInfo: { duration: '15–30 min', bestFor: 'Light or sparse brows and lashes', sessions: 'Every 4–6 weeks' },
    benefits: [
      { title: 'Instant Definition', description: 'Brows and lashes look fuller and more defined.' },
      { title: 'Long-Lasting', description: 'Results last 3–6 weeks.' },
      { title: 'No Maintenance', description: 'No daily mascara or brow pencil needed.' },
      { title: 'Quick Service', description: 'Full service completed in 15–30 minutes.' },
    ],
    candidateDescription: 'Clients with light, sparse, or hard-to-see brows and lashes wanting low-maintenance enhancement.',
    concernTags: ['Sparse Brows', 'Light Lashes', 'Brow Definition'],
    howItWorks: [
      { stepNumber: 1, title: 'Shade Selection', description: 'Color matched to hair and skin tone.' },
      { stepNumber: 2, title: 'Tint Application', description: 'Protective barrier applied. Tint left for 10–15 minutes.' },
      { stepNumber: 3, title: 'Remove & Reveal', description: 'Tint removed to reveal defined, natural-looking results.' },
    ],
    duration: '15–30 minutes', downtime: 'None',
    aftercare: 'Avoid water on brows and lashes for 24 hours.',
    faqs: [],
    relatedSlugs: ['me-beauty-pre-event-facial'],
    seoTitle: 'Lash & Brow Tinting Encino | New Beauty Med Spa',
    seoDescription: 'Professional eyelash and eyebrow tinting service at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'eyebrow tinting lash beauty salon',
  },
  {
    name: 'Teeth Whitening',
    slug: 'teeth-whitening',
    category: 'face', subcategory: 'other',
    intro: 'Professional teeth whitening that lightens your existing color without causing damage to enamel.',
    quickInfo: { duration: '60 min', bestFor: 'Stained or yellowed teeth', sessions: '1–3 sessions' },
    benefits: [
      { title: 'Safe Whitening', description: 'Lightens without damaging enamel.' },
      { title: 'Professional Strength', description: 'More effective than over-the-counter products.' },
      { title: 'Instant Results', description: 'Visibly whiter teeth in one session.' },
      { title: 'Confidence Boost', description: 'A brighter smile transforms your appearance.' },
    ],
    candidateDescription: 'Adults with stained, yellowed, or discolored teeth. Not for those with veneers or severe sensitivity.',
    concernTags: ['Tooth Staining', 'Yellowing', 'Dullness'],
    howItWorks: [
      { stepNumber: 1, title: 'Prep', description: 'Gums protected with barrier gel.' },
      { stepNumber: 2, title: 'Whitening Gel', description: 'Professional whitening gel applied to teeth.' },
      { stepNumber: 3, title: 'Activation', description: 'LED light activates gel for maximum whitening.' },
    ],
    duration: '60 minutes', downtime: 'None',
    aftercare: 'Avoid staining foods and drinks for 48 hours. No smoking.',
    faqs: [],
    relatedSlugs: ['me-beauty-pre-event-facial'],
    seoTitle: 'Teeth Whitening Encino | New Beauty Med Spa',
    seoDescription: 'Professional LED teeth whitening at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'teeth whitening smile bright beauty',
  },

  // ── BODY ─────────────────────────────────────────────────────────────
  {
    name: 'Cryo Fat Freezing',
    slug: 'cryo-fat-freezing',
    category: 'body', subcategory: 'body',
    intro: 'Non-invasive cryolipolysis that uses extreme cold to freeze and permanently destroy stubborn fat cells.',
    quickInfo: { duration: '60 min per area', bestFor: 'Stubborn fat pockets', sessions: '2–4 sessions per area' },
    benefits: [
      { title: 'Fat Cell Destruction', description: 'Frozen fat cells are naturally eliminated.' },
      { title: 'Non-Surgical', description: 'No incisions, no anesthesia, no recovery.' },
      { title: 'Targeted', description: 'Precisely targets specific fat deposits.' },
      { title: 'Lasting Results', description: 'Treated fat cells do not return.' },
    ],
    candidateDescription: 'Adults at or near their goal weight with localized fat resistant to diet and exercise.',
    concernTags: ['Stubborn Fat', 'Love Handles', 'Belly Fat', 'Inner Thighs', 'Back Fat'],
    howItWorks: [
      { stepNumber: 1, title: 'Applicator Placement', description: 'Gel pad and applicator applied to target area.' },
      { stepNumber: 2, title: 'Controlled Cooling', description: 'Fat layer cooled to crystallization temperature.' },
      { stepNumber: 3, title: 'Natural Elimination', description: 'Body processes and removes dead fat cells over weeks.' },
    ],
    duration: '60 minutes per area', downtime: 'None — temporary numbness or redness',
    aftercare: 'Massage treated area. Maintain hydration and healthy diet.',
    faqs: [
      { question: 'When will I see results?', answer: 'Results are visible from 4–8 weeks, with full results at 3–4 months.' },
    ],
    relatedSlugs: ['coolsculpting', 'lipo-cavitation', 'body-sculpting'],
    seoTitle: 'Cryo Fat Freezing Encino | New Beauty Med Spa',
    seoDescription: 'Non-invasive fat freezing (cryolipolysis) for stubborn fat at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'cryolipolysis fat freezing body treatment',
  },
  {
    name: 'Lipo Cavitation',
    slug: 'lipo-cavitation',
    category: 'body', subcategory: 'body',
    intro: 'Non-invasive ultrasound cavitation that targets and breaks down stubborn fat deposits without surgery.',
    quickInfo: { duration: '45–60 min', bestFor: 'Fat reduction, body contouring', sessions: '6–12 sessions' },
    benefits: [
      { title: 'Ultrasound Precision', description: 'Targets fat cells without affecting surrounding tissue.' },
      { title: 'Inch Loss', description: 'Visible measurement reduction after each session.' },
      { title: 'Cellulite Reduction', description: 'Improves skin texture over treated areas.' },
      { title: 'No Downtime', description: 'Resume normal activities immediately.' },
    ],
    candidateDescription: 'Adults with localized fat deposits, cellulite, or mild body contouring goals.',
    concernTags: ['Belly Fat', 'Thigh Fat', 'Cellulite', 'Love Handles', 'Arm Fat'],
    howItWorks: [
      { stepNumber: 1, title: 'Gel Application', description: 'Ultrasound gel applied to treatment area.' },
      { stepNumber: 2, title: 'Cavitation', description: 'Ultrasound waves create bubbles that rupture fat cells.' },
      { stepNumber: 3, title: 'Lymphatic Drainage', description: 'Released fat processed by the lymphatic system.' },
    ],
    duration: '45–60 minutes', downtime: 'None',
    aftercare: 'Drink 2L water. Avoid alcohol for 24 hours. Light exercise recommended.',
    faqs: [],
    relatedSlugs: ['body-sculpting', 'cryo-fat-freezing', 'ems-sculpting'],
    seoTitle: 'Lipo Cavitation Encino | New Beauty Med Spa',
    seoDescription: 'Ultrasound lipo cavitation for fat reduction and body contouring at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'ultrasound cavitation body contouring treatment',
  },
  {
    name: 'EMS Sculpting',
    slug: 'ems-sculpting',
    category: 'body', subcategory: 'body',
    intro: 'Uses high-intensity electromagnetic technology to simultaneously eliminate fat cells and build muscle in abs, thighs, calves, and buttocks.',
    quickInfo: { duration: '30 min per area', bestFor: 'Muscle building + fat reduction', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Dual Action', description: 'Burns fat and builds muscle simultaneously.' },
      { title: 'Equivalent to 20,000 Sit-Ups', description: 'Each session delivers intense muscle contractions.' },
      { title: 'Non-Invasive', description: 'No surgery, no downtime.' },
      { title: 'Targeted Sculpting', description: 'Build abs, lift buttocks, tone thighs.' },
    ],
    candidateDescription: 'Adults wanting to improve muscle tone and reduce fat in targeted areas. Good for those near their goal weight.',
    concernTags: ['Loose Abs', 'Flat Buttocks', 'Weak Core', 'Thigh Definition'],
    howItWorks: [
      { stepNumber: 1, title: 'Pad Placement', description: 'EMS applicators placed on target muscle group.' },
      { stepNumber: 2, title: 'Electromagnetic Pulses', description: 'Supramaximal contractions triggered in muscle.' },
      { stepNumber: 3, title: 'Fat Reduction', description: 'Fatty acids released during intense contractions and metabolized.' },
    ],
    duration: '30 minutes per area', downtime: 'None — muscle soreness like exercise',
    aftercare: 'Stay hydrated. Light protein-rich meals recommended.',
    faqs: [],
    relatedSlugs: ['coolsculpting', 'body-sculpting', 'vanquish'],
    seoTitle: 'EMS Sculpting Encino | New Beauty Med Spa',
    seoDescription: 'EMS electromagnetic body sculpting for muscle toning and fat reduction at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'ems sculpting electromagnetic body treatment',
  },
  {
    name: 'CoolSculpting',
    slug: 'coolsculpting',
    category: 'body', subcategory: 'body',
    intro: 'The world\'s leading non-invasive fat reduction treatment. Freezes resistant fat cells that the body naturally eliminates over months.',
    quickInfo: { duration: '35–60 min per area', bestFor: 'Stubborn fat, body contouring', sessions: '1–3 sessions per area' },
    benefits: [
      { title: 'FDA-Cleared', description: 'The most studied non-invasive fat reduction available.' },
      { title: 'Permanent Fat Removal', description: 'Treated fat cells do not regenerate.' },
      { title: 'No Surgery', description: 'Zero downtime, no anesthesia.' },
      { title: 'Natural Results', description: 'Body gradually processes eliminated fat over 4–6 months.' },
    ],
    candidateDescription: 'Adults at a stable weight with pinchable fat in specific areas.',
    concernTags: ['Stubborn Fat', 'Belly', 'Love Handles', 'Inner Thighs', 'Double Chin'],
    howItWorks: [
      { stepNumber: 1, title: 'Applicator Selection', description: 'Size and shape matched to target area.' },
      { stepNumber: 2, title: 'Controlled Cooling', description: 'CoolSculpting cools fat to trigger apoptosis.' },
      { stepNumber: 3, title: 'Elimination', description: 'Dead fat cells naturally eliminated over 4–6 months.' },
    ],
    duration: '35–60 minutes per area', downtime: 'None — temporary numbness, redness, bruising normal',
    aftercare: 'Post-treatment massage recommended. Maintain healthy lifestyle.',
    faqs: [
      { question: 'Is CoolSculpting the same as cryolipolysis?', answer: 'Yes. CoolSculpting is the brand name for the FDA-cleared cryolipolysis procedure.' },
    ],
    relatedSlugs: ['cryo-fat-freezing', 'lipo-cavitation', 'ems-sculpting'],
    seoTitle: 'CoolSculpting Encino | New Beauty Med Spa',
    seoDescription: 'FDA-cleared CoolSculpting non-invasive fat reduction at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'coolsculpting body fat reduction treatment',
  },
  {
    name: 'RF Aqua Body Rejuvenation',
    slug: 'rf-aqua-body-rejuvenation',
    category: 'body', subcategory: 'body',
    intro: 'A hydradermabrasion body treatment combining cleansing, exfoliation, extraction, hydration, and antioxidant protection in one session.',
    quickInfo: { duration: '60–90 min', bestFor: 'Skin texture, dryness, body rejuvenation', sessions: 'Monthly' },
    benefits: [
      { title: 'Multi-Action', description: '5-in-1: cleanse, exfoliate, extract, hydrate, protect.' },
      { title: 'Body Hydration', description: 'Deep hydration for dry, rough body skin.' },
      { title: 'RF Tightening', description: 'Firms and tones treated areas.' },
      { title: 'No Downtime', description: 'Return to normal activities immediately.' },
    ],
    candidateDescription: 'All body types seeking smoother, hydrated, more youthful-looking body skin.',
    concernTags: ['Dry Skin', 'Rough Texture', 'Body Dullness', 'Loose Skin'],
    howItWorks: [
      { stepNumber: 1, title: 'Aqua Cleanse', description: 'Vortex technology removes surface impurities.' },
      { stepNumber: 2, title: 'Hydration Infusion', description: 'Serums infused into freshly cleansed skin.' },
      { stepNumber: 3, title: 'RF Tightening', description: 'Radiofrequency energy firms and tones.' },
    ],
    duration: '60–90 minutes', downtime: 'None',
    aftercare: 'Moisturize daily. SPF on exposed areas.',
    faqs: [],
    relatedSlugs: ['body-sculpting', 'exilis', 'vanquish'],
    seoTitle: 'RF Aqua Body Rejuvenation | New Beauty Med Spa Encino',
    seoDescription: 'Hydradermabrasion body rejuvenation with RF tightening at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'body hydration rejuvenation spa treatment',
  },
  {
    name: 'Body Sculpting',
    slug: 'body-sculpting',
    category: 'body', subcategory: 'body',
    intro: 'Non-invasive body contouring targeting areas resistant to diet and exercise — stomach, hips, and thighs.',
    quickInfo: { duration: '45–60 min', bestFor: 'Fat reduction, contouring', sessions: '6–12 sessions' },
    benefits: [
      { title: 'Non-Invasive', description: 'No surgery, no needles, no recovery.' },
      { title: 'Spot Reduction', description: 'Targets specific problem areas.' },
      { title: 'Inch Loss', description: 'Measurable results after treatment series.' },
      { title: 'Customizable', description: 'Modalities selected for individual goals.' },
    ],
    candidateDescription: 'Adults wanting to reshape specific body areas resistant to diet and exercise.',
    concernTags: ['Belly Fat', 'Hip Fat', 'Thigh Fat', 'Body Contouring'],
    howItWorks: [
      { stepNumber: 1, title: 'Assessment', description: 'Goal areas mapped and modalities selected.' },
      { stepNumber: 2, title: 'Contouring Treatment', description: 'Energy devices applied to target fat and tighten.' },
      { stepNumber: 3, title: 'Progressive Results', description: 'Results improve over series of treatments.' },
    ],
    duration: '45–60 minutes', downtime: 'None',
    aftercare: 'Healthy diet and hydration recommended to maximize results.',
    faqs: [],
    relatedSlugs: ['lipo-cavitation', 'ems-sculpting', 'cryo-fat-freezing'],
    seoTitle: 'Body Sculpting Encino | New Beauty Med Spa',
    seoDescription: 'Non-invasive body sculpting and contouring at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'body sculpting contouring treatment spa',
  },
  {
    name: 'Ultrasound Body',
    slug: 'ultrasound-body',
    category: 'body', subcategory: 'body',
    intro: 'High-frequency ultrasound therapy for body contouring, fat reduction, and improved skin texture.',
    quickInfo: { duration: '45–60 min', bestFor: 'Fat reduction, skin texture', sessions: '6–10 sessions' },
    benefits: [
      { title: 'Deep Penetration', description: 'Ultrasound reaches deep fat and tissue layers.' },
      { title: 'Fat Disruption', description: 'Sound waves break down fat cell membranes.' },
      { title: 'Skin Tightening', description: 'Stimulates collagen in treated areas.' },
      { title: 'Non-Invasive', description: 'Comfortable treatment with no downtime.' },
    ],
    candidateDescription: 'Adults with localized fat deposits, cellulite, or body skin laxity.',
    concernTags: ['Body Fat', 'Cellulite', 'Loose Body Skin'],
    howItWorks: [
      { stepNumber: 1, title: 'Gel Application', description: 'Ultrasound gel applied to treatment area.' },
      { stepNumber: 2, title: 'Ultrasound Delivery', description: 'Handpiece delivers targeted sound waves.' },
      { stepNumber: 3, title: 'Lymphatic Processing', description: 'Disrupted fat cells eliminated via lymphatic system.' },
    ],
    duration: '45–60 minutes', downtime: 'None',
    aftercare: 'Drink plenty of water. Light exercise supports results.',
    faqs: [],
    relatedSlugs: ['lipo-cavitation', 'body-sculpting', 'rf-aqua-body-rejuvenation'],
    seoTitle: 'Ultrasound Body Treatment | New Beauty Med Spa Encino',
    seoDescription: 'Ultrasound body contouring and skin tightening at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'ultrasound body treatment spa contouring',
  },
  {
    name: 'Hair Regrowth',
    slug: 'hair-regrowth',
    category: 'body', subcategory: 'body',
    intro: 'Advanced treatment using PRP and low-level laser therapy to stimulate natural hair regrowth and restore density.',
    quickInfo: { duration: '60 min', bestFor: 'Thinning hair, hair loss', sessions: '6–12 sessions' },
    benefits: [
      { title: 'Natural Stimulation', description: 'Activates dormant hair follicles.' },
      { title: 'Increased Density', description: 'Fuller, thicker-looking hair.' },
      { title: 'Non-Surgical', description: 'No surgery or medications required.' },
      { title: 'Suitable for All', description: 'Effective for men and women.' },
    ],
    candidateDescription: 'Adults experiencing hair thinning, early hair loss, or post-partum hair loss.',
    concernTags: ['Hair Thinning', 'Hair Loss', 'Receding Hairline', 'Sparse Hair'],
    howItWorks: [
      { stepNumber: 1, title: 'Scalp Assessment', description: 'Hair loss pattern and density evaluated.' },
      { stepNumber: 2, title: 'Treatment Application', description: 'PRP or laser therapy applied to scalp.' },
      { stepNumber: 3, title: 'Follicle Activation', description: 'Growth factors stimulate follicle activity.' },
    ],
    duration: '60 minutes', downtime: 'Minimal',
    aftercare: 'Avoid harsh shampoos for 48 hours. Recommended maintenance schedule.',
    faqs: [],
    relatedSlugs: ['hair-removal', 'vampire-facial'],
    seoTitle: 'Hair Regrowth Treatment Encino | New Beauty Med Spa',
    seoDescription: 'Professional hair regrowth treatments for thinning and hair loss at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'hair regrowth treatment scalp therapy',
  },
  {
    name: 'Hair Removal',
    slug: 'hair-removal',
    category: 'body', subcategory: 'body',
    intro: 'Professional laser hair removal for smooth, long-lasting results on face and body.',
    quickInfo: { duration: '15–60 min depending on area', bestFor: 'Unwanted body hair', sessions: '6–8 sessions' },
    benefits: [
      { title: 'Long-Lasting', description: 'Significant permanent reduction after full course.' },
      { title: 'Precision', description: 'Targets hair follicles without damaging surrounding skin.' },
      { title: 'All Areas', description: 'Face, legs, arms, underarms, bikini, and more.' },
      { title: 'Time-Saving', description: 'Reduces or eliminates daily shaving and waxing.' },
    ],
    candidateDescription: 'Adults with unwanted body or facial hair. Best results on darker hair and lighter skin, though modern lasers treat a wider range.',
    concernTags: ['Unwanted Hair', 'Body Hair', 'Facial Hair', 'Ingrown Hairs'],
    howItWorks: [
      { stepNumber: 1, title: 'Shave & Prep', description: 'Area shaved and cooled before treatment.' },
      { stepNumber: 2, title: 'Laser Application', description: 'Laser targets melanin in hair follicles.' },
      { stepNumber: 3, title: 'Follicle Destruction', description: 'Heat destroys follicle\'s ability to regrow hair.' },
    ],
    duration: '15–60 minutes depending on area', downtime: 'None — slight redness for a few hours',
    aftercare: 'SPF on treated area. Avoid sun exposure. No waxing between sessions.',
    faqs: [
      { question: 'How many sessions do I need?', answer: 'Most clients need 6–8 sessions spaced 4–8 weeks apart for optimal results.' },
    ],
    relatedSlugs: ['hair-regrowth'],
    seoTitle: 'Laser Hair Removal Encino | New Beauty Med Spa',
    seoDescription: 'Professional laser hair removal for all body areas at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'laser hair removal treatment spa body',
  },
  {
    name: 'Exilis',
    slug: 'exilis',
    category: 'body', subcategory: 'body',
    intro: 'Combines radiofrequency and ultrasound energy to simultaneously tighten skin and reduce fat without surgery.',
    quickInfo: { duration: '30–60 min', bestFor: 'Skin laxity, fat reduction, body tightening', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Dual Technology', description: 'RF and ultrasound combined for superior results.' },
      { title: 'Skin Tightening', description: 'Firms sagging body skin.' },
      { title: 'Fat Reduction', description: 'Reduces localized fat deposits.' },
      { title: 'Pain-Free', description: 'Warm, comfortable sensation throughout.' },
    ],
    candidateDescription: 'Adults with mild to moderate skin laxity and localized fat on body or face.',
    concernTags: ['Skin Laxity', 'Body Fat', 'Sagging Skin', 'Cellulite'],
    howItWorks: [
      { stepNumber: 1, title: 'Energy Setup', description: 'Device calibrated for target area.' },
      { stepNumber: 2, title: 'RF + Ultrasound', description: 'Combined energy heats tissue to therapeutic temperature.' },
      { stepNumber: 3, title: 'Collagen Remodeling', description: 'Heat triggers collagen production and fat metabolism.' },
    ],
    duration: '30–60 minutes', downtime: 'None',
    aftercare: 'Stay hydrated. Healthy diet supports fat elimination.',
    faqs: [],
    relatedSlugs: ['vanquish', 'body-sculpting', 'rf-aqua-body-rejuvenation'],
    seoTitle: 'Exilis Body Treatment Encino | New Beauty Med Spa',
    seoDescription: 'Exilis RF + ultrasound skin tightening and fat reduction at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'rf ultrasound body treatment skin tightening',
  },
  {
    name: 'Vanquish',
    slug: 'vanquish',
    category: 'body', subcategory: 'body',
    intro: 'A contact-free radiofrequency device that selectively eliminates fat cells across large body areas without touching the skin.',
    quickInfo: { duration: '45 min', bestFor: 'Large area fat reduction, abdomen, thighs', sessions: '4–6 sessions' },
    benefits: [
      { title: 'Contactless', description: 'Device hovers above skin — no pressure, no discomfort.' },
      { title: 'Large Area Coverage', description: 'Treats entire abdomen or thighs in one session.' },
      { title: 'Fat Cell Elimination', description: 'Selective RF destroys fat while protecting skin.' },
      { title: 'No Downtime', description: 'Immediate return to activities.' },
    ],
    candidateDescription: 'Adults wanting to reduce large fat areas like the full abdomen without surgery or compression. BMI up to 30 recommended.',
    concernTags: ['Abdominal Fat', 'Thigh Fat', 'Large Fat Areas', 'Body Contouring'],
    howItWorks: [
      { stepNumber: 1, title: 'Panel Positioning', description: 'Vanquish panels positioned around treatment area.' },
      { stepNumber: 2, title: 'RF Energy Delivery', description: 'Selective RF heats fat layer to 45°C without contact.' },
      { stepNumber: 3, title: 'Fat Apoptosis', description: 'Fat cells undergo programmed cell death and are eliminated.' },
    ],
    duration: '45 minutes', downtime: 'None — warmth and mild redness temporary',
    aftercare: 'Drink 2L water daily. Avoid anti-inflammatory medications for 2 days.',
    faqs: [],
    relatedSlugs: ['exilis', 'coolsculpting', 'cryo-fat-freezing'],
    seoTitle: 'Vanquish Fat Reduction Encino | New Beauty Med Spa',
    seoDescription: 'Contactless Vanquish RF fat reduction for abdomen and thighs at New Beauty Med Spa, Encino CA.',
    heroImageQuery: 'vanquish rf body fat reduction treatment',
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run type-check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/treatments.ts
git commit -m "feat: add all 49 treatment data entries with descriptions, benefits, and SEO"
```
