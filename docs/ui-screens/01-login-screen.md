# 01 - Login / Welcome Screen

## Status

Approved Direction

This screen is approved as the visual and UX direction for the first screen of the app, but it is not yet final pixel-perfect implementation.

## Visual Reference

```text
assets/design-references/login-screen-approved-direction.png
```

## Screen Name

Login / Welcome

## Route

```text
/login
```

Temporary initial route can redirect here from:

```text
/
```

## Purpose

This screen introduces the app as a personal, branded mobile app for **גן נונה בנונה**.

The user should immediately feel that this is not a generic daycare platform, but a custom app built specifically for this daycare.

## Main UX Goals

- Create trust.
- Make the app feel personal.
- Make the daycare brand visible.
- Let parents enter easily.
- Keep staff entry available but secondary.
- Avoid technical complexity.
- Keep everything Hebrew and RTL.

## Target Users

- Parents.
- Daycare staff.

## Visual Direction

The screen uses:

- Warm cream background.
- Soft sage green.
- Soft peach.
- Rounded cards.
- Gentle shadows.
- Personal illustrated hero image of the daycare man and woman.
- Cozy kindergarten environment in the hero image.

The illustration should communicate:

- Daycare.
- Care.
- Warmth.
- Trust.
- Familiarity.
- Personal connection.

It should not communicate:

- Romantic couple poster.
- Fashion / glamour.
- Corporate system.
- Generic stock image.

## Branding Source

All branding must come from:

```text
src/config/client.config.ts
```

Relevant values:

```ts
clientId: "nuna-banuna"
appName: "גן נונה בנונה"
daycareName: "גן נונה בנונה"
primaryColor: "#7A9A72"
secondaryColor: "#F4D6C6"
backgroundColor: "#FFF8F1"
```

Do not hard-code the app name across the screen except through the config import.

## Layout

The screen should be vertical mobile-first.

Recommended layout:

1. Safe area.
2. Top logo area.
3. App title.
4. Subtitle and supporting text.
5. Hero illustration of the daycare owners in a kindergarten environment.
6. Bottom rounded card.
7. Primary parent entry button.
8. Secondary staff entry button.
9. Help text.

## Text Content

### App Title

```text
גן נונה בנונה
```

### Subtitle

```text
האפליקציה האישית של הגן
```

### Supporting Text

```text
כל מה שהגננת וההורים צריכים, במקום אחד
```

### Primary Button

```text
כניסה להורים
```

### Primary Button Supporting Text

```text
כל המידע על הילד שלכם, במקום אחד
```

### Secondary Button

```text
כניסת צוות הגן
```

### Secondary Button Supporting Text

```text
לגננות, סייעות וצוות הגן
```

### Help Text

```text
צריכים עזרה בכניסה? פנו אלינו
```

## Button Hierarchy

The parent login button is the primary button.

Reason:

- Parents are the broader user group.
- The app experience should feel parent-friendly.
- The commercial value of the app depends heavily on parent perception.

The staff login button is secondary.

It should be visible, but less dominant.

## Components to Use

- `AppScreen`
- `AppButton`
- `AppCard`
- `HeroImage`
- `LogoHeader`

If `HeroImage` and `LogoHeader` do not exist yet, create them as simple reusable components.

## Assets

### Visual Reference

```text
assets/design-references/login-screen-approved-direction.png
```

### Practical Development Asset

Later, extract or create a clean hero asset:

```text
assets/clients/nuna-banuna/login-hero.png
```

This asset should include only the illustrated daycare owners and background, not the UI buttons or real text.

## Development Rule for Image Usage

Do not use the full approved screenshot as a single full-screen image.

Correct implementation:

- Use hero illustration as an image.
- Use real React Native text for all labels.
- Use real React Native buttons.
- Use real layout.
- Use real navigation.

Incorrect implementation:

- One full-screen PNG with fake buttons.
- Text baked into the screenshot.
- Non-clickable UI.

## Behavior

### Parent Button

When pressing:

```text
כניסה להורים
```

Navigate to:

```text
/parent/home
```

### Staff Button

When pressing:

```text
כניסת צוות הגן
```

Navigate to:

```text
/teacher/home
```

## Authentication

No real authentication in the first implementation.

This screen is a demo navigation screen.

Later, this screen will be adapted to real authentication.

## RTL Rules

- Entire layout must be RTL-friendly.
- Hebrew text should align naturally.
- Button text should be readable and not clipped.
- Icons should be placed naturally for RTL.

## Accessibility Notes

- Buttons must have sufficient height for mobile touch.
- Text contrast must be readable.
- Small helper text should not be too small.
- Do not rely only on color to communicate button purpose.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Login / Welcome screen according to docs/ui-screens/01-login-screen.md and the visual reference assets/design-references/login-screen-approved-direction.png.

Use the image only as a visual reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for all branding.

The main action is כניסה להורים and should navigate to /parent/home.

The secondary action is כניסת צוות הגן and should navigate to /teacher/home.

Do not implement real authentication.

Do not connect Supabase.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The second generated version works better than the first.
- It feels more like a daycare app.
- The couple now looks more like daycare staff.
- The parent button hierarchy is correct.
- Staff entry should remain smaller and secondary.
- In implementation, ensure the secondary text remains readable.
- Keep top area spacious enough and avoid visual overload.
