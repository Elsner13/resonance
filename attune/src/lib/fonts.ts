import { Playfair_Display, Inter, Montserrat_Alternates } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const montserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-montserrat-alternates',
  display: 'swap',
})
