"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MachineCard from "@/components/MachineCard";
import ReviewCard from "@/components/ReviewCard";
import FinanceCalc from "@/components/FinanceCalc";
import FinancingOptions from "@/components/FinancingOptions";
import CraneServiceCard from "@/components/CraneServiceCard";
import MachineCatalogGuide from "@/components/MachineCatalogGuide";
import MachineGallery from "@/components/MachineGallery";
import MachineImageCloth from "@/components/MachineImageCloth";
import Machine360Viewer from "@/components/Machine360Viewer";
import HeroIntro from "@/components/HeroIntro";
import {
  getClothSamples,
  getFeaturedReviews,
  getFinancingOptions,
  getMachines,
  getServices,
} from "@/lib/data";

const machines = getMachines();
const reviews = getFeaturedReviews();
const clothSamples = getClothSamples();
const financing = getFinancingOptions();
const services = getServices();

export default function HomePage() {
  return (
    <HeroIntro>
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-vilike-accent/20 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto max-w-6xl text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-vilike-accent">Knitting Solutions for the World</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">
            VILIKE Circular Knitting Machines
          </h1>
          <p className="mt-2 text-xl text-vilike-muted">Official Agent · Tirupur, Tamil Nadu</p>
          <div className="mx-auto mt-6 max-w-md gradient-blue-line" />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#models"
              className="rounded-lg bg-vilike-accent px-8 py-3 font-semibold text-white shadow-blue-glow hover:opacity-90"
            >
              View Models
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-white/30 px-8 py-3 font-semibold hover:border-vilike-accent hover:text-vilike-accent"
            >
              Customer Login
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-vilike-accent/30 bg-black/50 p-6"
        >
          <Machine360Viewer />
        </motion.div>
      </section>

      <div id="catalog">
        <MachineCatalogGuide />
      </div>

      <MachineGallery />

      {/* Models */}
      <section id="models" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Machine Models</h2>
        <p className="max-w-2xl text-vilike-muted">
          Europe-version builds from 30&quot; to 44&quot; diameter — Lycra attachment and high-feeder jersey
          lines. Each card summarizes capacity in plain language for your mill team.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((m, i) => (
            <MachineCard key={m.id} machine={m} index={i} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-vilike-accent/5 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <p className="text-vilike-muted">Featuring Anugragha Spinning Mills & more</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Cloth samples */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Sample Cloth Materials</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {clothSamples.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-xl border border-white/10 bg-vilike-bg">
              <div className="relative h-44">
                <MachineImageCloth src={c.image_url} alt={c.name} />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{c.name}</h4>
                <p className="text-sm leading-relaxed text-vilike-muted">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Sales, Service & Crane</h2>
        <div className="mt-8">
          <CraneServiceCard services={services} />
        </div>
      </section>

      {/* Finance */}
      <section id="finance" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Banking & Finance</h2>
        <div className="mt-8">
          <FinancingOptions options={financing} />
        </div>
        <div className="mt-10">
          <FinanceCalc />
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-white/10 bg-black px-4 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="text-xl font-bold">VILIKE FAB TECH</h3>
          <p className="mt-2 text-sm text-vilike-muted">
            No.8/25, 2nd Floor, Ramaiya Colony West 1st Street, Avinashi Road, Tirupur - 641 602
          </p>
          <p className="mt-1 text-sm text-vilike-muted">
            +91 8190908383 · 8190905353 · 8190906363 · knittex81@gmail.com
          </p>
          <a
            href="https://wa.me/918190908383"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-green-600 px-8 py-3 font-semibold text-white"
          >
            WhatsApp Us
          </a>
        </div>
      </footer>
    </main>
    </HeroIntro>
  );
}
