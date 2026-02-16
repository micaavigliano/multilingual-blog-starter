// This is the component where the post content it is going to live. 

import { ArrowLeft, Check, Share2 } from "lucide-react"
import { getTranslation } from "@/lib/translations"
import type { TranslationKey } from "@/lib/translations"
import { useI18n } from "@/lib/I18nProvider"
import { Link } from "@tanstack/react-router"
import type { PostSummary } from "@/lib/mdx"
import { useState, type ComponentType } from "react"
import { RichText } from "./RichText"

type Props = {
  post: PostSummary,
  component: ComponentType,
}

export const Post = ({ post, component: Component }: Props) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)
  const [copied, setCopied] = useState(false)
  const [notCopied, setNotCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(t("blog.share.not.copied"), err)
      setNotCopied(true)
    }
  }

  const iso = post.dateISO || post.updatedAtISO
  const dateFmt = iso
    ? new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : null

  return (
    <article className="min-h-screen md:pt-24 pt-8 md:pb-24 pb-8 animate-fade-in-up max-w-4xl mx-auto px-6" aria-labelledby="post-title">
      <Link
        to="/$locale/blog"
        params={{ locale }}
        className="nav-link mb-4 flex items-center gap-2 justify-center w-fit"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="md:text-[11px] text-[0.2em] font-black uppercase tracking-[0.25em] text-[#5E548E] group-hover:text-[#2D232E] transition-colors">{t("blog.back")}</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] md:mb-12 mb-8 font-display text-[#2D232E] leading-[1.05] wrap-break-words w-fit nav-focus" id="post-title">
          {post.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-y border-[#2D232E]/10">
          <div className="flex items-center gap-4">
            <img
              src="/"
              alt="if you want, you can put a small profile image here"
              className="w-14 h-14 rounded-full object-cover grayscale"
            />
            <div>
              <p className="text-base font-bold text-[#2D232E]">Your name</p>
              <p className="text-[10px] font-bold text-[#2D232E]/80 uppercase tracking-widest">Your role</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <time className="text-[11px] font-bold text-[#2D232E]/80 uppercase tracking-widest">
              {t('blog.published')} {dateFmt}
            </time>

            <div className="hidden md:block w-px h-4 bg-[#2D232E]/10" aria-hidden="true" />
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[11px] font-bold text-[#2D232E] hover:text-[#5E548E] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#5E548E] rounded-sm py-1 px-2 -mr-2"
              aria-label={
                copied
                  ? t('blog.share.copied')
                  : notCopied
                    ? t('blog.share.not.copied')
                    : t('blog.shareLabel')
              }
            >
              {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
              <span>{copied ? t('blog.share.copied') : notCopied ? t('blog.share.not.copied') : t('blog.share')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <RichText>
          <Component />
        </RichText>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <Link
          to="/$locale/blog"
          params={{ locale }}
          className="nav-link mb-4 flex items-center gap-2 justify-center w-fit"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#5E548E] group-hover:text-[#2D232E] transition-colors">{t("blog.back")}</span>
        </Link>
      </div>
    </article>
  )
}