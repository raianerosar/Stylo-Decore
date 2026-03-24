import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { getOrganizationJsonLd, getLocalBusinessJsonLd, SITE_URL } from "@/lib/seo";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Stylo Decore | Design e Produtos Personalizados",
    template: "%s | Stylo Decore",
  },
  description:
    "Especialistas em cortinas, persianas, papéis de parede e tapetes sob medida. Mais de 20 anos de experiência em Florianópolis e Região. Atendimento consultivo e personalizado.",
  keywords: [
    "cortinas sob medida Florianópolis",
    "persianas sob medida Florianópolis",
    "papéis de parede Florianópolis",
    "tapetes sob medida Florianópolis",
    "decoração de interiores Florianópolis",
    "Stylo Decore",
    "persiana rolô",
    "persiana Double Vision",
  ],
  authors: [{ name: "Stylo Decore" }],
  openGraph: {
    title: "Stylo Decore | Design e Produtos Personalizados",
    description:
      "Transforme seus ambientes com soluções sob medida. Mais de 20 anos de experiência em Florianópolis e Região.",
    locale: "pt_BR",
    type: "website",
    siteName: "Stylo Decore",
    url: SITE_URL,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Stylo Decore - Design e Produtos Personalizados em Florianópolis",
      },
    ],
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
    <html lang="pt-BR">
      <head>
        <JsonLd data={getOrganizationJsonLd()} />
        <JsonLd data={getLocalBusinessJsonLd()} />
      </head>
      <body className={`${manrope.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
