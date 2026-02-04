// change the values of the array with your desire locales
export const locales = ['en', 'es', 'it'] as const
export type Locale = typeof locales[number]
// change the default locale with the one you want to be the default
export const defaultLocale: Locale = 'en'

// change the keys and the values with your desire locales
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
}

export const isValidLocale = (locale: string): locale is Locale => {
  return (locales as readonly string[]).includes(locale)
}

export const getLocaleFromPathname = (pathname: string): Locale => {
  const seg = pathname.split('/')[1]
  return isValidLocale(seg) ? (seg as Locale) : defaultLocale
}
