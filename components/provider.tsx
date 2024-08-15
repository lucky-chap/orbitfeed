"use client"

import * as React from "react"
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import { Toaster } from "@/components/ui/toaster"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider defaultTheme="light" forcedTheme="light" {...props}>
      {/* <ConvexProvider client={convex}>{children}</ConvexProvider> */}
      <ConvexAuthNextjsProvider client={convex}>
        {children}
        <Toaster />
      </ConvexAuthNextjsProvider>
    </NextThemesProvider>
  )
}
