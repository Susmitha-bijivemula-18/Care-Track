import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react';
import { signIn, signUp } from '../lib/supabase';

export function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password);
        setError('');
        setIsSignUp(false);
        // Show a success message - in real app would verify email
        alert('Account created! Please check your email for verification, then sign in.');
      } else {
        await signIn(formData.email, formData.password);
        navigate('/patient/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#ffffff' }}>
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-[45%] relative items-center justify-center p-12"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full opacity-10 bg-white" />
          <div className="absolute bottom-[15%] right-[15%] w-48 h-48 rounded-full opacity-10 bg-white" />
          <div className="absolute top-[60%] left-[50%] w-32 h-32 rounded-full opacity-5 bg-white" />
        </div>
        <div className="relative z-10 text-white max-w-md">
          <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-tighter mb-12 opacity-90 hover:opacity-100 transition-opacity">
            <img src="/logo.jpg" alt="CareTrack" className="w-10 h-10 rounded-xl invert" />
            CareTrack
          </Link>
          <h2 className="text-3xl font-bold tracking-tight mb-4 leading-tight">
            Your healthcare journey,<br />simplified.
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Sign in to manage appointments, track your queue, access medical records, and stay connected with your healthcare providers.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Back button (mobile) */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors lg:hidden"
            style={{ color: '#64748b' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#09090b' }}>
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              {isSignUp
                ? 'Sign up to start managing your healthcare journey'
                : 'Sign in to access your dashboard and appointments'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl mb-6"
              style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-11 pr-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                  style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#09090b' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                  style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#09090b' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: '#94a3b8' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password (sign up only) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-semibold mb-2" style={{ color: '#334155' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-5 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 placeholder-[#94a3b8]"
                    style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', color: '#09090b' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                  />
                </div>
              </motion.div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-sm" style={{ color: '#64748b' }}>Remember me</span>
                </label>
                <button type="button" className="text-sm font-medium" style={{ color: '#3b82f6' }}>
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_25px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 rounded-full mx-auto"
                  style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#ffffff' }}
                />
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm font-semibold"
              style={{ color: '#3b82f6' }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm font-medium hidden lg:inline-block"
              style={{ color: '#94a3b8' }}
            >
              ← Back to CareTrack Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}