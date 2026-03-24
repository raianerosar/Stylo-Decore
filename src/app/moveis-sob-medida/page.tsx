import type { Metadata } from "next";
import CategoryPage from "@/components/sections/CategoryPage";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd, getFaqJsonLd, MOVEIS_FAQ, MOVEIS_FAQ_KEYS } from "@/lib/seo";
import { MOVEIS_SUBCATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Móveis Sob Medida em Florianópolis | Stylo Decore",
  description:
    "Móveis planejados sob medida em Florianópolis e Região. Sala, quarto, cozinha, home office e closet com design e funcionalidade. Atendimento consultivo e personalizado.",
  keywords: ["móveis sob medida Florianópolis", "móveis planejados Florianópolis", "cozinha planejada Florianópolis", "closet sob medida", "home office planejado Florianópolis"],
  alternates: { canonical: "/moveis-sob-medida" },
  openGraph: {
    title: "Móveis Sob Medida em Florianópolis | Stylo Decore",
    description: "Estantes, armários e home office planejados sob medida em Florianópolis e Região.",
    url: "/moveis-sob-medida",
    images: [{ url: "/images/moveis-cozinha-hero.png", width: 1200, height: 630, alt: "Móveis Sob Medida - Stylo Decore" }],
  },
};

export default function MoveisSobMedidaPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Móveis Sob Medida", href: "/moveis-sob-medida" },
      ])} />
      <JsonLd data={getFaqJsonLd(MOVEIS_FAQ)} />
      <CategoryPage
        title="Móveis Sob Medida"
        titleKey="/moveis-sob-medida"
        headline="Design & Funcionalidade"
        description="Móveis planejados por ambiente: sala, quarto, cozinha, home office e closet. Cada projeto sob medida para o seu espaço."
        intro="Móveis planejados transformam qualquer ambiente — aproveitando cada centímetro com inteligência e elegância. Desenvolvemos projetos completos para sala, quarto, cozinha, home office e closet sob medida para a sua casa."
        headlineKey="cat.moveis.headline"
        descriptionKey="cat.moveis.description"
        introKey="cat.moveis.intro"
        subcategories={MOVEIS_SUBCATEGORIES}
        faqItems={MOVEIS_FAQ_KEYS}
        heroImage="/images/moveis-sala-hero.jpg"
        midContent={<ProcessTimeline />}
        disableLinks
      />
    </>
  );
}
