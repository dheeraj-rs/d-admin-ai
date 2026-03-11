# Contributing to d-admin AI Builder

Welcome! To ensure our codebase remains world-class, highly scalable, and extremely professional, all developers (human and AI) must strictly adhere to the following **Master Rules**. 

Any Pull Request that violates these rules will be automatically rejected.

## 1. Project Setup
- **Framework**: Next.js App Router ONLY (Pages Router is banned).
- **Language**: TypeScript ONLY. Plain JavaScript is rejected at lint time.
- **Styling**: Tailwind CSS ONLY. No inline styles, no CSS Modules.
- **Node Version**: You must use the Node.js version locked in `.nvmrc` (v20).
- **Hooks**: ESLint + Prettier run automatically via `husky` + `lint-staged`. The build will fail if any rule is violated.
- **Imports**: Absolute imports using `@/` are required. Relative paths deeper than one level (`../../`) are banned.

## 2. Directory Architecture
The root must contain exactly three top-level directories. Generic folders like `src/components` are absolutely not allowed.

### `app/` — Routing Layer
- URL routing, metadata/SEO, and passing server-fetched data.
- **Constraint**: `page.tsx` must stay under 80 lines. No UI styling or reusable components.

### `features/` — Business Logic Layer
- Contains all actual application features (`auth`, `workspace`, etc.) isolated in their own folders.
- **Constraint**: A feature MUST NOT import internal files from another feature. Cross-feature communication happens ONLY through `shared/` or the feature's `index.ts` public exported file.

### `shared/` — Reusable Tools Layer
- UI primitives, utilities, base API clients, global constants.
- **Constraint**: Must not contain business logic or depend on any feature module.

## 3. File Size Limits (Strict limits enforced by ESLint)
- **Any file (hard limit)**: 250 lines
- **React UI components**: 150 lines
- **Custom hooks**: 100 lines
- **Server pages (`page.tsx`)**: 80 lines
- **Individual functions**: 25 lines

*If a file approaches its limit, split it.*

## 4. State & Prop Flow Rules
- Prop drilling must not exceed 2 levels. Use Context or Zustand for deep trees.
- Local UI state stays inside the component.
- Feature-level state lives in a custom hook (e.g., `useWorkspace`).

## 5. Naming Conventions

| What | Convention | Example |
|------|------------|---------|
| Folders | kebab-case | `user-profile/` |
| Component Files | PascalCase | `PostCard.tsx` |
| Custom Hooks | camelCase + `use` | `useInfiniteScroll.ts` |
| Utility Functions | camelCase (action-first) | `formatTimestamp.ts` |
| Types / Interfaces | PascalCase (No `I` prefix) | `UserProfile` |
| Global Constants | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE` |

## 6. Import Order
Every file must neatly order imports:
1. External libraries (`react`, `next`)
2. `shared/` modules
3. `features/` modules
4. Local files
*Circular imports are forbidden.*

## 7. Pull Request Rules
1. Every PR must pass all linting (`npm run lint`), formatting, and build checks (`npm run build`).
2. Do not introduce new folder structures without architecture approval.
3. PRs violating feature isolation will be immediately blocked.
