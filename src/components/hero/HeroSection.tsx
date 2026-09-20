import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Search, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { ImpactTicker } from './ImpactTicker';
import { AntigravityField } from './AntigravityField';
import { AuroraBackground } from './AuroraBackground';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FADE_UP: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
      aria-label="Hero: CampusCycle AI"
    >
      {/* Layered atmosphere gives the hero depth without competing with the CTA. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <AuroraBackground />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      <AntigravityField />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-400"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" aria-hidden="true" />
          Powered by AWS Bedrock · Campus Sustainability AI
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Turn discarded items into{' '}
          <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
            the starting point
          </span>{' '}
          for reuse
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mb-10 mx-auto max-w-2xl text-base text-slate-400 sm:text-lg"
        >
          Snap a photo, let AI triage the item, and instantly match it with
          students who need it — keeping waste out of landfills and resources
          circulating within campus.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary CTA — pulses */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(20, 184, 166, 0.4)',
                '0 0 0 12px rgba(20, 184, 166, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="rounded-xl"
          >
            <Link to="/scan">
              <Button size="lg" variant="primary" className="gap-2">
                <Camera className="h-5 w-5" aria-hidden="true" />
                Scan an Item
              </Button>
            </Link>
          </motion.div>

          <Link to="/scan">
            <Button size="lg" variant="secondary">
              <Search className="h-5 w-5" aria-hidden="true" />
              I Need Something
            </Button>
          </Link>

          <Link to="/scan">
            <Button size="lg" variant="ghost">
              My Items
            </Button>
          </Link>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          custom={4}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
            aria-hidden="true"
          >
            {/* Phone shell */}
            <div className="relative h-[420px] w-[200px] rounded-[36px] border-2 border-slate-600 bg-slate-800 shadow-2xl shadow-black/60">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-3">
                <div className="h-1.5 w-16 rounded-full bg-slate-700" />
              </div>
              {/* Screen content */}
              <div className="absolute inset-x-[3px] top-8 bottom-3 overflow-hidden rounded-[30px] bg-slate-900">
                {/* Camera viewfinder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                  <div className="mb-3 h-24 w-24 rounded-2xl border-2 border-dashed border-teal-400/60 bg-teal-500/5 flex items-center justify-center">
                    <Camera className="h-10 w-10 text-teal-400/60" />
                  </div>
                  <p className="text-[10px] text-slate-500">Point at an item</p>
                  {/* Scan line animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"
                    animate={{ top: ['30%', '70%', '30%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3 pt-2 bg-slate-900/80">
                  <div className="h-8 w-8 rounded-full border-2 border-teal-400 bg-teal-500/20" />
                </div>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute -inset-4 -z-10 rounded-[50px] bg-teal-500/10 blur-2xl" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          custom={5}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="mt-8 flex justify-center"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-slate-600"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Impact ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <ImpactTicker />
      </div>
    </section>
  );
}
