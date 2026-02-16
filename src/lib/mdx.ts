// [add your languages]
export type Locale = 'en' | 'es' | 'it'

/* START OF PROPS: this is customizable. Add your own, if necessary */
export interface PostFrontmatter {
  title: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  dateISO: string
  updatedAtISO?: string
  keywords?: string[]
  translationKey?: string
  translations?: Partial<Record<Locale, string>>
  image?: string
  imageAlt?: string
  draft?: boolean
}

export interface PostSummary {
  id?: string
  slug: string
  title: string
  seoDescription?: string
  excerpt?: string
  dateISO: string
  updatedAtISO?: string | undefined
  seoTitle?: string
  keywords?: string[]
}

export interface PostView {
  id?: string
  title: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  dateISO: string
  updatedAtISO?: string | undefined
  keywords?: string[]
  translations?: Partial<Record<Locale, string>>
  image?: string
  imageAlt?: string
  excerpt?: string
}

interface MDXModule {
  default: React.ComponentType
  frontmatter: PostFrontmatter
}
/* END OF PROPS */

// Load MDX modules with frontmatter just add the file path where your content is located
const mdxModules = import.meta.glob<MDXModule>(
  '/src/content/blog/**/*.mdx',
  { eager: true }
)

const getLocaleFromPath = (path: string): Locale | null => {
  const match = path.match(/\/content\/blog\/(\w+)\//)
  // include your languages
  if (match && ['en', 'es', 'it'].includes(match[1])) {
    return match[1] as Locale
  }
  return null
}

// Get all posts for a specific locale
export const getAllPosts = async (locale: Locale): Promise<PostSummary[]> => {
  return Object.entries(mdxModules)
    .filter(([path, module]) => {
      const pathLocale = getLocaleFromPath(path)
      const { frontmatter } = module

      if (pathLocale !== locale) return false
      if (!frontmatter || !frontmatter.title) return false
      if (frontmatter.draft) return false

      return true
    })
    .map(([_, module]) => {
      const { frontmatter } = module
      const slug = frontmatter.slug

      return {
        slug,
        title: frontmatter.title,
        seoDescription: frontmatter.seoDescription,
        seoTitle: frontmatter.seoTitle,
        excerpt: frontmatter.seoDescription || '',
        dateISO: frontmatter.dateISO || '',
        updatedAtISO: frontmatter.updatedAtISO,
        keywords: frontmatter.keywords,
      }
    })
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
}

// This function is vital to handle the translations dynamically when you are inside a post. Again, if you are using an external CMS you can update it to make it work.
export const getPostBySlug = async(locale: Locale, slug: string): Promise<PostView | null> => {
  const filePath = `/src/content/blog/${locale}/${slug}.mdx`

  const module = mdxModules[filePath]

  if (!module) {
    return null
  }

  const frontmatter = module.frontmatter

  if (!frontmatter || !frontmatter.title) {
    return null
  }

  if (frontmatter.draft) {
    return null
  }

  return {
    slug,
    title: frontmatter.title,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
    dateISO: frontmatter.dateISO || '',
    updatedAtISO: frontmatter.updatedAtISO,
    keywords: frontmatter.keywords,
    translations: frontmatter.translations,
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
  }
}

// Get the compiled MDX component for rendering. Bare in mind that you can configure this function to fetch the posts from an external CMS, if you want.
export const getMDXComponent = async(locale: Locale, slug: string) => {
  const filePath = `/src/content/blog/${locale}/${slug}.mdx`

  const module = mdxModules[filePath]

  if (!module) {
    console.error(`Module not found: ${filePath}`)
    return null
  }

  const frontmatter = module.frontmatter

  if (!frontmatter || !frontmatter.title) {
    console.error(`No frontmatter/title: ${filePath}`)
    return null
  }

  return {
    Component: module.default,
    frontmatter: {
      ...frontmatter,
      slug,
      content: '',
    } as PostFrontmatter & { content: string, slug: string },
  }
}

// fetch the translation of a post if you are in one and you decide to change the language.
export const getPostTranslations = async(
  slug: string,
  locale: Locale
): Promise<Partial<Record<Locale, string>>> => {
  const filePath = `/src/content/blog/${locale}/${slug}.mdx`
  const module = mdxModules[filePath]

  if (!module?.frontmatter) {
    return {}
  }

  const { translations } = module.frontmatter

  if (translations && Object.keys(translations).length > 0) {
    return translations
  }

  return { [locale]: slug }
}