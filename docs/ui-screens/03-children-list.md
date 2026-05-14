# 03 - Children List Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך רשימת הילדים של הגננת.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/children-list-approved-direction.png
```

## Related Shared Component Specs

This screen must also follow:

```text
docs/ui-screens/00-bottom-navigation.md
```

The bottom navigation in this screen must be implemented using the shared `BottomNavBar` component.

If the visual mockup and `00-bottom-navigation.md` differ, the MD component spec wins.

## Screen Name

Children List

## Route

```text
/teacher/children
```

## Purpose

מסך זה מאפשר לגננת לראות ולנהל את רשימת הילדים בגן בצורה פשוטה, נעימה וברורה.

המסך צריך לתת לגננת תמונת מצב מהירה:

- כמה ילדים רשומים בגן.
- כמה נוכחים היום.
- כמה נעדרים היום.
- מי כל ילד.
- מה סטטוס הנוכחות של כל ילד.
- אפשרות להוסיף ילד חדש.

## Main UX Goals

- לאפשר צפייה מהירה ברשימת הילדים.
- לאפשר חיפוש ילד לפי שם.
- לאפשר סינון ילדים.
- להציג סטטוס נוכחות ברור לכל ילד.
- לאפשר מעבר לפרטי ילד בעתיד.
- לאפשר הוספת ילד חדש.
- לשמור על שפה ויזואלית אחידה עם מסך בית הגננת.

## Target User

- גננת
- מנהלת הגן
- בהמשך גם צוות גן / סייעת, בהתאם להרשאות

## Visual Direction

המסך ממשיך את השפה הוויזואלית של האפליקציה:

- צבעי קרם וירוק עדינים.
- כרטיסים מעוגלים.
- רקע לא לבן בוהק, אלא לבן-קרם / ירקרק רך.
- איור אישי וחמים בחלק העליון.
- רשימת ילדים נקייה וברורה.
- תגיות סטטוס ברורות.
- כפתור הוספה ירוק צף.

## Important Visual Note

במסך זה ה-Hero image צריך להיות בהקשר של רשימת ילדים.

הכיוון המאושר:

- הגננת והילדים בפעילות גן.
- הילדים נוכחים בתמונה הראשית.
- הסצנה משדרת שהמסך קשור לילדי הגן, ולא רק לצוות.
- עדיין לשמור על אותה שפה ויזואלית של מסכי הגן האחרים.

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
- אייקון התראות בצד ימין עם badge ירוק.
- כותרת מרכזית.
- תיאור קצר.
- Hero illustration של פעילות גן עם ילדים.

### Title

```text
ילדים בגן
```

### Subtitle

```text
רשימת הילדים בגן נונה בנונה
```

## Search and Filter Area

מתחת לאיור מופיע אזור חיפוש וסינון.

### Search Input

Placeholder:

```text
חיפוש ילד...
```

### Filter Button

Label:

```text
סינון
```

Icon:

```text
Sliders / filter icon
```

## Summary Statistics Card

מתחת לשורת החיפוש מופיע כרטיס סטטיסטיקות רוחבי.

### Items

#### 1. סה״כ ילדים

- Label: `סה״כ ילדים`
- Value: `22`
- Icon: children/group icon

#### 2. נוכחים היום

- Label: `נוכחים היום`
- Value: `16`
- Icon: green check icon

#### 3. נעדרים היום

- Label: `נעדרים היום`
- Value: `6`
- Icon: red minus icon

## Children List

הרשימה מוצגת ככרטיסים אופקיים נקיים.

כל שורה מייצגת ילד אחד.

### Child Row Content

Each child row should include:

- Child avatar on the right.
- Child name.
- Child age.
- Attendance status badge.
- Left arrow / details button on the left.

### Example Children

#### 1. רוי לוי

```text
בן 4 וחצי
```

Status:

```text
נוכח
```

#### 2. מיה כהן

```text
בת 4
```

Status:

```text
נוכחת
```

#### 3. אורי פרידמן

```text
בן 3 וחצי
```

Status:

```text
היעדר
```

#### 4. נועה ישראלי

```text
בת 4 וחצי
```

Status:

```text
נוכחת
```

#### 5. דניאל שטיין

```text
בן 5
```

Status:

```text
נוכח
```

#### 6. אליה תמר

```text
בת 3
```

Status:

```text
היעדר
```

## Status Badges

### Present

Labels:

```text
נוכח
נוכחת
```

Style:

- Light green background.
- Green text.
- Green check icon.

### Absent

Label:

```text
היעדר
```

Style:

- Light red / peach background.
- Red text.
- Red minus icon.

## Floating Add Child Button

The screen includes a floating green action button.

### Label

```text
הוספת ילד
```

### Icon

```text
Plus icon
```

### Position

Lower left side above the bottom navigation.

### Behavior

On press, navigate to:

```text
/teacher/add-child
```

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
- `AppTextInput`
- `StatusBadge`
- `HeroImage`
- `SummaryStatCard`
- `ChildListItem`
- `FloatingActionButton`
- `BottomNavBar`

If `ChildListItem` and `FloatingActionButton` do not exist yet, create them as reusable components.

## Assets

### Visual Reference

```text
assets/design-references/children-list-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/children-list-hero.png
```

The practical hero image should include only the illustrated daycare scene, not the UI search bar, stats card, list, or bottom navigation.

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All buttons must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not implement real search/filter logic in the first skeleton phase unless simple local filtering is easy.
- Do not connect a signing provider.
- Use the shared `BottomNavBar` component.
- Do not recreate the bottom navigation inside this screen.

## Suggested Mock Data

```ts
export const MOCK_CHILDREN = [
  {
    id: "1",
    name: "רוי לוי",
    age: "בן 4 וחצי",
    attendanceStatus: "present",
    avatar: "roy.png"
  },
  {
    id: "2",
    name: "מיה כהן",
    age: "בת 4",
    attendanceStatus: "present",
    avatar: "maya.png"
  },
  {
    id: "3",
    name: "אורי פרידמן",
    age: "בן 3 וחצי",
    attendanceStatus: "absent",
    avatar: "ori.png"
  },
  {
    id: "4",
    name: "נועה ישראלי",
    age: "בת 4 וחצי",
    attendanceStatus: "present",
    avatar: "noa.png"
  },
  {
    id: "5",
    name: "דניאל שטיין",
    age: "בן 5",
    attendanceStatus: "present",
    avatar: "daniel.png"
  },
  {
    id: "6",
    name: "אליה תמר",
    age: "בת 3",
    attendanceStatus: "absent",
    avatar: "elia.png"
  }
];
```

## Behavior

### Back/Menu Button

In the mockup, a menu icon appears at the top left.

In the skeleton phase:

- It may open a placeholder menu, or
- It may do nothing temporarily.

### Notification Icon

In the skeleton phase:

- Show notification icon with badge `3`.
- No real notification logic yet.

### Search

In the skeleton phase:

- Search can be visual only, or simple local filtering.
- No backend search.

### Filter

In the skeleton phase:

- Filter button can be visual only.
- Later it may open a filter sheet.

### Child Row Press

On pressing a child row:

```text
Future route: /teacher/children/[childId]
```

In the first skeleton phase, this can be placeholder only.

### Add Child

On pressing `הוספת ילד`:

```text
/teacher/add-child
```

## Accessibility Notes

- Child rows must be tall enough for easy touch.
- Status badges must include text, not only color.
- Search input must be readable.
- The floating add button must not cover important list content.
- Bottom navigation labels must remain readable.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Children List screen according to docs/ui-screens/03-children-list.md and the visual reference assets/design-references/children-list-approved-direction.png.

Also read docs/ui-screens/00-bottom-navigation.md before implementing.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- title and subtitle
- search input
- filter button
- summary statistics card
- children list
- floating add child button
- shared BottomNavBar

Use mock children data only.

Do not connect Supabase.
Do not implement real backend search.
Do not connect any signing provider.

The bottom navigation must use the shared BottomNavBar component and must not be recreated inside this screen.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- This screen uses a hero image with children, which better fits the context of the Children List screen.
- The bottom navigation must be implemented from the shared component spec, not inferred only from the mockup.
- The background should be warm off-white / cream with a slight green softness, not bright pure white.
- The current visual direction is approved enough to continue.
