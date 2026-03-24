"use client";

import { Timeline } from "@/components/ui/timeline";
import { useLanguage } from "@/context/LanguageContext";

function VideoCard({ src }: { src: string }) {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-tobacco-light" style={{ aspectRatio: "9/16", maxHeight: "420px" }}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-tobacco-light" style={{ aspectRatio: "9/16", maxHeight: "420px" }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

function MediaBlock({
  media,
  children,
}: {
  media: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div className="w-full sm:w-[38%] shrink-0">{media}</div>
      <div className="sm:w-[62%] space-y-3 pt-1">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 pt-1">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-xs text-tobacco">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProcessTimeline() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t("process.step1.title"),
      content: (
        <MediaBlock media={<VideoCard src="/videos/processo-01.mp4" />}>
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step1.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step1.desc")}
          </p>
          <Bullets items={[t("process.step1.b1"), t("process.step1.b2"), t("process.step1.b3")]} />
        </MediaBlock>
      ),
    },
    {
      title: t("process.step2.title"),
      content: (
        <MediaBlock media={<VideoCard src="/videos/processo-02.mp4" />}>
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step2.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step2.desc")}
          </p>
          <Bullets items={[t("process.step2.b1"), t("process.step2.b2"), t("process.step2.b3")]} />
        </MediaBlock>
      ),
    },
    {
      title: t("process.step3.title"),
      content: (
        <MediaBlock media={<VideoCard src="/videos/processo-03.mp4" />}>
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step3.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step3.desc")}
          </p>
          <Bullets items={[t("process.step3.b1"), t("process.step3.b2"), t("process.step3.b3")]} />
        </MediaBlock>
      ),
    },
    {
      title: t("process.step4.title"),
      content: (
        <MediaBlock
          media={
            <ImageCard
              src="/images/processo-cnc.jpg"
              alt={t("process.step4.title")}
            />
          }
        >
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step4.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step4.desc")}
          </p>
          <Bullets items={[t("process.step4.b1"), t("process.step4.b2"), t("process.step4.b3")]} />
        </MediaBlock>
      ),
    },
    {
      title: t("process.step5.title"),
      content: (
        <MediaBlock media={<VideoCard src="/videos/processo-04.mp4" />}>
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step5.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step5.desc")}
          </p>
          <Bullets items={[t("process.step5.b1"), t("process.step5.b2"), t("process.step5.b3")]} />
        </MediaBlock>
      ),
    },
    {
      title: t("process.step6.title"),
      content: (
        <MediaBlock
          media={
            <ImageCard
              src="/images/processo-entrega.jpg"
              alt={t("process.step6.title")}
            />
          }
        >
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step6.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step6.desc")}
          </p>
          <Bullets items={[t("process.step6.b1"), t("process.step6.b2"), t("process.step6.b3")]} />
        </MediaBlock>
      ),
    },
    {
      title: t("process.step7.title"),
      content: (
        <MediaBlock
          media={
            <ImageCard
              src="/images/processo-montagem.jpg"
              alt={t("process.step7.title")}
            />
          }
        >
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">
            {t("process.step7.summary")}
          </p>
          <p className="text-tobacco text-sm leading-relaxed">
            {t("process.step7.desc")}
          </p>
          <Bullets items={[t("process.step7.b1"), t("process.step7.b2"), t("process.step7.b3")]} />
        </MediaBlock>
      ),
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 px-4 md:px-6 lg:px-10">
      <div className="max-w-2xl mx-auto mb-10 md:mb-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-2">
          {t("process.label")}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 leading-snug">
          {t("process.title")}
        </h2>
        <p className="text-tobacco text-base md:text-lg leading-relaxed">
          {t("process.subtitle")}
        </p>
      </div>

      <Timeline data={steps} />
    </section>
  );
}
