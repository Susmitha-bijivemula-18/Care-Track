import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Filter, Stethoscope, Clock, Star, ChevronRight, User } from 'lucide-react';
import { fetchDoctors, type Doctor } from '../lib/supabase';

const specializations = [
  'All', 
  'Cardiology', 
  'Dermatology', 
  'General Medicine', 
  'Orthopedics', 
  'Pediatrics', 
  'Neurology', 
  'Gynecology', 
  'ENT'
];

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
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[85rem] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-lg border border-border bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                Book an Appointment
              </h1>
              <p className="text-sm text-muted-foreground">
                Choose a specialist to get started
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] mx-auto px-6 py-8">
        {/* ── Search bar ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
            <Search className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground text-foreground"
            />
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {filteredDoctors.length} found
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
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                activeFilter === spec
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-secondary text-secondary-foreground border-transparent hover:border-border hover:bg-secondary/80'
              }`}
            >
              {spec}
            </button>
          ))}
        </motion.div>

        {/* ── Doctors Grid ──────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border border-border bg-card shadow-sm animate-pulse"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-muted" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 rounded bg-muted w-3/4" />
                    <div className="h-3 rounded bg-muted w-1/2" />
                  </div>
                </div>
                <div className="h-3 rounded bg-muted w-full mb-3" />
                <div className="h-3 rounded bg-muted w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-secondary text-secondary-foreground">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">No doctors found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/book-appointment/${doctor.id}`}
                    className="group block rounded-xl p-6 border border-border bg-card shadow-sm hover:shadow-card transition-all hover:border-primary/30"
                  >
                    {/* Doctor avatar + basic info */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                          {doctor.full_name}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-secondary/50 text-secondary-foreground mt-1 text-xs font-medium border border-border">
                          <Stethoscope className="w-3 h-3" />
                          {doctor.specialization}
                        </div>
                      </div>
                    </div>

                    {/* Qualification */}
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                      {doctor.qualification}
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center justify-between py-3 mb-5 rounded-lg px-4 bg-secondary/30 border border-border/50">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">
                          {doctor.experience_years}+ yrs
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium text-foreground">
                          4.{Math.floor(Math.random() * 3) + 7}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        ₹{doctor.consultation_fee}
                      </span>
                    </div>

                    {/* Select button */}
                    <div className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-background text-foreground border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      Select Doctor
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
