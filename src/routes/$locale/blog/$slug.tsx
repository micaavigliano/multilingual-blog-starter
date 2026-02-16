// This is an important routing file. This is where our post route is going to be handled.
// this file does:
// - dynamic segmentation: extracts the locale and the slug from the URL to request data from mdx. By extracting this information from the URL, we can feed the metadata and the Post component dynamically.
// - the fetching of the post data and the metadata is being done before the page mounts. This allows us to handle errors, if any.
// - error handling 
// What you can configure:
// - the data sent to the metadata for SEO
// - the component you use to render the post/Component from mdx

import { createFileRoute } from '@tanstack/react-router'
import { getMDXComponent, getPostBySlug } from '@/lib/mdx'
import type { Locale } from '@/lib/i18n'
import { Post } from '@/components/Post'
import { BlogErrorComponent, BlogNotFoundComponent } from '@/components/Error'
import { useSEO } from '@/hook/useSEO'

export const Route = createFileRoute('/$locale/blog/$slug')({
  loader: async ({ params }) => {
    const locale = params.locale as Locale
    const slug = params.slug

    const mdxData = await getMDXComponent(locale, slug)
    
    if (!mdxData) {
      throw <BlogNotFoundComponent />
    }

    const post = await getPostBySlug(locale, slug)
    
    if (!post) {
      throw <BlogNotFoundComponent />
    }

    return {
      Component: mdxData.Component,
      post
    }
  },
  errorComponent: ({ error }) => <BlogErrorComponent error={error} />,
  notFoundComponent: () => <BlogNotFoundComponent />,
  component: PostPage,
})

function PostPage() {
  const { Component, post } = Route.useLoaderData()
  
  useSEO({
    title: post.seoTitle || post.title,
    description: post.seoDescription,
    keywords: post.keywords,
    updatedAt: post.updatedAtISO,
    isBlogPost: true
  })

  return (
    <Post 
      post={post} 
      component={Component} 
    />
  )
}