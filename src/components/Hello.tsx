import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from "@/lib/I18nProvider"
import { Link } from "@tanstack/react-router"
import { ArrowUpRight, Code2, Globe, ShieldCheck, Zap, Github } from "lucide-react"
import { useSEO } from "@/hook/useSEO"

// [this component it is not vital for the development. Just exists as a main page for my project you can omit it, reuse it for your purposes or delete it]

const Hello = () => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const principles = [
    {
      id: 'i18n',
      icon: <Globe className="w-6 h-6 text-violet-600" aria-hidden="true" />,
      title: t('home.principle.i18n.title'),
      desc: t('home.principle.i18n.desc'),
    },
    {
      id: 'a11y',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" aria-hidden="true" />,
      title: t('home.principle.a11y.title'),
      desc: t('home.principle.a11y.desc'),
    },
    {
      id: 'typesafe',
      icon: <Code2 className="w-6 h-6 text-blue-600" aria-hidden="true" />,
      title: t('home.principle.typesafe.title'),
      desc: t('home.principle.typesafe.desc'),
    },
    {
      id: 'perf',
      icon: <Zap className="w-6 h-6 text-amber-600" aria-hidden="true" />,
      title: t('home.principle.perf.title'),
      desc: t('home.principle.perf.desc'),
    },
  ]

  useSEO({
    description: t("home.source.description")
  })

  return (
    <article className="pt-16 pb-22 animate-fade-in-up mx-auto px-6 flex flex-col items-center gap-12 lg:gap-3 md:mx-28 min-h-screen text-center" aria-labelledby="name-title">
      <h1 id="name-title" className="nav-focus text-5xl md:text-7xl lg:text-[7rem] font-display text-[#2D232E]">
        {t("welcome")}
      </h1>

      <section className="max-w-2xl mt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {t("home.source.title")}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {t("home.source.description")}
          {" "}
          <a
            href="https://github.com/micaavigliano/multilingual-blog-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 w-fit nav-focus font-medium underline decoration-emerald-400 decoration-2 underline-offset-4 hover:decoration-emerald-600 transition-all text-gray-900"
          >
            {t("home.actions.view.source")}
            <Github className="w-4 h-4 text-emerald-800" aria-hidden="true" />
          </a>
        </p>
      </section>

      <Link
        to="/$locale/blog"
        params={{ locale }}
        className="group inline-flex items-center gap-1 w-fit nav-focus font-medium underline decoration-violet-400 decoration-2 underline-offset-4 hover:decoration-violet-600 transition-all text-gray-900"
      >
        {t("home.actions.check.blog")}
        <ArrowUpRight 
          className="w-4 h-4 text-violet-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
          aria-hidden="true" 
        />
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
        {principles.map((p) => (
          <article 
            key={p.id}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group text-left"
            aria-labelledby={`article-title--${p.id}`}
          >
            <div className="mb-4 inline-block p-3 rounded-2xl bg-gray-50">
              {p.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3" id={`article-title--${p.id}`}>
              {p.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {p.desc}
            </p>
          </article>
        ))}
      </div>
    </article>
  )
}

export default Hello