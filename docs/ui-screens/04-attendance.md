# 04 - Attendance Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך נוכחות יומית של הגננת.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/attendance-approved-direction.png
```

## Related Shared Component Specs

This screen must also follow:

```text
docs/ui-screens/00-bottom-navigation.md
```

The bottom navigation must be implemented using the shared `BottomNavBar` component.

If the visual mockup and `00-bottom-navigation.md` differ, the shared component spec wins.

## Screen Name

Attendance

## Route

```text
/teacher/attendance
```

## Purpose

מסך זה מאפשר לגננת לסמן נוכחות יומית במהירות ובצורה ברורה.

המסך מיועד לשימוש בבוקר ובמהלך היום, בזמן שבו הגננת צריכה לבצע פעולה מהירה ולא להסתבך עם ממשק עמוס.

## Main UX Goals

- לאפשר סימון נוכחות מהיר לכל ילד.
- להציג סיכום מצב נוכחות של היום.
- לאפשר סטטוסים ברורים: הגיע, לא הגיע, מאחר, יצא מוקדם.
- לאפשר שמירה ברורה של הנוכחות.
- לשמור על חוויית שימוש פשוטה, חמה ולא טכנית.
- לשמור על אחידות עם מסכי הגן האחרים.

## Target User

- גננת
- מנהלת הגן
- בהמשך גם סייעת / צוות גן, לפי הרשאות

## Visual Direction

המסך ממשיך את השפה הוויזואלית שאושרה:

- רקע קרם-ירקרק רך.
- כרטיסים לבנים-חמימים, לא לבן בוהק.
- Hero illustration בהקשר של פעילות בגן.
- צבע ירוק לסטטוס חיובי.
- אדום עדין לסטטוס היעדרות.
- כתום עדין לסטטוס איחור.
- סגול / אפור עדין ליציאה מוקדמת.
- כפתור שמירה ירוק וברור.

## Important Visual Note

ה-Hero image במסך זה צריך להיות בהקשר של גן וילדים, אך לא חייב להיות שונה לחלוטין ממסך רשימת הילדים.

הדגש במסך זה הוא לא ניהול רשימה אלא פעולה יומית של סימון נוכחות.

האיור צריך לשדר:

- בוקר בגן.
- ילדים בפעילות.
- צוות הגן בסביבה רגועה.
- תחושה של שגרה יומית.

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
- Hero illustration.

### Title

```text
נוכחות היום
```

### Date Example

```text
יום רביעי, 14 במאי 2025
```

בפיתוח אמיתי התאריך יהיה דינמי.

## Attendance Summary Card

מתחת ל-Hero מופיע כרטיס סיכום נוכחות רוחבי.

### Items

#### 1. הגיעו

- Label: `הגיעו`
- Value: `16`
- Supporting text: `ילדים`
- Icon: green check icon

#### 2. מאחרים

- Label: `מאחרים`
- Value: `1`
- Supporting text: `ילד`
- Icon: orange clock icon

#### 3. לא הגיעו

- Label: `לא הגיעו`
- Value: `2`
- Supporting text: `ילדים`
- Icon: red minus icon

## Children Attendance List

הרשימה כוללת שורה לכל ילד.

כל שורה צריכה לכלול:

- Avatar של הילד בצד ימין.
- שם הילד.
- גיל הילד.
- ארבע אפשרויות סטטוס:
  - הגיע
  - לא הגיע
  - מאחר
  - יצא מוקדם
- אייקון פתיחה / הרחבה בצד שמאל, אם נרצה להוסיף פרטים בהמשך.

## Attendance Status Options

### Arrived

Label:

```text
הגיע
```

Style:

- Light green background.
- Green text.
- Green check icon.

### Not Arrived

Label:

```text
לא הגיע
```

Style:

- Light red / peach background.
- Red text.
- Red minus icon.

### Late

Label:

```text
מאחר
```

Style:

- Light orange background.
- Orange text.
- Clock icon.

### Left Early

Label:

```text
יצא מוקדם
```

Style:

- Light purple / neutral background.
- Purple or muted icon.
- Exit icon.

## Child Rows - Example Data

### 1. רוי לוי

```text
בן 4 וחצי
```

Default selected status:

```text
הגיע
```

### 2. מיה כהן

```text
בת 4
```

Default selected status:

```text
הגיע
```

### 3. אורי פרידמן

```text
בן 3 וחצי
```

Default selected status:

```text
מאחר
```

### 4. נועה ישראלי

```text
בת 4 וחצי
```

Default selected status:

```text
הגיע
```

### 5. דניאל שטיין

```text
בן 5
```

Default selected status:

```text
לא הגיע
```

### 6. אליה תמר

```text
בת 3
```

Default selected status:

```text
הגיע
```

## Save Attendance Button

The screen includes a large green save button near the bottom, above the bottom navigation.

### Label

```text
שמור נוכחות
```

### Icon

```text
Check icon
```

### Behavior

On press:

- In the skeleton phase: show a simple success state / no backend action.
- Later: save attendance records to the backend.

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
- `AttendanceListItem`
- `AttendanceStatusSelector`
- `BottomNavBar`

If `AttendanceListItem` and `AttendanceStatusSelector` do not exist yet, create them as reusable components.

## Assets

### Visual Reference

```text
assets/design-references/attendance-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/attendance-hero.png
```

The practical hero image should include only the illustrated daycare scene, not the UI cards, list, buttons, or bottom navigation.

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All buttons and status choices must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not save real attendance yet.
- Do not connect a signing provider.
- Use the shared `BottomNavBar` component.
- Do not recreate the bottom navigation inside this screen.

## Suggested Mock Data

```ts
export const MOCK_ATTENDANCE = [
  {
    id: "1",
    childName: "רוי לוי",
    age: "בן 4 וחצי",
    status: "arrived"
  },
  {
    id: "2",
    childName: "מיה כהן",
    age: "בת 4",
    status: "arrived"
  },
  {
    id: "3",
    childName: "אורי פרידמן",
    age: "בן 3 וחצי",
    status: "late"
  },
  {
    id: "4",
    childName: "נועה ישראלי",
    age: "בת 4 וחצי",
    status: "arrived"
  },
  {
    id: "5",
    childName: "דניאל שטיין",
    age: "בן 5",
    status: "not_arrived"
  },
  {
    id: "6",
    childName: "אליה תמר",
    age: "בת 3",
    status: "arrived"
  }
];
```

## Behavior

### Selecting Status

When a teacher selects a status for a child:

- The selected chip becomes visually active.
- Other chips in the same row become inactive.
- The summary card can update locally in the skeleton phase, if simple.
- Otherwise, the visual state can remain static for initial implementation.

### Save Button

On pressing:

```text
שמור נוכחות
```

Skeleton phase behavior:

- Display success toast / alert:
  `הנוכחות נשמרה בהצלחה`
- No backend call.

Future behavior:

- Save records to `attendance` table.
- Update Teacher Home daily summary.
- Optionally notify parent if relevant.

### Menu Icon

In the skeleton phase:

- Can be non-functional or open placeholder.

### Notification Icon

In the skeleton phase:

- Show icon with badge.
- No real notification logic.

## Accessibility Notes

- Status chips must be large enough for easy tapping.
- Do not rely only on color; each chip must include text.
- Save button must be clearly visible.
- Rows must have enough spacing.
- Text must stay readable on smaller screens.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Attendance screen according to docs/ui-screens/04-attendance.md and the visual reference assets/design-references/attendance-approved-direction.png.

Also read docs/ui-screens/00-bottom-navigation.md before implementing.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- title and date
- attendance summary card
- children attendance list
- status selector chips for each child
- save attendance button
- shared BottomNavBar

Use mock attendance data only.

Do not connect Supabase.
Do not save real attendance.
Do not connect any signing provider.

The bottom navigation must use the shared BottomNavBar component and must not be recreated inside this screen.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The screen successfully focuses on attendance rather than general child management.
- The large save button is appropriate for a frequent daily action.
- The bottom navigation is acceptable visually, but implementation must follow `00-bottom-navigation.md`.
- The background should remain warm cream / slightly green, not bright pure white.
