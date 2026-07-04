# Streak Habit Tracker

A mobile habit tracker built with Expo Router that demonstrates local notification scheduling, push notifications, permission handling, Android notification channels, and deep linking from both notification types into the correct habit screen.

## Demo & Submission


- **Demo Video:**(https://ik.imagekit.io/lbndnztj6/streak.mp4)
- **Development Build:** (https://expo.dev/accounts/dev_lucy/projects/13_assignment-streak/builds/3fc3f1e7-ecd3-421a-873a-f2cc7ad1e0cf)

## Features

### Habit Management
- Create, edit, and delete habits (name, emoji, frequency, reminder time)
- Daily and weekly (selected weekdays) reminder frequencies
- Mark a habit as done for the day
- Streak count increases on consecutive completions, resets on a missed day
- Habits, reminders, and notification IDs persist across app restarts (Expo SQLite)

### Local Notifications
- Reminders scheduled when a habit is created
- Editing a habit cancels its old notification IDs and schedules new ones
- Deleting a habit cancels only that habit's notifications — not all scheduled notifications
- Foreground handler ensures reminders are visible even while the app is open
- Custom high-importance Android notification channel for reminders

### Push Notifications
- Device registers for an Expo Push Token on launch
- Token is displayed in Settings and can be copied
- A lightweight Node/Express server (using `expo-server-sdk`) sends pushes on request
- Same tap handler is reused for both local and push notification taps
- Push receipts are polled ~15s after sending; tokens reporting `DeviceNotRegistered` are pruned from the server's store

### Deep Linking
- Notification payload carries `{ screen: '/habit', habitId }`
- Tapping a local or push notification opens the matching habit detail screen
- Missing or invalid habit data is handled gracefully (no crash, falls back to home)

### Permissions
- Permission requested only after the Android channel is created
- Denied state is shown clearly, with a button to open system settings
- App never crashes regardless of permission status

## Tech Stack

| Layer | Technology |
|---|---|
| App framework | Expo SDK 55, Expo Router |
| UI | React Native, TypeScript |
| Local storage | Expo SQLite |
| Notifications | expo-notifications |
| Push backend | Node.js, Express, expo-server-sdk |

## Project Structure

```
src/
  app/
    index.tsx          # Today's habits, done buttons, streak display
    habit/[id].tsx      # Habit detail — deep-link target for notifications
    new.tsx             # Create/edit habit form
    settings.tsx        # Permission status, push token, copy button

  lib/
    habits/
      storage.ts        # Habit CRUD (Create, Read, Update, Delete)
      types.ts           # Habit & Frequency types
    notifications/
      setup.ts           # Notification handler, Android channel, permissions
      schedule.ts         # Schedule/cancel/reschedule habit reminders
      push.ts             # Push token registration

  hooks/
    use-habits.ts
    use-push-notifications.ts

server/
  index.ts              # Express server: /register, /unregister, /send
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the push server (separate terminal)
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:4000`. Note your machine's local network IP (e.g. `192.168.x.x`) — the app needs this to reach the server from a physical device.

### 3. Create a development build
Push notifications **do not work in Expo Go**, so a dev build is required:
```bash
eas build --profile development --platform android
```

### 4. Start the app
```bash
npx expo start --dev-client
```

### 5. Test push notifications
```bash
curl -X POST http://<your-ip>:4000/send \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Time to drink water 💧",
    "body": "Tap to log it.",
    "data": { "screen": "/habit", "habitId": "<a-real-habit-id>" }
  }'
```
Test both with the app **open (foreground)** and **backgrounded/killed** to observe the different notification behaviors.

## Conceptual Writeup

### Local vs Push Notifications
Local notifications are scheduled entirely on-device via `expo-notifications` — no server or network round-trip is needed, and they fire based on a device-local trigger (time, interval, calendar). Push notifications originate from a remote server, are routed through Apple Push Notification Service (APNs) or Firebase Cloud Messaging (FCM), and reach the device via Expo's push service. Local notifications are used here for scheduled habit reminders since they don't depend on connectivity; push notifications are used for server-driven nudges (e.g. streak reminders, announcements) that need to be triggered externally.

### Push Ticket vs Receipt
When the server calls `sendPushNotificationsAsync`, Expo immediately returns a **ticket** per message — this only confirms Expo *accepted* the request for delivery, not that it reached the device. Some time later, the server polls `getPushNotificationReceiptsAsync` using the ticket IDs to get a **receipt**, which reflects the actual outcome from APNs/FCM (delivered, or an error like `DeviceNotRegistered`). Tickets are immediate and optimistic; receipts are delayed and authoritative.

### DeviceNotRegistered
This receipt error means the push token is no longer valid — typically because the app was uninstalled, the token was regenerated, or the OS revoked it. The server should remove such tokens from its store immediately; continuing to send to them wastes requests and can eventually get the sending app rate-limited or flagged by Expo/FCM/APNs.

### Expo Go Limitation
Expo Go is a shared sandbox app used for quick local-notification testing, but it cannot register unique push credentials per app (no custom FCM/APNs setup), so push notifications silently fail to arrive. A development build (`eas build --profile development`) compiles the app with its own native push configuration, which is required for push notifications to work at all.

### Android Notification Channel Behavior
On Android 8+ (API 26+), every notification must belong to a channel, and a channel's importance/sound/vibration settings are locked in at creation time — they can't be changed later once a user has seen them. If the permission request happens before the channel exists, the very first scheduled notification can get silently assigned to a generic/default channel instead of the intended high-importance one, and no amount of re-creating the channel afterward fixes it for that user. Creating the channel before requesting permission guarantees reminders are correctly categorized as high-priority from the very first notification.

## Notes
- All notification side effects (scheduling, cancelling, channel setup) live in `lib/notifications/`, not in UI components.
- Habit storage logic is fully separated from notification logic.
- The app degrades gracefully when permission is denied — no crashes, with a clear path to system settings.