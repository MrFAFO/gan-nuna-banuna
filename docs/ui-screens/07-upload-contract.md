# 07 - Upload Contract Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך העלאת חוזה חדש.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/upload-contract-approved-direction.png
```

## Related Shared Component Specs

This screen must also follow:

```text
docs/ui-screens/00-bottom-navigation.md
```

The bottom navigation must be implemented using the shared `BottomNavBar` component.

If the visual mockup and `00-bottom-navigation.md` differ, the shared component spec wins.

## Screen Name

Upload Contract

## Route

```text
/teacher/upload-contract
```

## Purpose

מסך זה מאפשר לגננת להתחיל תהליך חדש של העלאת חוזה ושליחתו לחתימה להורה.

המטרה היא להפוך פעולה שעלולה להרגיש מורכבת לפעולה פשוטה ומובנית:

1. הזנת פרטי חוזה.
2. בחירת הורה.
3. תצוגה מקדימה.
4. שליחה לחתימה.

## Main UX Goals

- לאפשר העלאת חוזה PDF בצורה פשוטה.
- להבהיר לגננת באיזה שלב היא נמצאת.
- למנוע בלבול בין העלאת קובץ לבין שליחת חוזה לחתימה.
- לשמור על תהליך אמין ורציני, אבל לא מסובך.
- להכין בסיס לאינטגרציה עתידית עם ספק חתימה חיצוני.
- לשמור על אותה שפה ויזואלית של האפליקציה.

## Target User

- גננת
- מנהלת הגן
- בעתיד: מנהל מערכת / בעלים

## Visual Direction

המסך ממשיך את השפה הוויזואלית של גן נונה בנונה, עם תחושה מעט יותר רשמית ומסודרת.

הכיוון הוויזואלי:

- רקע קרם-ירקרק רך.
- Hero illustration בהקשר של עבודה עם חוזים ומחשב.
- כרטיס טופס גדול וברור.
- Stepper עליון של 4 שלבים.
- שדות טופס גדולים ונקיים.
- אזור העלאת קובץ עם מסגרת מקווקוות.
- הודעת אבטחה / שמירה מאובטחת.
- כפתורי פעולה ברורים: ביטול והמשך.
- Bottom Navigation אחיד לפי הקומפוננטה המשותפת.

## Important Visual Note

ה-Hero image במסך זה צריך להיות בהקשר של העלאת חוזה וניהול מסמכים.

הכיוון המאושר:

- גננת יושבת ליד מחשב.
- ליד הגננת יש קלסרים / מסמכים.
- הסביבה עדיין נראית כמו גן, לא משרד קר.
- התחושה היא: ניהול מסודר, דיגיטלי ואמין.

This screen is for uploading a contract.

It is not:

- Contracts list screen.
- Parent signing screen.
- Messages screen.
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

- כפתור חזרה בצד שמאל.
- אייקון התראות בצד ימין עם badge.
- כותרת מרכזית.
- תת-כותרת.
- Hero illustration בהקשר של העלאת חוזה.

### Title

```text
העלאת חוזה חדש
```

### Subtitle

```text
העלאת חוזה ושליחה להורה לחתימה
```

## Stepper

מתחת ל-Hero מופיע Stepper עם 4 שלבים.

### Steps

#### 1. פרטי חוזה

Current active step.

```text
פרטי חוזה
```

#### 2. בחירת הורה

```text
בחירת הורה
```

#### 3. תצוגה מקדימה

```text
תצוגה מקדימה
```

#### 4. שליחה

```text
שליחה
```

## Contract Details Section

### Section Title

```text
פרטי חוזה
```

### Fields

#### Contract Name

Label:

```text
שם החוזה *
```

Placeholder:

```text
לדוגמה: חוזה הרשמה לשנת 2025-2026
```

Required:

```text
true
```

#### Contract Type

Label:

```text
סוג החוזה *
```

Placeholder:

```text
בחר סוג חוזה
```

Required:

```text
true
```

Suggested options for future:

- חוזה הרשמה
- חידוש חוזה
- אישור מיוחד
- נספח לחוזה

#### Contract Date

Label:

```text
תאריך החוזה *
```

Placeholder:

```text
בחר תאריך
```

Required:

```text
true
```

#### Expiry Date

Label:

```text
תאריך תפוגה (אופציונלי)
```

Placeholder:

```text
בחר תאריך תפוגה
```

Required:

```text
false
```

#### Notes

Label:

```text
הערות (אופציונלי)
```

Placeholder:

```text
הוסף הערות או מידע נוסף הקשור לחוזה...
```

Required:

```text
false
```

## File Upload Section

### Section Title

```text
קובץ החוזה
```

### Upload Area Text

```text
גרור קובץ לכאן או לחץ לבחירה
```

### Supporting Text

```text
PDF בלבד, עד 10MB
```

### Accepted File Type

```text
PDF
```

### Max Size

```text
10MB
```

## Security Notice

A soft green notice appears below the upload area.

### Text

```text
הקובץ יישמר בצורה מאובטחת. ההורה יוכל לצפות ולחתום דיגיטלית.
```

## Bottom Actions

### Cancel Button

Label:

```text
ביטול
```

Style:

- Outline.
- Secondary.

Behavior:

- Navigate back to `/teacher/contracts`, or open confirmation if form has unsaved data.

### Continue Button

Label:

```text
המשך
```

Style:

- Primary green.

Behavior:

- Validate required fields.
- Move to the next step: בחירת הורה.

## Future Step 2 - Parent Selection

This screen currently shows Step 1 only.

Future Step 2 should include:

- Select child.
- Select parent / signer.
- Show parent email and phone.
- Option to add another signer, if needed.
- Continue to preview.

## Future Step 3 - Preview

Future Step 3 should include:

- Contract summary.
- Selected child.
- Selected parent.
- File name.
- Contract type.
- Dates.
- Preview file button.
- Continue to sending.

## Future Step 4 - Send for Signature

Future Step 4 should include:

- Final confirmation.
- Button: `שליחה לחתימה`.
- Explanation that the parent will receive a signing link.
- Future integration with external signing provider.

## Signing Provider Concept

This screen prepares the data needed before calling an external signing provider.

Future technical flow:

```text
Upload PDF
→ Store PDF securely
→ Select child and parent
→ Create signing request with provider
→ Send signing link to parent
→ Receive status webhook
→ Update contracts screen
```

Important:

- Do not build a legal signing engine inside the app.
- The app manages the workflow.
- Actual signing will happen through a provider.

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
- `HeroImage`
- `StepIndicator`
- `FileUploadBox`
- `SecurityNotice`
- `BottomNavBar`

If `StepIndicator`, `FileUploadBox`, and `SecurityNotice` do not exist yet, create them as reusable components.

## Assets

### Visual Reference

```text
assets/design-references/upload-contract-approved-direction.png
```

### Practical Hero Image

Later, create or extract a clean hero asset:

```text
assets/clients/nuna-banuna/upload-contract-hero.png
```

The practical hero image should include only the illustrated daycare contract/document scene, not the UI form, stepper, buttons, or bottom navigation.

## Development Rules

- Do not use the full screenshot as one image.
- Use the hero illustration as an image asset only.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All buttons must be real pressable components.
- Use mock data only in the first phase.
- Do not connect Supabase yet.
- Do not implement real PDF upload yet.
- Do not connect a real signing provider yet.
- Do not send real emails.
- Use the shared `BottomNavBar` component.
- Do not recreate the bottom navigation inside this screen.

## Suggested Local State

```ts
type UploadContractFormState = {
  contractName: string;
  contractType: string;
  contractDate: string;
  expiryDate?: string;
  notes?: string;
  fileName?: string;
};
```

## Suggested Contract Types

```ts
export const CONTRACT_TYPES = [
  "חוזה הרשמה",
  "חידוש חוזה",
  "אישור מיוחד",
  "נספח לחוזה"
];
```

## Behavior

### Back Button

On press:

- Navigate back to `/teacher/contracts`.

If there are unsaved changes later:

- Ask for confirmation before leaving.

### File Upload Box

Skeleton phase:

- Opens placeholder alert:
  `בחירת קובץ תתווסף בהמשך`

Future behavior:

- Open device file picker.
- Accept PDF only.
- Validate file size.

### Continue Button

Skeleton phase:

- Validate required fields visually if implemented.
- Move to placeholder next step, or show alert:
  `השלב הבא: בחירת הורה`

Future behavior:

- Save draft.
- Navigate to parent selection step.

### Cancel Button

Skeleton phase:

- Navigate back to `/teacher/contracts`.

## Validation Rules

Required fields:

- Contract name.
- Contract type.
- Contract date.
- PDF file, future requirement.

Validation messages should be simple and Hebrew:

```text
יש להזין שם חוזה
יש לבחור סוג חוזה
יש לבחור תאריך חוזה
יש לצרף קובץ PDF
```

## Accessibility Notes

- Inputs must be large and readable.
- Step labels must be clear.
- Upload area must be tappable.
- Buttons must be large enough.
- Do not rely only on step number color; include step labels.
- Error messages must be textual.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Upload Contract screen according to docs/ui-screens/07-upload-contract.md and the visual reference assets/design-references/upload-contract-approved-direction.png.

Also read docs/ui-screens/00-bottom-navigation.md before implementing.

Use the image only as a visual direction and hero reference. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top hero area
- title and subtitle
- 4-step progress indicator
- contract details form
- file upload placeholder box
- security notice
- cancel and continue buttons
- shared BottomNavBar

Use local state or static mock behavior only.

Do not connect Supabase.
Do not implement real PDF upload.
Do not connect any real signing provider.
Do not send emails.

The bottom navigation must use the shared BottomNavBar component and must not be recreated inside this screen.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The screen correctly represents the contract upload flow.
- The 4-step structure is useful and should stay.
- The form is clear and not overloaded.
- In implementation, the next steps can be placeholders at first.
- The actual signing provider integration is future work.
