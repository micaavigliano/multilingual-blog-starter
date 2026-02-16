import { createFileRoute } from '@tanstack/react-router'
import { Blog } from '@/components/Blog'
import { getAllPosts } from '@/lib/mdx'
import type { Locale } from '@/lib/i18n'
import { NoPosts } from '@/components/Error'

export const Route = createFileRoute('/$locale/blog/')({
  loader: async ({ params }) => {
    const posts = await getAllPosts(params.locale as Locale)
    return { posts }
  },
  errorComponent: ({ error }) => <NoPosts error={error} />,
  component: BlogPage,
})

function BlogPage() {
  const { posts } = Route.useLoaderData()

  return <Blog posts={posts} />
}
