# 08 - Parent Home Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך בית הורה.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/parent-home-approved-direction.png
```

## Screen Name

Parent Home

## Route

```text
/parent/home
```

## Purpose

מסך זה הוא מסך הבית הראשי של ההורה.

המטרה שלו היא לתת להורה תמונת מצב אישית, ברורה ונעימה לגבי הילד שלו, בלי להעמיס עליו יותר מדי מידע ובלי להרגיש כמו מערכת ניהול.

המסך צריך לאפשר להורה להבין במהירות:

- מה מצב הילד בגן.
- מה היה היום בגן.
- אילו עדכונים חשובים יש מהגן.
- האם יש חוזה שממתין לחתימה.
- אילו פעולות חשוב לבצע עכשיו.

## Main UX Goals

- ליצור חוויה אישית וחמה להורה.
- למקד את המסך בילד של ההורה.
- לאפשר גישה מהירה לסיכום יום.
- לאפשר דיווח היעדרות.
- להבליט התראה על חוזה שממתין לחתימה.
- להציג חדשות ועדכונים מהגן.
- להציג תמונות אחרונות מהגן.
- לשמור על חוויה רגועה, נקייה ולא טכנית.

## Target User

- הורה לילד בגן

## Visual Direction

המסך משתמש באותה שפה ויזואלית של גן נונה בנונה, אך עם דגש יותר אישי ופחות ניהולי.

הכיוון הוויזואלי:

- רקע קרם-ירקרק רך.
- כרטיסים לבנים-חמימים, לא לבן בוהק.
- Hero illustration אישי של הורה וילד.
- פחות תחושת "דשבורד ניהולי", יותר תחושת "אפליקציה אישית למשפחה".
- כרטיסים גדולים וברורים.
- תמונות ועדכונים רכים ונעימים.
- כפתורי פעולה ברורים ולא רבים מדי.

## Important Visual Note

ה-Hero image במסך זה צריך להיות אישי יותר.

הכיוון המאושר:

- הורה וילד יחד.
- אווירה ביתית / נעימה.
- קשר אישי וחם.
- תחושה שהאפליקציה מיועדת למשפחה, לא רק לצוות הגן.

This screen is for the parent side.

It is not:

- Teacher dashboard.
- Children management screen.
- Contracts management screen.
- Messages management screen.

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

- תפריט בצד שמאל.
- אייקון התראות בצד ימין עם badge.
- ברכה אישית.
- Hero illustration של הורה וילד.
- כרטיס קטן עם שם הילד.

### Greeting Title

```text
שלום, רוני!
```

### Supporting Greeting Text

```text
כיף שבאת הביתה
```

### Child Summary Card

The compact child card includes:

- Child avatar.
- Child name.
- Small descriptor / age.

Example:

```text
יובל לוי
גן ניצנים
```

Note:
בפיתוח אפשר להחליף את "גן ניצנים" במידע רלוונטי יותר כמו קבוצה / שם הילד בלבד, אבל כרגע זה הכיוון שאושר בתמונה.

## Top Stats Cards

מתחת לאזור העליון מופיעים 4 כרטיסי סיכום קצרים.

### Cards

#### 1. אירועים קרובים

- Label: `אירועים קרובים`
- Value: `2`
- Supporting text: `בשבוע הקרוב`

#### 2. תשלומים

- Label: `תשלומים`
- Value: `1`
- Supporting text: `לתשלום`

#### 3. הודעות חדשות

- Label: `הודעות חדשות`
- Value: `3`
- Supporting text: `חדשות`

#### 4. נוכחות החודש

- Label: `נוכחות החודש`
- Value: `18/20`
- Supporting text: `ימים`

## Today in the Daycare Section

### Section Title

```text
היום בגן
```

### Purpose

להציג להורה את סדר היום / הפעילויות שבוצעו היום בגן בצורה נעימה וקלה להבנה.

### Activity Cards

כל פעילות תוצג ככרטיס הכולל:

- שעה.
- תמונה / איור.
- שם הפעילות.
- תיאור קצר.

### Example Activities

#### 1. משחק בנייה

```text
09:30
משחקי קונסטרוקציה
```

#### 2. סיפור בקבוצה

```text
11:00
הקראה
```

#### 3. יצירה צבעונית

```text
13:15
פעילות יצירה
```

#### 4. משחק בחצר

```text
15:00
פעילות חוץ
```

## Recent Photos Section

### Section Title

```text
תמונות אחרונות
```

### Purpose

להראות להורה תמונות חדשות ועדכניות מהיום או מהימים האחרונים.

### Content

- 3 תמונות תצוגה מקדימה.
- כפתור / קישור לצפייה בכל התמונות.

### CTA

```text
צפייה בכל התמונות
```

בשלב הראשון זה יכול להיות placeholder.

## Daycare Messages Section

### Section Title

```text
הודעות מהגן
```

### Purpose

להציג להורה הודעות חשובות ומסודרות מהגן.

### Example Messages

#### 1. טיול אביב

```text
12.05.2025
ביום שלישי הקרוב נצא לטיול בגן החיות
```

#### 2. חג חיות

```text
08.05.2025
החוג יתקיים ביום ראשון ב-16:30
```

#### 3. עדכון חשוב

```text
05.05.2025
שינוי בשעת קבלת הילדים בבוקר
```

### CTA

```text
לכל ההודעות
```

## Main Action Cards

בתחתית המסך, מעל הניווט, מופיעים כרטיסי פעולה מהירים.

### Actions

#### 1. צור קשר עם הגן

Label:

```text
צור קשר עם הגן
```

#### 2. טפסים ומסמכים

Label:

```text
טפסים ומסמכים
```

#### 3. לוח שנה

Label:

```text
לוח שנה
```

#### 4. פרופיל

Label:

```text
פרופיל
```

## Important Parent Actions That Must Exist

מבחינת המוצר, במסך בית הורה או בקרבתו חייבות להיות 3 פעולות חשובות:

### 1. צפייה בסיכום יום

This can be:

- entry from the `היום בגן` section, or
- a dedicated CTA later.

### 2. דיווח היעדרות

This can appear:

- as a main quick action in a later refined version, or
- via dedicated Absence Report screen linked from the parent area.

Route:

```text
/parent/absence-report
```

### 3. חתימה על חוזה

If there is a pending contract, the parent side must surface it clearly.

This can appear:

- as a dedicated alert card near the top, or
- via `טפסים ומסמכים`.

Route:

```text
/parent/contract-renewal
```

Important:
Even though the approved image focuses on general parent home content, the product requirement for contract signing still stands.

## Contract Alert Requirement

In implementation, if a pending contract exists, show a prominent contract alert card.

Suggested Hebrew text:

```text
חוזה חדש ממתין לחתימה
```

Supporting text:

```text
יש לעיין בחוזה ולחתום עליו בהקדם
```

CTA:

```text
חתימה על חוזה
```

This alert may not be strongly visible in the current mockup, but it is a required product behavior.

## Parent Bottom Navigation

Unlike the teacher side, the parent bottom navigation can be parent-oriented.

The approved visual direction suggests:

```text
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל
```

However, for the parent side, we may later refine the naming or structure if needed.

For now, keep the visual order as shown in the approved mockup:

```text
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל
```

With:

- `בית` as the center active raised green item.
- Same general sizing and layout style.

## Components to Use

- `AppScreen`
- `AppCard`
- `AppButton`
- `HeroImage`
- `SummaryStatCard`
- `ActivityPreviewCard`
- `PhotoPreviewGrid`
- `MessagePreviewCard`
- `QuickActionCard`
- `ParentBottomNavBar`

If `ParentBottomNavBar` is not separated from the teacher bottom nav yet, the first skeleton phase may reuse the same bottom nav component, with future refinement later.

## Assets

### Visual Reference

```text
assets/design-references/parent-home-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/parent-home-hero.png
```

The practical hero image should include only the illustrated parent-child scene, not the UI cards or text.

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All cards and buttons must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not implement real photo upload here.
- Do not connect a signing provider here.
- Do not send real notifications or messages.
- Keep the parent experience calm and simple.

## Suggested Mock Data

### Child Summary

```ts
export const MOCK_PARENT_CHILD = {
  id: "1",
  name: "יובל לוי",
  subtitle: "גן ניצנים",
  avatar: "yuval.png"
};
```

### Parent Stats

```ts
export const MOCK_PARENT_STATS = {
  upcomingEvents: 2,
  paymentsDue: 1,
  newMessages: 3,
  monthlyAttendance: "18/20"
};
```

### Today Activities

```ts
export const MOCK_PARENT_TODAY_ACTIVITIES = [
  {
    id: "1",
    time: "09:30",
    title: "משחק בנייה",
    description: "משחקי קונסטרוקציה",
    image: "building-play.png"
  },
  {
    id: "2",
    time: "11:00",
    title: "סיפור בקבוצה",
    description: "הקראה",
    image: "story-group.png"
  },
  {
    id: "3",
    time: "13:15",
    title: "יצירה צבעונית",
    description: "פעילות יצירה",
    image: "creative-art.png"
  },
  {
    id: "4",
    time: "15:00",
    title: "משחק בחצר",
    description: "פעילות חוץ",
    image: "yard-play.png"
  }
];
```

### Parent Messages

```ts
export const MOCK_PARENT_MESSAGES = [
  {
    id: "1",
    date: "12.05.2025",
    title: "טיול אביב",
    description: "ביום שלישי הקרוב נצא לטיול בגן החיות"
  },
  {
    id: "2",
    date: "08.05.2025",
    title: "חוג חיות",
    description: "החוג יתקיים ביום ראשון ב-16:30"
  },
  {
    id: "3",
    date: "05.05.2025",
    title: "עדכון חשוב",
    description: "שינוי בשעת קבלת הילדים בבוקר"
  }
];
```

## Behavior

### Open Today Summary

The `היום בגן` cards can lead later to:

```text
/parent/daily-summary
```

In the first skeleton phase, they can be static or placeholder only.

### Open All Photos

On pressing:

```text
צפייה בכל התמונות
```

Skeleton phase:

- Placeholder only.

Future behavior:

- Navigate to parent gallery screen.

### Open All Messages

On pressing:

```text
לכל ההודעות
```

Skeleton phase:

- Placeholder only.

Future behavior:

- Navigate to parent messages screen.

### Report Absence

Must exist in the parent journey.

Route:

```text
/parent/absence-report
```

In the first skeleton phase, this can be exposed via a button or a later linked card.

### Sign Contract

If a pending contract exists:

- Show alert card.
- CTA opens:

```text
/parent/contract-renewal
```

## Accessibility Notes

- Text must be readable and not too dense.
- Cards must be large enough for touch.
- Photos must include textual context nearby.
- Important alerts like pending contracts must be visible and not rely only on icon/color.
- Keep good spacing for mobile screens.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Parent Home screen according to docs/ui-screens/08-parent-home.md and the visual reference assets/design-references/parent-home-approved-direction.png.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- greeting and child summary
- parent stat cards
- today in daycare section
- recent photos section
- daycare messages section
- quick action cards
- bottom navigation

Use mock data only.

Do not connect Supabase.
Do not implement real photo upload.
Do not connect any signing provider.
Do not send real notifications.

Important:
If a pending contract exists, show a prominent alert card with a CTA to /parent/contract-renewal.
Also ensure there is a path to /parent/absence-report.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The screen is warm, friendly, and suitable for the parent side.
- The parent-child hero image works well and differentiates the parent experience from the teacher experience.
- The current image is stronger on general daily content than on contract visibility, so implementation must explicitly add a pending-contract alert when needed.
- In later iterations, the parent bottom navigation may be refined separately from the teacher side.
