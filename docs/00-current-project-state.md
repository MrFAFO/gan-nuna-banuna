# Current Project State - Gan Nuna Banuna

## Purpose

This file tracks the real implementation state of the project. Use it together with the product, UX, UI, and screen-specific documents under `docs/`.

## Product State

Gan Nuna Banuna is the first white-label mobile app for private kindergartens and home daycares.

Current phase: frontend MVP with mock data only.

The app is not production-ready yet.

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router

Future backend direction:

- Supabase Auth
- Supabase Database
- Supabase Storage
- Role-based access
- External digital-signature provider for contracts

## Current App Structure

Important files and folders:

```text
app/
  app/
    _layout.tsx
    index.tsx
    parent/
      home.tsx
      daily-summary.tsx
      absence-report.tsx
      contract-renewal.tsx
    teacher/
      home.tsx
      children.tsx
      add-child.tsx
      attendance.tsx
      daily-report.tsx
      contracts.tsx
      upload-contract.tsx
  src/
    components/
    config/
      client.config.ts
    data/
    navigation/
    theme/
    types/
```

The previous Expo template routes under `(tabs)` and `modal` were removed. The app entry screen is now `app/app/index.tsx`.

## White-Label Configuration

White-label data lives in:

- `app/src/config/client.config.ts`

Current rule:

- Screens must read client-specific branding from `CLIENT_CONFIG`.
- Screens should not hardcode the daycare name, owner name, or brand colors.
- `app/src/theme/colors.ts` reads brand colors from `CLIENT_CONFIG` and remains the style API used by components.

## Existing Components

Reusable UI components:

- `app/src/components/AppScreen.tsx`
- `app/src/components/AppCard.tsx`
- `app/src/components/AppButton.tsx`
- `app/src/components/AppTextInput.tsx`
- `app/src/components/StatusBadge.tsx`
- `app/src/components/BottomNavBar.tsx`
- `app/src/navigation/useBottomNavPress.ts`

Current component notes:

- `StatusBadge` supports attendance statuses and all current contract statuses.
- `BottomNavBar` supports separate parent and teacher variants.
- `useBottomNavPress` centralizes bottom navigation routes for parent and teacher screens.

## Existing Data

Mock data lives under:

- `app/src/data/mockChildren.ts`
- `app/src/data/mockContracts.ts`
- `app/src/data/mockDailyReports.ts`
- `app/src/data/mockParent.ts`

Shared types live under:

- `app/src/types/child.ts`
- `app/src/types/contract.ts`
- `app/src/types/user.ts`

## Existing Screens

### Login / Entry

File:

- `app/app/index.tsx`

Status:

- Works as the app entry screen.
- Allows demo navigation to parent home and teacher home.
- Uses `CLIENT_CONFIG` for daycare branding.
- No real authentication yet.

### Parent Home

File:

- `app/app/parent/home.tsx`

Status:

- Shows parent greeting from `mockParent`.
- Shows child info from `mockChildren`.
- Uses `CLIENT_CONFIG` for daycare branding.
- Shows daily summary counts from `mockDailyReportSummary`.
- Shows contract reminder from `mockContracts`.
- "סיכום יום" navigates to `/parent/daily-summary`.
- "דיווח מהיר לגננת" navigates to `/parent/absence-report`.
- "חוזים ומסמכים" navigates to `/parent/contract-renewal`.
- "יצירת קשר עם הגן" is still a placeholder until contact behavior is decided.
- Uses `BottomNavBar` with the parent variant and shared bottom-nav routing.

### Parent Daily Summary

File:

- `app/app/parent/daily-summary.tsx`

Status:

- Shows summary counts, activities, meals, messages, and notes from `mockDailyReports`.
- Uses `BottomNavBar` with the parent variant and shared bottom-nav routing.
- No parent-specific filtering yet.

### Parent Absence / Quick Report

File:

- `app/app/parent/absence-report.tsx`

Status:

- Added as a soft "דיווח מהיר לגננת" flow.
- Lets the parent choose absence / late arrival / early pickup / request callback.
- Shows child and date from mock data.
- Uses local mock behavior only; no real message is sent.
- Keeps the product direction that personal communication with the daycare is still important.

### Parent Contract Renewal

File:

- `app/app/parent/contract-renewal.tsx`

Status:

- Shows the parent's pending contract from `mockContracts`.
- Shows child summary, contract status, details, document card, and signature action card.
- PDF preview and digital signature are placeholder alerts only.
- Uses `CLIENT_CONFIG` for daycare branding.

### Teacher Home

File:

- `app/app/teacher/home.tsx`

Status:

- Shows greeting from `CLIENT_CONFIG.ownerName`.
- Shows daycare name from `CLIENT_CONFIG.daycareName`.
- Shows child count from `mockChildren`.
- Shows present count from `mockDailyReportSummary`.
- Quick actions navigate to teacher children, attendance, daily report, and contracts.
- Uses `BottomNavBar` with the teacher variant and shared bottom-nav routing.

### Teacher Children

File:

- `app/app/teacher/children.tsx`

Status:

- Shows mock children list with local search.
- Shows attendance and contract status badges.
- Shows summary counts and empty search state.
- Navigates to `/teacher/add-child`.

### Teacher Add Child

File:

- `app/app/teacher/add-child.tsx`

Status:

- Form screen with child details, parent/guardian details, notes, and simple local validation.
- Image upload and save are mock behavior only.
- Returns to the children list after the success alert.

### Teacher Attendance

File:

- `app/app/teacher/attendance.tsx`

Status:

- Shows children from `mockChildren`.
- Allows local status selection for arrived / not arrived / late / left early.
- Summary card updates locally.
- Save action shows a mock success alert.

### Teacher Daily Report

File:

- `app/app/teacher/daily-report.tsx`

Status:

- Shows daily summary counts, activities, meals, messages, and notes from `mockDailyReports`.
- Add activity, add note, and view messages are placeholders for future flows.

### Teacher Contracts

File:

- `app/app/teacher/contracts.tsx`

Status:

- Shows contract summary, local search, and contract list from `mockContracts`.
- Uses `StatusBadge` for contract status.
- Navigates to `/teacher/upload-contract`.

### Teacher Upload Contract

File:

- `app/app/teacher/upload-contract.tsx`

Status:

- Shows first step of the upload contract flow.
- Includes contract details, contract type chips, PDF placeholder, security notice, and validation.
- No real PDF upload, storage, email, or signing provider integration yet.

## Remaining MVP Screens

All planned frontend MVP screens from the current implementation plan now exist with mock data.

## Current Next Steps

Recommended order:

1. Run `npm run typecheck`.
2. Run `npm run lint`.
3. Review MVP screens visually on web/mobile.
4. Fix spacing/RTL issues found during visual QA.
5. Decide contact behavior for "יצירת קשר עם הגן".
6. Later replace mock data with backend services.

## Production Readiness Notes

Before production, the project still needs:

- Real authentication
- Role-based permissions
- Backend/database
- Secure storage
- Error handling
- Loading states
- Empty states
- Form validation
- Environment variables
- Production build configuration
- Privacy and security review
- Contract workflow design
- External digital-signature provider integration

## Verification Notes

Current verification commands:

- `npm run typecheck`
- `npm run lint`

Known dependency note:

- `npm audit --audit-level=moderate` currently reports moderate vulnerabilities through Expo's dependency tree (`postcss`, `uuid`).
- The available automatic fix requires `npm audit fix --force`, which would upgrade Expo to a breaking major version.
- Do not run the forced audit fix as part of MVP screen work. Plan an Expo upgrade separately.

## Working Rules

- Keep screens under `app/app/`.
- Keep reusable components under `app/src/components/`.
- Keep client configuration under `app/src/config/`.
- Keep mock data under `app/src/data/`.
- Keep shared types under `app/src/types/`.
- Keep theme primitives under `app/src/theme/`.
- Build UI first, then mock data, then backend.
- Do not introduce new hardcoded client branding in screens.
- Do not commit unless explicitly requested.
