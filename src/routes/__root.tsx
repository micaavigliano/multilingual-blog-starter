import { Outlet, createRootRoute, redirect, useLocation } from '@tanstack/react-router'
import { defaultLocale, getLocaleFromPathname, type Locale } from '@/lib/i18n'
import { I18nProvider } from '@/lib/I18nProvider'

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const firstSeg = (location.pathname || '/').split('/')[1]
    if (!firstSeg) {
      // Use the route pattern and pass params so TypeScript types and runtime routing both work
      throw redirect({ to: '/$locale', params: { locale: defaultLocale } })
    }
  },
  component: RootShell,
  notFoundComponent: () => <p>here is where your error bounder component is going to be located</p>,
})

function RootShell() {
  const { pathname } = useLocation()
  const locale = getLocaleFromPathname(pathname) as Locale

  return (
    <I18nProvider locale={locale}>
      <header />
      <main tabIndex={-1} id="main-content" className='z-0'>
        <Outlet />
      </main>
      <footer />
    </I18nProvider>
  )
}