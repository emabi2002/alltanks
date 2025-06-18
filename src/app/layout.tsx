// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { CartProvider } from "@/lib/cart";
import { CartSheet } from "@/components/Cart";
import { AuthProvider } from "@/lib/auth";
import { generateMetadata } from "@/lib/seo";
import {
  organizationStructuredData,
  localBusinessStructuredData,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateMetadata("home");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}> 
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData),
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://alltanks.com.pg" />

        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="PG-MPL" />
        <meta name="geo.placename" content="Lae, Morobe Province" />
        <meta name="geo.position" content="-6.7249;146.9968" />
        <meta name="ICBM" content="-6.7249, 146.9968" />

        {/* Business Information */}
        <meta name="author" content="All Tanks Limited" />
        <meta name="contact" content="info@alltanks.com.pg" />
        <meta name="copyright" content="All Tanks Limited" />
      </head>
      <body suppressHydrationWarning className="antialiased bg-gradient-to-r from-green-100 via-white to-blue-100 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <ClientBody>{children}</ClientBody>
            <CartSheet />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
