# 05 - Daily Summary / Daily Report Overview Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך סיכום יום.

הערה חשובה:
המסך הזה מגדיר כיוון רחב יותר מהרעיון המקורי של "סיכום יום לילד".
במקום טופס אישי בלבד, המסך הנוכחי הוא מסך **סיכום יום כללי לגן**, שמרכז:

- נוכחות.
- פעילויות מרכזיות.
- הודעות להורים.
- הערות מהיום.
- מה אכלנו היום.

בהמשך, מסך סיכום אישי לילד יכול להיות מסך משנה מתוך המסך הזה.

## Visual Reference

```text
assets/design-references/daily-summary-approved-direction.png
```

## Related Shared Component Specs

This screen must also follow:

```text
docs/ui-screens/00-bottom-navigation.md
```

The bottom navigation must be implemented using the shared `BottomNavBar` component.

If the visual mockup and `00-bottom-navigation.md` differ, the shared component spec wins.

## Screen Name

Daily Summary / Daily Report Overview

## Route

```text
/teacher/daily-report
```

## Purpose

מסך זה מאפשר לגננת לראות ולנהל את סיכום היום בגן.

המטרה היא לרכז במסך אחד את הדברים החשובים שההורים ירצו לדעת בסוף היום, ואת הדברים שהגננת צריכה לתעד:

- מי הגיע.
- אילו פעילויות היו.
- אילו הודעות נשלחו.
- אילו הערות חשובות היו.
- מה הילדים אכלו.

## Main UX Goals

- לאפשר לגננת לנהל את סיכום היום בצורה ברורה.
- לאפשר בחירה או הצגה של פעילויות מרכזיות.
- להפחית כתיבה ידנית יומית.
- לאפשר שימוש בתבניות קבועות לפעילויות וארוחות.
- לשמור על מסך נעים, לא עמוס מדי.
- להכין בסיס לדיווח להורים.
- לשמור על אותה שפה ויזואלית של האפליקציה.

## Target User

- גננת
- מנהלת הגן
- בהמשך גם סייעת / צוות גן, לפי הרשאות

## Visual Direction

המסך ממשיך את השפה הוויזואלית של גן נונה בנונה:

- רקע קרם-ירקרק רך.
- כרטיסים לבנים-חמימים.
- Hero illustration של פעילות בגן.
- אייקונים צבעוניים ועדינים.
- כרטיסי תוכן מעוגלים.
- חלוקה ברורה לאזורים.
- Bottom Navigation אחיד לפי הקומפוננטה המשותפת.

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
- כותרת מרכזית.
- תאריך.
- Hero illustration של פעילות בגן.

### Title

```text
סיכום יום
```

### Date Example

```text
יום רביעי, 14 במאי 2025
```

בפיתוח אמיתי התאריך יהיה דינמי.

## Top Summary Cards

מתחת ל-Hero מופיעים כרטיסי סיכום קטנים.

### Cards

#### 1. נוכחות

- Label: `נוכחות`
- Value: `16`
- Supporting text: `ילדים הגיעו`
- Icon: children/group icon

#### 2. פעילויות

- Label: `פעילויות`
- Value: `3`
- Supporting text: `פעילויות`
- Icon: palette / activity icon

#### 3. ארוחות

- Label: `ארוחות`
- Value: `2`
- Supporting text: `ארוחות`
- Icon: fork/knife icon

#### 4. הודעות להורים

- Label: `הודעות להורים`
- Value: `2`
- Supporting text: `נשלחו`
- Icon: message bubble icon

## Main Activities Section

### Section Title

```text
פעילויות מרכזיות
```

### Purpose

להציג את הפעילויות המרכזיות שבוצעו היום בגן.

### Activity Cards

כל פעילות תוצג ככרטיס הכולל:

- שעה.
- תמונה / איור.
- שם הפעילות.
- תיאור קצר.

### Example Activities

#### 1. פעילות יצירה

```text
09:30
פעילות יצירה
ציור חופשי בנושא אביב
```

#### 2. סיפור בקבוצה

```text
11:00
סיפור בקבוצה
הקראנו את "הפרפר הקטן"
```

#### 3. משחק בחצר

```text
15:00
משחק בחצר
משחקי כדור ותנועה
```

## Activity Management Concept

This screen introduces an important product concept:

### Activity Catalog

The daycare should have a reusable activity catalog.

A catalog activity can include:

- Activity title.
- Category.
- Default description.
- Default image / illustration.
- Optional default time.
- Whether it is active or hidden.
- Whether it is commonly used.

### Activity Categories

Suggested categories:

- יצירה
- סיפור
- חצר
- מוזיקה
- תנועה
- משחק חופשי
- פעילות חגים
- פעילות מוטוריקה
- פעילות קוגניטיבית
- מפגש בוקר

### Daily Activity Instance

For each day, the teacher can add activities from the catalog into the daily summary.

A daily activity includes:

- Selected activity template.
- Date.
- Time.
- Optional custom title.
- Optional custom description.
- Optional custom image.
- Visibility to parents.

### Workflow for Teacher

Recommended workflow:

1. Teacher opens Daily Summary screen.
2. Presses `הוספת פעילות`.
3. Chooses from predefined activities.
4. Optionally edits description or time.
5. Saves activity to today's summary.

### MVP Approach

For the first MVP, implement simple mock behavior:

- Show 3 hardcoded activity cards.
- Later add "Add Activity" flow.
- Do not build full catalog logic yet.
- But code should be structured so Activity Catalog can be added later.

## Parent Messages Section

### Section Title

```text
הודעות להורים
```

### Purpose

להציג הודעות שנשלחו להורים במהלך היום.

### Example Content

- `16:30` נשלחה הודעה לגבי תזכורת לבגדי החלפה.
- `12:45` נשלחה הודעה על פעילות חווייתית בשבוע הבא.

### CTA

```text
צפייה בכל ההודעות
```

In the skeleton phase, this can be a placeholder.

## Daily Notes Section

### Section Title

```text
הערות מהיום
```

### Purpose

לאפשר לגננת לתעד הערות כלליות מהיום.

### Example Notes

- רוי הפגין שיתוף פעולה יפה בפעילות הבוקר.
- מיה השתלבה נהדר במשחקי החצר.
- דניאל שיפר את יכולת הריכוז בזמן הסיפור.

### CTA

```text
הוספת הערה
```

In the skeleton phase, this can be a placeholder.

## Meals Section

### Section Title

```text
מה אכלנו היום
```

### Purpose

להציג ארוחות שהיו בגן היום.

### Meal Cards

Each meal card includes:

- Meal name.
- Time.
- Description.
- Image / icon.

### Example Meals

#### 1. ארוחת בוקר

```text
08:30
דגנים, חלב, פרי חתוך
```

#### 2. ארוחת צהריים

```text
12:00
אורז, עוף, סלט
```

#### 3. ארוחת נשנוש

```text
15:30
יוגורט, פרי
```

## Food / Meal Catalog Concept

Similar to activities, meals can also use reusable templates.

### Meal Catalog

A meal template can include:

- Meal name.
- Meal type.
- Default description.
- Default image / icon.
- Allergens warning, later.
- Common usage.

### MVP Approach

For the first skeleton phase:

- Show static mock meal cards.
- Do not implement full meal catalog yet.
- Structure mock data so a future catalog can be added easily.

## Bottom Navigation

This screen must use the shared bottom navigation component.

Spec file:

```text
docs/ui-screens/00-bottom-navigation.md
```

Required visual order from left to right:

```text
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל
```

Important rules:

- `תיעוד יומי` must use the camera-style icon.
- `בית` must be the center raised green active item.
- `לוח שנה` must be right of `בית`.
- Bar height, icon sizes, spacing, and active state must match the approved shared component.
- Do not rebuild the bottom navigation separately for this screen.

## Components to Use

- `AppScreen`
- `AppCard`
- `AppButton`
- `StatusBadge`
- `HeroImage`
- `SummaryStatCard`
- `ActivityCard`
- `MessagePreviewCard`
- `DailyNoteCard`
- `MealCard`
- `BottomNavBar`

If `ActivityCard`, `MessagePreviewCard`, `DailyNoteCard`, and `MealCard` do not exist yet, create them as reusable components.

## Assets

### Visual Reference

```text
assets/design-references/daily-summary-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/daily-summary-hero.png
```

The practical hero image should include only the illustrated daycare scene, not the UI cards or text.

### Activity Images

Future path:

```text
assets/clients/nuna-banuna/activities/
```

Example files:

```text
creative-art.png
story-time.png
yard-play.png
```

### Meal Images

Future path:

```text
assets/clients/nuna-banuna/meals/
```

Example files:

```text
breakfast.png
lunch.png
snack.png
```

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All buttons must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not implement a real activity catalog yet.
- Do not implement a real meal catalog yet.
- Do not connect a signing provider.
- Use the shared `BottomNavBar` component.
- Do not recreate the bottom navigation inside this screen.

## Suggested Mock Data

### Activity Mock Data

```ts
export const MOCK_DAILY_ACTIVITIES = [
  {
    id: "1",
    time: "09:30",
    title: "פעילות יצירה",
    description: "ציור חופשי בנושא אביב",
    image: "creative-art.png"
  },
  {
    id: "2",
    time: "11:00",
    title: "סיפור בקבוצה",
    description: "הקראנו את הפרפר הקטן",
    image: "story-time.png"
  },
  {
    id: "3",
    time: "15:00",
    title: "משחק בחצר",
    description: "משחקי כדור ותנועה",
    image: "yard-play.png"
  }
];
```

### Meal Mock Data

```ts
export const MOCK_DAILY_MEALS = [
  {
    id: "1",
    time: "08:30",
    title: "ארוחת בוקר",
    description: "דגנים, חלב, פרי חתוך",
    image: "breakfast.png"
  },
  {
    id: "2",
    time: "12:00",
    title: "ארוחת צהריים",
    description: "אורז, עוף, סלט",
    image: "lunch.png"
  },
  {
    id: "3",
    time: "15:30",
    title: "ארוחת נשנוש",
    description: "יוגורט, פרי",
    image: "snack.png"
  }
];
```

### Daily Notes Mock Data

```ts
export const MOCK_DAILY_NOTES = [
  "רוי הפגין שיתוף פעולה יפה בפעילות הבוקר.",
  "מיה השתלבה נהדר במשחקי החצר.",
  "דניאל שיפר את יכולת הריכוז בזמן הסיפור."
];
```

## Behavior

### Add Activity

In the skeleton phase:

- Button can be placeholder.
- Future route or modal:

```text
/teacher/daily-report/add-activity
```

Future behavior:

- Open activity catalog.
- Choose predefined activity.
- Edit time/description.
- Save to today's summary.

### Add Note

In the skeleton phase:

- Button can be placeholder.

Future behavior:

- Open simple text input modal.
- Save note to today's summary.

### View All Messages

In the skeleton phase:

- Button can be placeholder.

Future behavior:

- Navigate to messages screen.

## Future Database Direction

This screen implies future tables or collections such as:

```text
activity_templates
daily_activities
meal_templates
daily_meals
daily_notes
daily_reports
```

### activity_templates

Reusable activities defined by the daycare.

### daily_activities

Activities selected for a specific date.

### meal_templates

Reusable meal templates.

### daily_meals

Meals selected for a specific date.

### daily_notes

General notes for a specific day.

## Accessibility Notes

- Cards should be large enough for tapping.
- Section titles must be readable.
- Avoid small low-contrast text.
- Do not rely only on icons.
- Keep content scrollable.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Daily Summary / Daily Report Overview screen according to docs/ui-screens/05-daily-report.md and the visual reference assets/design-references/daily-summary-approved-direction.png.

Also read docs/ui-screens/00-bottom-navigation.md before implementing.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- title and date
- top summary cards
- featured activities section
- parent messages preview
- daily notes section
- meals section
- shared BottomNavBar

Use mock data only.

Do not connect Supabase.
Do not implement a real activity catalog yet.
Do not implement a real meal catalog yet.
Do not connect any signing provider.

The bottom navigation must use the shared BottomNavBar component and must not be recreated inside this screen.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- This screen expands the daily report concept into a full daycare daily summary.
- Activity and meal catalogs should be planned, but not fully implemented in the first skeleton.
- The UI is visually strong and useful for parent communication.
- The implementation should avoid becoming too complex in the first version.
