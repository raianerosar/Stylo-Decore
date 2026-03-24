import type { Metadata } from "next";
import CategoryPage from "@/components/sections/CategoryPage";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd, getFaqJsonLd, CORTINAS_FAQ, CORTINAS_FAQ_KEYS } from "@/lib/seo";
import { CORTINAS_TIPOS_PREGAS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tipos de Pregas para Cortinas em Florianópolis | Stylo Decore",
  description:
    "Conheça os tipos de pregas para cortinas: Prega Americana, Prega Macho, Wave e Franzida. Cortinas sob medida em Florianópolis e Região.",
  keywords: ["tipos de pregas cortina", "prega americana", "cortina wave", "prega macho", "cortina franzida Florianópolis"],
  alternates: { canonical: "/cortinas/tipos-de-pregas" },
  openGraph: {
    title: "Tipos de Pregas para Cortinas | Stylo Decore",
    description: "Prega Americana, Prega Macho, Wave e Franzida. Cortinas sob medida em Florianópolis.",
    url: "/cortinas/tipos-de-pregas",
  },
};

export default function TiposDePregasPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Cortinas", href: "/cortinas" },
        { name: "Tipos de Pregas", href: "/cortinas/tipos-de-pregas" },
      ])} />
      <JsonLd data={getFaqJsonLd(CORTINAS_FAQ)} />
      <CategoryPage
        title="Tipos de Pregas"
        titleKey="/cortinas/tipos-de-pregas"
        headlineKey="cat.cortinas.pregas.headline"
        descriptionKey="cat.cortinas.pregas.description"
        introKey="cat.cortinas.pregas.intro"
        heroImage="/images/cortinas/tipos-de-pregas-hero.png"
        heroMobileImage="/images/cortinas/tipos-de-pregas-hero-mobile.png"
        heroNaturalHeight
        heroDesktopImageStyle={{ transform: "translateY(0%)" }}
        heroMobileImageStyle={{ objectPosition: "50% 20%" }}
        subcategories={CORTINAS_TIPOS_PREGAS}
        faqItems={CORTINAS_FAQ_KEYS}
      />
    </>
  );
}
