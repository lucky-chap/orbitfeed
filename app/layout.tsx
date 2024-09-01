import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Provider } from "@/components/provider";

// const inter = Inter({ subsets: ["latin"] });

const inter = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../public/fonts/inter/Inter-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "OrbitFeed",
  description: "Collect feedbacks on your website with a simple widget!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-background min-h-screen font-sans text-sm antialiased",
            inter.variable
          )}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
