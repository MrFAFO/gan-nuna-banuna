# 09 - Absence Report / Parent Absence Reporting

## Status

Deferred / Optional Future Feature

## Product Decision

בשלב זה, **דיווח היעדרות מצד ההורה לא ייכנס כפיצ'ר חובה ב-MVP**.

החלטה זו התקבלה משום שהאפליקציה של גן נונה בנונה אינה מיועדת להחליף לגמרי את התקשורת האישית בין ההורים לגננת.

בגן ביתי, הקשר האנושי, ההיכרות, הקרבה והשיחות הישירות בין ההורים לגננת הם חלק חשוב מהחוויה ומהאמון.

האפליקציה נועדה בעיקר:

- לעשות סדר.
- לרכז מידע במקום אחד.
- להציג עדכונים בצורה ברורה.
- לתעד נוכחות, חוזים, סיכומי יום ופעילויות.
- להפחית בלגן, לא לבטל תקשורת אישית.

## Updated MVP Decision

בגרסת ה-MVP:

- ההורה לא חייב לדווח היעדרות דרך האפליקציה.
- אם ילד לא מגיע, ההורה יכול להתקשר לגננת או לשלוח לה הודעה.
- הגננת תעדכן את ההיעדרות בעצמה במסך `נוכחות`.
- מסך בית הורה לא חייב לכלול כפתור מרכזי של `דיווח היעדרות`.
- אין צורך לבנות מסך דיווח היעדרות בשלב הראשון.

## Why This Feature Is Deferred

דיווח היעדרות מצד ההורה יכול להיות שימושי, אבל הוא לא קריטי לגרסה הראשונה.

בגן ביתי, הרבה פעמים הורה יעדיף לכתוב או להתקשר ישירות:

- "הילד לא מרגיש טוב היום"
- "נגיע מאוחר"
- "סבתא תאסוף היום"
- "נעדכן אותך בהמשך"

שיחות כאלה כוללות הקשר אנושי שלא תמיד נכון לצמצם לכפתור באפליקציה.

## Current Attendance Responsibility

ב-MVP, האחריות לתיעוד ההיעדרות נמצאת בצד הגננת.

המסך הרלוונטי:

```text
/teacher/attendance
```

שם הגננת תוכל לסמן לכל ילד:

- הגיע
- לא הגיע
- מאחר
- יצא מוקדם

## Effect on Parent Home Screen

מסך בית הורה לא חייב לכלול כפתור:

```text
דיווח היעדרות
```

במקום זאת, מסך הבית של ההורה יתמקד ב:

- היום בגן.
- סיכום יום.
- תמונות אחרונות.
- הודעות מהגן.
- טפסים ומסמכים.
- חוזה שממתין לחתימה, אם קיים.
- צור קשר עם הגן.

## Optional Future Version

בעתיד אפשר להחזיר את הפיצ'ר בצורה עדינה, לא כתחליף לשיחה.

אפשרות עתידית:

```text
דיווח מהיר לגננת
```

ולא בהכרח:

```text
דיווח היעדרות
```

האפשרויות יכולות להיות:

- הילד לא מגיע היום.
- נגיע מאוחר.
- הילד יצא מוקדם.
- אבקש שהגננת תחזור אליי.

אבל זה לא חלק מה-MVP הראשון.

## Future Route

אם נחליט להחזיר את הפיצ'ר בעתיד, המסלול יהיה:

```text
/parent/absence-report
```

כרגע אין צורך ליישם אותו.

## Future Screen Purpose

אם ימומש בעתיד, מטרת המסך תהיה לאפשר להורה לשלוח דיווח קצר לגננת, בלי להחליף שיחה או הודעה אישית.

המסך העתידי יוכל לכלול:

- שם הילד.
- תאריך.
- בחירת סוג דיווח.
- הערה חופשית.
- כפתור שליחה.

## Future UX Direction

אם הפיצ'ר יתווסף בעתיד, הוא צריך להיות:

- פשוט מאוד.
- לא מרכזי מדי במסך הבית.
- מנוסח כעזרה לגננת, לא כתחליף לקשר אישי.
- מחובר למסך הנוכחות של הגננת.
- לא חובה לשימוש.

## Development Decision

בשלב הפיתוח הראשון:

- Do not implement `/parent/absence-report`.
- Do not add a required absence report button to Parent Home.
- Do not create backend tables for parent absence reports yet.
- Keep attendance management on the teacher side only.
- Parent Home may include a general `צור קשר עם הגן` action instead.

## Update Required in Other Specs

The following files should be reviewed and adjusted if they currently describe parent absence reporting as a required MVP feature:

```text
02-mvp-spec.md
03-ux-flow.md
04-screen-specs.md
08-parent-home.md
```

Updated rule:

```text
Parent absence reporting is deferred and optional.
Teacher attendance marking remains part of MVP.
```

## Claude Code Instruction

If Claude Code sees references to `/parent/absence-report` in older specs, use this updated decision:

```text
Do not implement Parent Absence Report in the first skeleton phase.

Absence will be recorded by the teacher in the Attendance screen.

The parent side should preserve human communication with the daycare and may include a general contact action instead.

Treat docs/ui-screens/09-absence-report.md as a deferred optional future feature, not an MVP requirement.
```

## Review Notes

This change reflects the product direction that the app should organize and centralize important daycare information, not fully replace the personal communication between parents and the daycare staff.
