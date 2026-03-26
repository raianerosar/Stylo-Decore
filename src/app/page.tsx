"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, Ruler, Award, Wrench, Check, Smartphone, SlidersHorizontal, Palette, Star, Monitor } from "lucide-react";
import { CATEGORIES, getWhatsAppUrl } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
const TestimonialsSection = dynamic(() => import("@/components/ui/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })), { ssr: false });
const MapSection = dynamic(() => import("@/components/sections/MapSection").then(m => ({ default: m.MapSection })), { ssr: false });
const FAQSection = dynamic(() => import("@/components/ui/FAQSection").then(m => ({ default: m.FAQSection })), { ssr: false });
import { useLanguage } from "@/context/LanguageContext";
import { Clock } from "lucide-react";

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  const { t, language } = useLanguage();

  type BlogPost = (typeof BLOG_POSTS)[number];
  function getPostTitle(post: BlogPost) {
    if (language !== "pt" && post.i18n?.[language as "en" | "es"]?.title)
      return post.i18n[language as "en" | "es"]!.title;
    return post.title;
  }
  function getPostExcerpt(post: BlogPost) {
    if (language !== "pt" && post.i18n?.[language as "en" | "es"]?.excerpt)
      return post.i18n[language as "en" | "es"]!.excerpt;
    return post.excerpt;
  }
  function getPostTag(post: BlogPost) {
    return post.tags[0];
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center">
        {/* Mobile: vídeo de fundo */}
        <video
          className="absolute inset-0 h-full w-full object-cover md:hidden"
          src="/videos/hero-0309.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Desktop: vídeo de fundo */}
        <video
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
          src="/videos/hero-0310.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/65" />

        {/* Conteúdo centralizado */}
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
          <p className="mb-4 font-serif text-4xl font-bold uppercase tracking-[0.25em] text-primary drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] md:text-5xl lg:text-6xl">
            Stylo Decore
          </p>
          <h1 className="mb-3 font-serif text-xl font-semibold text-white drop-shadow-md text-balance md:text-2xl lg:text-3xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mb-10 max-w-sm text-sm text-white/85 drop-shadow text-balance md:text-base md:max-w-md">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={getWhatsAppUrl(t("hero.whatsapp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="brushed-gold inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-background-dark transition-opacity hover:opacity-90"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a
              href="#colecoes"
              className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-background-dark transition-all hover:bg-background"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      {/* Nossas Coleções */}
      <section id="colecoes" className="relative -mt-10 rounded-t-[2.5rem] bg-background pt-20 md:pt-28">
        <ScrollReveal animation="up">
          <div className="mx-auto max-w-7xl px-6 mb-10">
            <h2 className="font-sans text-lg font-light uppercase tracking-[0.4em] text-foreground md:text-xl">
              {t("home.collections")}
            </h2>
            <div className="mt-3 h-px w-full max-w-xs bg-primary/50" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative block overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={t(cat.href)}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105${"imageDesktop" in cat ? " md:hidden" : ""}`}
                  style={{ objectPosition: cat.imagePosition }}
                  loading="lazy"
                />
                {"imageDesktop" in cat && (
                  <img
                    src={cat.imageDesktop}
                    alt={t(cat.href)}
                    className="absolute inset-0 hidden h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 md:block"
                    style={{ objectPosition: "imagePositionDesktop" in cat ? cat.imagePositionDesktop : cat.imagePosition }}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-2xl font-bold uppercase tracking-wide text-white md:text-3xl lg:text-4xl">
                  {t(cat.href)}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Diferenciais resumidos */}
        <div className="bg-background px-6 py-14">
          <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              {
                icon: SlidersHorizontal,
                titleKey: "home.vals.v1.title",
                textKey: "home.vals.v1.text",
                delay: 0,
              },
              {
                icon: Palette,
                titleKey: "home.vals.v2.title",
                textKey: "home.vals.v2.text",
                delay: 120,
              },
              {
                icon: Star,
                titleKey: "home.vals.v3.title",
                textKey: "home.vals.v3.text",
                delay: 240,
              },
            ].map((item) => (
              <ScrollReveal key={item.titleKey} animation="up" delay={item.delay}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                    <item.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-base font-bold text-foreground">{t(item.titleKey)}</p>
                  <p className="text-sm leading-relaxed text-foreground/90 max-w-[220px]">{t(item.textKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Como Atendemos */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <ScrollReveal animation="up">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("home.service.eyebrow")}
              </p>
              <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                {t("home.service.title")}
              </h2>
              <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-foreground/60">
                {t("home.service.subtitle")}
              </p>
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:items-stretch">

            {/* Card 1 — Orçamento Online */}
            <ScrollReveal animation="left" className="flex flex-col">
              <div className="group flex h-full flex-col rounded-2xl border border-[#B59E7D]/25 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                {/* Top row */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <span className="rounded-full border border-[#B59E7D]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    {t("home.online.badge")}
                  </span>
                </div>

                <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                  {t("home.online.title")}
                </h3>
                <p className="mb-7 text-sm leading-relaxed text-foreground/60">
                  {t("home.online.desc")}
                </p>

                {/* Steps */}
                <ol className="mb-8 flex-1 space-y-4">
                  {[
                    t("home.online.step1"),
                    t("home.online.step2"),
                    t("home.online.step3"),
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground/65">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>

                <a
                  href={getWhatsAppUrl(t("home.online.whatsapp"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-foreground/20 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  {t("home.online.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            {/* Card 2 — Consultoria Online Gratuita */}
            <ScrollReveal animation="up" delay={100} className="flex flex-col">
              <div className="group flex h-full flex-col rounded-2xl border border-[#B59E7D]/25 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                {/* Top row */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Monitor className="h-6 w-6 text-primary" />
                  </div>
                  <span className="rounded-full border border-[#B59E7D]/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    {t("home.consulting.badge")}
                  </span>
                </div>

                <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                  {t("home.consulting.title")}
                </h3>
                <p className="mb-7 text-sm leading-relaxed text-foreground/60">
                  {t("home.consulting.desc")}
                </p>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {[
                    t("home.consulting.f1"),
                    t("home.consulting.f2"),
                    t("home.consulting.f3"),
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(t("home.consulting.whatsapp"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-foreground/20 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  {t("home.consulting.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>

            {/* Card 3 — Consultoria Premium */}
            <ScrollReveal animation="right" delay={200} className="flex flex-col">
              <div className="group relative flex h-full flex-col rounded-2xl border-2 border-primary/40 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Linha dourada no topo */}
                <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl bg-primary" />

                {/* Badge centralizado acima */}
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#221e10] shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    {t("home.premium.badge")}
                  </span>
                </div>

                {/* Top row */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                    {t("home.premium.label")}
                  </span>
                </div>

                <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                  {t("home.premium.title")}
                </h3>
                <p className="mb-7 text-sm leading-relaxed text-foreground/60">
                  {t("home.premium.desc")}
                </p>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {[
                    t("home.premium.f1"),
                    t("home.premium.f2"),
                    t("home.premium.f3"),
                    t("home.premium.f4"),
                    t("home.premium.f5"),
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(t("home.premium.whatsapp"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brushed-gold inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-[#221e10] transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
                >
                  {t("home.premium.cta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <ScrollReveal animation="up" className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("home.diff.eyebrow")}
          </p>
          <h2 className="font-playfair text-3xl font-bold text-foreground md:text-4xl">
            {t("home.diff.title")}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-primary" />
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Ruler,
              titleKey: "home.diff.d1.title",
              textKey: "home.diff.d1.text",
            },
            {
              icon: Award,
              titleKey: "home.diff.d2.title",
              textKey: "home.diff.d2.text",
            },
            {
              icon: Wrench,
              titleKey: "home.diff.d3.title",
              textKey: "home.diff.d3.text",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.titleKey} animation="up" delay={i * 110}>
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{t(item.titleKey)}</h3>
                <p className="text-sm text-mahogany-light">{t(item.textKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        {/* Cabeçalho editorial */}
        <ScrollReveal animation="up">
          <div className="mb-10 flex items-end justify-between border-b border-[#B59E7D]/30 pb-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("home.blog.eyebrow")}
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                {t("home.blog.title")}
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-2 text-sm font-semibold text-foreground/60 transition-colors hover:text-primary md:flex"
            >
              {t("home.blog.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid de cards — 3 colunas iguais */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} animation="up" delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
              >
                {/* Imagem com número decorativo */}
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Tag */}
                  <span className="absolute bottom-4 left-4 bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#221e10]">
                    {getPostTag(post)}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {getPostTitle(post)}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/60 line-clamp-2">
                    {getPostExcerpt(post)}
                  </p>
                  {/* Footer do card */}
                  <div className="flex items-center justify-between border-t border-[#B59E7D]/20 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-foreground/40">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} {t("home.blog.readingTime")}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                      {t("home.blog.readArticle")} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <ScrollReveal animation="fade" delay={300}>
          <div className="mt-10 flex justify-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60"
            >
              {t("home.blog.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Entre em Contato */}
      <ContactSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Sobre Nós */}
      <AboutSection />

      {/* Como Chegar */}
      <MapSection />

      {/* FAQ */}
      <FAQSection />
    </>
  );
}
