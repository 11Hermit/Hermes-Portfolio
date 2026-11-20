"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Award, GraduationCap, Mail, MapPin, Phone } from "lucide-react"

const certifications = [
  "AWS Machine Learning Engineer Nanodegree · Udacity",
  "Data Engineer Track · DataCamp",
  "Full-Stack Developer Nanodegree · Udacity",
  "Information Security Certification · freeCodeCamp",
  "Microsoft IoT & AI Certifications",
  "IBM AI Analyst Mastery & Explorer Awards · 2019",
]

export default function CombinedEducationContact() {
  return (
    <section className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] sm:px-10" aria-labelledby="contact-title">
      <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        <p className="section-label mb-3">Foundation</p>
        <h2 className="hero-heading mb-6 text-3xl font-bold text-foreground sm:text-4xl">Engineering with purpose.</h2>
        <article className="expertise-card rounded-2xl p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3"><div className="card-icon-bg rounded-xl p-3"><GraduationCap className="card-icon size-6" aria-hidden="true" /></div><div><h3 className="text-lg font-semibold text-foreground">BSc Biomedical Engineering</h3><p className="text-sm text-muted-foreground">Kenyatta University · Nairobi, Kenya</p></div></div>
          <p className="text-sm leading-6 text-muted-foreground">Biomedical engineering shaped how I approach software: understand the human context, validate against evidence and build systems that can be trusted.</p>
          <div className="mt-6 border-t border-border pt-5"><h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground"><Award className="size-4 text-primary" aria-hidden="true" /> Certifications & recognition</h4><ul className="flex flex-col gap-2 text-sm text-muted-foreground">{certifications.map((certification) => <li key={certification}>{certification}</li>)}</ul></div>
        </article>
        <article className="expertise-card mt-4 rounded-2xl p-6"><h3 className="font-semibold text-foreground">Community & leadership</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">IEEE Engineering in Medicine and Biology Society chapter vice chair; Google Developer Student Club machine learning lead. Built practical AI learning communities and connected students with industry.</p></article>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        <p className="section-label mb-3">Let’s build something useful</p>
        <h2 id="contact-title" className="hero-heading mb-6 text-3xl font-bold text-foreground sm:text-4xl">Open to thoughtful work.</h2>
        <p className="mb-7 text-base leading-7 text-muted-foreground">I’m interested in software engineering roles where production-grade AI, reliable backend systems and meaningful outcomes meet.</p>
        <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card/70 px-5">
          <a href="mailto:ashtoneonyango@gmail.com" className="flex items-center justify-between gap-4 py-5 text-foreground transition-colors hover:text-primary"><span className="flex items-center gap-3"><Mail className="size-5 text-primary" aria-hidden="true" />ashtoneonyango@gmail.com</span><ArrowUpRight className="size-4" aria-hidden="true" /></a>
          <a href="tel:+254740497975" className="flex items-center gap-3 py-5 text-foreground transition-colors hover:text-primary"><Phone className="size-5 text-primary" aria-hidden="true" />+254 740 497975</a>
          <p className="flex items-center gap-3 py-5 text-muted-foreground"><MapPin className="size-5 text-primary" aria-hidden="true" />Nairobi, Kenya</p>
        </div>
        <a href="https://www.linkedin.com/in/dao-ashtone/" target="_blank" rel="noopener noreferrer" className="btn-secondary mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">Connect on LinkedIn <ArrowUpRight className="size-4" aria-hidden="true" /></a>
        <p className="mt-10 border-t border-border pt-5 text-xs text-muted-foreground">© {new Date().getFullYear()} Ashtone Onyango Omondi · AI Software Engineer</p>
      </motion.div>
    </section>
  )
}
