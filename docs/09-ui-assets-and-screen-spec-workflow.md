# 09 - UI Assets and Screen Spec Workflow

# עבודה מסודרת עם תמונות UI ופיתוח

## למה צריך קובץ MD לכל תמונת UI

תמונת UI לבדה אינה מספיקה לפיתוח.

התמונה מסבירה איך המסך אמור להיראות, אבל היא לא מגדירה מספיק טוב:

- מה מטרת המסך.
- אילו רכיבים אמיתיים צריכים להיבנות בקוד.
- מה טקסט אמיתי ומה רק חלק מהאיור.
- מה קורה בלחיצה על כפתור.
- אילו נתוני דמו להשתמש.
- מה מגיע מתוך CLIENT_CONFIG.
- מה אסור לסוכן הקוד לעשות.
- איך המסך מתחבר לניווט.

לכן לכל מסך מאושר יהיו שני דברים:

1. תמונת UI מאושרת.
2. קובץ Markdown עם מפרט פיתוח לאותו מסך.

## מבנה תיקיות מומלץ

```text
docs/
  ui-screens/
    01-login-screen.md
    02-teacher-home.md
    03-children-list.md
    04-attendance.md
    05-daily-report.md
    06-teacher-contracts.md
    07-upload-contract.md
    08-parent-home.md
    09-absence-report.md
    10-parent-contract-renewal.md

assets/
  design-references/
    login-screen-approved-direction.png

assets/
  clients/
    nuna-banuna/
      login-hero.png
```

## תפקיד התמונה

התמונה משמשת כ-Visual Reference.

היא מגדירה:

- שפה ויזואלית.
- צבעים.
- היררכיה.
- אופי המותג.
- תחושת המסך.
- מיקום יחסי של אלמנטים.

## תפקיד קובץ ה-MD

קובץ ה-MD משמש כמפרט ביצוע.

הוא מגדיר:

- מטרת המסך.
- טקסטים מדויקים.
- רכיבי UI.
- התנהגות לחיצות.
- נתוני דמו.
- נכסים.
- כללי פיתוח.
- מגבלות.

## כלל חשוב לפיתוח

אסור להשתמש בכל תמונת המסך כתמונה אחת בתוך האפליקציה.

בפיתוח אמיתי:

- האיור האישי יכול להיות קובץ תמונה.
- הטקסטים צריכים להיות React Native Text.
- הכפתורים צריכים להיות רכיבי Button אמיתיים.
- הניווט צריך להיות Expo Router אמיתי.
- הנתונים צריכים להגיע מ-mock data בשלב הראשון.
- המיתוג צריך להגיע מ-CLIENT_CONFIG.

## מה Claude Code יקבל לכל מסך

לכל מסך נעביר ל-Claude Code:

1. קובץ תמונה.
2. קובץ MD.
3. הפניה לקבצי האפיון הכלליים.
4. מגבלות ברורות.

דוגמה:

```text
Implement the Login screen using:
- docs/ui-screens/01-login-screen.md
- assets/design-references/login-screen-approved-direction.png
- docs/05-ui-direction.md
- docs/06-technical-plan.md

Do not use the full screenshot as one image.
Build the screen using real React Native components.
```

## סטטוס עבודה

כל מסך יעבור סטטוס:

- Draft
- Needs Review
- Approved Direction
- Approved for Development
- Implemented
- QA Needed
- Done

## מסכי UI ראשונים לתכנון

1. Login / Welcome
2. Teacher Home
3. Children List
4. Attendance
5. Daily Report
6. Teacher Contracts
7. Upload Contract
8. Parent Home
9. Absence Report
10. Parent Contract Renewal
