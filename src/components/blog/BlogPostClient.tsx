"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Lightbulb } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { POSTS_TRANSLATIONS } from "@/lib/blog-posts-ml";

// ─── Types ────────────────────────────────────────────────────────────────────

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "divider" }
  | { type: "specs"; rows: { label: string; value: string }[] }
  | { type: "room-guide"; items: { room: string; fabric: string; why: string }[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface BlogPostData {
  title: string;
  description: string;
  date: string;
  image: string;
  desktopImage?: string;
  tags: string[];
  readingTime: number;
  toc?: { id: string; label: string }[];
  blocks: Block[];
}

interface RelatedPost extends BlogPostData {
  slug: string;
}

interface Props {
  post: BlogPostData;
  slug: string;
  relatedPosts: RelatedPost[];
}

// ─── Inline bold renderer ─────────────────────────────────────────────────────

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*([^*]+)\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[#584738]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BlogPostClient({ post, slug, relatedPosts }: Props) {
  const { t, language } = useLanguage();

  const mlContent =
    language !== "pt"
      ? POSTS_TRANSLATIONS[slug]?.[language as "en" | "es"]
      : undefined;
  const displayPost = mlContent ? { ...post, ...mlContent } : post;

  function formatDate(dateStr: string) {
    const locale =
      language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es-ES";
    return new Date(dateStr).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function renderBlock(block: Block, i: number) {
    switch (block.type) {
      case "h2":
        return (
          <h2
            key={i}
            id={block.id}
            className="mb-5 mt-12 scroll-mt-24 font-serif text-2xl font-bold text-[#584738] md:text-3xl"
          >
            {block.text}
          </h2>
        );

      case "p":
        return (
          <p key={i} className="mb-5 text-base leading-8 text-[#584738]/75">
            {parseBold(block.text)}
          </p>
        );

      case "list":
        return (
          <ul key={i} className="my-6 space-y-3">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed text-[#584738]/75">
                  {parseBold(item)}
                </span>
              </li>
            ))}
          </ul>
        );

      case "tip":
        return (
          <div
            key={i}
            className="my-8 rounded-r border-l-4 border-primary bg-white/70 px-6 py-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {t("blog.tipLabel")}
              </span>
            </div>
            <p className="text-sm leading-7 text-[#584738]/75">{parseBold(block.text)}</p>
          </div>
        );

      case "divider":
        return <hr key={i} className="my-12 border-[#B59E7D]/30" />;

      case "specs":
        return (
          <div key={i} className="my-6 overflow-hidden border border-[#95978a]/40">
            {block.rows.map((row, j) => (
              <div
                key={j}
                className={`flex gap-4 bg-[#95978a] px-5 py-3 text-sm ${j < block.rows.length - 1 ? "border-b border-[#7a7c70]/40" : ""}`}
              >
                <span className="w-28 flex-shrink-0 text-xs font-bold uppercase tracking-wide text-[#221e10]">
                  {row.label}
                </span>
                <span className="text-[#221e10]">{row.value}</span>
              </div>
            ))}
          </div>
        );

      case "room-guide":
        return (
          <div key={i} className="my-8 grid gap-3 sm:grid-cols-2">
            {block.items.map((item, j) => (
              <div
                key={j}
                className="border border-[#B59E7D]/20 bg-white/60 px-4 py-4"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#584738]/45">
                  {item.room}
                </p>
                <p className="mt-1 font-semibold text-[#584738]">{item.fabric}</p>
                <p className="mt-1 text-xs text-[#584738]/55">{item.why}</p>
              </div>
            ))}
          </div>
        );

      case "image":
        return (
          <figure key={i} className="my-12">
            <div className="relative overflow-hidden">
              <img
                src={block.src}
                alt={block.alt}
                className="h-[280px] w-full object-cover sm:h-[400px]"
              />
              <span className="absolute bottom-0 left-0 h-[3px] w-16 bg-primary" />
            </div>
            {block.caption && (
              <figcaption className="mt-3 pl-1 text-xs italic tracking-wide text-[#584738]/45">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        return null;
    }
  }

  return (
    <article className="min-h-screen bg-[#F1EADA]">
      {/* ── Hero ── */}
      <div className="relative pt-20">
        <div className="relative h-[420px] overflow-hidden md:h-[520px]">
          {post.desktopImage ? (
            <>
              <img
                src={post.desktopImage}
                alt={displayPost.title}
                className="hidden h-full w-full object-cover lg:block"
              />
              <img
                src={post.image}
                alt={displayPost.title}
                className="h-full w-full object-cover lg:hidden"
              />
            </>
          ) : (
            <img
              src={post.image}
              alt={displayPost.title}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#221e10]/85 via-[#221e10]/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#221e10]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="max-w-3xl font-serif text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {displayPost.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/65">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime} {t("blog.minRead")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content + Sidebar ── */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-12 xl:gap-16">

          {/* Main article */}
          <div className="min-w-0 flex-1">

            {/* Nav + Author */}
            <div className="mb-10 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#584738]/60 transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("blog.backToBlog")}
              </Link>
              <div className="flex items-center gap-3">
                <img
                  src="/images/nilza-profile.jpg"
                  alt="Nilza Terezinha Duarte Bueno"
                  className="h-9 w-9 rounded-full object-cover object-top"
                />
                <div>
                  <p className="text-sm font-semibold text-[#584738]">{t("blog.company")}</p>
                  <p className="text-xs text-[#584738]/50">{t("blog.expertRole")}</p>
                </div>
              </div>
            </div>

            {/* Lead */}
            <p className="mb-10 border-l-2 border-primary/40 pl-5 text-lg italic leading-8 text-[#584738]/65">
              {displayPost.description}
            </p>

            {/* Article blocks */}
            <div>{displayPost.blocks.map((block, i) => renderBlock(block, i))}</div>

            {/* Mobile TOC */}
            {displayPost.toc && (
              <div className="mt-12 xl:hidden">
                <div className="border border-[#B59E7D]/30 bg-white/60 p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#584738]/40">
                    {t("blog.tocLabel")}
                  </p>
                  <nav>
                    <ul className="space-y-3">
                      {displayPost.toc!.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="group flex items-center gap-2.5 text-sm text-[#584738]/60 transition-colors hover:text-primary"
                          >
                            <span className="h-px w-4 flex-shrink-0 bg-[#B59E7D]/40 transition-all group-hover:w-6 group-hover:bg-primary" />
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-14 bg-[#584738] px-8 py-10 text-center">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.35em] text-primary">
                {t("blog.consultaLabel")}
              </p>
              <h3 className="mb-3 font-serif text-2xl font-bold text-white">
                {t("blog.liked")}
              </h3>
              <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-white/65">
                {t("blog.ctaDesc")}
              </p>
              <a
                href={getWhatsAppUrl(
                  `${t("blog.waMessage").replace(".", "")} "${displayPost.title}".`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="brushed-gold inline-flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#221e10]"
              >
                {t("blog.ctaBtn")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-primary">
                  {t("blog.continueReading")}
                </p>
                <h3 className="mb-8 font-serif text-2xl font-bold text-[#584738]">
                  {t("blog.otherArticles")}
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group overflow-hidden bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          {rel.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#B59E7D]/15 px-2.5 py-0.5 text-xs text-[#584738]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-serif text-base font-bold leading-snug text-[#584738] transition-colors group-hover:text-primary">
                          {rel.title}
                        </h4>
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#584738]/50">
                          <Clock className="h-3 w-3" />
                          {rel.readingTime} {t("blog.minRead")}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sticky Sidebar (xl+) ── */}
          {displayPost.toc && (
            <aside className="hidden w-64 flex-shrink-0 xl:block">
              <div className="sticky top-24 space-y-5">
                {/* TOC */}
                <div className="border border-[#B59E7D]/30 bg-white/60 p-5">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#584738]/40">
                    {t("blog.tocLabel")}
                  </p>
                  <nav>
                    <ul className="space-y-3">
                      {displayPost.toc!.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="group flex items-center gap-2.5 text-sm text-[#584738]/60 transition-colors hover:text-primary"
                          >
                            <span className="h-px w-4 flex-shrink-0 bg-[#B59E7D]/40 transition-all group-hover:w-6 group-hover:bg-primary" />
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* Sidebar CTA */}
                <div className="bg-[#584738] p-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                    {t("blog.consultaLabel")}
                  </p>
                  <h4 className="mb-3 font-serif text-lg font-bold leading-snug text-white">
                    {t("blog.sidebarTitle")}
                  </h4>
                  <p className="mb-5 text-xs leading-relaxed text-white/55">
                    {t("blog.sidebarDesc")}
                  </p>
                  <a
                    href={getWhatsAppUrl(
                      `${t("blog.waSidebar").replace(".", "")} "${displayPost.title}".`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brushed-gold block py-2.5 text-center text-xs font-bold uppercase tracking-wide text-[#221e10]"
                  >
                    {t("blog.sidebarCta")}
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
