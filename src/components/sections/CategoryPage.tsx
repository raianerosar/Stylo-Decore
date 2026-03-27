"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import { DEFAULT_FAQ_KEYS } from "@/lib/seo";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { useLanguage } from "@/context/LanguageContext";

interface SubcategoryItem {
  name: string;
  href: string;
  image: string;
  desktopImage?: string;
  cardImage?: string;
  imagePosition?: string;
  description: string;
  descriptionKey?: string;
  lightboxCover?: boolean;
}

interface CategoryPageProps {
  title: string;
  description?: string;
  headline?: string;
  intro?: string;
  headlineKey?: string;
  descriptionKey?: string;
  introKey?: string;
  titleKey?: string;
  subcategories: SubcategoryItem[];
  faqItems?: { question: string; answer: string }[];
  heroDesktopImageStyle?: React.CSSProperties;
  heroMobileImageStyle?: React.CSSProperties;
  heroImage?: string;
  heroMobileImage?: string;
  heroNaturalHeight?: boolean;
  heroNoMaxHeight?: boolean;
  midContent?: React.ReactNode;
  disableLinks?: boolean;
}

export default function CategoryPage({
  title,
  description,
  headline,
  intro,
  headlineKey,
  descriptionKey,
  introKey,
  titleKey,
  subcategories,
  faqItems,
  heroDesktopImageStyle,
  heroMobileImageStyle,
  heroImage,
  heroMobileImage,
  heroNaturalHeight,
  heroNoMaxHeight,
  midContent,
  disableLinks,
}: CategoryPageProps) {
  const { t } = useLanguage();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const lightboxItems = subcategories.map((item) => ({ src: item.cardImage || item.image, alt: item.name, cover: item.lightboxCover }));
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedHeadline = headlineKey ? t(headlineKey) : headline;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;
  const resolvedIntro = introKey ? t(introKey) : intro;
  const faq = faqItems || DEFAULT_FAQ_KEYS;

  return (
    <div>
      {/* Hero */}
      {subcategories[0] && (
        <div className={`relative w-full overflow-hidden${heroNaturalHeight ? " min-h-[50vh] md:min-h-[65vh] lg:min-h-0 bg-[#221e10] lg:bg-transparent" : " min-h-[50vh] md:min-h-[65vh] lg:min-h-[70vh] bg-[#221e10]"}`}>
          {heroNaturalHeight && heroImage ? (
            <>
              {/* Desktop: altura natural */}
              <div className={`hidden lg:flex ${heroNoMaxHeight ? "" : "max-h-[90vh] overflow-hidden "}items-start`}>
                <img
                  src={heroImage}
                  alt={title}
                  className="w-full h-auto block"
                  style={heroDesktopImageStyle}
                />
              </div>
              {/* Mobile: object-cover com altura fixa */}
              <img
                src={heroMobileImage || heroImage}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover lg:hidden"
                style={heroMobileImageStyle}
              />
            </>
          ) : heroImage ? (
            <>
              <img
                src={heroImage}
                alt={title}
                className={`absolute inset-0 h-full w-full object-cover${heroMobileImage ? " hidden lg:block" : ""}`}
                style={heroDesktopImageStyle}
              />
              {heroMobileImage && (
                <img
                  src={heroMobileImage}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover lg:hidden"
                  style={heroMobileImageStyle}
                />
              )}
            </>
          ) : subcategories[0].desktopImage ? (
            <>
              <img
                src={subcategories[0].desktopImage}
                alt={title}
                className="absolute inset-0 hidden h-full w-full object-cover lg:block"
                style={heroDesktopImageStyle}
              />
              <img
                src={subcategories[0].image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover lg:hidden"
              />
            </>
          ) : (
            <>
              <img
                src={subcategories[0].image}
                alt={title}
                className="absolute inset-0 hidden h-full w-full object-cover lg:block"
                style={heroDesktopImageStyle}
              />
              <img
                src={subcategories[0].image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover lg:hidden"
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className={`${heroNaturalHeight ? "absolute inset-0" : "relative"} flex h-full min-h-[50vh] md:min-h-[65vh] lg:min-h-[70vh] items-end`}>
            <div className="mx-auto w-full max-w-7xl px-6 pb-12 md:pb-16 lg:pb-20">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {resolvedHeadline || resolvedTitle}
              </p>
              <h1 className="mb-3 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {resolvedTitle}
              </h1>
              <p className="max-w-xl text-lg text-white/80 lg:text-2xl">
                {resolvedDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Texto introdutório */}
      {resolvedIntro && (
        <ScrollReveal animation="up">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <p className="mx-auto max-w-3xl text-justify text-xl leading-relaxed text-mahogany-light md:text-2xl">
              {resolvedIntro}
            </p>
          </div>
        </ScrollReveal>
      )}

      {/* Grid masonry-style */}
      {subcategories.length > 0 && (
        <ScrollReveal animation="up" threshold={0.05}>
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Cards iguais */}
              {subcategories.map((item, idx) => {
                const cardContent = (
                  <>
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={item.cardImage || item.image}
                        alt={item.name}
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110${item.imagePosition ? ` ${item.imagePosition}` : ""}`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="mb-1 text-xl font-bold text-white">
                        {t(item.href) || item.name}
                      </h3>
                      <p className="text-sm text-white/70">{item.descriptionKey ? t(item.descriptionKey) : item.description}</p>
                      {!disableLinks && (
                        <div className="mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background-dark opacity-0 transition-all duration-300 group-hover:opacity-100">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </>
                );
                return disableLinks ? (
                  <div
                    key={item.href}
                    className="group relative overflow-hidden cursor-zoom-in"
                    onClick={() => setLightboxIdx(idx)}
                  >
                    {cardContent}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative overflow-hidden"
                  >
                    {cardContent}
                  </Link>
                );
              })}


            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Conteúdo intermediário (ex: timeline) */}
      {midContent}

      {/* Consultoria Personalizada */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="rounded-2xl bg-foreground px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex items-center gap-5">
              <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  {t("cat.consultancy.title")}
                </h3>
                <p className="text-sm text-white/70 max-w-md">
                  {t("cat.consultancy.desc")}
                </p>
              </div>
            </div>
            <a
              href={getWhatsAppUrl(
                `${t("cat.consultancy.whatsapp")}${resolvedTitle.toLowerCase()}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="brushed-gold inline-flex shrink-0 items-center rounded-full px-8 py-3 text-sm font-semibold text-background-dark transition-all hover:shadow-lg active:scale-95"
            >
              {t("cat.consultancy.cta")}
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* FAQ Accordion */}
      <ScrollReveal animation="up">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <FAQAccordion items={faq} />
        </div>
      </ScrollReveal>

      {lightboxIdx !== null && lightboxItems[lightboxIdx] && (
        <ImageLightbox
          src={lightboxItems[lightboxIdx].src}
          alt={lightboxItems[lightboxIdx].alt}
          cover={lightboxItems[lightboxIdx].cover}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((idx) => (idx! > 0 ? idx! - 1 : idx))}
          onNext={() => setLightboxIdx((idx) => (idx! < lightboxItems.length - 1 ? idx! + 1 : idx))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < lightboxItems.length - 1}
          current={lightboxIdx + 1}
          total={lightboxItems.length}
        />
      )}
    </div>
  );
}
