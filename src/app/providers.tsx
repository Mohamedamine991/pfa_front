"use client"

import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
export function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>{children} </SessionProvider>
    </NextUIProvider>
  )
}
