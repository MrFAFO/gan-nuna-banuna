# 07 - AI Agent Prompts

# פרומפטים לסוכן קוד

## Prompt 1 - Create Initial Project Structure

Create the initial Expo React Native TypeScript app structure for a white-label daycare mobile app.

The first branded client is:
גן נונה בנונה

Requirements:
1. Use Expo Router.
2. Use TypeScript.
3. Create a client config file at src/config/client.config.ts.
4. The app name, daycare name, primary color, secondary color, background color, support phone, and support email must come from the client config.
5. Create the following screens:
   - Login / Welcome
   - Teacher Home
   - Children List
   - Add Child
   - Attendance
   - Daily Report
   - Teacher Contracts
   - Upload Contract
   - Parent Home
   - Absence Report
   - Parent Contract Renewal
6. All visible UI text must be Hebrew.
7. The UI must be RTL-friendly.
8. Do not connect Supabase.
9. Do not implement real authentication.
10. Do not connect a real signing provider.
11. Use mock data only.
12. Create reusable components:
   - AppScreen
   - AppButton
   - AppCard
   - AppTextInput
   - StatusBadge
13. Keep the code clean and scalable for future white-label daycare apps.

## Prompt 2 - Implement Login Screen from UI Reference

Implement the Login / Welcome screen for the Expo React Native app.

Use the attached UI reference image as visual direction.

Requirements:
1. Hebrew RTL layout.
2. App name should come from CLIENT_CONFIG.
3. Use warm cream background, sage green, and soft peach.
4. Use the custom illustrated hero image as the upper hero section.
5. The main button must be:
   כניסה להורים
6. The secondary button must be:
   כניסת צוות הגן
7. Add helper text:
   צריכים עזרה בכניסה? פנו אלינו
8. On parent button press, navigate to /parent/home.
9. On staff button press, navigate to /teacher/home.
10. Do not implement real authentication.
11. Do not hard-code app branding outside CLIENT_CONFIG.
12. Keep text readable on mobile screens.
13. Build real React Native buttons and text. Do not use the entire screen as one image.

## Prompt 3 - Implement Teacher Home

Implement the Teacher Home screen.

Requirements:
1. Hebrew RTL.
2. Show daycare name from CLIENT_CONFIG.
3. Show today's date.
4. Show attendance summary using mock data.
5. Show alerts:
   - Contracts waiting for signature.
   - Parent absence reports.
   - Children without daily report.
6. Add action buttons:
   - ילדים
   - נוכחות
   - סיכום יום
   - חוזים
7. Use AppCard, AppButton, and StatusBadge.
8. Do not connect backend.

## Prompt 4 - Implement Contracts Screens

Implement Teacher Contracts and Upload Contract screens.

Requirements:
1. Use mockContracts data.
2. Show contract status badges.
3. Add button:
   העלאת חוזה חדש
4. Upload Contract screen should show:
   - PDF file placeholder.
   - Select child.
   - Select parent.
   - Contract name.
   - Send to signature button.
5. Do not implement real PDF upload.
6. Do not connect signing provider yet.
