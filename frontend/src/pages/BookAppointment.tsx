import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Filter, Stethoscope, Clock, Star, ChevronRight, User } from 'lucide-react';
import { fetchDoctors, type Doctor } from '../lib/supabase';

// Specialization color/icon mapping
const specStyles: Record<string, { color: string; bg: string; gradient: string }> = {
  'Cardiology':       { color: '#ef4444', bg: '#fef2f2', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)' },
  'Dermatology':      { color: '#f97316', bg: '#fff7ed', gradient: 'linear-gradient(135deg, #ffedd5, #fed7aa)' },
  'General Medicine': { color: '#10b981', bg: '#ecfdf5', gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' },
  'Orthopedics':      { color: '#3b82f6', bg: '#eff6ff', gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' },
  'Pediatrics':       { color: '#ec4899', bg: '#fdf2f8', gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' },
  'Neurology':        { color: '#8b5cf6', bg: '#f5f3ff', gradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' },
  'Gynecology':       { color: '#f43f5e', bg: '#fff1f2', gradient: 'linear-gradient(135deg, #ffe4e6, #fecdd3)' },
  'ENT':              { color: '#14b8a6', bg: '#f0fdfa', gradient: 'linear-gradient(135deg, #ccfbf1, #99f6e4)' },
};

const specializations = ['All', ...Object.keys(specStyles)];

export function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    setLoading(true);
    const data = await fetchDoctors();
    setDoctors(data);
    setLoading(false);
  }

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || doc.specialization === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-xl transition-all duration-200"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#f8fafc';
              }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#334155' }} />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight" style={{ color: '#09090b' }}>
                Book an Appointment
              </h1>
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                Choose a specialist to get started
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Search bar ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-200"
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
            }}
          >
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-medium placeholder-[#94a3b8]"
              style={{ color: '#09090b' }}
            />
            <div className="flex items-center gap-2 pl-3" style={{ borderLeft: '1px solid #e2e8f0' }}>
              <Filter className="w-4 h-4" style={{ color: '#94a3b8' }} />
              <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>
                {filteredDoctors.length} doctors
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Specialization filter chips ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-6 scrollbar-thin"
        >
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveFilter(spec)}
              className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: activeFilter === spec
                  ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                  : '#f8fafc',
                color: activeFilter === spec ? '#ffffff' : '#64748b',
                border: activeFilter === spec ? 'none' : '1px solid #e2e8f0',
                boxShadow: activeFilter === spec ? '0 4px 15px rgba(59,130,246,0.25)' : 'none',
              }}
            >
              {spec}
            </button>
          ))}
        </motion.div>

        {/* ── Doctors Grid ──────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 animate-pulse"
                style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl" style={{ background: '#e2e8f0' }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded-lg w-3/4" style={{ background: '#e2e8f0' }} />
                    <div className="h-3 rounded-lg w-1/2" style={{ background: '#e2e8f0' }} />
                  </div>
                </div>
                <div className="h-3 rounded-lg w-full mb-2" style={{ background: '#e2e8f0' }} />
                <div className="h-3 rounded-lg w-2/3" style={{ background: '#e2e8f0' }} />
              </div>
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: '#f8fafc' }}
            >
              <Stethoscope className="w-8 h-8" style={{ color: '#94a3b8' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#09090b' }}>No doctors found</h3>
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor, i) => {
                const style = specStyles[doctor.specialization] || { color: '#6b7280', bg: '#f9fafb', gradient: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' };
                return (
                  <motion.div
                    key={doctor.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      to={`/book-appointment/${doctor.id}`}
                      className="group block rounded-2xl p-6 transition-all duration-300 cursor-pointer"
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #e2e8f0',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = style.color + '40';
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${style.color}12`;
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Doctor avatar + basic info */}
                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                          style={{ background: style.gradient }}
                        >
                          <User className="w-7 h-7" style={{ color: style.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-base font-bold truncate transition-colors duration-200"
                            style={{ color: '#09090b' }}
                          >
                            {doctor.full_name}
                          </h3>
                          <div
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mt-1.5 text-xs font-semibold"
                            style={{ background: style.bg, color: style.color }}
                          >
                            <Stethoscope className="w-3 h-3" />
                            {doctor.specialization}
                          </div>
                        </div>
                      </div>

                      {/* Qualification */}
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#64748b' }}>
                        {doctor.qualification}
                      </p>

                      {/* Stats row */}
                      <div
                        className="flex items-center justify-between py-3 mb-4 rounded-xl px-4"
                        style={{ background: '#f8fafc' }}
                      >
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" style={{ color: '#94a3b8' }} />
                          <span className="text-xs font-medium" style={{ color: '#64748b' }}>
                            {doctor.experience_years}+ yrs
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                          <span className="text-xs font-medium" style={{ color: '#64748b' }}>
                            4.{Math.floor(Math.random() * 3) + 7}
                          </span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: '#09090b' }}>
                          ₹{doctor.consultation_fee}
                        </span>
                      </div>

                      {/* Select button */}
                      <div
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                        style={{
                          color: style.color,
                          background: style.bg,
                          border: `1.5px solid ${style.color}20`,
                        }}
                      >
                        Select Doctor
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
