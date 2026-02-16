// just a footer. Do what you want but take in mind that it is fully accessible.

import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from '@/lib/I18nProvider'

const Footer = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <footer className="border-t bg-background mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center flex gap-10 flex-row justify-center"
    >
      <span><span aria-hidden="true">©</span> {new Date().getFullYear()}</span>
      <div className="flex flex-row gap-2">
        <p>{t("footer.made.with")} <span className="sr-only"> Mica Avigliano</span></p>
        <a
          href="https://github.com/micaavigliano"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-focus font-medium underline decoration-violet-400 decoration-2 underline-offset-4 hover:decoration-violet-600 transition-all text-gray-900"
          aria-label={t('footer.github')}
        >
          Mica Avigliano
        </a>
      </div>
    </footer>
  )
}

export default Footer
