import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Detect when we scroll past hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsPastHero(scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#specialities', label: 'Specialities' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#experience', label: 'Patient Experience' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3'
            : 'py-5',
        )}
        style={{
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.85)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center ml-4 lg:ml-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-xl font-bold tracking-tighter transition-all duration-300 hover:opacity-80"
              style={{ color: '#09090b' }}
            >
              <img src="/logo.jpg" alt="CareTrack" className="w-8 h-8 rounded-lg" />
              <span>CareTrack</span>
            </Link>
          </div>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group"
                style={{ color: isPastHero ? '#334155' : '#64748b' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#09090b';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isPastHero ? '#334155' : '#64748b';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 w-0 group-hover:w-6"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)' }}
                />
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300"
              style={{
                color: '#334155',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              Patient Login
            </Link>
            <Link
              to="/book-appointment"
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-500',
                isPastHero
                  ? 'text-white hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5'
                  : 'text-white hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:-translate-y-0.5'
              )}
              style={{
                background: isPastHero
                  ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              }}
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: '#09090b' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 py-6 px-6"
            style={{
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            }}
          >
            <nav className="flex flex-col gap-1 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-xl transition-colors"
                  style={{ color: '#334155' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-center text-sm font-medium rounded-xl"
                style={{ color: '#334155', background: '#f8fafc', border: '1px solid #e2e8f0' }}
              >
                Patient Login
              </Link>
              <Link
                to="/book-appointment"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 text-center text-sm font-semibold text-white rounded-xl"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}