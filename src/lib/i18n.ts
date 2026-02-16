// change the values of the array with your desire locales
export const locales = ['en', 'es', 'it'] as const
export type Locale = typeof locales[number]
// change the default locale with the one you want to be the default
export const defaultLocale: Locale = 'en'

// change the keys and the values with your desire locales. Here you can see the list of all the ISO codes for all the available languages https://www.w3schools.com/tags/ref_language_codes.asp
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
}

// Do not forget to add the specific format of the new languages you are going to use. On the following link you will find a list of country locale codes https://saimana.com/list-of-country-locale-code/. Do not forget that the user of underscore _ it is mandatory!!!
export const socialLocaleMap: Record<string, string> = {
  en: 'en_US',
  es: 'es_AR',
  it: 'it_IT',
}

export const isValidLocale = (locale: string): locale is Locale => {
  return (locales as readonly string[]).includes(locale)
}

export const getLocaleFromPathname = (pathname: string): Locale => {
  const seg = pathname.split('/')[1]
  return isValidLocale(seg) ? (seg as Locale) : defaultLocale
}
