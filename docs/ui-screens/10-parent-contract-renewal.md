# 10 - Parent Contract Renewal / Signature Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך חתימה / חידוש חוזה בצד ההורה.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/parent-contract-renewal-approved-direction.png
```

## Screen Name

Parent Contract Renewal / Signature

## Route

```text
/parent/contract-renewal
```

## Purpose

מסך זה מאפשר להורה לצפות בפרטי חוזה שממתין לחתימה, לעיין במסמך, ולבצע חתימה דיגיטלית דרך ספק חתימה חיצוני.

המטרה היא ליצור תהליך ברור, רגוע ואמין:

- ההורה מבין איזה חוזה ממתין לו.
- ההורה רואה עבור איזה ילד החוזה.
- ההורה רואה את תקופת החוזה.
- ההורה יכול לצפות במסמך לפני חתימה.
- ההורה לוחץ על כפתור חתימה ברור.
- החתימה עצמה תתבצע דרך ספק חתימה חיצוני.

## How Parent Reaches This Screen

ההורה מגיע למסך זה ממסך בית הורה.

### Primary Access Option

אם קיים חוזה שממתין לחתימה, במסך בית הורה צריך להופיע כרטיס התראה בולט:

```text
חוזה חדש ממתין לחתימה
```

CTA:

```text
עיון וחתימה
```

לחיצה על הכפתור תוביל אל:

```text
/parent/contract-renewal
```

### Secondary Access Option

ההורה יכול להגיע למסך גם דרך הכרטיס:

```text
טפסים ומסמכים
```

מתוך אזור המסמכים, חוזה שממתין לחתימה יוביל לאותו מסך.

## Main UX Goals

- לאפשר להורה להבין במהירות שיש חוזה שממתין לחתימה.
- להציג את פרטי החוזה בצורה פשוטה.
- לאפשר צפייה במסמך לפני חתימה.
- להבליט את פעולת החתימה.
- לשמור על תחושת אמון וביטחון.
- להבהיר שהחתימה תתבצע דיגיטלית.
- לא להעמיס על ההורה במידע טכני או משפטי מיותר.

## Target User

- הורה לילד בגן

## Visual Direction

המסך ממשיך את השפה הוויזואלית של צד ההורה:

- רקע קרם-ירקרק רך.
- Hero אישי של הורה וילד.
- כרטיסים לבנים-חמימים.
- טקסטים ברורים.
- היררכיה רגועה.
- כפתור חתימה ירוק ובולט.
- תחושה אמינה, לא מלחיצה ולא משפטית מדי.

## Important Visual Note

המסך צריך להישאר **מסך אפליקציה בלבד**.

אין להוסיף:

- הוראות צדדיות.
- טבלת אפיון.
- טקסטי UX.
- מסמך הסבר.
- עמוד documentation.

The approved image is a pure app screen.

## Branding Source

כל המיתוג חייב להגיע מתוך:

```text
src/config/client.config.ts
```

שדות רלוונטיים:

```ts
clientId: "nuna-banuna"
appName: "גן נונה בנונה"
daycareName: "גן נונה בנונה"
primaryColor: "#7A9A72"
secondaryColor: "#F4D6C6"
backgroundColor: "#FFF8F1"
```

אין לקודד את שם הגן ישירות במסך, אלא למשוך אותו מתוך ה-config.

## Top Header Area

האזור העליון כולל:

- אייקון התראות בצד שמאל עם badge.
- כפתור חזרה בצד ימין.
- כותרת מרכזית.
- תת-כותרת.
- Hero illustration של הורה וילד.

### Title

```text
חוזה הגן
```

### Subtitle

```text
חידוש / חתימה על חוזה
```

## Child Summary Card

מתחת ל-Hero מופיע כרטיס קטן עם פרטי הילד.

### Content

- Avatar של הילד.
- שם הילד.
- שם הקבוצה / הגן.
- חץ קטן לפתיחה אם בעתיד יש כמה ילדים.

### Example

```text
יובל לוי
גן ניצנים
```

## Contract Status Card

### Section Label

```text
סטטוס החוזה
```

### Main Status

```text
ממתין לחתימה
```

### Contract Name

```text
חוזה לשנת תשפ״ו 2025/2026
```

### Contract Period

```text
בתוקף החל מ- 01.09.2025 עד 31.08.2026
```

### Status Icon

- Clock icon.
- Orange color.

## Contract Details Card

### Section Title

```text
פרטי החוזה
```

### Fields

#### Activity Year

Label:

```text
שנת פעילות
```

Value:

```text
2025/2026
```

#### Contract Period

Label:

```text
תקופת החוזה
```

Value:

```text
01.09.2025 - 31.08.2026
```

#### Child Name

Label:

```text
ילד/ה
```

Value:

```text
יובל לוי
```

#### Activity Days

Label:

```text
מספר ימי פעילות בשבוע
```

Value:

```text
5 ימים
```

## Contract Document Card

### Section Title

```text
מסמך החוזה
```

### File Name

```text
חוזה_גן_נונה_בנונה_תשפ״ו.pdf
```

### File Size

```text
1.2 MB
```

### CTA

```text
צפייה במסמך
```

### Behavior

Skeleton phase:

- Show placeholder alert:
  `צפייה במסמך תתווסף בהמשך`

Future behavior:

- Open PDF preview.
- The parent should be able to read the contract before signing.

## Signature Card

### Section Title

```text
חתימה על החוזה
```

### Explanation Text

```text
לאחר קריאת החוזה, ניתן לחתום עליו דיגיטלית.
```

### Primary Button

```text
חתום על החוזה
```

### Icon

```text
Pen / signature icon
```

### Behavior

Skeleton phase:

- Show placeholder alert:
  `החתימה הדיגיטלית תיפתח דרך ספק חתימה חיצוני`

Future behavior:

- Open external signing provider link.
- After signing, return to app or update status through webhook.

## Additional Information Card

### Section Title

```text
מידע נוסף
```

### Text

```text
ניתן לפנות אל הגן בכל שאלה או הבהרה בנוגע לחוזה.
```

### Secondary Button

```text
צור קשר עם הגן
```

### Behavior

Skeleton phase:

- Placeholder only.

Future behavior:

- Open contact options:
  - phone
  - WhatsApp
  - message to daycare

## Parent Bottom Navigation

Use the parent side bottom navigation.

Approved visual order:

```text
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל
```

Rules:

- `בית` is the center active raised green item.
- Keep the same visual language as Parent Home.
- Parent navigation can later be separated from Teacher Navigation if needed.

## Components to Use

- `AppScreen`
- `AppCard`
- `AppButton`
- `HeroImage`
- `StatusBadge`
- `ChildSummaryCard`
- `ContractStatusCard`
- `ContractDetailsCard`
- `DocumentPreviewCard`
- `SignatureActionCard`
- `ParentBottomNavBar`

If these components do not exist yet, create reusable components where appropriate.

## Assets

### Visual Reference

```text
assets/design-references/parent-contract-renewal-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/parent-contract-renewal-hero.png
```

The practical hero image should include only the illustrated parent-child contract scene, not the UI cards, buttons, or bottom navigation.

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All buttons must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not implement real PDF preview yet.
- Do not connect a real signing provider yet.
- Do not send real emails.
- Do not build an internal legal signing engine.
- Signing must eventually be handled by an external provider.

## Suggested Mock Data

```ts
export const MOCK_PARENT_CONTRACT = {
  id: "contract-1",
  childId: "child-1",
  childName: "יובל לוי",
  childGroup: "גן ניצנים",
  status: "pending_signature",
  title: "חוזה לשנת תשפ״ו 2025/2026",
  activityYear: "2025/2026",
  periodStart: "01.09.2025",
  periodEnd: "31.08.2026",
  activityDaysPerWeek: 5,
  fileName: "חוזה_גן_נונה_בנונה_תשפ״ו.pdf",
  fileSize: "1.2 MB"
};
```

## Status Mapping

### Pending Signature

Internal status:

```text
pending_signature
```

Hebrew label:

```text
ממתין לחתימה
```

Color:

```text
orange
```

### Signed

Internal status:

```text
signed
```

Hebrew label:

```text
נחתם
```

Color:

```text
green
```

### Expired

Internal status:

```text
expired
```

Hebrew label:

```text
פג תוקף
```

Color:

```text
red
```

## Behavior

### Back Button

On press:

- Navigate back to Parent Home or previous screen.

Suggested route:

```text
/parent/home
```

### View Document

On pressing:

```text
צפייה במסמך
```

Skeleton phase:

- Show placeholder alert.

Future behavior:

- Open PDF preview screen or modal.

### Sign Contract

On pressing:

```text
חתום על החוזה
```

Skeleton phase:

- Show placeholder alert.

Future behavior:

```text
Open external signing provider URL
→ Parent signs
→ Provider updates status
→ App shows signed confirmation
```

### Contact Daycare

On pressing:

```text
צור קשר עם הגן
```

Skeleton phase:

- Placeholder only.

Future behavior:

- Open phone / WhatsApp / message options.

## Future Signing Provider Flow

```text
Teacher uploads PDF
→ Teacher selects child and parent
→ App creates signing request with provider
→ Parent sees pending contract in Parent Home
→ Parent opens Contract Renewal screen
→ Parent views document
→ Parent clicks Sign Contract
→ External provider handles signing
→ Provider sends status update
→ App updates status to signed
```

## Accessibility Notes

- Primary button must be large and clear.
- Do not rely only on orange status icon; include text `ממתין לחתימה`.
- File preview must be clearly separated from signing action.
- Explanation text should be short and readable.
- The user should not feel forced to sign before viewing the document.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Parent Contract Renewal / Signature screen according to docs/ui-screens/10-parent-contract-renewal.md and the visual reference assets/design-references/parent-contract-renewal-approved-direction.png.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- child summary card
- contract status card
- contract details card
- document preview card
- signature action card
- additional information/contact card
- parent bottom navigation

Use mock data only.

Do not connect Supabase.
Do not implement real PDF preview.
Do not connect any real signing provider.
Do not send emails.

Important:
This screen is reached from Parent Home through:
1. Pending contract alert card with CTA `עיון וחתימה`.
2. `טפסים ומסמכים`.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The final approved mockup is a clean app screen only.
- Do not use the earlier rejected documentation-style images.
- The screen clearly separates document preview from digital signing.
- The design is appropriate for parent-side use: simple, warm, and trustworthy.
