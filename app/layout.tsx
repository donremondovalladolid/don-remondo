import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Productos Frescos y Taller Mecánico en Valladolid`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Espárragos y productos frescos de producción propia, y taller mecánico con compra-venta de coches en Valladolid. Calidad y confianza desde 2016.",
  keywords: [
    "espárragos Valladolid",
    "espárragos frescos Valladolid",
    "productos frescos Valladolid",
    "frutas verduras Valladolid",
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
    title: `${SITE_CONFIG.name} | Productos Frescos y Taller en Valladolid`,
    description:
      "Espárragos y productos frescos de producción propia, y taller mecánico con compra-venta de coches en Valladolid.",
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
    <html lang="es" className={`${playfair.variable} ${lora.variable}`}>
      <body className="antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
