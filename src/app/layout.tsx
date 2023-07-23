import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Counter Strike Inventory Viewer',
  description: 'Check full inventory price, item prices, item floats, rare patterns, etc.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
            {children}
            <ToastContainer pauseOnFocusLoss={false}/>
        </body>
    </html>
  )
}