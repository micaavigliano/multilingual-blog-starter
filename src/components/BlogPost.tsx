import { useI18n } from "@/lib/I18nProvider"
import type { PostSummary } from "@/lib/mdx"
import { getTranslation, type TranslationKey } from "@/lib/translations"
import { Link } from "@tanstack/react-router"

type Props = {
  post: PostSummary,
  keyIndex: number,
  time: string,
  month: string,
  dayName: string,
  day: number,
  year: number
}

export const BlogPost = ({ keyIndex, time, post, month, dayName, year, day }: Props) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  return (
    <li className="list-none group block relative w-full" key={keyIndex}>
      <article
        aria-labelledby={`post-title-${keyIndex}`}
        className="flex flex-col md:flex-col gap-4 md:gap-6 items-start py-12 md:py-16 transition-all duration-300"
      >
        <div className="space-y-3">
           <div className="flex items-center gap-3 text-[11px] font-bold text-[#5b1d8a] uppercase tracking-widest mb-1">
            <time dateTime={time}>
              <span className="sr-only">{t("blog.posted")} {day} {dayName} {month} {year}</span>
              <span aria-hidden="true">{time}</span>
            </time>
          </div>
          <Link
            to="/$locale/blog/$slug"
            params={{ locale, slug: post.slug }}
            className="block text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#5E548E] rounded-lg w-fit"
          >
            <h3
              id={`post-title-${keyIndex}`}
              className="text-2xl md:text-4xl font-display text-[#2D232E] group-hover:text-[#5E548E] transition-all leading-tight hover:underline decoration-[#5E548E] decoration-4 underline-offset-8 w-fit"
            >
              {post.title}
            </h3>
          </Link>
          <p className="text-lg text-[#2D232E]/70 leading-relaxed">
            {post.seoDescription}
          </p>
        </div>
        <Link
          to="/$locale/blog/$slug"
          params={{ locale, slug: post.slug }}
          className="flex items-center gap-4 pt-2 w-fit"
          aria-label={`${t("blog.read.more")} ${t("blog.about")} ${post.title}`}
        >
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#5E548E] group-hover:text-[#2D232E] transition-colors">
            {t("blog.read.more")}
          </span>
          <div className="flex items-center">
            <div className="w-10 h-0.5 bg-[#5E548E] focus-visible:w-20 focus-visible:bg-[#2D232E] group-hover:w-20 group-hover:bg-[#2D232E] transition-all duration-500 rounded-full" />
            <span className="text-xl leading-none text-[#5E548E] focus-visible:text-[#2D232E] focus-visible:translate-x-2 group-hover:text-[#2D232E] group-hover:translate-x-2 transition-all duration-500 ml-3" aria-hidden="true">→</span>
          </div>
        </Link>
      </article>
      <div className="absolute bottom-0 left-0 w-full flex items-center group-last:hidden" aria-hidden="true">
        <div className="w-1.5 h-1.5 bg-[#5E548E]/20 group-hover:bg-[#5E548E] group-hover:scale-125 transition-all duration-400 rounded-full shrink-0" />
        <div className="flex-1 h-0.5 bg-[#5E548E]/10 group-hover:bg-[#5E548E]/40 transition-all duration-400 ml-4" />
      </div>
    </li>
  )
}
