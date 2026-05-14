# 02 - Teacher Home Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך בית הגננת, אך עדיין לא כגרסה סופית ברמת פיקסל-פרפקט לפיתוח.

## Visual Reference

```text
assets/design-references/teacher-home-approved-direction.png
```

## Screen Name

Teacher Home

## Route

```text
/teacher/home
```

## Purpose

זהו מסך הבית הראשי של הגננת.

המטרה שלו היא להיות מרכז העבודה היומי של צוות הגן, ולהציג בצורה ברורה, נעימה ולא עמוסה את מצב היום בגן, יחד עם פעולות מרכזיות שהגננת צריכה לבצע.

## Main UX Goals

- לאפשר לגננת להבין מיד מה מצב היום בגן.
- להציג סיכום קצר וברור של נתוני היום.
- לאפשר גישה מהירה לפעולות המרכזיות.
- לשמור על תחושת חום, ביתיות ואמינות.
- לבדל את המסך ממסך ההתחברות, תוך שמירה על אותו מיתוג.

## Target User

- גננת
- מנהלת הגן
- בהמשך גם צוות גן / סייעת, בהתאם להרשאות

## Visual Direction

המסך משתמש באותה שפה ויזואלית של המוצר:

- רקע קרם / ירקרק רך
- צבעי מותג חמים
- כרטיסים מעוגלים
- איור אישי של הגנן והגננת
- סביבת גן רכה, ביתית ונעימה
- צללים עדינים
- תחושה רגועה ולא טכנית

## Important Difference From Login Screen

במסך זה האיור של הגנן והגננת צריך להיות שונה מהמסך הראשון.

מטרת ההבדל:

- להימנע מתחושה של מחזור אותה תמונה
- להראות שהאפליקציה חיה ודינמית
- לתת תחושת “עבודה יומיומית בגן” ולא רק מסך מותג

במסך זה הדמויות צריכות להופיע בפוזה תפקודית יותר, למשל:

- עובדים על ציור / פעילות
- מביטים בדף / משימה
- משדרים פעילות גנית יומיומית
- פחות “מסתכלים למצלמה”, יותר “בתוך העשייה”

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

## Top Hero Area

האזור העליון כולל:

- ברכת בוקר
- שם הגן
- איור אישי של הגנן והגננת
- אייקון תפריט
- אייקון התראות

### Greeting Text

```text
בוקר טוב, נונה
```

### Supporting Greeting Text

```text
יום נפלא בגן נונה בנונה!
```

ניתן לשנות את נוסח הברכה בהמשך, אך כרגע זה הכיוון המאושר.

## Daily Summary Card

האזור המרכזי העליון של המסך הוא כרטיס סיכום יום.

### Section Title

```text
סיכום היום
```

### Date

```text
14 במאי 2025
```

בפיתוח אמיתי התאריך יהיה דינמי.

### Summary Items

המסך מציג ארבעה נתוני סיכום:

#### 1. ילדים בגן

- כותרת: `ילדים בגן`
- ערך לדוגמה: `18`
- טקסט משני: `מתוך 22`

#### 2. נוכחים היום

- כותרת: `נוכחים היום`
- ערך לדוגמה: `16`

#### 3. הודעות חדשות

- כותרת: `הודעות חדשות`
- ערך לדוגמה: `3`
- טקסט משני: `מההורים`

#### 4. חוזים להורים

- כותרת: `חוזים להורים`
- ערך לדוגמה: `2`
- טקסט משני: `ממתינים לחתימה`

## Main Action Grid

מתחת לסיכום היום מופיע grid של כרטיסי פעולה מרכזיים.

### Actions

#### 1. ילדים בגן

- כותרת: `ילדים בגן`
- תיאור: `צפייה וניהול רשימת הילדים`
- פעולה: מעבר למסך רשימת ילדים

#### 2. נוכחות

- כותרת: `נוכחות`
- תיאור: `סימון נוכחות והיעדרויות`
- פעולה: מעבר למסך נוכחות

#### 3. סיכום יום

- כותרת: `סיכום יום`
- תיאור: `מעקב ודוחות יומיים`
- פעולה: מעבר למסך סיכום יום

#### 4. חוזים

- כותרת: `חוזים`
- תיאור: `צפייה וניהול חוזים`
- פעולה: מעבר למסך חוזים

#### 5. העלאת חוזה

- כותרת: `העלאת חוזה`
- תיאור: `העלאת חוזה חדש`
- פעולה: מעבר למסך העלאת חוזה

#### 6. הודעות להורים

- כותרת: `הודעות להורים`
- תיאור: `שליחת הודעות`
- פעולה: מסך הודעות / placeholder לעתיד

## Bottom Reminder Card

בתחתית המסך מופיע כרטיס תזכורת רך.

### Purpose

להציג תזכורת חשובה קצרה לגננת.

### Example Content

- כותרת: `לתשומת ליבך`
- טקסט: `חוזה של רוי ממתין לחתימה`
- CTA קטן: `לעיון בחוזים`

### Optional Child Indicator

בצד הכרטיס אפשר להציג:

- אווטר של ילד
- שם הילד, לדוגמה: `רוי לוי`

## Bottom Navigation

בשלב זה הכיוון כולל סרגל ניווט תחתון.

### Suggested Items

- פרופיל
- לוח שנה
- בית
- תיעוד יומי
- הגדרות

### Notes

בפיתוח הראשוני אפשר ליישם אותו כ-placeholder בלבד, בלי כל הלוגיקה המלאה.

## Components to Use

- `AppScreen`
- `AppCard`
- `AppButton`
- `StatusBadge`
- `HeroImage`
- `SummaryStatCard`
- `ActionTile`
- `BottomNavBar`

אם רכיבים כמו `SummaryStatCard`, `ActionTile`, `BottomNavBar` עדיין לא קיימים, אפשר ליצור אותם כרכיבים reusable.

## Assets

### Visual Reference

```text
assets/design-references/teacher-home-approved-direction.png
```

### Practical Hero Image

בעתיד נרצה לשמור אסט נפרד של האיור העליון בלבד:

```text
assets/clients/nuna-banuna/teacher-home-hero.png
```

הקובץ הזה צריך להכיל רק את האיור והסביבה, ללא UI baked-in.

## Development Rules

- אין להשתמש בכל הסקרינשוט כתמונה אחת.
- יש להשתמש באיור רק כרקע / hero asset.
- כל הכותרות, המספרים, הכפתורים והכרטיסים צריכים להיות רכיבי React Native אמיתיים.
- כל הטקסטים צריכים להיות טקסט אמיתי בקוד.
- כל הכפתורים צריכים להיות לחיצים.
- יש לשמור על RTL מלא.
- אין לחבר עדיין Supabase.
- אין לחבר עדיין ספק חתימה אמיתי.
- יש להשתמש בנתוני דמו בלבד.

## Suggested Mock Data

### Attendance Summary

- totalChildren: 22
- presentToday: 16
- newMessages: 3
- pendingContracts: 2

### Reminder Example

- childName: רוי לוי
- reminderText: חוזה של רוי ממתין לחתימה

## Behavior

### Navigation Actions

- ילדים בגן → `/teacher/children`
- נוכחות → `/teacher/attendance`
- סיכום יום → `/teacher/daily-report`
- חוזים → `/teacher/contracts`
- העלאת חוזה → `/teacher/upload-contract`
- הודעות להורים → placeholder / future route

### Notification Icon

בשלב הראשון אפשר להציג אייקון בלבד ללא פעולה מלאה.

### Menu Icon

בשלב הראשון אפשר להציג אייקון בלבד או לפתוח drawer placeholder.

## Accessibility Notes

- הכרטיסים צריכים להיות גדולים מספיק ללחיצה.
- הטקסטים הקטנים חייבים להישאר קריאים.
- אין להעמיס יותר מדי מידע בכרטיס אחד.
- חשוב לשמור על ניגודיות טובה.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Teacher Home screen according to docs/ui-screens/02-teacher-home.md and the visual reference assets/design-references/teacher-home-approved-direction.png.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- greeting
- daycare name
- daily summary card
- action grid
- bottom reminder card
- bottom navigation

Use mock data only.

Do not connect Supabase.
Do not connect any real signing provider.
Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The hero image is intentionally different from the login screen.
- The new pose feels more functional and suitable for a teacher dashboard.
- The screen successfully keeps the same brand language while avoiding repetition.
- The dashboard currently includes more actions than the original MVP; this is visually useful, but during implementation we may decide to slightly simplify if needed.
