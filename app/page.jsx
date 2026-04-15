"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import Particles from "react-tsparticles";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* 🌌 PARTICLES */}
      <Particles
        options={{
          particles: {
            number: { value: 50 },
            size: { value: 2.5 },
            move: { speed: 0.5 },
            opacity: { value: 0.25 },
            color: { value: "#a855f7" },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-linear-to-br from-black via-[#0B0B0F] to-[#111827]" />

      {/* 🚀 HERO */}
      <section className="pt-20 pb-14 text-center">
        <div className="max-w-3xl mx-auto px-6">
          {/* Brand */}
          <span className="text-gray-500 text-sm tracking-wide">
            Eventra<span className="text-purple-400">.</span>
          </span>

          {/* Animated Headline */}
          <div className="mt-5">
            <AnimatedText />
          </div>

          {/* linear Text */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold mt-2 leading-[0.95]">
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Effortlessly.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-xl mx-auto">
            Manage events, sell tickets, and verify entry with QR — all in one
            seamless platform.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/create-event">
              <Button className="px-10 py-5 text-lg bg-linear-to-r from-purple-500 to-pink-500 shadow-lg">
                Create Event
              </Button>
            </Link>

            <Link href="/explore">
              <Button
                variant="outline"
                className="px-10 py-5 text-lg border-white/20 hover:bg-white/10"
              >
                Explore
              </Button>
            </Link>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-5 mt-6 text-sm text-gray-400">
            <span>🎟 10K+ Tickets</span>
            <span>⚡ Instant QR Entry</span>
            <span>⭐ 500+ Events</span>
          </div>
        </div>
      </section>

      {/* 🔥 HOW IT WORKS */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">How it works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Create Event",
                desc: "Set up your event in minutes",
                icon: "🎤",
              },
              {
                title: "Sell Tickets",
                desc: "Get bookings instantly",
                icon: "🎟",
              },
              { title: "Scan QR", desc: "Verify entry instantly", icon: "📱" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur transition-all"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 FEATURES */}
      {/* 🎯 FEATURES */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT - TEXT */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Built for modern event organizers
            </h2>

            <div className="space-y-4 text-gray-300 text-lg">
              <div>⚡ QR-based check-in system</div>
              <div>📊 Real-time attendee tracking</div>
              <div>🎟 Seamless ticket booking</div>
              <div>🔗 Shareable event pages</div>
            </div>
          </div>

          {/* RIGHT - IMAGE */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-pink-500/20 blur-[80px] rounded-full" />

            <img
              src="/hero.png"
              alt="Event dashboard preview"
              className="relative rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </section>

      {/* 📊 STATS */}
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Events" },
            { value: "10K+", label: "Tickets Sold" },
            { value: "99%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="py-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Launch your next event today
        </h2>

        <p className="text-gray-400 mb-6">
          Start selling tickets in minutes — no setup required.
        </p>

        <Link href="/create-event">
          <Button className="px-10 py-5 text-lg bg-linear-to-r from-purple-500 to-pink-500 shadow-lg">
            Get Started
          </Button>
        </Link>
      </section>
    </div>
  );
}
