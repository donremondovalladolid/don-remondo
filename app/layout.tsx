import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Espárragos y Taller Mecánico en Valladolid`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Espárragos frescos de Tudela de Duero y taller mecánico con compra-venta de coches en Valladolid. Calidad y confianza desde 2014.",
  keywords: [
    "espárragos Valladolid",
    "espárragos Tudela de Duero",
    "taller mecánico Valladolid",
    "compra venta coches Valladolid",
    "coches segunda mano Valladolid",
  ],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Espárragos y Taller en Valladolid`,
    description:
      "Espárragos frescos de Tudela de Duero y taller mecánico con compra-venta de coches en Valladolid.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
