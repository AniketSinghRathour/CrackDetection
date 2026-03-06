import './globals.css'

export const metadata = {
  title: 'CrackMonitor — Structural Health Intelligence',
  description: 'Digital crack measurement and logging system for structural health monitoring',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
