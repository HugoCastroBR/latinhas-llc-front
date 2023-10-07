import type { Metadata } from 'next'
import "./reset.css"

export const metadata: Metadata = {
  title: 'Latinhas',
  description: 'Demandas de Produção de Latinhas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
