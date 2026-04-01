import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Formación n8n en Español | Automatización con WhatsApp API e IA en 6 Horas | $397 | NJ · NY',
  description:
    'Taller intensivo en vivo para latinos en USA. Construye 3 workflows activos con n8n, WhatsApp API, Resend y Claude/GPT en 6 horas. Lead capture → CRM, email marketing automático, agente de IA. Nivel principiante-intermedio. Solo 50 estudiantes. $397 Early Bird.',
  generator: 'v0.app',
  keywords: ['n8n', 'automatización', 'workflow', 'WhatsApp API', 'IA', 'latinos USA', 'automatización en español'],
  openGraph: {
    title: 'Automatización en Producción: 3 Workflows Activos en 6 Horas con n8n',
    description: 'Taller en vivo · 6 horas · 3 workflows activos · Solo 50 estudiantes · $397 Early Bird',
    locale: 'es_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
