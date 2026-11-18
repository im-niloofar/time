# Mohan Time — راهنمای نصب روی اندروید

## راه ۱ — نصب فوری روی گوشی (بدون APK، ساده‌ترین)
1. پوشه `www` را روی یک هاست HTTPS رایگان بگذار (مثلاً Netlify Drop: netlify.com/drop ← پوشه را بکش و رها کن).
2. آدرس را در Chrome گوشی باز کن ← منوی ⋮ ← «Install app / نصب برنامه».
3. آیکون Mohan Time روی صفحه اصلی می‌آید، تمام‌صفحه و آفلاین کار می‌کند.

## راه ۲ — گرفتن فایل APK بدون نصب Android Studio
1. بعد از راه ۱، آدرس سایت را در pwabuilder.com بزن ← Package for stores ← Android ← Download.
2. فایل APK داخل ZIP خروجی است.

## راه ۳ — ساخت APK با Capacitor (روی کامپیوتر با Android Studio)
```
npm install
npx cap add android
npm run icons        # ساخت آیکون‌های اندروید از پوشه assets
npx cap sync android
cd android && ./gradlew assembleDebug
```
خروجی: `android/app/build/outputs/apk/debug/app-debug.apk`

## فایل تک‌تکه
`Mohan-Time-single.html` همان برنامه است با فونت و لوگوی داخل خود فایل (برای چسباندن در Google Apps Script).

## نکات
- تم‌ها: دکمه «🎨 تم» بالای صفحه؛ پنج تم + حالت روز/خودکار/شب.
- در APK سازنده Capacitor، دکمه «دانلود بکاپ» نیاز به افزونه Share دارد؛ در نسخه PWA (راه ۱ و ۲) درست کار می‌کند.
