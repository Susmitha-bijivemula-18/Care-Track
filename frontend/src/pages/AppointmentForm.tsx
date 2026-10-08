import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Stethoscope, Clock, Star,
  CheckCircle, AlertCircle, Calendar, ArrowRight
} from 'lucide-react';
import { fetchDoctorById, createAppointment, type Doctor } from '../lib/supabase';

const mockDoctors: any[] = [
  { id: '1', full_name: "Dr. Ananya Rao", specialization: "Cardiology", experience_years: 12, qualification: "MD, DM Cardiology", consultation_fee: 800, available_days: ['Monday', 'Wednesday'], available_from: '10:00', available_to: '16:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '2:30 PM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&q=80' },
  { id: '2', full_name: "Dr. Rahul Sharma", specialization: "Dermatology", experience_years: 8, qualification: "MD Dermatology", consultation_fee: 600, available_days: ['Tuesday', 'Thursday'], available_from: '09:00', available_to: '14:00', is_active: true, created_at: '', availableStatus: 'Available tomorrow', nextSlot: '9:15 AM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&q=80' },
  { id: '3', full_name: "Dr. Priya Nair", specialization: "General Medicine", experience_years: 15, qualification: "MD General Medicine", consultation_fee: 500, available_days: ['Monday', 'Tuesday'], available_from: '10:00', available_to: '18:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '11:45 AM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1594824436951-7f12bc80fa52?w=150&h=150&fit=crop&q=80' },
  { id: '4', full_name: "Dr. Arjun Reddy", specialization: "Orthopedics", experience_years: 10, qualification: "MS Orthopedics", consultation_fee: 1000, available_days: ['Wednesday', 'Friday'], available_from: '11:00', available_to: '17:00', is_active: true, created_at: '', availableStatus: 'Available Wednesday', nextSlot: '1:00 PM', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1537368910025-7028a411333c?w=150&h=150&fit=crop&q=80' },
  { id: '5', full_name: "Dr. Meera Kapoor", specialization: "Pediatrics", experience_years: 14, qualification: "MD Pediatrics", consultation_fee: 700, available_days: ['Monday', 'Thursday'], available_from: '09:00', available_to: '13:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '4:00 PM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&q=80' },
  { id: '6', full_name: "Dr. Vikram Singh", specialization: "Neurology", experience_years: 18, qualification: "MD, DM Neurology", consultation_fee: 1200, available_days: ['Tuesday', 'Friday'], available_from: '14:00', available_to: '19:00', is_active: true, created_at: '', availableStatus: 'Available Thursday', nextSlot: '10:30 AM', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop&q=80' },
  { id: '7', full_name: "Dr. Sneha Iyer", specialization: "Gynecology", experience_years: 11, qualification: "MD Obstetrics & Gynecology", consultation_fee: 800, available_days: ['Monday', 'Wednesday'], available_from: '10:00', available_to: '16:00', is_active: true, created_at: '', availableStatus: 'Available today', nextSlot: '1:15 PM', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=150&h=150&fit=crop&q=80' },
  { id: '8', full_name: "Dr. Karthik Rao", specialization: "ENT", experience_years: 9, qualification: "MS ENT", consultation_fee: 600, available_days: ['Tuesday', 'Thursday'], available_from: '10:00', available_to: '15:00', is_active: true, created_at: '', availableStatus: 'Available tomorrow', nextSlot: '3:00 PM', rating: '4.7', avatar: '' },
];

type Step = 'date' | 'time' | 'confirm' | 'success';

export function AppointmentForm() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [currentStep, setCurrentStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [tokenNumber, setTokenNumber] = useState('');

  // Generate some realistic dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day3 = new Date(today);
  day3.setDate(day3.getDate() + 2);
  const day4 = new Date(today);
  day4.setDate(day4.getDate() + 3);

  const dates = [
    { id: today.toISOString().split('T')[0], label: 'Today', day: today.toLocaleDateString('en-US', { weekday: 'short' }), date: today.getDate() },
    { id: tomorrow.toISOString().split('T')[0], label: 'Tomorrow', day: tomorrow.toLocaleDateString('en-US', { weekday: 'short' }), date: tomorrow.getDate() },
    { id: day3.toISOString().split('T')[0], label: day3.toLocaleDateString('en-US', { weekday: 'long' }), day: day3.toLocaleDateString('en-US', { weekday: 'short' }), date: day3.getDate() },
    { id: day4.toISOString().split('T')[0], label: day4.toLocaleDateString('en-US', { weekday: 'long' }), day: day4.toLocaleDateString('en-US', { weekday: 'short' }), date: day4.getDate() },
  ];

  // Dummy time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', 
    '11:30 AM', '02:30 PM', '03:00 PM', '04:00 PM'
  ];

  useEffect(() => {
    if (doctorId) {
      loadDoctor(doctorId);
    }
  }, [doctorId]);

  async function loadDoctor(id: string) {
    setLoading(true);
    try {
      const data = await fetchDoctorById(id);
      if (data) {
        const match = mockDoctors.find(m => m.full_name === data.full_name);
        setDoctor(match ? { ...data, ...match } : { ...data, rating: '4.5', availableStatus: 'Available today' });
      } else {
        const fallback = mockDoctors.find(d => d.id === id);
        setDoctor(fallback || mockDoctors[0]);
      }
    } catch (e) {
      const fallback = mockDoctors.find(d => d.id === id);
      setDoctor(fallback || mockDoctors[0]);
    }
    setLoading(false);
  }

  async function handleConfirm() {
    if (!doctor || !selectedDate || !selectedTime) return;
    setSubmitting(true);

    try {
      const result = await createAppointment({
        patient_name: "Demo Patient", // Mapped to a default for the sake of the wizard UI
        patient_age: 30,
        patient_email: "demo@caretrack.com",
        patient_phone: "9999999999",
        problem_description: "General Checkup",
        problem_category: doctor.specialization,
        doctor_id: doctor.id,
        appointment_date: selectedDate,
      });

      if (result) {
        setTokenNumber(result.tokenNumber);
        setCurrentStep('success');
      } else {
        // Fallback for demo without DB
        setTimeout(() => {
          setTokenNumber('A-' + Math.floor(Math.random() * 50 + 10));
          setCurrentStep('success');
        }, 800);
      }
    } catch (e) {
      setTimeout(() => {
        setTokenNumber('A-' + Math.floor(Math.random() * 50 + 10));
        setCurrentStep('success');
      }, 800);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-border border-t-brand animate-spin" />
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-foreground">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (currentStep === 'success') navigate('/');
                else if (currentStep === 'confirm') setCurrentStep('time');
                else if (currentStep === 'time') setCurrentStep('date');
                else navigate('/book-appointment');
              }}
              className="p-2 rounded-lg border border-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-heading font-semibold tracking-tight">
              {currentStep === 'success' ? 'Appointment Confirmed' : 'Book Appointment'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        
        {/* STEP 1: Doctor Profile (Always visible during booking) */}
        {currentStep !== 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm mb-8"
          >
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border/50 bg-secondary flex-shrink-0 flex items-center justify-center">
                {doctor.avatar ? (
                  <img 
                    src={doctor.avatar} 
                    alt={doctor.full_name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                       (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <User className={`w-8 h-8 text-muted-foreground/50 ${doctor.avatar ? 'hidden' : ''}`} />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-semibold tracking-tight mb-1">{doctor.full_name}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                    {doctor.specialization}
                  </span>
                  <span className="text-[13px] font-medium text-muted-foreground ml-2">
                    {doctor.experience_years} yrs exp.
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span>{doctor.rating} Rating</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <div className="text-foreground">
                    Consultation: <span className="font-bold">₹{doctor.consultation_fee}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Dynamic Steps ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          
          {/* STEP 2: Date Selection */}
          {currentStep === 'date' && (
            <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-heading font-semibold mb-4">Select a Date</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDate(d.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        isSelected 
                          ? 'border-brand bg-brand/5 text-brand shadow-sm' 
                          : 'border-border bg-card text-foreground hover:border-brand/30 hover:bg-secondary/50'
                      }`}
                    >
                      <span className={`text-[11px] uppercase tracking-wider font-semibold mb-1 ${isSelected ? 'text-brand' : 'text-muted-foreground'}`}>
                        {d.label}
                      </span>
                      <span className="text-2xl font-heading font-semibold mb-1">{d.date}</span>
                      <span className={`text-xs font-medium ${isSelected ? 'text-brand' : 'text-muted-foreground'}`}>
                        {d.day}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep('time')}
                  disabled={!selectedDate}
                  className="px-8 py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/90 transition-all flex items-center gap-2"
                >
                  Continue to Time
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Time Selection */}
          {currentStep === 'time' && (
            <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-heading font-semibold mb-1">Select a Time</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Available slots for {dates.find(d => d.id === selectedDate)?.label}
              </p>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                        isSelected
                          ? 'border-brand bg-brand text-white shadow-sm'
                          : 'border-border bg-card text-foreground hover:border-brand/30 hover:bg-secondary/50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep('confirm')}
                  disabled={!selectedTime}
                  className="px-8 py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/90 transition-all flex items-center gap-2"
                >
                  Review Appointment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Confirm */}
          {currentStep === 'confirm' && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-heading font-semibold mb-6">Confirm Appointment</h3>
              
              <div className="bg-card border border-border rounded-xl overflow-hidden mb-8 shadow-sm">
                <div className="p-5 border-b border-border bg-secondary/30">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground mb-1 block">Date & Time</span>
                  <div className="text-lg font-heading font-semibold text-foreground">
                    {dates.find(d => d.id === selectedDate)?.label}, {selectedDate} at {selectedTime}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-sm font-medium text-muted-foreground">Doctor</span>
                    <span className="text-sm font-semibold text-foreground">{doctor.full_name}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-sm font-medium text-muted-foreground">Specialty</span>
                    <span className="text-sm font-semibold text-foreground">{doctor.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm font-medium text-foreground">Consultation Fee</span>
                    <span className="text-lg font-bold text-foreground">₹{doctor.consultation_fee}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="w-full sm:w-auto px-10 py-4 bg-brand text-white rounded-xl font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed hover:bg-brand/90 transition-all flex justify-center items-center gap-2 shadow-md"
                >
                  {submitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    'Confirm Appointment'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Success */}
          {currentStep === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-heading font-semibold mb-2">Appointment Confirmed!</h2>
              <p className="text-foreground/70 mb-8">Your visit has been scheduled successfully.</p>

              <div className="bg-card border border-border rounded-2xl p-8 max-w-md mx-auto mb-8 shadow-sm">
                <div className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground mb-2">Your Token Number</div>
                <div className="text-5xl font-heading font-bold text-brand mb-6">{tokenNumber}</div>
                
                <div className="grid grid-cols-2 gap-4 text-left border-t border-border pt-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Date</div>
                    <div className="font-semibold text-foreground text-sm">{selectedDate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Time</div>
                    <div className="font-semibold text-foreground text-sm">{selectedTime}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Doctor</div>
                    <div className="font-semibold text-foreground text-sm">{doctor.full_name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Status</div>
                    <div className="font-semibold text-green-600 text-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                      Confirmed
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-card border border-border text-foreground rounded-xl font-semibold text-sm hover:bg-secondary transition-all"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/patient/queue')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-brand/90 transition-all shadow-sm"
                >
                  Track My Queue
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
