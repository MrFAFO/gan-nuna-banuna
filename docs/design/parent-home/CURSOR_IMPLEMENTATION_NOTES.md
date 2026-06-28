# CURSOR IMPLEMENTATION NOTES
## Gan Nona Banona — Parent Post-Login Home Screen Redesign

---

## 1. Purpose

Implement the approved Figma redesign for the **parent post-login home screen** while preserving all existing product functionality, data behavior, routes, navigation, integrations, state management, API calls, and backend behavior.

The latest approved **Parent Home** screen in Figma is the visual source of truth.

This is a **visual and structural UI redesign only**. Do not remove, downgrade, rename, replace, or break existing features.

---

## 2. Required Workflow Before Coding

Before changing any code:

1. Inspect the existing repository structure, current parent home screen, routes, navigation setup, data sources, and reusable UI components.
2. Inspect the Figma handoff and all assets exported from `03_ASSETS`.
3. Identify which existing routes, handlers, and data sources power each approved UI destination.
4. Reply with a concise implementation plan that identifies:
   - files expected to change;
   - existing functionality that will be preserved;
   - asset-to-screen mapping;
   - how the fixed shell and scrollable content area will be implemented;
   - any missing assets or unresolved mapping questions.
5. Do **not** make implementation changes until that plan is approved.

If an approved exact asset is missing from the provided assets, report it. Do not replace it with a generated, generic, or approximate alternative.

---

## 3. General Rules

- The app is RTL.
- Preserve all existing product logic, routes, handlers, state management, API calls, backend behavior, database behavior, loading states, empty states, error states, and navigation behavior.
- Do not invent product features that do not already exist.
- Do not remove existing functionality merely because it is not visually prominent in the approved home-screen design.
- Use exact exported Figma assets whenever they exist.
- Do not approximate important branded assets when an approved exact asset exists.
- Keep interactive and dynamic product elements as live code components.
- Keep approved decorative assets as exact static visual assets.
- Preserve the approved spacing, hierarchy, layering, typography, visual intent, RTL order, and component proportions from Figma.
- Do not implement browser chrome, Safari controls, device status bars, or other non-app UI as part of the app.

---

## 4. Visual Direction

- Warm nursery UI.
- Cream / off-white background.
- Soft sage-green decorative elements.
- Gentle peach and warm accent colors.
- Rounded white cards.
- Soft, premium, child-friendly look.
- Clean RTL hierarchy.
- Minimal, subtle shadows.
- Avoid harsh borders, dark shadows, generic dashboard styling, or unapproved generic gradients.

---

## 5. Responsive Phone Layout

The Figma reference device is `393 × 852`. It is a visual reference, not a device-specific fixed layout.

### Supported layout range
- Support portrait phones from `360px` to `430px` logical width.
- Do not scale the entire UI proportionally.
- Preserve the same visual hierarchy, spacing system, typography hierarchy, and component proportions.

### Horizontal layout
- Use `16px` screen gutters on both sides.
- Main cards, the Quick Actions grid, the Child Attention Banner, and Bottom Navigation use:

```text
width = screen width - 32px
```

- Do not hardcode a `361px` width in implementation.
- Do not create horizontal scrolling.
- Cards must not overflow or clip text.

### Safe areas
Use `react-native-safe-area-context`.

- Do not rely on fixed physical top or bottom screen coordinates.
- Respect the iPhone Dynamic Island / status area, iPhone Home Indicator, and Android system navigation area.
- Use top and bottom safe-area insets as part of placement calculations.

---

## 6. Persistent Post-Login UI

The following controls remain visible after login and do not appear on the login screen:

- Top-left Menu button.
- Top-right Notifications button.
- Bottom Navigation.

Preserve all existing navigation destinations and route behavior.

---

## 7. Home Screen Structure

The approved Parent Home screen uses a fixed dashboard shell with a dedicated scrollable content area.

```text
Parent Home Screen
  Fixed Hero Section
  Fixed Hero Corner Buttons
  Fixed Floating Today Summary Card
  Scrollable Main Content
    3×3 Quick Actions Grid
    Child Attention Banner
  Fixed Bottom Navigation
```

Do **not** implement:

- a separate Child Summary Card;
- Latest Photos preview section;
- Kindergarten Announcements preview section;
- Upcoming Events preview section.

Those destinations are reached through approved Quick Actions and their existing routes.

---

## 8. Screen Scroll Behavior

The approved screen uses the following scroll architecture.

### Fixed
- Hero Section.
- Hero Corner Buttons.
- Today Summary Card.
- Bottom Navigation.

### Scrolls
- Main Content only:
  - 3×3 Quick Actions Grid.
  - Child Attention Banner.

The scrollable Main Content must move beneath the fixed Hero, Today Summary Card, and Bottom Navigation.

Do **not** make the Hero, Today Summary Card, or Bottom Navigation scroll with Main Content.

### Scrollable content padding
Add sufficient bottom padding to Main Content so the complete Child Attention Banner can scroll above the fixed Bottom Navigation.

Use:

```text
Bottom navigation visual height
+ device bottom safe-area inset
+ 16px breathing room
```

Do not allow the banner CTA or banner content to remain hidden behind the fixed navigation.

---

## 9. Hero Section

### Hero artwork
Use the exact approved **Hero Background Artwork** asset exported from Figma.

- The Hero artwork contains baked Hebrew heading and subtitle text.
- Do not recreate the baked Hebrew heading or subtitle as code.
- Do not generate a replacement image.
- Do not approximate, redraw, crop inconsistently, or reconstruct the Hero artwork.
- Keep Hero artwork as a static branded visual asset.
- Implement only interactive and dynamic UI elements above it as live components.

### Hero overlay
Hero Overlay is a live visual layer, not an exported image asset.

- Implement it as an absolutely positioned `View` or `LinearGradient`.
- Preserve the approved Figma fill, opacity, gradient direction, placement, and coverage.
- It must remain above Hero Background Artwork and below Hero Corner Decor.
- Do not bake the overlay effect into Hero Background Artwork.

### Hero corner decor
Use the exact exported SVG asset:

```text
hero-corner-decor-mobile.svg
```

Rules:

- This one SVG already includes both approved Hero corner decorations.
- Render the SVG once as one full-width absolute layer over the Hero artwork.
- Do not mirror, duplicate, split, reposition, recolor, redraw, or recreate either shape.
- Do not recreate the decor with CSS, generated SVG, border-radius shapes, generic gradients, or approximate colors.
- Preserve the original vector paths, gradient stops, radial highlight, opacity values, geometry, dimensions, and placement.

### Hero layering order
Inside the Hero area, use this visual layer order from top to bottom:

```text
1. Top action buttons
2. Notification badge, when applicable
3. Hero corner decor SVG
4. Hero overlay
5. Hero background artwork
```

---

## 10. Top Action Safe Area Rule

The Figma Y position of Menu and Notifications controls is `18px` from the **safe content boundary**, not from the physical screen top.

In React Native / Expo, place them using:

```ts
top: insets.top + 18
```

Do not use a fixed `top: 18` relative to the physical screen.

---

## 11. Top Action Buttons

Menu and Notifications are persistent top controls.

### Visual specifications
- Visible size: `34 × 34px`.
- Corner radius: `10px`.
- White fill at `96%` opacity.
- No stroke.
- Very subtle shadow:

```text
0px 2px 8px 0px rgba(31, 58, 43, 0.10)
```

- Preserve their small approved visual appearance.

### Interaction requirements
- Actual code tap target: at least `44 × 44px`.
- Keep the larger tap target visually invisible.
- Do not visually enlarge the controls beyond `34 × 34px`.

### Icon rules
- Use the approved exact exported Menu and Bell SVG assets from Figma when they are provided.
- Do not use emoji, Unicode glyphs, or unrelated substitute icons.
- Preserve approved icon color, stroke width, size, and visual centering.

---

## 12. Notification Badge

The notification badge is conditional and dynamic.

- Render it only when `unreadCount > 0`.
- When `unreadCount = 0`, do not render a badge and do not reserve visual space for it.
- Position it relative to the Notifications button.
- Display the live unread notification count.
- Cap very large values at `99+` when appropriate.
- Do not bake a notification count into the Bell icon or Hero artwork.

---

## 13. Today Summary Card

Implement exactly one floating **Today Summary Card**.

- Do not implement a separate Child Summary Card.
- The Today Summary Card visually overlaps the transition between Hero and Main Content.
- It appears above both Hero and Main Content.
- Preserve approved white fill, rounded corners, soft shadow, overlap, spacing, and RTL hierarchy.

### Figma reference values
These values are visual-reference values only, not fixed implementation coordinates:

```text
X: 16
Y: 318
Width: 361
Height: 140
```

Use responsive layout behavior rather than hardcoded values tied only to the `393px` reference screen.

### Required summary items
The card contains exactly these four live items in this **RTL visual order**:

1. אירועים קרובים
2. הודעות חדשות
3. נוכחות החודש
4. ילדים בגן

### Suggested data mapping
- **אירועים קרובים**: number of upcoming events or next-event context.
- **הודעות חדשות**: unread announcements or messages count.
- **נוכחות החודש**: number of attendance days for the current month.
- **ילדים בגן**: current children count out of total enrolled children.

Use real product data and existing data sources. Do not replace these labels with unrelated concepts or reference-only metrics.

Use the approved summary illustrations exactly when available.

---

## 14. Quick Actions

Use a complete **3 × 3 Quick Actions Grid**.

### Required RTL visual order

#### Row 1
- סיכום יום
- טפסים ומסמכים
- לוח שנה

#### Row 2
- תמונות מהיום
- מצלמות לייב
- אלבומים

#### Row 3
- הודעות מהגן
- הצעות מהגן
- צור קשר עם הגן

### Quick Action rules
- Preserve each item’s existing route, handler, and real functionality.
- Use the approved exact illustration asset for each action when available.
- Do not replace real features with visually similar but incorrect labels.
- Do not duplicate actions.
- Do not leave an empty grid position.
- Keep the approved Figma hierarchy, card sizes, spacing, soft shadows, typography, and illustration treatment.
- Keep the grid at three columns throughout the supported `360px–430px` phone-width range.
- Calculate card widths from available screen width and fixed approved gaps.
- Text may wrap only within its approved limits. Do not allow clipping or overflow.

---

## 15. Child Attention Banner

After the 3 × 3 Quick Actions Grid, show one compact child-related notice banner based on the approved Figma reference.

### Dynamic title
The Figma text:

```text
היום של לביא
```

is visual sample content only.

In code, render:

```text
היום של {childName}
```

Use the existing child data source and current child-selection logic. Do not hardcode `לביא`.

### Dynamic content
The banner can show real, child-related information such as:

- a pending form or document;
- a reminder requiring parent attention;
- a child-specific update.

Use only real available data and existing product behavior.

### Banner illustration
- Use the exact exported banner illustration from Figma for the left side of the banner.
- Do not recreate, replace, or approximate it in code.
- Keep it decorative and non-interactive unless an approved existing behavior requires otherwise.

### Banner behavior
- Provide an existing valid route or action to view the relevant full content.
- Preserve the approved visual hierarchy and treatment.
- Ensure the complete banner, including its CTA, can scroll above the fixed Bottom Navigation.

---

## 16. Bottom Navigation

### General
- Preserve existing Bottom Navigation functionality, routes, handlers, and navigation behavior.
- Bottom Navigation remains fixed above the bottom safe area while Main Content scrolls.
- Position it with `left: 16px` and `right: 16px` / equivalent responsive layout behavior.
- Its width adapts to the available phone width.
- Keep it clear of the iPhone Home Indicator and Android navigation area.
- Preserve approved visual dimensions, rounded white navigation surface, subtle shadow, icon treatment, and RTL order.

### Home button state
The central Home button is always the primary green elevated button.

- Do not move the elevated green treatment to another tab.
- The Home button remains visually green, centered, elevated, and labeled `בית` on every post-login screen.
- Do not change the navigation structure or central Home-button hierarchy.

### Current secondary-tab state
When the user is on a non-home destination:

- Preserve the central green Home button.
- Indicate the current secondary tab with a subtle state only:
  - darker sage icon and label;
  - and/or a small subtle indicator.
- Do not add a large selected-card background to secondary tabs.
- Do not alter navigation height, structure, or spacing.

---

## 17. Exact Asset Requirements

Use assets exported from Figma `03_ASSETS`.

At minimum, confirm availability and map the exact source file for:

```text
Hero
- hero-background-artwork-mobile
- hero-corner-decor-mobile.svg
- menu icon
- notification bell icon

Banner
- child-banner-toys-illustration

Today Summary
- upcoming events illustration
- new notifications illustration
- monthly attendance illustration
- children in kindergarten illustration

Quick Actions
- daily summary illustration
- forms and documents illustration
- calendar illustration
- today photos illustration
- live cameras illustration
- albums illustration
- kindergarten announcements illustration
- kindergarten suggestions illustration
- contact kindergarten illustration
```

Rules:

- Use the actual exported files and exact final filenames supplied with the Figma handoff.
- If one is not available locally, report it before implementation.
- Do not silently substitute a generic icon, stock illustration, AI-generated image, CSS drawing, or custom recreation.
- Decorative assets remain non-interactive.
- Dynamic product content and controls remain live components.

---

## 18. Content Mapping Rule

Use the approved visual language, layout hierarchy, and screen structure from Figma, but use only real product features and real product content.

- Do not copy feature content blindly from older references.
- Do not add features that are not part of the actual product.
- Preserve existing feature routes and behavior.
- Keep the UI-only redesign separate from product-scope changes.

---

## 19. Content That Must Not Appear

Do not include:

- העלאת חוזה.
- חוזים, unless a real existing product flow explicitly requires them elsewhere.
- Duplicate `צור קשר עם הגן` actions.
- `ילדים בגן` as a separate Quick Action.
- Separate Latest Photos, Kindergarten Announcements, or Upcoming Events preview sections on the home screen.
- Any feature that does not exist in the current product.
- Browser controls, device status bars, or browser chrome as app UI.

---

## 20. Implementation Behavior

- Use exact exported assets whenever possible.
- Do not redraw branded shapes manually in code.
- Do not use generic gradients, generic icon libraries, or substitute illustrations when an exact approved asset exists.
- Preserve approved placement, overlap behavior, spacing, and layer order.
- Keep decorative assets non-interactive.
- Keep dynamic data and interactive controls as live components.
- Preserve existing loading, empty, error, permissions, navigation, and data-fetching behavior unless a UI-only change is explicitly approved.
- Do not hardcode the Figma `393px` layout as a device-only implementation.

---

## 21. Final Implementation Checklist

Before considering the Parent Home redesign complete, verify all of the following:

### Structure and behavior
- [ ] RTL layout is correct.
- [ ] Existing product logic, routes, handlers, APIs, data flows, loading states, empty states, and error states still work.
- [ ] No existing feature was removed, renamed, or broken.
- [ ] Only Main Content scrolls.
- [ ] Hero Section, Hero Corner Buttons, Today Summary Card, and Bottom Navigation remain fixed.
- [ ] Child Attention Banner can scroll fully above Bottom Navigation.

### Hero and top controls
- [ ] Hero artwork is the approved exact exported asset.
- [ ] Baked Hero heading and subtitle are not recreated in code.
- [ ] Hero Corner Decor uses the exact approved SVG as one asset containing both shapes.
- [ ] Hero Overlay is live and positioned between Hero artwork and Hero Corner Decor.
- [ ] Menu and Notifications controls remain visually `34 × 34px`.
- [ ] Menu and Notifications controls have invisible `44 × 44px` or larger tap targets.
- [ ] Safe-area handling prevents collisions with device status areas.
- [ ] Notification badge appears only when `unreadCount > 0`.

### Cards and actions
- [ ] There is no separate Child Summary Card.
- [ ] Today Summary Card contains exactly the four approved summary items in RTL order.
- [ ] The Quick Actions area is a complete `3 × 3` grid with all nine approved actions.
- [ ] Quick Actions use real existing routes and functionality.
- [ ] No contract-upload feature appears.
- [ ] No duplicate contact action appears.
- [ ] No extra preview sections appear on the Home screen.
- [ ] The Child Attention Banner title renders dynamically as `היום של {childName}`.

### Navigation and responsiveness
- [ ] Bottom Navigation remains fixed after login.
- [ ] Central Home button remains green, elevated, centered, and visually primary on every post-login screen.
- [ ] Secondary active-tab treatment is subtle and does not replace the central Home treatment.
- [ ] UI supports portrait widths from `360px` to `430px`.
- [ ] No horizontal scrolling, clipping, or overflow occurs.
- [ ] Bottom Navigation stays clear of iPhone Home Indicator and Android system-navigation areas.
- [ ] No browser chrome or device status bar is implemented as app UI.
