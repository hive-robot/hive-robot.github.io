# Hive Group Site

A from-scratch, yellow-themed academic lab website built with Next.js (App Router), TypeScript, TailwindCSS, and Contentlayer. Includes i18n (en/zh), People mixed layout, Publications with link badges and BibTeX, Events with signup/replay, Blog with MDX, on-page filters, basic SEO/schema, and a glassmorphism navigation demo at the root page.

## Quickstart

- Requires Node 18+
- Install and run:

```
pnpm install
pnpm dev
```

Open http://localhost:3000/ to view the navigation showcase (existing localized pages remain under `/en` and `/zh`).

## Tech

- Next.js 14 (App Router, TypeScript)
- TailwindCSS with design tokens (yellow brand)
- Contentlayer (MDX types: Person, Publication, Event, Post)
- next/image for images
- ESLint + Prettier

## NavBar Component

- Location: `components/layout/Navbar.tsx`
- Props:
  - `lang?: 'zh' | 'en'` – switches menu labels (default `zh`).
  - `menu?: MenuItem[]` – override navigation items; each item carries `labelZh`, `labelEn`, `href`, and optional `external` flag for new-tab links.
  - `sticky?: boolean` – toggles the sticky container (defaults to `true`).
  - `showFollow?: boolean` – hides the “Follow us” button when set to `false`.
  - `className?: string` – append custom classes to the glass container.
- Supporting components:
  - `NavLink` handles hover/active underline styling and external links.
  - `MobileSheet` renders the mobile drawer with Escape-to-close and body scroll locking.
  - `FollowButton` provides the yellow capsule button (gradient by default).

### Customisation

- **Menu items**: Pass a new `menu` array to `<NavBar menu={...} />`, or edit the `defaultMenu` constant inside `NavBar.tsx`.
- **Language**: Switch `lang="en" | "zh"` on the component (demo page uses English by default).
- **Logo**: Replace `/public/logo-arm.svg` with your own asset (keep the path or update the `<Image>` in `NavBar.tsx`).
- **Follow button text**: Change the children passed to `<FollowButton>` or hide the button with `showFollow={false}` and drop in your own action.
- **Corners / shadow / transparency**: Update the utility classes in `NavBar.tsx` (e.g. `rounded-2xl`, `bg-white/90`, `shadow-sm`) or adjust the tokens in `styles/tokens.css` plus the mappings in `tailwind.config.ts`.

## Structure

```
app/                 # App Router with [lang] layout and pages
components/          # Layout, navbar, cards, filters, people, SEO
content/             # Contentlayer-powered MDX (people, publications, events, posts)
lib/                 # i18n, schema, contentlayer helpers, utils
public/              # images, og assets, logos
styles/              # tokens.css (brand palette) & prose.css
```

## Content & Contentlayer

- Add new entries under `content/{people,publications,events,posts}` following the frontmatter defined in `contentlayer.config.ts` (each schema includes `id`, `title/name`, `summary`, and so on).
- `pnpm dev` (or `pnpm contentlayer build`) regenerates typings whenever MDX changes. Computed `url` fields mirror file paths for easy linking.
- Sample entries (≥3 per type) ship with the repo as references—copy and adapt their structure when adding more documents.


## i18n

- Route segment `/[lang]` serves English + Chinese variants. Navigation copy comes from `lib/i18n.ts`.
- Menus use `lib/route.ts` helpers to generate paths with the proper locale prefix.

## SEO & Schema

- Simple `Meta` component for page titles and OG tags.
- JSON-LD helpers in `lib/schema.ts` (publication/event/org) – you can inject `<script type="application/ld+json">` as needed.
- `/sitemap.xml` and `/rss.xml` generated from content.

## Accessibility

- Brand yellow background with dark text for contrast.
- Keyboard focus rings on controls.
- Semantic tags and alt text provided where applicable.

## Deployment

- Vercel recommended. Default ISR/SSG works; content is local MDX.
- For static export, ensure all dynamic features are compatible or move to SSR as needed.

## Scripts

- `pnpm dev` – Next dev (Contentlayer integrated via plugin)
- `pnpm build` – Production build
- `pnpm start` – Start production server
- `pnpm lint` – Lint

## Notes

- Images are SVG placeholders in `/public/images/*` and `/public/logo-arm.svg`. Replace with real assets while keeping paths.
- Default OG image at `/public/og/default.png` is a placeholder – swap for a real image.
- Keep Tailwind tokens in `styles/tokens.css` and map via `tailwind.config.ts`.
