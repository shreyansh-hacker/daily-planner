import type React from "react"
import "@/app/globals.css"
import { Providers } from "@/app/providers"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daily Planner",
  description: "A modern task management application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
