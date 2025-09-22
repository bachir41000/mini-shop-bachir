type CurrencyCode = "EUR" | "USD";

const map: Record<string, { locale: string; currency: CurrencyCode }> = {
  fr: { locale: "fr-FR", currency: "EUR" },
  en: { locale: "en-US", currency: "USD" },
};

function resolve(lang: string) {
  return map[lang] ?? map.fr;
}

export function formatCurrency(value: number, lang: string): string {
  const { locale, currency } = resolve(lang);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function getCurrencySymbol(lang: string): string {
  const { locale, currency } = resolve(lang);
  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).formatToParts(0);
  const sym = parts.find(p => p.type === "currency")?.value ?? "";
  return sym;
}