import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const siteUrl = "https://badluckryan.crisnnino.com";
const siteTitle = "The Bad Luck Ryan";
const siteDescription =
  "Genera y comparte una imagen de Ryan Castro usando la camiseta del rival para invocar la mala suerte del otro equipo.";

const datatype = localFont({
  src: [
    {
      path: "./fonts/datatype-latin.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/datatype-latin-ext.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  display: "swap",
  variable: "--font-datatype",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  authors: [{ name: "Cris Nino", url: "https://crisnnino.com" }],
  alternates: {
    canonical: "/",
  },
  category: "entertainment",
  icons: {
    apple: "/icon-herradura.svg",
    icon: "/icon-herradura.svg",
    shortcut: "/icon-herradura.svg",
  },
  keywords: [
    "The Bad Luck Ryan",
    "Bad Luck Ryan",
    "Ryan Castro",
    "camiseta del rival",
    "Mundial 2026",
    "meme futbol",
    "generador de imagenes",
    "mala suerte futbol",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: siteTitle,
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-bad-luck-ryan.jpg",
        width: 1200,
        height: 630,
        alt: "The Bad Luck Ryan - Ponle la camiseta del rival",
      },
    ],
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-bad-luck-ryan.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${datatype.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.uploadtourl.com" />
        <link rel="dns-prefetch" href="https://cdn.uploadtourl.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
