// This component can be omitted, deleted or reused. They are components for error handling. The components are accessible for each error in particular. You can take it as a reference for your own development.

import { AlertTriangle, FileQuestion, ArrowLeft, Home } from "lucide-react"
import { Link } from '@tanstack/react-router'
import { getTranslation, type TranslationKey } from "@/lib/translations"
import { useI18n } from "@/lib/I18nProvider"

export const PageNotFound = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center"
      aria-labelledby="error-title"
    >
      <div className="p-6 rounded-full mb-6">
        <FileQuestion className="w-16 h-16" aria-hidden="true" />
      </div>

      <h1 
        className="text-2xl font-bold text-gray-900 mb-2 nav-focus"
        tabIndex={-1}
      >
        {t('not.found.title')}
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        {t('not.found.description')}
      </p>

      <Link
        to="/$locale"
        params={{ locale }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all nav-focus underline decoration-violet-400 decoration-3 underline-offset-4"
      >
        <Home className="w-5 h-5" aria-hidden="true" />
        {t('not.found.back')}
      </Link>
    </div>
  )
}

export const NoPosts = ({ error }: { error?: Error }) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <div 
      className="flex flex-col items-center justify-center px-4 text-center min-h-screen"
      role="status"
      aria-live="polite"
    >
      <div className="p-6 rounded-full mb-6">
        <FileQuestion className="w-12 h-12" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 nav-focus">
        {t("blog.no.posts")}
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        {error?.message || t("blog.no.posts.desc")}
      </p>

      <Link
        to="/$locale"
        params={{ locale }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all nav-focus underline decoration-violet-400 decoration-3 underline-offset-4"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        {t("blog.return.home")}
      </Link>
    </div>
  )
}

export const BlogErrorComponent = ({ error }: { error: Error }) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <div 
      className="flex flex-col items-center justify-center px-4 text-center min-h-screen"
      role="alert" 
      aria-live="assertive"
    >
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 nav-focus" tabIndex={-1}>
        {t('blog.error.title')}
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        {error.message || t('blog.error.description')}
      </p>

      <Link
        to="/$locale/blog"
        params={{ locale }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all nav-focus underline decoration-violet-400 decoration-3 underline-offset-4"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
        {t('blog.error.back')}
      </Link>
    </div>
  )
}

export const BlogNotFoundComponent = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <div 
      className="flex flex-col items-center justify-center px-4 text-center min-h-screen"
      role="status"
      aria-live="polite"
    >
      <div className="bg-violet-50 p-6 rounded-full mb-6">
        <FileQuestion className="w-12 h-12 text-violet-500" aria-hidden="true" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 nav-focus" tabIndex={-1}>
        {t('blog.notfound.title')}
      </h1>

      <p className="text-gray-600 mb-8 max-w-md">
        {t('blog.notfound.description')}
      </p>

      <Link
        to="/$locale/blog"
        params={{ locale }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all nav-focus underline decoration-violet-400 decoration-3 underline-offset-4"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        {t('blog.notfound.back')}
      </Link>
    </div>
  )
}