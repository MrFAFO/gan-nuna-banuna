# 11 - Add Child Screen

## Status

Approved Direction

המסך אושר ככיוון עיצובי ו-UX למסך הוספת ילד חדש.

המסך אינו נחשב פיקסל-פרפקט סופי, אך הוא מאושר כבסיס לפיתוח.

## Visual Reference

```text
assets/design-references/add-child-approved-direction.png
```

## Screen Name

Add Child

## Route

```text
/teacher/add-child
```

## Purpose

מסך זה מאפשר לגננת להוסיף ילד חדש לרשימת הילדים בגן.

המטרה היא לאפשר הזנת פרטים בסיסיים של הילד והורה / אפוטרופוס בצורה פשוטה, ברורה ומסודרת.

המסך נפתח מתוך מסך רשימת הילדים:

```text
/teacher/children
```

דרך הכפתור:

```text
הוספת ילד
```

## Main UX Goals

- לאפשר הוספת ילד חדש בצורה מהירה וברורה.
- לשמור את פרטי הילד במקום מסודר.
- לקשר בין ילד לבין הורה / אפוטרופוס.
- לאפשר הזנת הערות חשובות כמו רגישויות, אלרגיות או מידע רפואי.
- לא להעמיס על הגננת ביותר מדי שדות בשלב הראשון.
- לאפשר הרחבה עתידית לפרטים נוספים.

## Target User

- גננת
- מנהלת הגן

## Visual Direction

המסך ממשיך את השפה הוויזואלית של צד הגננת:

- רקע בהיר ונקי.
- כרטיסים לבנים-חמימים.
- צבע ירוק מרכזי לפעולה ראשית.
- שדות טופס גדולים וברורים.
- עברית RTL.
- חלוקה ברורה לאזורים.
- כפתור שמירה ברור.
- כפתור ביטול משני.

## Important Visual Note

המסך צריך להישאר **מסך אפליקציה בלבד**.

אין להוסיף:

- הוראות צדדיות.
- מסמך אפיון בתוך התמונה.
- טבלת UX.
- טקסטי פיתוח.
- עמוד documentation.

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

### Title

```text
הוספת ילד
```

## Security / Info Notice

מתחת לכותרת מופיעה הודעת מידע רכה.

### Text

```text
כל המידע יישמר בצורה מאובטחת וישמש לצרכי ניהול ותיעוד בגן.
```

## Child Details Section

### Section Title

```text
פרטי הילד
```

### Child Photo

Optional child photo upload.

Text:

```text
הוספת תמונה
```

Supporting text:

```text
אופציונלי
```

Skeleton behavior:

- Placeholder only.

Future behavior:

- Open image picker.
- Save child photo to storage.

### Child Name

Label:

```text
שם הילד *
```

Placeholder:

```text
הזן שם הילד
```

Required:

```text
true
```

### Birth Date

Label:

```text
תאריך לידה *
```

Placeholder:

```text
בחר תאריך
```

Required:

```text
true
```

### Gender

Label:

```text
מין
```

Options:

```text
זכר
נקבה
```

Required:

```text
false
```

Default in mockup:

```text
זכר
```

## Parent / Guardian Details Section

### Section Title

```text
פרטי הורה / אפוטרופוס
```

### Relationship Type

Label:

```text
סוג קשר *
```

Placeholder:

```text
בחר קשר
```

Required:

```text
true
```

Suggested options:

- אמא
- אבא
- סבתא
- סבא
- אפוטרופוס
- אחר

### Phone Number

Label:

```text
טלפון *
```

Placeholder:

```text
הזן מספר טלפון
```

Required:

```text
true
```

### Full Name

Label:

```text
שם מלא *
```

Placeholder:

```text
הזן שם מלא
```

Required:

```text
true
```

### Email

Label:

```text
אימייל
```

Placeholder:

```text
הזן כתובת אימייל
```

Required:

```text
false
```

Important:
האימייל יהיה חשוב בהמשך עבור שליחת חוזים, אך לא חייב להיות חובה בשלב הראשון אם הגן עובד בעיקר דרך טלפון / וואטסאפ.

## Additional Information Section

### Section Title

```text
מידע נוסף
```

### Notes Field

Label:

```text
הערות חשובות
```

Placeholder:

```text
לדוגמה: רגישויות, אלרגיות, מידע רפואי חשוב וכו'
```

Character counter:

```text
0/300
```

Required:

```text
false
```

## Bottom Actions

### Save Button

Label:

```text
שמירה
```

Icon:

```text
Save icon
```

Style:

- Primary green.
- Full width.

Behavior:

- Validate required fields.
- Save mock child in skeleton phase.
- Return to children list or show success alert.

### Cancel Button

Label:

```text
ביטול
```

Style:

- Secondary outline.
- Full width.

Behavior:

- Navigate back to `/teacher/children`.
- In future, if form has unsaved changes, show confirmation.

## Bottom Navigation

Use the same visual bottom navigation language as the teacher side.

Spec file:

```text
docs/ui-screens/00-bottom-navigation.md
```

Required visual order from left to right:

```text
הגדרות | תיעוד יומי | בית | לוח שנה | פרופיל
```

Rules:

- `בית` is the center active raised green item.
- `תיעוד יומי` uses a camera icon.
- Keep visual consistency with other teacher screens.
- Do not rebuild the bottom navigation separately for this screen.

## Components to Use

- `AppScreen`
- `AppCard`
- `AppButton`
- `AppTextInput`
- `DatePickerField`
- `SelectField`
- `ImageUploadPlaceholder`
- `GenderSelector`
- `InfoNotice`
- `BottomNavBar`

If some of these components do not exist yet, create them as reusable components.

## Assets

### Visual Reference

```text
assets/design-references/add-child-approved-direction.png
```

No hero image is required for this screen in the approved direction.

The approved screen is mostly form-based and does not need a large illustration.

## Development Rules

- Do not use the full screenshot as one image.
- Build all UI elements as real React Native components.
- All text must be real React Native text.
- All inputs must be real form components.
- All buttons must be real pressable components.
- Use mock behavior only in the first phase.
- Do not connect Supabase yet.
- Do not implement real image upload yet.
- Do not send real notifications.
- Do not create contracts automatically from this screen.
- Use reusable components.

## Suggested Local State

```ts
type AddChildFormState = {
  childName: string;
  birthDate: string;
  gender?: "male" | "female";
  relationshipType: string;
  parentFullName: string;
  parentPhone: string;
  parentEmail?: string;
  notes?: string;
  childPhotoUri?: string;
};
```

## Suggested Relationship Options

```ts
export const RELATIONSHIP_OPTIONS = [
  "אמא",
  "אבא",
  "סבתא",
  "סבא",
  "אפוטרופוס",
  "אחר"
];
```

## Suggested Gender Options

```ts
export const GENDER_OPTIONS = [
  {
    label: "זכר",
    value: "male"
  },
  {
    label: "נקבה",
    value: "female"
  }
];
```

## Validation Rules

Required fields:

- Child name.
- Birth date.
- Relationship type.
- Parent full name.
- Parent phone.

Suggested Hebrew validation messages:

```text
יש להזין את שם הילד
יש לבחור תאריך לידה
יש לבחור סוג קשר
יש להזין שם הורה / אפוטרופוס
יש להזין מספר טלפון
```

Optional validation:

- Phone format should be Israeli mobile/phone format.
- Email format should be valid only if provided.

## Behavior

### Back Button

On press:

- Navigate back to:

```text
/teacher/children
```

Future behavior:

- If there are unsaved changes, show confirmation.

### Add Photo

Skeleton phase:

- Show placeholder alert:
  `הוספת תמונה תתווסף בהמשך`

Future behavior:

- Open image picker.
- Allow crop or simple preview.
- Store image in cloud storage.

### Save

Skeleton phase:

- Validate required fields if implemented.
- Show success alert:

```text
הילד נוסף בהצלחה
```

- Navigate back to:

```text
/teacher/children
```

Future behavior:

- Save child record to database.
- Save parent/guardian record.
- Link parent to child.
- Return to children list.
- Refresh children list.

### Cancel

On press:

- Navigate back to:

```text
/teacher/children
```

## Future Database Direction

Future tables / collections may include:

```text
children
guardians
child_guardians
```

### children

Stores child information:

- id
- full_name
- birth_date
- gender
- photo_url
- notes
- daycare_id
- created_at
- updated_at

### guardians

Stores parent / guardian information:

- id
- full_name
- phone
- email
- created_at
- updated_at

### child_guardians

Connects children and guardians:

- child_id
- guardian_id
- relationship_type
- is_primary_contact

## Accessibility Notes

- Inputs must have readable labels.
- Required fields must be clearly marked.
- Do not rely only on placeholder text.
- Buttons must be large enough for touch.
- Error messages must be textual.
- Form must be scrollable on small screens.

## Claude Code Implementation Instruction

Use this prompt when implementing the screen:

```text
Implement the Add Child screen according to docs/ui-screens/11-add-child.md and the visual reference assets/design-references/add-child-approved-direction.png.

Also read docs/ui-screens/00-bottom-navigation.md before implementing.

Use the image only as a visual direction. Do not use the entire screenshot as one image.

Build the screen using real React Native components.

Use CLIENT_CONFIG for branding.

Show:
- top header
- security/info notice
- child details section
- optional photo placeholder
- parent/guardian details section
- additional information textarea
- save button
- cancel button
- shared BottomNavBar

Use local state or static mock behavior only.

Do not connect Supabase.
Do not implement real image upload.
Do not send real notifications.

On save, show a simple success state or placeholder alert.

The bottom navigation must use the shared BottomNavBar component and must not be recreated inside this screen.

Keep the layout Hebrew RTL and mobile-first.
```

## Review Notes

Approved direction notes:

- The final approved mockup is a clean app screen only.
- It correctly focuses on adding a child and parent contact information.
- The form is simple enough for MVP.
- More advanced child profile fields can be added later.
- This is the last missing MVP screen before preparing the development prompt.
