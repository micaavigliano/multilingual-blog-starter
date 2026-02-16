// just a header. Do what you want but take in mind that it is fully accessible. The most important component is the LanguageSwitcher.

import { useEffect, useMemo, useState } from "react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useI18n } from '@/lib/I18nProvider'
import { Link, useRouterState } from "@tanstack/react-router"
import { getPostTranslations, type Locale } from "@/lib/mdx"

const Header = () => {
  const [translations, setTranslations] = useState<Partial<Record<Locale, string>>>({})
  const pathname = useRouterState({ select:  s => s.location.pathname })
  const { locale } = useI18n()

  const { isPost, slug } = useMemo(() => {
    const seg = pathname.split("/").filter(Boolean)
    const isPost = seg.length >= 3 && seg[1] === "blog" && ['en', 'es', 'it'].includes(seg[0])
    return { isPost, slug: isPost ? seg[2] : "" }
  }, [pathname])

  useEffect(() => {
    let ignore = false

    const loadTranslations = async () => {
      if (!isPost || !slug || !locale) {
        setTranslations({})
        return
      }

      try {
        const postTranslations = await getPostTranslations(slug, locale as Locale)
        if (!ignore) {
          setTranslations(postTranslations)
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        if (!ignore) {
          setTranslations({})
        }
      }
    }

    loadTranslations()

    return () => {
      ignore = true
    }
  }, [isPost, slug, locale])

  return (
    <header className="backdrop-blur-sm border-b border-t bg-background mx-auto px-4 sm:px-6 py-2 sm:py-4 z-50 relative">
      <div className="flex justify-between items-center">
        <Link
          to="/$locale"
          params={{ locale }}
          className="text-lg sm:text-xl font-bold hover:opacity-70 transition-opacity"
        >
          Your Name
        </Link>
        <nav className="flex space-x-6 items-center" aria-label="Main navigation">
          <Link
            to="/$locale/blog"
            params={{ locale }}
            activeProps={{
              className: "text-foreground transition-colors nav-focus bg-violet-100 px-2 py-1 rounded-md"
            }}
            inactiveProps={{
              className: "text-black underline decoration-violet-400 decoration-3 underline-offset-4"
            }}
          >
            Blog
          </Link>
          <LanguageSwitcher translations={translations} />
        </nav>

        {/* Mobile Menu Button */}

      </div>
    </header>
  )
}

export default Header