import type { Metadata } from "next";
import SubcategoryPage from "@/components/sections/SubcategoryPage";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import { CORTINA_PRODUCTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cortina Prega Americana sob Medida em Florianópolis | Stylo Decore",
  description:
    "Cortina Prega Americana sob medida com pregas elegantes em Florianópolis e Região. Estilo clássico atemporal para qualquer ambiente.",
  alternates: { canonical: "/cortinas/tipos-de-pregas/prega-americana" },
  openGraph: {
    title: "Cortina Prega Americana sob Medida | Stylo Decore",
    description: "Cortina Prega Americana sob medida. Estilo clássico e atemporal em Florianópolis.",
    url: "/cortinas/tipos-de-pregas/prega-americana",
  },
};

export default function PregaAmericanaPage() {
  return (
    <>
      <JsonLd data={getBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Cortinas", href: "/cortinas" },
        { name: "Tipos de Pregas", href: "/cortinas/tipos-de-pregas" },
        { name: "Prega Americana", href: "/cortinas/tipos-de-pregas/prega-americana" },
      ])} />
      <SubcategoryPage
        title="Prega Americana"
        category="Cortinas"
        titleKey="/cortinas/tipos-de-pregas/prega-americana"
        categoryKey="/cortinas"
        descriptionKey="page.cortinas.prega-americana.desc"
        desktopHeroImage="/images/cortinas/prega-americana-hero-desktop.png"
        mobileHeroImage="/images/cortinas/prega-americana-hero-mobile.png"
        heroDesktopClass="object-[center_30%]"
        heroMobileClass="object-center"
        mobileHeroImageStyle={{ top: '5rem', height: 'calc(100% - 5rem)' }}
        products={CORTINA_PRODUCTS["prega-americana"]}
        desktopImageClass="hidden lg:block w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        mobileImageClass="lg:hidden w-full aspect-[3/4] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        videoSrc="/videos/processo-cortinas.mp4"
        videoTitle="video.processo.title"
        videoCaption="video.processo.caption"
        videoFeatures={[
          { icon: "ruler", label: "video.processo.feat.medicao" },
          { icon: "scissors", label: "video.processo.feat.pontos" },
          { icon: "shirt", label: "video.processo.feat.caimento" },
        ]}
        specs={[
          { title: "Espaçamento uniforme", description: "Pregas simétricas e bem distribuídas ao longo de toda a cortina." },
          { title: "Elegância atemporal", description: "Visual clássico que complementa qualquer estilo de decoração." },
          { title: "Versatilidade de tecidos", description: "Compatível com tecidos leves, médios e pesados." },
        ]}
      />
    </>
  );
}
