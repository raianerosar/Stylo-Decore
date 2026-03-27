"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/lib/constants";

const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
  { q: "faq.q9", a: "faq.a9" },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-primary">
            {t("faq.label")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t("faq.title")}
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-foreground/55">
            {t("faq.desc1")}{" "}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-2 transition-opacity hover:opacity-75"
            >
              {t("faq.desc2")}
            </a>
            .
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="divide-y divide-[#B59E7D]/25">
          {FAQ_KEYS.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.04,
                }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-start gap-5 py-6 text-left transition-colors hover:text-primary"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="mt-0.5 shrink-0 font-serif text-sm font-bold text-primary/50 tabular-nums transition-colors group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span className="flex-1 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary md:text-[17px]">
                    {t(q)}
                  </span>

                  {/* Icon */}
                  <span
                    className={`mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-primary bg-primary text-[#221e10]"
                        : "border-[#B59E7D]/40 text-foreground/40 group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-6 pl-11 pr-8 text-sm leading-relaxed text-foreground/65 md:text-[15px]">
                        {t(a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
