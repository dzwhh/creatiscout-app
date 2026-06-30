"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { lookup, type Locale } from "./dict";

interface I18nState {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: "zh",
      setLocale: (l) => set({ locale: l }),
    }),
    { name: "creatiscout.locale" },
  ),
);

export function useT() {
  const locale = useI18nStore((s) => s.locale);
  return (key: string) => lookup(key, locale);
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const locale = useI18nStore((s) => s.locale);
  const setLocale = useI18nStore((s) => s.setLocale);
  return [locale, setLocale];
}
