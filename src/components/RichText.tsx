// This component is the bridge between your raw .mdx content and a polished and accessible UI. It is completely configurable and accessible. 

import { MDXProvider } from '@mdx-js/react'
import { useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import Tooltip from './Tooltip'
import { Copy } from 'lucide-react'
import { useI18n } from '@/lib/I18nProvider'
import { getTranslation, type TranslationKey } from '@/lib/translations'
import { richTextStyles } from '@/lib/custom-styles'

interface CodeBlockProps {
  children: ReactNode
  labels: { copy: string; copied: string; blockName: string }
  styles: typeof richTextStyles
}

const CodeBlock = ({ children, labels, styles }: CodeBlockProps) => {
  const [copyText, setCopyText] = useState(labels.copy)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = () => {
    if (preRef.current) {
      const text = preRef.current.innerText
      navigator.clipboard.writeText(text).then(() => {
        setCopyText(labels.copied)
        setTimeout(() => setCopyText(labels.copy), 3000)
      })
    }
  }

  return (
    <section className={styles.container} id="title-code-block">
      {/* headings for code sections are only visible for screen readers. This allows users with assistive technology to navigate directly to code examples using heading shortcuts, even if the "Copy" button is the only visual UI element. */}
      <h2 className="sr-only" id="title-code-block">{labels.blockName}</h2>
      <pre ref={preRef} className="w-fit font-mono text-sm leading-loose text-wrap">
        {children}
      </pre>
      <div>
        <Tooltip text={copyText} id="copy-tooltip" direction="left">
          <button
            aria-describedby="copy-tooltip"
            onClick={handleCopy}
            /* Buttons like the "Copy" feature use dynamic aria-label attributes that update from "Copy" to "Copied," providing immediate status feedback to non-visual users */
            aria-label={labels.copy}
            className={styles.copyButton}
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
          </button>
        </Tooltip>
      </div>
    </section>
  )
}

// New elements or custom components can be added to the useMDXComponents hook, allowing the blog to scale as your content needs grow.
const useMDXComponents = (styles: typeof richTextStyles) => {
  const { locale } = useI18n()
  const t = (key: TranslationKey) => getTranslation(locale, key)

  const labels = {
    copy: t('rich.copy'),
    copied: t('rich.copied'),
    blockName: t('rich.code.block'),
  }

  /* The component maps MDX tags to their correct semantic counterparts (<blockquote>, <ul>, <code>, etc.). This preserves the document's meaningful hierarchy, which is vital for how browsers and search engines parse your content. */
  return {
    h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 className={styles.h1} {...props} />,
    h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 className={styles.h2} {...props} />,
    h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className={styles.h3} {...props} />,
    h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 className={styles.h4} {...props} />,
    p: (props: ComponentPropsWithoutRef<'p'>) => <p className={styles.p} {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => <blockquote className={styles.blockquote} {...props} />,
    ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className={styles.ul} {...props} />,
    ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className={styles.ol} {...props} />,
    li: (props: ComponentPropsWithoutRef<'li'>) => <li className={styles.li} {...props} />,
    pre: ({ children }: any) => <CodeBlock labels={labels} styles={styles}>{children}</CodeBlock>,
    code: ({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      if (!className) return <code className={styles.inlineCode} {...props}>{children}</code>
      return <code className={`font-mono w-full ${className || ''}`} {...props}>{children}</code>
    },
    //if a link has an icon or image do not forget to add an aria-label to provide an accessible name!!
    a: (props: ComponentPropsWithoutRef<'a'>) => <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props} />,
    img: ({ title, ...props }: ComponentPropsWithoutRef<'img'>) => (
      <figure className="my-8">
        <img className={styles.image} {...props} />
        {title && <figcaption className={styles.caption}>{title}</figcaption>}
      </figure>
    ),
  }
}

// You can pass a customStyles prop to the RichText wrapper to override any specific element without touching the internal logic.
export const RichText = ({ children, customStyles }: { children: ReactNode; customStyles?: Partial<typeof richTextStyles> }) => {
  const finalStyles = { ...richTextStyles, ...customStyles }
  const components = useMDXComponents(finalStyles)

  return <MDXProvider components={components}>{children}</MDXProvider>
}

// remember to delete all the comments before you deploy to prod!!