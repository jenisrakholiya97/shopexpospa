import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AppProvider, useApp } from '../context/AppContext'
import InquiryDrawer from '../components/InquiryDrawer'
import ProductDetailModal from '../components/ProductDetailModal'
import { CheckCircle2 } from 'lucide-react'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'FRUTEX GLOBAL | Farm-to-Port Fresh Fruit Exports & Cold Chain Logistics',
      },
      {
        name: 'description',
        content: 'Leading exporter of premium fresh fruits: Alphonso Mangoes, Hass Avocados, MD2 Pineapples, Dragon Fruit, Bananas, and Citrus. Unbroken cold chain and FOB/CIF freight calculator to 45+ ports.',
      },
      {
        name: 'keywords',
        content: 'fruit export, fresh produce exporter, alphonso mango export, hass avocado export, cold chain reefer, fruit FOB CIF calculator, agricultural export SPA',
      }
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function ToastNotification() {
  const { toastMessage } = useApp()

  if (!toastMessage) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 dark:bg-emerald-950/95 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-4 duration-200">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  )
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <InquiryDrawer />
      <ProductDetailModal />
      <ToastNotification />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased text-slate-800 dark:text-slate-100 bg-white dark:bg-[#07130e] selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <MainLayout>{children}</MainLayout>
        </AppProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
