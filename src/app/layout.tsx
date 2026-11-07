import type { Metadata } from 'next'
import { Cormorant_Garamond, Playfair_Display, Manrope } from 'next/font/google'
import { LenisProvider } from '@/components/providers'
import Script from 'next/script'
import '@/app/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'New Beauty Med Spa | Luxury Medical Aesthetics in Encino, CA',
    template: '%s | New Beauty Med Spa',
  },
  description:
    'Premium medical aesthetics spa in Encino, Los Angeles. Expert treatments including HydraFacial, HIFU, Morpheus8, Botox, body sculpting, and more. Book your consultation today.',
  metadataBase: new URL('https://newbeautymedicalspa.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'New Beauty Med Spa',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${manrope.variable}`}
    >
      <body>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
