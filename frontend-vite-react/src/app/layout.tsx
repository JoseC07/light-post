import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from '@/my-react-app/src/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Light Post',
  description: 'Anonymous local information sharing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'