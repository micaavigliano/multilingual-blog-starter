// [this is the vital file for routing in tanstack. Leave it as it is but a few considerations:
// - the I18nProvider it is vital for changing the language because it would wrap the whole app. By doing this, we ensure that all the components in the app have access to the translations and the actual locale. So, do not remove it, well if you do not want to handle translations do it :P
// - here is where your base layout is going to live: Header, main and Footer. Inside the main, the Outlet is going to live. The Outlet component is vital in tanstack because is what is going to render the dynamic routes.
// - the beforeLoad is important because it automatically redirects the user to the defaultLocale language. This is a good technique because guarantee that the page always has context. You can change the defaultLocale on @/lib/i18n.
// - The FocusMain component it is important for accessibility. Since every page should have an h1 for SEO and Accessibility purposes, it can be used to manage the focus when the page is being navigated using the keyboard and screen reader (so the user does not lose the context). Just make sure that every page has an heading 1 (this is also important for the SEO).
// - the Header and the Footer components can be replaced by your own components or you can reuse mine. Whatever the decision, just make sure the HTML structure is the correct.
// - FINALLY, YOU CAN DELETE THIS BLOCK OF COMMENTS.
// ]

import { Outlet, createRootRoute, redirect, useLocation } from '@tanstack/react-router'
import { defaultLocale, getLocaleFromPathname, type Locale } from '@/lib/i18n'
import { I18nProvider } from '@/lib/I18nProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FocusMain from '@/components/FocusMain'
import { PageNotFound } from '@/components/Error'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const firstSeg = (location.pathname || '/').split('/')[1]
    if (!firstSeg) {
      throw redirect({ to: '/$locale', params: { locale: defaultLocale } })
    }
  },
  component: RootShell,
  notFoundComponent: () => <PageNotFound />,
})

function RootShell() {
  const { pathname } = useLocation()
  const locale = getLocaleFromPathname(pathname) as Locale

  return (
    <I18nProvider locale={locale}>
      <Header />
      <FocusMain />
      <main>
        <Outlet />
      </main>
      <Footer />
    </I18nProvider>
  )
}