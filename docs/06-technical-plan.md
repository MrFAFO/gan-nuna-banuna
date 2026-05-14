# 06 - Technical Plan

# תוכנית טכנית - גן נונה בנונה

## טכנולוגיה

האפליקציה תיבנה עם:

- Expo.
- React Native.
- TypeScript.
- Expo Router.

## Backend עתידי

בהמשך:

- Supabase Authentication.
- Supabase Database.
- Supabase Storage.
- ספק חתימה חיצוני לחוזים.

## שם פרויקט

gan-nuna-banuna

## מבנה מסכים

```text
app/
  _layout.tsx
  index.tsx
  login.tsx
  teacher/
    _layout.tsx
    home.tsx
    children.tsx
    add-child.tsx
    attendance.tsx
    daily-report.tsx
    contracts.tsx
    upload-contract.tsx
  parent/
    _layout.tsx
    home.tsx
    absence-report.tsx
    contract-renewal.tsx
```

## מבנה תיקיות

```text
src/
  config/
    client.config.ts
  components/
    AppButton.tsx
    AppCard.tsx
    AppTextInput.tsx
    AppScreen.tsx
    StatusBadge.tsx
  data/
    mockChildren.ts
    mockContracts.ts
    mockDailyReports.ts
  theme/
    colors.ts
    spacing.ts
  types/
    child.ts
    contract.ts
    user.ts
assets/
  clients/
    nuna-banuna/
      login-hero.png
  design-references/
    login-screen-approved.png
```

## Client Config

```ts
export const CLIENT_CONFIG = {
  clientId: "nuna-banuna",
  appName: "גן נונה בנונה",
  daycareName: "גן נונה בנונה",
  ownerName: "",
  primaryColor: "#7A9A72",
  secondaryColor: "#F4D6C6",
  backgroundColor: "#FFF8F1",
  supportPhone: "",
  supportEmail: "",
};
```

## כלל חשוב

לא לכתוב את שם הגן ישירות בכל מסך.

כל מסך יקרא את הנתונים מתוך CLIENT_CONFIG.

## נתוני דמו

בשלב הראשון משתמשים בנתוני דמו בלבד.

אין:

- Supabase.
- Auth אמיתי.
- ספק חתימה.
- העלאת PDF אמיתית.

## ניווט דמו

במסך Login יהיו שני כפתורים:

- כניסה להורים → parent/home.
- כניסת צוות הגן → teacher/home.

## שלב ראשון בפיתוח

המטרה:

- ליצור שלד אפליקציה.
- ליצור מסכים.
- ליצור רכיבי UI.
- להציג נתוני דמו.
- לשמור על RTL.
- לבנות לפי ה-UI Direction.
