# Skeleton Multi-Language Blog

A high-performance, dependency-light, and fully accessible multi-language blog skeleton. Built with React, Vite, TanStack Router, and MDX. It prioritizes SEO and Web Accessibility.

## Core Technologies

Bare in mind that if you clone the project and install the following dependencies:

- [React](https://react.dev/) and [Vite](https://vite.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
  - it handles complex i18n URL patterns (`/$locale/blog/$slug`) easily.
  - Data Loaders allow us to fetch MDX content before the component even renders, preventing layout shifts.
  - no-reload language switching experience, allowing for instant transitions between translated content.
- [MDX](https://mdxjs.com/)
- [Tailwind](https://tailwindcss.com/)
- [Lucide icons](https://lucide.dev/)

_ps, I am going to keep the project updated with the latest versions of each library._

## Installation

1. Clone the repository
```js
git clone
cd skeleton-multi-lang-blog
```
2. Install dependencies
```js
npm install
```
3. Start the project
```js
npm run dev
```

## Working with MDX

- Location: Posts are stored in `src/content/blog/[locale]/`
- Frontmatter: Define your SEO metadata directly at the top of the file and also it is important for the translations of the posts
- RichText: is a component which is vital to styled React components

## UI customization

The two most important components are completely customizable. The rest of the components are not vital at all and you can add your own design system.
- `RichText.tsx`: The rendering engine for MDX. Through the `richTextStyles` object, you can customize every HTML element (H1, Blockquotes, Code Blocks) using Tailwind classes without touching the underlying logic.
- `LanguageSwitcher.tsx`: A high-accessibility component that can be rebranded via `switcherStyles`, allowing you to control the dropdown aesthetics and spatial behavior

## i18n and routing

The internalization in this project is set to support more than two languages taking in consideration:

- the user can change languages via client-side navigation. This means no page reloads, preserving React state.
- when the user switches languages inside a post, the router doesn't just change the URL prefix; it finds the translated slug (e.g., from /en/blog/my-post to /it/blog/il-mio-post) and navigates there instantly.
- you can add a new language easily by creating a new translation file in `src/lib/translations.ts` and adding the locale to `src/lib/i18n.ts`.

## Accessibility

- The `FocusMain` component automatically moves focus to the H1 during navigation via keyboard and ensure screen readers announce the new content.
- Focus rings only appear for keyboard users.
- Dynamic updates are announced to assistive technology via ARIA Live Regions.

## How to create content on MDX

- Posts are stored in `src/content/blog/[locale]/`.
- Define your SEO metadata directly at the top of the file:
```js
---
title: "My Accessible Post"
seoTitle: "SEO Optimized Title"
seoDescription: "Detailed description for search crawlers"
keywords: "react, a11y, mdx"
---
```
- Finally, as mentioned on [UI Customization](#ui-customization), the post is being rendered in the frontend thanks to the component `RichText.tsx`.

## Contributing

This is a personal brand project focused on web development and accessibility. If you find a bug or have a suggestion to improve the accessibility architecture, feel free to open an issue or a pull request!

Thanks and keep writing and learning new languages :) 
if you have any question you can open an issue of contact me via email or linkedin (you will find the info on my github's profile)
