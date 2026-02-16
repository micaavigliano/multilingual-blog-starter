import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useI18n } from "@/lib/I18nProvider"
import { locales, defaultLocale, type Locale, socialLocaleMap } from '@/lib/i18n'

interface SEOProps {
  title?: string;
  description: string;
  keywords?: string[];
  updatedAt?: string;
  isBlogPost?: boolean;
}

export const useSEO = (props: SEOProps) => {
  const { 
    title, 
    description, 
    keywords, 
    updatedAt, 
    isBlogPost = false 
  } = props
  
  const { locale } = useI18n()
  const { pathname } = useLocation()

  useEffect(() => {
    const baseUrl = window.location.origin

    // extract everything that comes after the locale
    const getCleanPath = () => {
      const parts = pathname.split('/').filter(Boolean)
      if (locales.includes(parts[0] as Locale)) {
        parts.shift()
      }
      return parts.join('/')
    }

    const path = getCleanPath()

    // Helper that builds URLs with the different locales
    const getUrlForLang = (lang: string) => {
      return path ? `${baseUrl}/${lang}/${path}` : `${baseUrl}/${lang}`
    }
    const currentFullUrl = getUrlForLang(locale);

    // Title -> We create the title element. This element is important for SEO, GEO and Accessibility. Please bare in mind to customize it and do not forget about it! It will help positioning your post/blog in Search AI, etc.
    document.documentElement.lang = locale
    if (title) document.title = `${title} | [Your Name]`
    if (!title) document.title = `${path} | [Your Name]`
    if (!title && !path) document.title = `[Name of the main site]`

    // Meta Description -> another vital element. Describing your product/post helps positioning it. This will hep the AI search engines to do a brief description of your content to the user and also segmentize your content.
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta')
      if (!metaDesc.parentNode) {
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    // Keywords -> Google algorithm does not care about keywords anymore BUT AI Search Engines DO CARE AND ALOT. Providing keywords will help the LLMs to categorize your content and create connections with another content about similar content. DO NOT FORGET TO DO AN ARRAY OF KEY WORDS.
    if (keywords && keywords.length > 0) {
      let metaKey = document.querySelector('meta[name="keywords"]') || document.createElement('meta')
      if (!metaKey.parentNode) {
        metaKey.setAttribute('name', 'keywords')
        document.head.appendChild(metaKey)
      }
      metaKey.setAttribute('content', keywords.join(', '))
    }

    // Canonical -> this element tells the browsers engines and AI Search Engines that this is the actual source of truth and avoid duplicaye content. Here it is handled dynamically to prevent duplicate content issues because it is a multi-language SPA. 
    let canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link')
    if (!canonical.parentNode) {
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', getUrlForLang(locale))

    // Hreflangs -> This element lets the search engines which version they have to show based on their language and location. 
    locales.forEach((lang) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`) || document.createElement('link')
      if (!link.parentNode) {
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', lang)
        document.head.appendChild(link)
      }
      link.setAttribute('href', getUrlForLang(lang))
    })

    // x-default -> fallback for hreflang. The default is going to be the one you decide on i18n.ts
    let xDefault = document.querySelector('link[hreflang="x-default"]') || document.createElement('link')
    if (!xDefault.parentNode) {
      xDefault.setAttribute('rel', 'alternate')
      xDefault.setAttribute('hreflang', 'x-default')
      document.head.appendChild(xDefault)
    }
    xDefault.setAttribute('href', getUrlForLang(defaultLocale))

    // JSON-LD -> SUPER IMPORTANT. Search Engines and AI Search Engines base their seach on this information
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": isBlogPost ? "BlogPosting" : "WebSite",
      "headline": title,
      "description": description,
      "dateModified": updatedAt || new Date().toISOString(),
      "inLanguage": locale,
      "url": getUrlForLang(locale)
    }

    let scriptLd = document.querySelector('script[type="application/ld+json"]') || document.createElement('script')
    if (!scriptLd.parentNode) {
      scriptLd.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    const currentOgLocale = socialLocaleMap[locale] || locale;
    const ogTags = [
      { property: 'og:type', content: isBlogPost ? 'article' : 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: currentFullUrl },
      { property: 'og:site_name', content: '[your name]' },
      { property: 'og:locale', content: currentOgLocale },
    ];

    const twitterTags = [
      { name: 'twitter:card', content: '[path to your image for the x or twitter card]' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ];

    ogTags.forEach(({ property, content }) => {
      if (!content) return;
      let element = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
      element.setAttribute('property', property);
      element.setAttribute('content', content);
      if (!element.parentNode) document.head.appendChild(element);
    });

    twitterTags.forEach(({ name, content }) => {
      if (!content) return;
      let element = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta');
      element.setAttribute('name', name);
      element.setAttribute('content', content);
      if (!element.parentNode) document.head.appendChild(element);
    });

    // the cleanup it is vital to update dynamically the data on the head
    return () => {
      const selectors = [
        'link[rel="alternate"]',
        'link[rel="canonical"]',
        'meta[name="keywords"]',
        'script[type="application/ld+json"]',
        'meta[property^="og:"]',
        'meta[name^="twitter:"]',
        'meta[property="article:modified_time"]',
      ]
      selectors.forEach(s => document.querySelectorAll(s).forEach(el => el.remove()))
    }
  }, [locale, pathname, title, description, keywords, updatedAt, isBlogPost])
}