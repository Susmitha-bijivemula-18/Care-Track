import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Filter, Stethoscope, Clock, Star, ChevronRight, User, ArrowRight } from 'lucide-react';
import { fetchDoctors, type Doctor } from '../lib/supabase';

// Extended type for UI
interface ExtendedDoctor extends Doctor {
  availableStatus?: string;
  nextSlot?: string;
  rating?: string;
  avatar?: string;
}

const mockDoctors: ExtendedDoctor[] = [
  { id: '1', full_name: "Dr. Ananya Rao", specialization: "Cardiology", experience_years: 12, qualification: "MD, DM Cardiology", consultation_fee: 800, available_days: ['Monday', 'Wednesday'], available_from: '10:00', available_to: '16:00', is_active: true, created_at: '', availableStatus: 'Available Today', nextSlot: '2:30 PM', rating: '4.9', avatar: '/doctor_profile.jpg' },
  { id: '2', full_name: "Dr. Rahul Sharma", specialization: "Dermatology", experience_years: 8, qualification: "MD Dermatology", consultation_fee: 600, available_days: ['Tuesday', 'Thursday'], available_from: '09:00', available_to: '14:00', is_active: true, created_at: '', availableStatus: 'Available Tomorrow', nextSlot: '9:15 AM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&q=80' },
  { id: '3', full_name: "Dr. Priya Nair", specialization: "General Medicine", experience_years: 15, qualification: "MD General Medicine", consultation_fee: 500, available_days: ['Monday', 'Tuesday'], available_from: '10:00', available_to: '18:00', is_active: true, created_at: '', availableStatus: 'Available Today', nextSlot: '11:45 AM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1594824436951-7f12bc80fa52?w=150&h=150&fit=crop&q=80' },
  { id: '4', full_name: "Dr. Arjun Reddy", specialization: "Orthopedics", experience_years: 10, qualification: "MS Orthopedics", consultation_fee: 1000, available_days: ['Wednesday', 'Friday'], available_from: '11:00', available_to: '17:00', is_active: true, created_at: '', availableStatus: 'Available Wed', nextSlot: '1:00 PM', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1537368910025-7028a411333c?w=150&h=150&fit=crop&q=80' },
  { id: '5', full_name: "Dr. Meera Kapoor", specialization: "Pediatrics", experience_years: 14, qualification: "MD Pediatrics", consultation_fee: 700, available_days: ['Monday', 'Thursday'], available_from: '09:00', available_to: '13:00', is_active: true, created_at: '', availableStatus: 'Available Today', nextSlot: '4:00 PM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&q=80' },
  { id: '6', full_name: "Dr. Vikram Singh", specialization: "Neurology", experience_years: 18, qualification: "MD, DM Neurology", consultation_fee: 1200, available_days: ['Tuesday', 'Friday'], available_from: '14:00', available_to: '19:00', is_active: true, created_at: '', availableStatus: 'Available Thu', nextSlot: '10:30 AM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&q=80' },
  { id: '7', full_name: "Dr. Sneha Iyer", specialization: "Gynecology", experience_years: 11, qualification: "MD Obstetrics & Gynecology", consultation_fee: 800, available_days: ['Monday', 'Wednesday'], available_from: '10:00', available_to: '16:00', is_active: true, created_at: '', availableStatus: 'Available Today', nextSlot: '1:15 PM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop&q=80' },
  { id: '8', full_name: "Dr. Karthik Rao", specialization: "ENT", experience_years: 9, qualification: "MS ENT", consultation_fee: 600, available_days: ['Tuesday', 'Thursday'], available_from: '10:00', available_to: '15:00', is_active: true, created_at: '', availableStatus: 'Available Tomorrow', nextSlot: '3:00 PM', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=150&h=150&fit=crop&q=80' },
];

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
  const [doctors, setDoctors] = useState<ExtendedDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    setLoading(true);
    try {
      const data = await fetchDoctors();
      if (data && data.length > 0) {
        setDoctors(data);
      } else {
        setDoctors(mockDoctors);
      }
    } catch (e) {
      setDoctors(mockDoctors);
    }
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
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Book an Appointment
              </h1>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground mt-2">
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
                    {/* Card Body */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-border bg-secondary flex-shrink-0">
                        {doctor.avatar ? (
                          <img src={doctor.avatar} alt={doctor.full_name} className="w-full h-full object-cover grayscale-[20%]" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
                            <User className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="text-xl font-medium tracking-tight text-foreground truncate group-hover:text-foreground/80 transition-colors">
                          {doctor.full_name}
                        </h3>
                        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mt-1 font-semibold">
                          {doctor.specialization}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 border-b border-border pb-6">
                      <div className="text-[13px] text-muted-foreground mb-4">
                        {doctor.experience_years} years experience
                      </div>
                      <div className="flex flex-col gap-1.5 border border-border p-3 bg-secondary/20">
                         <div className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                           <span className="text-[11px] font-semibold text-foreground tracking-wide uppercase">{doctor.availableStatus || 'Available'}</span>
                         </div>
                         <div className="text-[12px] text-muted-foreground ml-3.5">
                           Next available: <span className="text-foreground">{doctor.nextSlot || 'Contact for slot'}</span>
                         </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xl font-light text-foreground">
                        ₹{doctor.consultation_fee}
                      </div>
                      <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 border border-border">
                        <Star className="w-3.5 h-3.5 text-foreground fill-foreground" />
                        <span className="text-xs font-semibold text-foreground">
                          {doctor.rating || '4.8'}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <div className="group/btn flex items-center justify-center gap-2 py-3 rounded-none text-[10px] font-bold tracking-widest uppercase border border-border text-foreground hover:bg-secondary/50 transition-colors cursor-pointer">
                        View Profile
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                      <div className="group/btn flex items-center justify-center gap-2 py-3 rounded-none text-[10px] font-bold tracking-widest uppercase bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] dark:shadow-none">
                        Book
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </div>
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
