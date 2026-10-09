# Quimbaya Gold Design System

> Category: Cultural Heritage & High-End Artifact Presentation
> Inspired by Pre-Columbian metallurgy (Cauca Valley, Colombia, 300–800 CE), Museo del Oro curatorial standards, and modern Open Hardware parametric engineering.

---

## 1. Visual Theme & Atmosphere
- **Atmosphere:** Curatorial, sacred, timeless, tactile luxury. Dark obsidian background reminiscent of the deepest vault of the Gold Museum, illuminated by directional golden specular highlights.
- **Lighting Model:** Low ambient, high-specular directional light (3500K warm halogen & solar gleam).
- **Geometry:** Pure sacred geometry, golden ratios ($\Phi = 1.618$), bulbous spheroids, clean bezier transitions.

---

## 2. Color Palette & Semantic Roles
- **Obsidian Deep (Background):** `#08090b` (Deepest vault background)
- **Obsidian Surface (Cards):** `#111317` (Interactive containers, panels)
- **Obsidian Elevated:** `#181b22` (Hover states, modals, popovers)
- **Gold Primary (Au 82.5%):** `#F5C242` (Primary highlights, metrics, key CTAs)
- **Gold Specular (Lustre):** `#FFF2A8` (Gleam, crest borders, active states)
- **Gold Antique (Tumbaga patina):** `#B87C08` (Subtle borders, secondary icons)
- **Terracotta Sacred (Cerámica):** `#C25B38` (Ritual tags, sacred callouts)
- **Emerald Mist (Colombia Accent):** `#10B981` (Live status badges, success indicators)
- **Text Main:** `#F3F4F6` (High-contrast typography)
- **Text Muted:** `#9CA3AF` (Secondary documentation, body copy)
- **Text Dim:** `#6B7280` (Micro-labels, dimensional units)

---

## 3. Typography & Spatial Rhythm
- **Display & Headlines:** `'Cinzel Decorative'`, `'Syne'`, `'Cinzel'`, serif/geometric sans-serif with tracked caps (`letter-spacing: -0.02em` to `0.08em`).
- **Technical & UI Labels:** `'Space Grotesk'`, `'Inter'`, sans-serif for modular telemetry and metadata.
- **Body & Prose:** `'Outfit'`, `'Plus Jakarta Sans'`, sans-serif with `line-height: 1.65` for optimal narrative readability.
- **Code & Parametric CAD:** `'JetBrains Mono'`, monospace for coordinates, dimensions, JSON payloads.

---

## 4. Components & Elevation
- **Curatorial Cards:** 1px subtle gold borders (`rgba(245, 194, 66, 0.15)`), 16px radius, gentle inner gradient with 0.35s cubic transition on hover.
- **Parametric Viewports:** High-contrast dark viewport with orbital controls, wireframe toggles, and Lambertian shading.
- **Buttons:**
  - *Primary Gold:* `linear-gradient(135deg, #FFF3A1 0%, #F5C242 45%, #C98810 100%)` with dark text `#120E04` and golden glow shadow.
  - *Secondary Glass:* Dark fill with gold stroke (`1px solid rgba(245, 194, 66, 0.3)`).
- **Inspection Badges:** Pill counters with subtle glowing dots.
