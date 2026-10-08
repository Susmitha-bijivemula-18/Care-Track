import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Filter, Stethoscope, Star, User, ArrowRight, Calendar, Clock } from 'lucide-react';
import { fetchDoctors, type Doctor } from '../lib/supabase';

// Extended type for UI
interface ExtendedDoctor extends Doctor {
  availableStatus?: string;
  nextSlot?: string;
  rating?: string;
  avatar?: string;
}

const mockDoctors: ExtendedDoctor[] = [
  { id: '1', full_name: "Dr. Ananya Rao", specialization: "Cardiology", experience_years: 12, qualification: "MD, DM Cardiology", consultation_fee: 800, available_days: ['Monday', 'Wednesday'], available_from: '10:00', available_to: '16:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '2:30 PM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&q=80' },
  { id: '2', full_name: "Dr. Rahul Sharma", specialization: "Dermatology", experience_years: 8, qualification: "MD Dermatology", consultation_fee: 600, available_days: ['Tuesday', 'Thursday'], available_from: '09:00', available_to: '14:00', is_active: true, created_at: '', availableStatus: 'Available tomorrow', nextSlot: '9:15 AM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&q=80' },
  { id: '3', full_name: "Dr. Priya Nair", specialization: "General Medicine", experience_years: 15, qualification: "MD General Medicine", consultation_fee: 500, available_days: ['Monday', 'Tuesday'], available_from: '10:00', available_to: '18:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '11:45 AM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1594824436951-7f12bc80fa52?w=150&h=150&fit=crop&q=80' },
  { id: '4', full_name: "Dr. Arjun Reddy", specialization: "Orthopedics", experience_years: 10, qualification: "MS Orthopedics", consultation_fee: 1000, available_days: ['Wednesday', 'Friday'], available_from: '11:00', available_to: '17:00', is_active: true, created_at: '', availableStatus: 'Available Wednesday', nextSlot: '1:00 PM', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1537368910025-7028a411333c?w=150&h=150&fit=crop&q=80' },
  { id: '5', full_name: "Dr. Meera Kapoor", specialization: "Pediatrics", experience_years: 14, qualification: "MD Pediatrics", consultation_fee: 700, available_days: ['Monday', 'Thursday'], available_from: '09:00', available_to: '13:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '4:00 PM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&q=80' },
  { id: '6', full_name: "Dr. Vikram Singh", specialization: "Neurology", experience_years: 18, qualification: "MD, DM Neurology", consultation_fee: 1200, available_days: ['Tuesday', 'Friday'], available_from: '14:00', available_to: '19:00', is_active: true, created_at: '', availableStatus: 'Available Thursday', nextSlot: '10:30 AM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop&q=80' },
  { id: '7', full_name: "Dr. Sneha Iyer", specialization: "Gynecology", experience_years: 11, qualification: "MD Obstetrics & Gynecology", consultation_fee: 800, available_days: ['Monday', 'Wednesday'], available_from: '10:00', available_to: '16:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '1:15 PM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=150&h=150&fit=crop&q=80' },
  { id: '8', full_name: "Dr. Karthik Rao", specialization: "ENT", experience_years: 9, qualification: "MS ENT", consultation_fee: 600, available_days: ['Tuesday', 'Thursday'], available_from: '10:00', available_to: '15:00', is_active: true, created_at: '', availableStatus: 'Available tomorrow', nextSlot: '3:00 PM', rating: '4.7', avatar: '' }, 
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
  const [doctors, setDoctors] = useState<ExtendedDoctor[]>(mockDoctors);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await fetchDoctors();
      if (data && data.length > 0) {
        // Merge our mock UI details (avatars, status, etc) with database data
        const mergedData = data.map(dbDoc => {
          const match = mockDoctors.find(m => m.full_name === dbDoc.full_name);
          return match ? { ...dbDoc, ...match } : { ...dbDoc, availableStatus: 'Available today', nextSlot: '10:00 AM', rating: '4.5', avatar: '' };
        });
        setDoctors(mergedData);
      }
    } catch (e) {
      // Keep mockDoctors on error
    }
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
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[85rem] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2.5 rounded-lg border border-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-foreground">
                Book an Appointment
              </h1>
              <p className="text-[12px] font-semibold tracking-widest uppercase text-muted-foreground mt-2">
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
          className="mb-6"
        >
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-brand focus-within:border-transparent">
            <Search className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[15px] font-medium placeholder:text-muted-foreground text-foreground"
            />
            <div className="flex items-center gap-2 pl-3 border-l border-border hidden sm:flex">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-[13px] font-medium text-muted-foreground whitespace-nowrap">
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
          className="flex gap-2.5 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0"
        >
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveFilter(spec)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border ${
                activeFilter === spec
                  ? 'bg-foreground text-background border-foreground shadow-sm'
                  : 'bg-secondary text-foreground border-transparent hover:border-border hover:bg-secondary/80'
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
              <div key={i} className="rounded-xl p-6 border border-border bg-card shadow-sm animate-pulse">
                <div className="w-full h-24 bg-secondary rounded-lg mb-4" />
                <div className="w-3/4 h-5 bg-secondary rounded mb-2" />
                <div className="w-1/2 h-4 bg-secondary rounded" />
              </div>
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card rounded-2xl border border-border/50"
          >
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-secondary text-muted-foreground">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">No doctors found</h3>
            <p className="text-[15px] text-muted-foreground max-w-sm mx-auto">
              We couldn't find any doctors matching your search. Try clearing your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
              className="mt-6 px-6 py-2.5 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="group flex flex-col rounded-2xl p-6 border border-border bg-card hover:border-brand/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
                >
                    {/* Header: Photo + Name + Spec */}
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-border/50 bg-secondary flex-shrink-0 flex items-center justify-center">
                        {doctor.avatar ? (
                          <img 
                            src={doctor.avatar} 
                            alt={doctor.full_name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                               (e.target as HTMLImageElement).style.display = 'none';
                               (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <User className={`w-8 h-8 text-muted-foreground/50 ${doctor.avatar ? 'hidden' : ''}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="text-xl font-heading font-semibold tracking-tight text-foreground truncate group-hover:text-brand transition-colors">
                          {doctor.full_name}
                        </h3>
                        <div className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground mt-1.5">
                          {doctor.specialization}
                        </div>
                        <div className="text-[13px] text-foreground/60 mt-1.5">
                          {doctor.experience_years} years experience
                        </div>
                      </div>
                    </div>

                    {/* Availability Card */}
                    <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-brand/5 border border-brand/10 mb-5">
                       <div className="flex items-center gap-2">
                         <Calendar className="w-4 h-4 text-brand" />
                         <span className="text-[13px] font-semibold text-brand">{doctor.availableStatus}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Clock className="w-4 h-4 text-muted-foreground" />
                         <span className="text-[13px] text-foreground/70">Next available: <span className="font-semibold text-foreground">{doctor.nextSlot}</span></span>
                       </div>
                    </div>

                    {/* Footer: Fee, Rating */}
                    <div className="flex items-center justify-between mb-6 pt-2 border-t border-border/50">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Consultation</span>
                        <span className="text-xl font-heading font-semibold text-foreground">₹{doctor.consultation_fee}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Rating</span>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                          <span className="text-[15px] font-semibold text-foreground">
                            {doctor.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <Link 
                        to={`/book-appointment/${doctor.id}`} 
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] font-semibold text-foreground border border-border hover:bg-secondary transition-colors"
                      >
                        View Profile
                      </Link>
                      <Link 
                        to={`/book-appointment/${doctor.id}`} 
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] font-semibold bg-brand text-white hover:bg-brand/90 transition-colors shadow-sm"
                      >
                        Book
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
