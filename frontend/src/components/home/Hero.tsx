import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Stethoscope, Heart, Shield, Clock, Sparkles } from 'lucide-react';

// ─── Hero images (medical-themed Unsplash) ───────────────────────────────────
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop',
    label: 'Modern Care',
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
    label: 'Advanced Technology',
  },
  {
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1200&auto=format&fit=crop',
    label: 'Expert Specialists',
  },
  {
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
    label: 'Hospital Facility',
  },
];

// ─── Quick-stat pills shown under heading ────────────────────────────────────
const statPills = [
  { icon: Heart, label: '25+ Specialities', color: '#ef4444' },
  { icon: Shield, label: '50K+ Patients', color: '#3b82f6' },
  { icon: Clock, label: '24/7 Emergency', color: '#8b5cf6' },
];

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle images every 4 seconds
  const nextImage = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextImage, 4000);
    return () => clearInterval(timer);
  }, [nextImage, isPaused]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#ffffff' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Subtle background pattern ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* ── Decorative floating orbs ───────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
      />

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-40 pb-20 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">

          {/* ── Left column: Text content ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
                border: '1px solid rgba(59, 130, 246, 0.12)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: '#3b82f6' }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: '#3b82f6' }}>
                TRUSTED BY 50,000+ PATIENTS
              </span>
            </motion.div>

            {/* Heading */}
            <h1
              className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.08] tracking-[-0.03em] mb-6"
              style={{ color: '#09090b' }}
            >
              Your Health,{' '}
              <span className="relative inline-block">
                <span
                  className="relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  One Clearer
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  className="absolute bottom-2 left-0 right-0 h-3 rounded-full origin-left -z-0"
                  style={{ background: 'rgba(59, 130, 246, 0.08)' }}
                />
              </span>{' '}
              Journey.
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              style={{ color: '#64748b' }}
            >
              Compassionate healthcare, connected through thoughtful technology.
              Discover specialists, manage appointments, and track your care — all in one place.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {statPills.map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: pill.color }} />
                    <span className="text-sm font-medium" style={{ color: '#334155' }}>
                      {pill.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/book-appointment"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)] hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                }}
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  color: '#334155',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <Stethoscope className="w-5 h-5" style={{ color: '#64748b' }} />
                Patient Login
              </Link>
            </div>
          </motion.div>

          {/* ── Right column: Floating image gallery ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main image container */}
            <div
              className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden"
              style={{
                boxShadow: '0 25px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <img
                    src={heroImages[activeImage].url}
                    alt={heroImages[activeImage].label}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.3) 100%)',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image label badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${activeImage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-xl"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <span className="text-xs font-semibold" style={{ color: '#1e293b' }}>
                    {heroImages[activeImage].label}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Image navigation dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-xl"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative transition-all duration-300"
                    style={{
                      width: activeImage === i ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: activeImage === i
                        ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                        : 'rgba(0,0,0,0.15)',
                    }}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Floating card: top right ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -top-6 -right-6 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="px-5 py-4 rounded-2xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#09090b' }}>99.8%</div>
                    <div className="text-xs" style={{ color: '#64748b' }}>Patient Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Floating card: bottom left ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-4 -left-8 z-20"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="px-5 py-4 rounded-2xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                  >
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#09090b' }}>Quick Booking</div>
                    <div className="text-xs" style={{ color: '#64748b' }}>Under 2 minutes</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Floating card: mid right (appointment preview) ──── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute top-[45%] -right-12 z-20"
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="px-5 py-4 rounded-2xl backdrop-blur-xl"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                }}
              >
                <div className="text-[10px] font-bold tracking-wider uppercase mb-2"
                  style={{ color: '#3b82f6' }}
                >
                  Next Appointment
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: '#f1f5f9' }}
                  >
                    <Stethoscope className="w-4 h-4" style={{ color: '#6366f1' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#09090b' }}>Dr. Ananya Rao</div>
                    <div className="text-xs" style={{ color: '#94a3b8' }}>Cardiology • 10:30 AM</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium tracking-wider uppercase" style={{ color: '#94a3b8' }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
          style={{ borderColor: '#cbd5e1' }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#94a3b8' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}