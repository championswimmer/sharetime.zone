# AGENTS.md - Project Guide for Coding/LLM Agents

## Project Overview

**sharetime.zone** is a Nuxt 3-based web application for sharing and converting times across different timezones. It supports both web UI and CLI (cURL) access, with edge functions for fast timezone detection.

### Key Features
- Convert times between timezones using abbreviations (PST, IST, KST) or IANA names (Europe/Berlin)
- Display current time in any timezone
- cURL support via Netlify Edge Functions with automatic timezone detection
- Progressive Web App (PWA) capabilities
- Delayed hydration for performance optimization

---

## Technology Stack

### Core Framework
- **Nuxt 3** (v3.8.2) - Vue 3 meta-framework with SSR/SSG support
- **Vue 3** - Composition API with `<script setup>` syntax
- **TypeScript** - Strongly typed JavaScript

### UI/Styling
- **Bulma** (v0.9.4) - CSS framework (selective imports for minimal bundle size)
- **SCSS/Sass** - CSS preprocessing
- **Custom Font**: Azeret Mono (monospace)

### Time & Timezone Libraries
- **Luxon** (v3.2.1) - DateTime manipulation (used in Vue components)
- **tzabbrmap** (v1.0.0) - Timezone abbreviation to IANA timezone mapping
- **Ptera** (Deno) - DateTime library used in edge functions

### Deployment & Performance
- **Netlify** - Hosting platform with edge functions
- **@netlify/edge-functions** - Edge computing for cURL responses
- **@vite-pwa/nuxt** - PWA support
- **nuxt-delay-hydration** - Performance optimization

### Testing & Quality
- **Jest** (v29.4.3) with **ts-jest** - Unit testing
- **ESLint** - Code linting with Vue 3 and TypeScript configs
- **Yorkie** + **lint-staged** - Pre-commit hooks

---

## Project Structure

```
sharetime.zone/
├── src/                      # Source directory (configured in nuxt.config.ts)
│   ├── components/           # Vue components
│   │   ├── NavBar.vue       # Navigation component
│   │   ├── TickerTime.vue   # Real-time clock display
│   │   ├── StaticTime.vue   # Static time display
│   │   ├── DisambiguateTZ.vue   # Multiple timezone selector
│   │   └── InvalidTZError.vue   # Error display
│   ├── layouts/             # Nuxt layouts
│   │   ├── default.vue      # Default layout
│   │   ├── now.vue          # Layout for "now" pages
│   │   └── time.vue         # Layout for specific time pages
│   ├── pages/               # File-based routing
│   │   ├── index.vue        # Home page
│   │   ├── how.vue          # How-to page
│   │   ├── [tz]/            # Dynamic timezone abbreviation routes
│   │   │   ├── [time].vue   # /PST/1500 format
│   │   │   └── now.vue      # /PST/now format
│   │   └── [continent]/     # Dynamic IANA timezone routes
│   │       └── [city]/      
│   │           ├── [time].vue   # /Europe/Berlin/1500
│   │           └── now.vue      # /Europe/Berlin/now
│   ├── data/                # Data utilities
│   │   ├── timezones.ts     # Timezone composable
│   │   └── routes.ts        # Route name constants
│   ├── time/                # Time parsing utilities
│   │   └── parse.ts         # Time format parser and validator
│   ├── styles/              # Global styles
│   │   ├── app.scss         # Main stylesheet (Bulma customization)
│   │   └── fonts.css        # Font definitions
│   └── public/              # Static assets
├── netlify/
│   └── edge-functions/      # Netlify Edge Functions (Deno runtime)
│       ├── curl-response.ts # cURL request handler
│       ├── time-parse.ts    # Time parser for edge functions (Deno)
│       └── timezone-header.ts   # TZ header middleware
├── test/                    # Jest tests
├── app.vue                  # Root app component
├── nuxt.config.ts           # Nuxt configuration
├── tsconfig.json            # TypeScript configuration
├── jest.config.js           # Jest configuration
├── .eslintrc.js             # ESLint configuration
└── netlify.toml             # Netlify deployment config
```

---

## Code Style & Conventions

### TypeScript/Vue
- **Indent**: 2 spaces (enforced by .editorconfig)
- **Quotes**: Single quotes preferred
- **Semicolons**: Not required (but allowed)
- **Trailing whitespace**: Trimmed
- **Final newline**: Required

### Vue Components
- Use **`<script setup lang="ts">`** syntax (Composition API)
- Use TypeScript for all logic
- Props: Define with `defineProps<{ propName: type }>()`
- Minimal commenting - only when necessary for clarification

### Component Structure
```vue
<template>
  <!-- Template here -->
</template>

<script setup lang="ts">
// Imports
// Props/Emits definitions
// Composables
// Reactive state
// Computed properties
// Lifecycle hooks
// Functions
</script>

<style lang="scss" scoped>
/* Styles here */
</style>
```

### ESLint Rules
- Vue 3 Essential rules enabled
- Standard JS style
- TypeScript recommended rules
- `no-console`: Warn in production, off in development
- `no-debugger`: Warn in production, off in development
- `@typescript-eslint/no-unused-vars`: Disabled

---

## Routing & Pages

### File-based Routing (Nuxt 3)
Pages in `src/pages/` automatically create routes:
- `/` → `index.vue`
- `/how` → `how.vue`
- `/[tz]/[time]` → Dynamic timezone abbr + time (e.g., `/PST/1500`)
- `/[tz]/now` → Current time in timezone abbr (e.g., `/PST/now`)
- `/[continent]/[city]/[time]` → IANA timezone + time (e.g., `/Europe/Berlin/1500`)
- `/[continent]/[city]/now` → Current time in IANA timezone

### Route Validation
Routes with parameters include validation using `definePageMeta()`:
```ts
import { isValidTimeString } from '@/time/parse'

definePageMeta({
  validate: (route) => {
    const validTZ = /([A-Z]{2,4})/.test(params.tz)
    const validTime = isValidTimeString(params.time)
    return validTZ && validTime
  }
})
```

### Supported Time URL Formats
Users can now use flexible time formats in URLs:
- `/PST/1800` - Military time
- `/PST/18:00` - 24-hour with colon
- `/PST/6pm` - 12-hour format
- `/PST/6:30pm` - 12-hour with minutes
- `/Europe/Berlin/06:30AM` - Any format works with IANA timezones too

### Route Names (in `src/data/routes.ts`)
- `ABBR_TIME`: Timezone abbreviation with time
- `ABBR_NOW`: Timezone abbreviation for current time
- `IANA_TIME`: IANA timezone with time
- `IANA_NOW`: IANA timezone for current time

---

## Key Composables & Utilities

### `useTimezone()` - Main Timezone Composable
Located in `src/data/timezones.ts`:
- Parses route parameters to determine timezone
- Handles timezone abbreviations and IANA names
- Returns:
  - `displayTZ`: IANA timezone string
  - `displayTZAbbr`: Timezone abbreviation
  - `possibleTZs`: Array of possible timezones (for disambiguation)
  - `showAmbiguous`: Boolean for ambiguous timezone handling
  - `showTZError`: Boolean for invalid timezone
  - `showTime`: Computed property (shows when no errors/ambiguity)

### Time Parsing (`src/time/parse.ts`)
Centralized time format parsing supporting multiple formats:

**Supported Input Formats:**
- `1800` - Military time (24-hour, no colon)
- `18:00` - 24-hour with colon
- `6pm` - 12-hour without minutes
- `6:30pm` - 12-hour with minutes
- `06:30AM` - 12-hour with leading zero

**Key Functions:**
- `parseTimeString(timeStr: string): ParsedTime | null` - Parses and validates time, returns hour, minute, and formatted string
- `isValidTimeString(timeStr: string): boolean` - Validates time format
- `toMilitaryFormat(timeStr: string): string | null` - Converts any format to HHmm (for Luxon)

**Usage Example:**
```ts
import { toMilitaryFormat, isValidTimeString } from '@/time/parse'

// Validate route parameter
isValidTimeString('6pm') // true
isValidTimeString('25:00') // false

// Convert to military format for Luxon
const military = toMilitaryFormat('6:30pm') // returns '1830'
const displayTime = DateTime.fromFormat(military, 'HHmm', { zone: 'America/Los_Angeles' })
```

**Note:** A duplicate implementation exists in `netlify/edge-functions/time-parse.ts` for Deno runtime (edge functions cannot import from `src/`).

### Timezone Handling
- **Abbreviations** (PST, IST, KST): Resolved via `tzabbrmap` package
- **IANA Names** (Europe/Berlin, Asia/Kolkata): Used directly with Luxon
- **Ambiguous abbreviations**: Display disambiguation UI (e.g., KST = Korea Standard Time or Kaliningrad Standard Time)

---

## Netlify Edge Functions (Deno Runtime)

### `curl-response.ts`
- Intercepts cURL requests based on User-Agent header
- Automatically detects client timezone via `context.geo.timezone`
- Returns plain text responses for CLI users
- Supports both `/[tz]/now` and `/[tz]/[time]` patterns
- Uses Ptera library for datetime manipulation (Deno-compatible)

### Important Notes
- Edge functions run on Deno, not Node.js
- Use Deno-compatible imports (e.g., `https://deno.land/x/...`)
- Different datetime library than Vue app (Ptera vs Luxon)

---

## Styling with Bulma

### Selective Imports
Only necessary Bulma modules are imported in `src/styles/app.scss`:
- Utilities, helpers, base styles
- Container, title elements
- Navbar component

### Customization
```scss
$family-primary: 'Azeret Mono', monospace;
```

### Common Bulma Classes Used
- `.title`, `.subtitle` - Typography
- `.is-size-4`, `.is-size-*` - Text sizing
- `.has-text-weight-bold` - Text weight
- `.container` - Layout container
- `.navbar` - Navigation

---

## Testing

### Jest Configuration
- **Preset**: `ts-jest`
- **Coverage**: V8 provider, outputs to `coverage/` directory
- **Transform**: TypeScript files via ts-jest with separate test tsconfig
- **Config**: `test/tsconfig.json` for test-specific TypeScript settings

### Running Tests
```bash
npm test              # Run all tests
npm run test:coverage # Run with coverage report
```

---

## Development Workflow

### Setup
```bash
npm install           # Install dependencies
npm run dev           # Start dev server (localhost:3000)
```

### Building
```bash
npm run build         # Build for production
npm run generate      # Generate static site
npm run preview       # Preview production build
```

### Linting
```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
```

### Pre-commit Hooks
- **Yorkie** runs pre-commit hooks
- **lint-staged** lints only staged files
- Configured in `lint-staged.config.js`

---

## Performance Optimizations

### Delayed Hydration
- Module: `nuxt-delay-hydration`
- Mode: `mount` - Delays hydration until component mount
- Improves initial page load performance

### PWA
- Service worker generated automatically
- Manifest: `/site.webmanifest`
- Icons configured in nuxt.config.ts

### Bulma Optimization
- Only imports necessary Bulma components
- Reduces CSS bundle size

---

## Important Patterns & Conventions

### When Working with Times
1. **In Vue components**: Use Luxon's `DateTime`
2. **In edge functions**: Use Ptera (Deno runtime)
3. **Input formats**: Military time (1800), 24-hour (18:00), or 12-hour (6pm, 6:30pm, 06:30AM)
4. **Internal format**: All times converted to HHmm military format via `toMilitaryFormat()`
5. **Display**: 12-hour format with AM/PM

### Component State
- Prefer `ref()` and `computed()` from Vue
- Use composables for shared logic
- Keep components focused and minimal

### Error Handling
- Invalid timezone → Show `InvalidTZError` component
- Ambiguous timezone → Show `DisambiguateTZ` component
- Validate route params with `definePageMeta()`

### File Naming
- Vue components: PascalCase (e.g., `TickerTime.vue`)
- Composables/utilities: camelCase (e.g., `timezones.ts`)
- Pages: lowercase/kebab-case for URLs

---

## Making Changes

### Adding a New Page
1. Create `.vue` file in `src/pages/`
2. File name determines route
3. Add layout with `<NuxtLayout>` if needed
4. Add route validation if using params (use `isValidTimeString` from `@/time/parse` for time validation)

### Adding a Component
1. Create in `src/components/`
2. Use PascalCase naming
3. Auto-imported by Nuxt (no explicit import needed)
4. Use `<script setup lang="ts">` syntax

### Modifying Styles
1. Edit `src/styles/app.scss` for global styles
2. Use `<style scoped>` in components for local styles
3. Maintain Bulma customization pattern

### Working with Edge Functions
1. Edge functions are in `netlify/edge-functions/`
2. Use Deno syntax and imports
3. Test locally with Netlify CLI
4. Register in `netlify.toml`

---

## Common Pitfalls to Avoid

1. **Don't mix datetime libraries**: Use Luxon in Vue, Ptera in edge functions
2. **Don't import components explicitly**: Nuxt auto-imports from `src/components/`
3. **Don't use Node.js APIs in edge functions**: They run on Deno
4. **Don't skip route validation**: Always validate dynamic route params with `isValidTimeString()`
5. **Don't import all of Bulma**: Keep selective imports for performance
6. **Don't forget TypeScript types**: Use proper typing for props and functions
7. **Don't parse time manually**: Use `parseTimeString()` or `toMilitaryFormat()` from `@/time/parse`
8. **Don't duplicate time parsers**: Use `src/time/parse.ts` in Vue, `netlify/edge-functions/time-parse.ts` in edge functions

---

## Dependencies to Know

### Runtime Dependencies
- `luxon` - DateTime manipulation (browser/Node.js)
- `tzabbrmap` - Timezone abbreviation mapping
- `bulma` - CSS framework
- `@netlify/edge-functions` - Edge runtime
- `@vite-pwa/nuxt` - PWA support
- `nuxt-delay-hydration` - Performance optimization

### Dev Dependencies
- `nuxt` - Framework
- `typescript` - Language
- `eslint` - Linting
- `jest` - Testing
- `sass` - CSS preprocessing

---

## Summary for AI Agents

When coding on this project:
1. ✅ Use TypeScript with strict typing
2. ✅ Use Vue 3 Composition API with `<script setup>`
3. ✅ Follow 2-space indentation
4. ✅ Use Luxon for datetime in Vue components
5. ✅ Use Ptera for datetime in edge functions
6. ✅ Validate route parameters
7. ✅ Use Bulma classes for styling
8. ✅ Keep components minimal and focused
9. ✅ Write tests for new functionality
10. ✅ Run linter before committing

When in doubt, check existing components for patterns and maintain consistency with the established codebase structure.
