import { useI18n } from "@/lib/I18nProvider"
import type { PostView } from "@/lib/mdx"
import { BlogPost } from "./BlogPost"
import { getTranslation, type TranslationKey } from "@/lib/translations"
import { NoPosts } from "./Error"
import { useSEO } from "@/hook/useSEO"

type Props = {
  posts: PostView[]
}

export const Blog = ({ posts }: Props) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  useSEO({
    description: 'tell a little bit of the blog'
  })

  return (
    <article className="min-h-screen pt-10 pb-10 animate-fade-in-up max-w-7xl mx-auto lg:px-6 px-2" aria-labelledby="blog-title">
      {posts.length > 0 ? (
        <ul className="flex flex-col gap-2 overflow-x-hidden px-4">
          {posts.map((post: typeof posts[0], index: number) => {
            const iso = post.dateISO || post.updatedAtISO
            const day = new Date(iso!).getDay()
            const date = new Date(iso!).getDate()
            const year = new Date(iso!).getFullYear()
            const dayNames = [t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday"), t("sunday")]
            const monthNames = [t("january"), t("february"), t("march"), t("april"), t("may"), t("june"), t("july"), t("august"), t("september"), t("october"), t("november"), t("december")]
            const dateFmt = iso
              ? new Date(iso).toLocaleDateString(locale, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
              : null

            return (
              <BlogPost keyIndex={index} time={dateFmt!} post={post} key={index} day={date} dayName={dayNames[day]} month={monthNames[day]} year={year} />
            )
          })}
        </ul>
        ) : (
          <NoPosts />
        )}
    </article>
  )
}
