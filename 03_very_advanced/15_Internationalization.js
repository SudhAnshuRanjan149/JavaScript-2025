/****************************************************************************************
 * INTERNATIONALIZATION (i18n) IN JAVASCRIPT — COMPLETE & DETAILED GUIDE (BEGINNER → ADVANCED)
 *
 * Covers:
 * ✅ What i18n is
 * ✅ Why i18n is important
 * ✅ Locale concepts
 * ✅ Intl API overview
 * ✅ Date & Time Formatting
 * ✅ Number & Currency Formatting
 * ✅ Pluralization Rules
 * ✅ String Comparison (Collation)
 * ✅ List Formatting
 * ✅ Segmenter (Text segmentation)
 * ✅ Time Zones
 * ✅ Message Translation Strategy
 * ✅ Popular i18n Libraries
 * ✅ Common Pitfalls
 * ✅ Interview-level concepts
 ****************************************************************************************/


/*========================================================================================
 1. WHAT IS INTERNATIONALIZATION (i18n)?
========================================================================================*/
//
// INTERNATIONALIZATION (i18n):
// ----------------------------
// The process of designing your application so it can be adapted to
// different languages, regions, and cultures WITHOUT changing core logic.
//
// Why "i18n"? → "Internationalization"
// I + 18 letters + N = i18n ✅
//
// Related term:
// -------------
// ✅ L10n (Localization) → Actual translation of content
//
// Example:
// --------
// i18n → Feature support for languages
// l10n → Translating English → Hindi / French / Arabic
//


/*========================================================================================
 2. WHY i18n IS IMPORTANT
========================================================================================*/
//
// ✅ Global applications
// ✅ Different languages
// ✅ Different currencies
// ✅ Different number formats
// ✅ Different time/date formats
// ✅ Right-to-left (RTL) languages
// ✅ Legal & regional requirements
//
// Without i18n:
// -------------
// ❌ Hardcoded English everywhere
// ❌ Wrong currency
// ❌ Wrong date formats
// ❌ Poor user experience globally
//


/*========================================================================================
 3. LOCALE — HEART OF i18n
========================================================================================*/
//
// A LOCALE defines:
//
// ✅ Language
// ✅ Country/Region
// ✅ Formatting rules
//
// Format:
// --------
// "language-region"
//
// Examples:
// ---------
// "en-US" → English (United States)
// "en-GB" → English (United Kingdom)
// "hi-IN" → Hindi (India)
// "fr-FR" → French (France)
// "ar-SA" → Arabic (Saudi Arabia)
// "ja-JP" → Japanese (Japan)
//

const userLocale = navigator.language; // Auto-detect locale from browser


/*========================================================================================
 4. JAVASCRIPT INTERNATIONALIZATION API (Intl)
========================================================================================*/
//
// JavaScript provides a built-in global object:
// --------------------------------------------
// ✅ Intl
//
// It supports:
// ------------
// ✅ Date & Time formatting
// ✅ Number & Currency formatting
// ✅ Pluralization
// ✅ String comparison
// ✅ List formatting
// ✅ Text segmentation
// ✅ Time zones
//
// Core Intl Classes:
// ------------------
// Intl.DateTimeFormat
// Intl.NumberFormat
// Intl.PluralRules
// Intl.Collator
// Intl.ListFormat
// Intl.Segmenter
//


/*========================================================================================
 5. DATE & TIME FORMATTING (Intl.DateTimeFormat)
========================================================================================*/
//
// Different countries format dates differently.
//

const date = new Date("2025-01-15T14:30:00Z");

const usDate = new Intl.DateTimeFormat("en-US").format(date);
const ukDate = new Intl.DateTimeFormat("en-GB").format(date);
const indiaDate = new Intl.DateTimeFormat("hi-IN").format(date);

console.log(usDate);     // 1/15/2025
console.log(ukDate);     // 15/01/2025
console.log(indiaDate);  // 15/1/2025


/*------------------------------
 5.1 Custom Date Formatting
-------------------------------*/

const formattedDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
}).format(date);

console.log(formattedDate);


/*========================================================================================
 6. TIME ZONE FORMATTING
========================================================================================*/
//
// Same date, different countries → different time zones
//

const indiaTime = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  timeStyle: "medium",
  dateStyle: "long"
}).format(date);

const usTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  timeStyle: "medium",
  dateStyle: "long"
}).format(date);

console.log(indiaTime);
console.log(usTime);


/*========================================================================================
 7. NUMBER FORMATTING (Intl.NumberFormat)
========================================================================================*/
//
// Different countries use different number separators.
// Example:
// --------
// US → 1,000,000
// India → 10,00,000
//

const num = 1000000;

console.log(new Intl.NumberFormat("en-US").format(num)); // 1,000,000
console.log(new Intl.NumberFormat("hi-IN").format(num)); // 10,00,000


/*========================================================================================
 8. CURRENCY FORMATTING
========================================================================================*/
//
// Same value, different currencies.
//

const amount = 123456.78;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
}).format(amount);

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR"
}).format(amount);

const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR"
}).format(amount);

console.log(usd); // $123,456.78
console.log(inr); // ₹1,23,456.78
console.log(eur); // 123 456,78 €


/*========================================================================================
 9. PERCENTAGE FORMATTING
========================================================================================*/

const percent = new Intl.NumberFormat("en-US", {
  style: "percent"
}).format(0.857);

console.log(percent); // 86%


/*========================================================================================
 10. PLURALIZATION (Intl.PluralRules)
========================================================================================*/
//
// Different languages have different plural rules.
//

const pluralRules = new Intl.PluralRules("en-US");

console.log(pluralRules.select(1)); // "one"
console.log(pluralRules.select(2)); // "other"


/*------------------------------
 10.1 Practical Plural Example
-------------------------------*/

function getMessage(count) {
  const rule = pluralRules.select(count);
  const messages = {
    one: "You have 1 message",
    other: `You have ${count} messages`
  };
  return messages[rule];
}

console.log(getMessage(1));
console.log(getMessage(5));


/*========================================================================================
 11. STRING COMPARISON (Intl.Collator)
========================================================================================*/
//
// Sorting strings depends on language rules.
//

const words = ["zebra", "äpple", "apple"];

const englishSort = words.slice().sort(new Intl.Collator("en").compare);
const swedishSort = words.slice().sort(new Intl.Collator("sv").compare);

console.log(englishSort); // ["apple", "äpple", "zebra"]
console.log(swedishSort); // ["apple", "zebra", "äpple"]


/*========================================================================================
 12. LIST FORMATTING (Intl.ListFormat)
========================================================================================*/
//
// Different languages combine lists differently.
//

const list = ["Apple", "Banana", "Mango"];

const usList = new Intl.ListFormat("en-US", {
  style: "long",
  type: "conjunction"
}).format(list);

const frenchList = new Intl.ListFormat("fr-FR", {
  style: "long",
  type: "conjunction"
}).format(list);

console.log(usList);      // Apple, Banana, and Mango
console.log(frenchList); // Apple, Banana et Mango


/*========================================================================================
 13. TEXT SEGMENTATION (Intl.Segmenter)
========================================================================================*/
//
// Used for:
// ---------
// ✅ Word breaking
// ✅ Sentence breaking
// ✅ Emoji-aware splitting
//

const segmenter = new Intl.Segmenter("en", { granularity: "word" });

const text = "Hello world 👋";

const segments = [...segmenter.segment(text)];

console.log(segments.map(s => s.segment));


/*========================================================================================
 14. TRANSLATION STRATEGY (CORE i18n LOGIC)
========================================================================================*/
//
// i18n is NOT only formatting — it also means TRANSLATION.
//

const translations = {
  en: {
    greeting: "Hello",
    logout: "Logout"
  },
  hi: {
    greeting: "नमस्ते",
    logout: "लॉगआउट"
  },
  fr: {
    greeting: "Bonjour",
    logout: "Déconnexion"
  }
};

function t(key, locale = "en") {
  return translations[locale]?.[key] || translations.en[key];
}

console.log(t("greeting", "hi")); // नमस्ते
console.log(t("logout", "fr"));   // Déconnexion


/*========================================================================================
 15. DYNAMIC LOCALE SWITCHING
========================================================================================*/
//
// Used in:
// --------
// ✅ React
// ✅ Angular
// ✅ Vue
// ✅ Mobile apps
//

let currentLocale = "en";

function setLocale(locale) {
  currentLocale = locale;
}

function translate(key) {
  return t(key, currentLocale);
}

setLocale("fr");
console.log(translate("greeting")); // Bonjour


/*========================================================================================
 16. RTL (RIGHT-TO-LEFT) LANGUAGES
========================================================================================*/
//
// Languages like Arabic, Hebrew are RTL.
//

const rtlLocales = ["ar", "he", "fa"];

function isRTL(locale) {
  return rtlLocales.includes(locale.split("-")[0]);
}

console.log(isRTL("ar-SA")); // true
console.log(isRTL("en-US")); // false


/*========================================================================================
 17. POPULAR i18n LIBRARIES
========================================================================================*/
//
// Frontend:
// ---------
// ✅ i18next (React, Vue, Angular)
// ✅ next-intl (Next.js)
// ✅ react-intl
//
// Backend:
// --------
// ✅ i18n-node
// ✅ Polyglot.js
//
// These handle:
// ------------
// ✅ ICU message syntax
// ✅ Nested translations
// ✅ Lazy-loading locale files
// ✅ Plural rules
// ✅ Fallback locales
//


/*========================================================================================
 18. COMMON i18n PITFALLS
========================================================================================*/
//
// ❌ Hardcoding text in components
// ❌ Not externalizing date logic
// ❌ Ignoring time zones
// ❌ Wrong plural logic
// ❌ String concatenation instead of templates
// ❌ Not handling RTL languages
// ❌ Not providing fallback locale
//


/*========================================================================================
 19. i18n VS l10n (INTERVIEW TRAP)
========================================================================================*/
//
// i18n → Making the app support multiple languages
// l10n → Translating to a specific language
//
// First i18n, then l10n ✅
//


/*========================================================================================
 20. INTERVIEW QUESTIONS & TRAPS
========================================================================================*/
//
// Q1: What is Intl API?
// ✅ A built-in JS API for internationalization
//
// Q2: Difference between i18n and l10n?
// ✅ Support vs actual translation
//
// Q3: Does Intl handle translations?
// ❌ No, only formatting
//
// Q4: How to handle plural rules properly?
// ✅ Use Intl.PluralRules
//
// Q5: Why is time zone handling critical?
// ✅ Same UTC time shows differently worldwide
//


/*========================================================================================
 21. ONE-PAGE FINAL MASTER SUMMARY
========================================================================================*/
//
// ✅ i18n = Support for global languages & formats
// ✅ Locale defines language + region
// ✅ Intl API handles:
//    • Dates
//    • Numbers
//    • Currency
//    • Plurals
//    • Sorting
//    • Lists
//    • Segmentation
// ✅ Translations must be handled manually or via libraries
// ✅ RTL support is critical for global apps
// ✅ i18n is MANDATORY for production-grade global software
//
// If you master i18n ✅
// → You can build TRUE GLOBAL APPLICATIONS 🚀🌍


