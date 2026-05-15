import { createContext, useContext, useState, useEffect } from "react";

export const LANG_NAMES = {
  ar: "العربية",
  bg: "Български",
  bn: "বাংলা",
  cs: "Čeština",
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
  es: "Español",
  fa: "فارسی",
  fr: "Français",
  gu: "ગુજરાતી",
  ha: "Hausa",
  he: "עברית",
  hi: "हिन्दी",
  hu: "Magyar",
  hy: "Հայերեն",
  id: "Bahasa Indonesia",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  mr: "मराठी",
  ms: "Bahasa Melayu",
  nl: "Nederlands",
  pa: "ਪੰਜਾਬੀ",
  pl: "Polski",
  pt: "Português",
  ro: "Română",
  ru: "Русский",
  sr: "Српски",
  sv: "Svenska",
  sw: "Kiswahili",
  ta: "தமிழ்",
  te: "తెలుగు",
  tg: "Тоҷикӣ",
  th: "ภาษาไทย",
  tl: "Filipino",
  tr: "Türkçe",
  uk: "Українська",
  ur: "اردو",
  vi: "Tiếng Việt",
  xh: "isiXhosa",
  zh: "中文",
};

const RTL_LANGS = new Set(["ar", "fa", "he", "ur"]);

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("lang");
    if (saved && LANG_NAMES[saved]) return saved;
    const browser = navigator.language.split("-")[0];
    return LANG_NAMES[browser] ? browser : "nl";
  });
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(null);
    import(`../i18n/${lang}.json`)
      .then((m) => {
        setT(m.default);
        document.title = m.default.ui.title + " ₿";
        document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
        document.documentElement.lang = lang;
      })
      .catch(() =>
        import("../i18n/nl.json").then((m) => {
          setT(m.default);
          document.title = m.default.ui.title + " ₿";
          document.documentElement.dir = "ltr";
          document.documentElement.lang = "nl";
        })
      );
  }, [lang]);

  const setLang = (code) => {
    localStorage.setItem("lang", code);
    setLangState(code);
  };

  if (!t) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
