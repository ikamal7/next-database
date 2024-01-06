import { Bebas_Neue, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const bricolage = Bricolage_Grotesque({
  weight: ['300','400', '700'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-bricolage',
});

export const metadata = {
  title: 'Next database',
  description: 'Here is the next description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.className} ${bricolage.className}`}>{children}</body>
    </html>
  )
}
