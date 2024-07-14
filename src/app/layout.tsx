import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { BackgroundImage } from '@/components/BackgroundImage'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Credit Maker',
  description: 'Create CREDIT statements easily',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full bg-white antialiased'>
      <body className={inter.className + 'h-full'}>
        <Header />
        <BackgroundImage position='right' className='-bottom-32 -top-40' />
        {children}
      </body>
    </html>
  )
}
