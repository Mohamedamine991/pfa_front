import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inariam | A PCP Product",
  description: "A Pcp Product",
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
