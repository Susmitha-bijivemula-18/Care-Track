import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, User, Stethoscope, Clock, Star,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { fetchDoctorById, createAppointment, type Doctor } from '../lib/supabase';

// Problem categories mapped to specializations
const problemsBySpecialization: Record<string, string[]> = {
  'Cardiology': [
    'Chest pain or discomfort',
    'Shortness of breath',
    'Irregular heartbeat / Palpitations',
    'High blood pressure',
    'Dizziness or fainting',
    'Swelling in legs or ankles',
    'Heart checkup / Routine screening',
    'Other cardiac concern',
  ],
  'Dermatology': [
    'Acne or skin breakouts',
    'Eczema or rash',
    'Hair loss / Alopecia',
    'Psoriasis',
    'Skin allergy or itching',
    'Pigmentation issues',
    'Fungal infection',
    'Skin checkup / Mole evaluation',
    'Other skin concern',
  ],
  'General Medicine': [
    'Fever / Cold / Flu',
    'Headache or body pain',
    'Stomach pain / Digestive issues',
    'Diabetes management',
    'Thyroid issues',
    'General health checkup',
    'Fatigue or weakness',
    'Other general concern',
  ],
  'Orthopedics': [
    'Back pain / Spine issues',
    'Joint pain (knee, shoulder, hip)',
    'Fracture or bone injury',
    'Arthritis',
    'Sports injury',
    'Neck pain / Cervical',
    'Post-surgery follow-up',
    'Other bone/muscle concern',
  ],
  'Pediatrics': [
    'Child fever / Cold / Cough',
    'Vaccination',
    'Growth & development check',
    'Skin rash or allergy',
    'Stomach upset / Vomiting',
    'Ear infection',
    'Routine child health checkup',
    'Other child health concern',
  ],
  'Neurology': [
    'Persistent headaches / Migraine',
    'Seizures / Epilepsy',
    'Memory problems',
    'Numbness or tingling',
    'Stroke symptoms',
    'Sleep disorders',
    'Movement disorders / Tremors',
    'Other neurological concern',
  ],
  'Gynecology': [
    'Menstrual irregularities',
    'PCOS / PCOD',
    'Pregnancy care / Prenatal checkup',
    'Urinary tract infection',
    'Fertility concerns',
    'Menopause management',
    'Routine gynecological checkup',
    'Other gynecological concern',
  ],
  'ENT': [
    'Ear pain / Ear infection',
    'Hearing loss',
    'Sinus / Nasal congestion',
    'Sore throat / Tonsillitis',
    'Allergic rhinitis',
    'Snoring / Sleep apnea',
    'Voice problems',
    'Other ENT concern',
  ],
};

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

type Step = 'details' | 'problem' | 'confirm' | 'success';

export function AppointmentForm() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [tokenNumber, setTokenNumber] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    problem: '',
    customProblem: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (doctorId) {
      loadDoctor(doctorId);
    }
  }, [doctorId]);

  async function loadDoctor(id: string) {
    setLoading(true);
    const data = await fetchDoctorById(id);
    setDoctor(data);
    setLoading(false);
  }

  function validateDetails(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || Number(formData.age) < 1 || Number(formData.age) > 120) newErrors.age = 'Valid age is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNextFromDetails() {
    if (validateDetails()) {
      setCurrentStep('problem');
    }
  }

  function handleNextFromProblem() {
    if (!formData.problem) {
      setErrors({ problem: 'Please select a problem' });
      return;
    }
    setCurrentStep('confirm');
  }

  async function handleSubmit() {
    if (!doctor) return;
    setSubmitting(true);

    const result = await createAppointment({
      patient_name: formData.name,
      patient_age: Number(formData.age),
      patient_email: formData.email,
      patient_phone: formData.phone,
      problem_description: formData.problem === 'Other' ? formData.customProblem : formData.problem,
      problem_category: doctor.specialization,
      doctor_id: doctor.id,
      appointment_date: formData.date,
    });

    setSubmitting(false);

    if (result) {
      setTokenNumber(result.tokenNumber);
      setCurrentStep('success');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#ffffff' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 rounded-full"
          style={{ border: '3px solid #e2e8f0', borderTopColor: '#3b82f6' }}
        />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#ef4444' }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: '#09090b' }}>Doctor not found</h2>
          <button
            onClick={() => navigate('/book-appointment')}
            className="text-sm font-medium"
            style={{ color: '#3b82f6' }}
          >
            ← Back to doctors
          </button>
        </div>
      </div>
    );
  }

  const style = specStyles[doctor.specialization] || { color: '#6b7280', bg: '#f9fafb', gradient: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' };
  const problems = problemsBySpecialization[doctor.specialization] || ['General consultation', 'Other'];
  const steps: Step[] = ['details', 'problem', 'confirm', 'success'];
  const stepIndex = steps.indexOf(currentStep);

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => currentStep === 'success' ? navigate('/') : navigate('/book-appointment')}
              className="p-2.5 rounded-xl transition-all duration-200"
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#334155' }} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold tracking-tight" style={{ color: '#09090b' }}>
                {currentStep === 'success' ? 'Appointment Confirmed' : 'Complete Your Booking'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Step progress (not shown on success) */}
        {currentStep !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2">
              {['Your Details', 'Select Problem', 'Confirm'].map((label, i) => (
                <div key={label} className="flex items-center gap-2 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={{
                          background: i <= stepIndex
                            ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                            : '#f1f5f9',
                          color: i <= stepIndex ? '#ffffff' : '#94a3b8',
                        }}
                      >
                        {i < stepIndex ? '✓' : i + 1}
                      </div>
                      <span
                        className="text-xs font-semibold hidden sm:block"
                        style={{ color: i <= stepIndex ? '#09090b' : '#94a3b8' }}
                      >
                        {label}
                      </span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: i <= stepIndex ? '100%' : '0%' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Doctor info card (persistent) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-8"
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: style.gradient }}
            >
              <User className="w-6 h-6" style={{ color: style.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate" style={{ color: '#09090b' }}>
                {doctor.full_name}
              </h3>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold"
                  style={{ background: style.bg, color: style.color }}
                >
                  <Stethoscope className="w-3 h-3" />
                  {doctor.specialization}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                  <Clock className="w-3 h-3" />
                  {doctor.experience_years}+ yrs
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: '#64748b' }}>
                  <Star className="w-3 h-3" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  4.{Math.floor(Math.random() * 3) + 7}
                </span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs" style={{ color: '#94a3b8' }}>Consultation</div>
              <div className="text-lg font-bold" style={{ color: '#09090b' }}>₹{doctor.consultation_fee}</div>
            </div>
          </div>
        </motion.div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {/* ── Step 1: Patient Details ─────────────────────────────── */}
          {currentStep === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: '#09090b' }}>
                Enter Your Details
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                    style={{
                      background: '#f8fafc',
                      border: errors.name ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                      color: '#09090b',
                    }}
                    onFocus={(e) => { if (!errors.name) (e.currentTarget as HTMLInputElement).style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { if (!errors.name) (e.currentTarget as HTMLInputElement).style.borderColor = '#e2e8f0'; }}
                  />
                  {errors.name && <p className="text-xs mt-1.5 font-medium" style={{ color: '#ef4444' }}>{errors.name}</p>}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                    style={{
                      background: '#f8fafc',
                      border: errors.age ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                      color: '#09090b',
                    }}
                    onFocus={(e) => { if (!errors.age) (e.currentTarget as HTMLInputElement).style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { if (!errors.age) (e.currentTarget as HTMLInputElement).style.borderColor = '#e2e8f0'; }}
                  />
                  {errors.age && <p className="text-xs mt-1.5 font-medium" style={{ color: '#ef4444' }}>{errors.age}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                    style={{
                      background: '#f8fafc',
                      border: errors.email ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                      color: '#09090b',
                    }}
                    onFocus={(e) => { if (!errors.email) (e.currentTarget as HTMLInputElement).style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { if (!errors.email) (e.currentTarget as HTMLInputElement).style.borderColor = '#e2e8f0'; }}
                  />
                  {errors.email && <p className="text-xs mt-1.5 font-medium" style={{ color: '#ef4444' }}>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                    style={{
                      background: '#f8fafc',
                      border: errors.phone ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                      color: '#09090b',
                    }}
                    onFocus={(e) => { if (!errors.phone) (e.currentTarget as HTMLInputElement).style.borderColor = '#3b82f6'; }}
                    onBlur={(e) => { if (!errors.phone) (e.currentTarget as HTMLInputElement).style.borderColor = '#e2e8f0'; }}
                  />
                  {errors.phone && <p className="text-xs mt-1.5 font-medium" style={{ color: '#ef4444' }}>{errors.phone}</p>}
                </div>

                {/* Appointment Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200"
                    style={{
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      color: '#09090b',
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleNextFromDetails}
                className="w-full mt-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_25px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                Continue to Problem Selection →
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Problem Selection ──────────────────────────── */}
          {currentStep === 'problem' && (
            <motion.div
              key="problem"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: '#09090b' }}>
                What's your concern?
              </h2>
              <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>
                Select the issue that best describes your condition
              </p>

              {errors.problem && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4" style={{ background: '#fef2f2', color: '#ef4444' }}>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{errors.problem}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {problems.map((problem) => (
                  <button
                    key={problem}
                    onClick={() => {
                      setFormData({ ...formData, problem });
                      setErrors({});
                    }}
                    className="text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: formData.problem === problem ? style.bg : '#f8fafc',
                      border: formData.problem === problem ? `1.5px solid ${style.color}40` : '1.5px solid #e2e8f0',
                      color: formData.problem === problem ? style.color : '#334155',
                      boxShadow: formData.problem === problem ? `0 4px 15px ${style.color}12` : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: formData.problem === problem ? style.color : '#cbd5e1',
                          background: formData.problem === problem ? style.color : 'transparent',
                        }}
                      >
                        {formData.problem === problem && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {problem}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom problem description */}
              {formData.problem?.includes('Other') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <textarea
                    value={formData.customProblem}
                    onChange={(e) => setFormData({ ...formData, customProblem: e.target.value })}
                    placeholder="Please describe your concern..."
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8] resize-none"
                    style={{
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      color: '#09090b',
                    }}
                  />
                </motion.div>
              )}

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setCurrentStep('details')}
                  className="flex-1 py-4 rounded-2xl text-base font-semibold transition-all duration-200"
                  style={{ color: '#334155', background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleNextFromProblem}
                  className="flex-[2] py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_25px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                >
                  Review & Confirm →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Confirmation ───────────────────────────────── */}
          {currentStep === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: '#09090b' }}>
                Review Your Appointment
              </h2>

              <div
                className="rounded-2xl overflow-hidden mb-6"
                style={{ border: '1.5px solid #e2e8f0' }}
              >
                {/* Patient details */}
                <div className="p-5" style={{ background: '#f8fafc' }}>
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: '#94a3b8' }}>
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>Name</div>
                      <div className="text-sm font-semibold" style={{ color: '#09090b' }}>{formData.name}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>Age</div>
                      <div className="text-sm font-semibold" style={{ color: '#09090b' }}>{formData.age} years</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>Email</div>
                      <div className="text-sm font-semibold truncate" style={{ color: '#09090b' }}>{formData.email}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>Phone</div>
                      <div className="text-sm font-semibold" style={{ color: '#09090b' }}>{formData.phone}</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0' }} />

                {/* Appointment details */}
                <div className="p-5">
                  <h3 className="text-xs font-bold tracking-wider uppercase mb-4" style={{ color: '#94a3b8' }}>
                    Appointment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#64748b' }}>Doctor</span>
                      <span className="text-sm font-semibold" style={{ color: '#09090b' }}>{doctor.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#64748b' }}>Department</span>
                      <span className="text-sm font-semibold" style={{ color: style.color }}>{doctor.specialization}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#64748b' }}>Concern</span>
                      <span className="text-sm font-semibold text-right max-w-[200px]" style={{ color: '#09090b' }}>
                        {formData.problem?.includes('Other') ? formData.customProblem || formData.problem : formData.problem}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#64748b' }}>Date</span>
                      <span className="text-sm font-semibold" style={{ color: '#09090b' }}>
                        {new Date(formData.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div
                      className="flex justify-between pt-3 mt-3"
                      style={{ borderTop: '1px solid #e2e8f0' }}
                    >
                      <span className="text-sm font-semibold" style={{ color: '#64748b' }}>Consultation Fee</span>
                      <span className="text-base font-bold" style={{ color: '#09090b' }}>₹{doctor.consultation_fee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentStep('problem')}
                  className="flex-1 py-4 rounded-2xl text-base font-semibold transition-all duration-200"
                  style={{ color: '#334155', background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_25px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 rounded-full"
                        style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#ffffff' }}
                      />
                      Booking...
                    </span>
                  ) : (
                    'Confirm Appointment ✓'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Success ────────────────────────────────────── */}
          {currentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2" style={{ color: '#09090b' }}>
                Appointment Booked! 🎉
              </h2>
              <p className="text-sm mb-8" style={{ color: '#94a3b8' }}>
                Your appointment has been successfully scheduled
              </p>

              {/* Token card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block rounded-2xl p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                  border: '1.5px solid #e2e8f0',
                }}
              >
                <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#94a3b8' }}>
                  Your Token Number
                </div>
                <div
                  className="text-5xl font-black tracking-tighter"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {tokenNumber}
                </div>
                <div className="mt-4 text-sm" style={{ color: '#64748b' }}>
                  {doctor.full_name} • {doctor.specialization}
                </div>
                <div className="text-sm font-medium mt-1" style={{ color: '#09090b' }}>
                  {new Date(formData.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200"
                  style={{ color: '#334155', background: '#f8fafc', border: '1.5px solid #e2e8f0' }}
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="px-8 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_25px_rgba(59,130,246,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
