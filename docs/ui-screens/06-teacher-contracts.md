# 06 - Teacher Contracts Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך חוזים לגננת.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/teacher-contracts-approved-direction.png
```

## Related Shared Component Specs

This screen must also follow:

```text
docs/ui-screens/00-bottom-navigation.md
```

The bottom navigation must be implemented using the shared `BottomNavBar` component.

If the visual mockup and `00-bottom-navigation.md` differ, the shared component spec wins.

## Screen Name

Teacher Contracts

## Route

```text
/teacher/contracts
```

## Purpose

מסך זה מאפשר לגננת לנהל חוזים מול הורים, לעקוב אחרי סטטוס חתימה, ולשלוח חוזים לחתימה.

המטרה היא לתת לגננת תמונת מצב ברורה:

- כמה חוזים קיימים.
- כמה ממתינים לחתימה.
- כמה נחתמו.
- כמה פגי תוקף או דורשים טיפול.
- איזה חוזה שייך לאיזה ילד ולהורה.
- מה סטטוס החתימה של כל חוזה.

## Main UX Goals

- לאפשר ניהול חוזים בצורה פשוטה וברורה.
- לאפשר העלאת חוזה חדש.
- לאפשר מעקב אחרי סטטוס חתימה.
- להציג חוזים לפי ילד והורה.
- לשמור על תחושת אמינות ורצינות.
- לא להפוך את המסך למערכת משפטית מורכבת.
- להכין בסיס לאינטגרציה עתידית עם ספק חתימה חיצוני.

## Target User

- גננת
- מנהלת הגן
- בעתיד: מנהל מערכת / בעלים

## Visual Direction

המסך ממשיך את השפה הוויזואלית של גן נונה בנונה, אבל עם תחושה מעט יותר מסודרת ורשמית, כי מדובר בחוזים.

הכיוון הוויזואלי:

- רקע קרם-ירקרק רך.
- כרטיסים לבנים-חמימים, לא לבן בוהק.
- Hero illustration בהקשר של מסמכים, קלסרים, חתימה וניהול גן.
- צבע ירוק לסטטוס חתום.
- כתום לסטטוס ממתין לחתימה.
- אדום עדין לסטטוס פג תוקף / דורש טיפול.
- רשימת חוזים מסודרת וברורה.
- כפתור פעולה מרכזי להעלאת חוזה חדש.

## Important Visual Note

ה-Hero image במסך זה צריך להיות בהקשר של חוזים וניהול מסמכים בגן.

הכיוון המאושר:

- גננת ליד שולחן בגן.
- מסמכים, קלסרים או תיקיות.
- תחושה של ניהול מסודר, אבל עדיין חמה ולא משרדית מדי.
- אין להפוך את המסך למסך הודעות, פיד או עדכונים.

This screen is for contracts only.

It is not:

- Parent messages screen.
- Daily activity feed.
- General announcements screen.
- Payment screen.

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
- תת-כותרת.
- Hero illustration בהקשר של חוזים ומסמכים.

### Title

```text
חוזים
```

### Subtitle

```text
ניהול חוזים וחתימות להורים
```

## Contracts Summary Cards

מתחת ל-Hero מופיעים כרטיסי סיכום.

### Items

#### 1. סה"כ חוזים

- Label: `סה"כ חוזים`
- Value: `24`
- Supporting text: `חוזים`
- Icon: document icon
- Color: green / neutral

#### 2. ממתינים לחתימה

- Label: `ממתינים לחתימה`
- Value: `6`
- Supporting text: `חוזים`
- Icon: clock icon
- Color: orange

#### 3. נחתמו

- Label: `נחתמו`
- Value: `16`
- Supporting text: `חוזים`
- Icon: check icon
- Color: green

#### 4. פג תוקף / דורשים טיפול

- Label: `פג תוקף / דורשים טיפול`
- Value: `2`
- Supporting text: `חוזים`
- Icon: warning icon
- Color: red

## Primary Action

### Button Label

```text
העלאת חוזה חדש
```

### Icon

```text
Plus icon
```

### Route

```text
/teacher/upload-contract
```

### Purpose

לאפשר לגננת להתחיל תהליך חדש של העלאת PDF ושליחת חוזה לחתימה.

## Search and Filter

### Search Placeholder

```text
חיפוש חוזה, שם ילד או הורה...
```

### Filter Button

```text
סינון
```

In the skeleton phase:

- Search can be visual only.
- Filter can be visual only.

Later:

- Search by child name, parent name, file name, and status.
- Filter by status.

## Contracts List

### Section Title

```text
רשימת חוזים
```

Each contract row should include:

- Child avatar.
- Child name.
- Child age.
- Parent name.
- File name.
- Sent date.
- Status badge.
- More actions menu.

## Contract Row Content

### Required Fields

- Child name.
- Child age.
- Parent name.
- Contract file name.
- Sent date.
- Status.
- Optional: expiry date.
- Optional: provider document ID in future, not visible to user.

### Example Row Structure

```text
רוי לוי
בן 4 וחצי

אבא של רוי
חוזה הרשמה 2025.pdf
נשלח בתאריך 10.05.2025

סטטוס: נשלח לחתימה
```

## Status Badges

### Sent to Signature

Label:

```text
נשלח לחתימה
```

Style:

- Light orange background.
- Orange text.
- Clock icon.

### Signed

Label:

```text
נחתם
```

Style:

- Light green background.
- Green text.
- Check icon.

### Expired

Label:

```text
פג תוקף
```

Style:

- Light red background.
- Red text.
- Warning icon.

### Draft

Label:

```text
טיוטה
```

Style:

- Light neutral background.
- Gray text.
- Document icon.

## Example Contracts

### 1. רוי לוי

```text
בן 4 וחצי
אבא של רוי
חוזה הרשמה 2025.pdf
נשלח בתאריך 10.05.2025
סטטוס: נשלח לחתימה
```

### 2. מיה כהן

```text
בת 4
אמא של מיה
חוזה הרשמה 2025.pdf
נשלח בתאריך 08.05.2025
סטטוס: נחתם
```

### 3. אורי פרידמן

```text
בן 3 וחצי
אבא של אורי
חוזה הרשמה 2025.pdf
נשלח בתאריך 11.05.2025
סטטוס: נשלח לחתימה
```

### 4. נועה ישראלי

```text
בת 4 וחצי
אמא של נועה
חוזה הרשמה 2025.pdf
נשלח בתאריך 30.04.2025
סטטוס: פג תוקף
```

### 5. דניאל שטיין

```text
בן 5
אבא של דניאל
חוזה הרשמה 2025.pdf
נשלח בתאריך 27.04.2025
סטטוס: נחתם
```

### 6. אליה תמר

```text
בת 3
אמא של אליה
חוזה הרשמה 2025.pdf
נשלח בתאריך 12.05.2025
סטטוס: נשלח לחתימה
```

## Signing Provider Concept

This screen prepares for an external signing provider integration.

Important:

- The app does not create a legal signing engine by itself.
- The app manages the contract workflow.
- Signing itself will be done through an external provider.
- The app stores and displays signing status returned by the provider.

Future provider flow:

```text
Upload PDF
→ Create signing request
→ Send to parent
→ Parent signs through provider
→ Provider sends webhook/status
→ App updates status
→ App stores signed PDF link
```

## Future Provider Statuses

Possible technical statuses:

```text
draft
sent
viewed
signed
declined
expired
error
```

User-facing Hebrew labels:

```text
טיוטה
נשלח לחתימה
נצפה
נחתם
נדחה
פג תוקף
שגיאה
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
- `StatusBadge`
- `HeroImage`
- `SummaryStatCard`
- `ContractListItem`
- `BottomNavBar`
- `SearchInput`
- `FilterButton`

If `ContractListItem`, `SearchInput`, and `FilterButton` do not exist yet, create them as reusable components.

## Assets

### Visual Reference

```text
assets/design-references/teacher-contracts-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/contracts-hero.png
```

The practical hero image should include only the illustrated daycare contract/document scene, not the UI cards, list, buttons, or bottom navigation.

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All buttons must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not connect a real signing provider yet.
- Do not implement real PDF upload in this screen.
- Use the shared `BottomNavBar` component.
- Do not recreate the bottom navigation inside this screen.

## Suggested Mock Data

```ts
export const MOCK_CONTRACTS = [
  {
    id: "1",
    childName: "רוי לוי",
    childAge: "בן 4 וחצי",
    parentName: "אבא של רוי",
    fileName: "חוזה הרשמה 2025.pdf",
    sentAt: "10.05.2025",
    status: "sent"
  },
  {
    id: "2",
    childName: "מיה כהן",
    childAge: "בת 4",
    parentName: "אמא של מיה",
    fileName: "חוזה הרשמה 2025.pdf",
    sentAt: "08.05.2025",
    status: "signed"
  },
  {
    id: "3",
    childName: "אורי פרידמן",
    childAge: "בן 3 וחצי",
    parentName: "אבא של אורי",
    fileName: "חוזה הרשמה 2025.pdf",
    sentAt: "11.05.2025",
    status: "sent"
  },
  {
    id: "4",
    childName: "נועה ישראלי",
    childAge: "בת 4 וחצי",
    parentName: "אמא של נועה",
    fileName: "חוזה הרשמה 2025.pdf",
    sentAt: "30.04.2025",
    status: "expired"
  },
  {
    id: "5",
    childName: "דניאל שטיין",
    childAge: "בן 5",
    parentName: "אבא של דניאל",
    fileName: "חוזה הרשמה 2025.pdf",
    sentAt: "27.04.2025",
    status: "signed"
  },
  {
    id: "6",
    childName: "אליה תמר",
    childAge: "בת 3",
    parentName: "אמא של אליה",
    fileName: "חוזה הרשמה 2025.pdf",
    sentAt: "12.05.2025",
    status: "sent"
  }
];
```

## Behavior

### Upload New Contract

On pressing:

```text
העלאת חוזה חדש
```

Navigate to:

```text
/teacher/upload-contract
```

### Search

Skeleton phase:

- Visual only, or local mock filtering if simple.

Future behavior:

- Search by child name, parent name, file name, or status.

### Filter

Skeleton phase:

- Visual only.

Future behavior:

- Filter by status:
  - All
  - Sent
  - Signed
  - Expired
  - Draft

### Contract Row Press

Skeleton phase:

- Placeholder only.

Future behavior:

- Open contract details screen.
- Show timeline.
- Show signed PDF if available.
- Allow resend reminder.

### More Actions

The three-dot menu can later include:

- צפייה בפרטים
- שליחה חוזרת
- הורדת חוזה חתום
- ביטול בקשה
- סימון כטופל

## Accessibility Notes

- Status badges must include text, not only color.
- Contract rows must be readable and not too dense.
- Upload button must be prominent.
- Important statuses must have clear color and label.
- Text must remain readable on smaller screens.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Teacher Contracts screen according to docs/ui-screens/06-teacher-contracts.md and the visual reference assets/design-references/teacher-contracts-approved-direction.png.

Also read docs/ui-screens/00-bottom-navigation.md before implementing.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- title and subtitle
- contract summary cards
- upload new contract button
- search input
- filter button
- contracts list
- status badges
- shared BottomNavBar

Use mock contracts data only.

Do not connect Supabase.
Do not implement real PDF upload here.
Do not connect any real signing provider.

The bottom navigation must use the shared BottomNavBar component and must not be recreated inside this screen.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- This screen correctly represents contract management, unlike the previous rejected messages screen.
- It should remain focused on contracts and signing statuses only.
- The visual style is slightly more administrative, which is appropriate for contracts, but still warm enough for the daycare brand.
- In development, the list may need simplification if rows become too dense on small phones.
