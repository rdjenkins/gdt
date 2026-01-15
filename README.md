Grampound Digital Twin project

Development
---

npm install

npm run dev

// for Android first install Android Studio then ...

npm run android

Build
---

// for web

npm run build

// for Android - build in Android Studio (workflow)
// - make sure the config file (not included in git) is present and correct
// - - android/app/google-services.json
// - bump the version numbers in android\app\build.gradle
// - build signed APK for single device testing
// - build signed Bundle for Google Play Store