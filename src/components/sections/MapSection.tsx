"use client";
import { motion } from "motion/react";
import { MapPin, Clock, Phone } from "lucide-react";
import { CONTACT, getWhatsAppUrl } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

export function MapSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-primary">
            {t("map.label")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            {t("map.title")}
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* Mapa + Info */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-start">

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-[#B59E7D]/25 shadow-sm"
          >
            <iframe
              src="https://www.google.com/maps?q=Servidão+Nova+Esperança,+173+B,+Campeche,+Florianópolis,+SC,+Brasil&output=embed"
              width="100%"
              height="440"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Stylo Decore - Campeche, Florianópolis"
            />
          </motion.div>

          {/* Cards de info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Endereço */}
            <div className="rounded-2xl border border-[#B59E7D]/25 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/55">
                    {t("map.address")}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground">
                    {CONTACT.address}
                    <br />
                    {CONTACT.city} – {CONTACT.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="rounded-2xl border border-[#B59E7D]/25 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/55">
                    {t("map.hours")}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground">
                    {CONTACT.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Telefone */}
            <div className="rounded-2xl border border-[#B59E7D]/25 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/55">
                    {t("map.phone")}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">{CONTACT.phone}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href={getWhatsAppUrl(t("map.waMsg"))}
              target="_blank"
              rel="noopener noreferrer"
              className="brushed-gold flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-[#221e10] transition-all hover:opacity-90"
            >
              {t("map.schedule")}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
