# 00 - Shared Component: Bottom Navigation Bar

## Status

Canonical Shared Component

This file defines the single source of truth for the bottom navigation bar across the app.

## Purpose

The bottom navigation bar must remain visually identical across all approved UI screens.

It should not be redesigned per screen.

## Why This File Exists

Image generation may change small UI details from one mockup to another, even when the prompt asks for consistency.

In real development, consistency will be enforced by implementing this as one reusable React Native component:

```text
BottomNavBar
```

All screens must use this same component.

## Visual Reference

The approved reference is the bottom bar from the approved Teacher Home screen.

Recommended asset name:

```text
assets/design-references/teacher-home-approved-direction.png
```

## Exact Visual Order

The order below is the required order as seen on screen from left to right.

```text
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל
```

Do not change this order.

## Center Active Item

The center item is:

```text
בית
```

The Home item is visually emphasized with:

- Green rounded raised background.
- White home icon.
- White label.
- Larger visual weight than the other items.

## Items

### 1. Settings

Visual position:

```text
Far left
```

Label:

```text
הגדרות
```

Icon:

```text
Gear icon
```

Route placeholder:

```text
/settings
```

### 2. Daily Documentation

Visual position:

```text
Left of Home
```

Label:

```text
תיעוד יומי
```

Icon:

```text
Camera icon
```

Important:

Use the same camera-style icon as in the approved Teacher Home screen.

Do not replace it with a clipboard, document, calendar, or notebook icon.

Route placeholder:

```text
/teacher/daily-documentation
```

### 3. Home

Visual position:

```text
Center
```

Label:

```text
בית
```

Icon:

```text
Home icon
```

Route:

```text
/teacher/home
```

Active state:

```text
true
```

### 4. Calendar

Visual position:

```text
Right of Home
```

Label:

```text
לוח שנה
```

Icon:

```text
Calendar icon
```

Route placeholder:

```text
/teacher/calendar
```

### 5. Profile

Visual position:

```text
Far right
```

Label:

```text
פרופיל
```

Icon:

```text
User/profile outline icon
```

Route placeholder:

```text
/teacher/profile
```

## Required Layout

- Full-width bottom bar.
- White or warm off-white background.
- Large rounded top corners.
- Soft shadow.
- Fixed height across screens.
- Same horizontal spacing across screens.
- Same icon size across screens.
- Same label font size across screens.

## Recommended Dimensions

These are implementation guidelines, not absolute pixel-perfect requirements:

```text
barHeight: 88-96
borderTopLeftRadius: 24-32
borderTopRightRadius: 24-32
homeButtonWidth: 112-128
homeButtonHeight: 78-88
iconSize: 24-28
labelFontSize: 13-15
```

## RTL Clarification

Do not rely only on automatic RTL ordering for this component.

The visual order must be explicitly preserved:

```text
Left to right: הגדרות, תיעוד יומי, בית, לוח שנה, פרופיל
```

This prevents accidental reordering caused by RTL layout behavior.

## Development Rule

There must be only one implementation of this component.

Recommended path:

```text
src/components/BottomNavBar.tsx
```

Every screen that needs this navigation must import and use:

```tsx
<BottomNavBar activeItem="home" />
```

Do not recreate the bottom nav separately inside individual screens.

## Active State Rules

In the first skeleton phase:

- Teacher Home: activeItem = "home"
- Children List: activeItem = "home"
- Attendance: activeItem = "home"
- Daily Report: activeItem = "home"
- Contracts: activeItem = "home"

Reason:

These screens are accessed from the teacher dashboard, and the current bottom nav does not yet contain a dedicated item for each of them.

In a later version, active state can be refined.

## Claude Code Implementation Instruction

Use this prompt when creating or fixing the bottom navigation:

```text
Implement a reusable BottomNavBar component according to docs/ui-screens/00-bottom-navigation.md.

This component must be the only bottom navigation implementation in the app.

Use this exact visual order from left to right:
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל

The center בית item must be the active raised green item.

The תיעוד יומי item must use the same camera-style icon as the approved Teacher Home screen.

Do not let RTL automatically reverse the intended visual order.

All screens should import and use this component instead of creating their own bottom nav.
```

## Review Notes

This component was created because the Children List mockup did not preserve the exact bottom navigation from the Teacher Home mockup.

The actual development phase must enforce consistency through a reusable component, not through repeated visual interpretation of images.
