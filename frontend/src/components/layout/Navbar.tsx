import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled
            ? 'py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]'
            : 'py-6 bg-transparent border-b border-transparent'
        )}
      >
        <div className="w-full max-w-[90rem] mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
          
          {/* LEFT: Brand Lockup */}
          <div className="flex-1 flex items-center justify-start z-50">
            <Link
              to="/"
              className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[0.98]"
            >
              {/* Requested Heart & Pulse Logo with Glow Effect */}
              <div 
                className="flex items-center justify-center w-9 h-9"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))' }}
              >
                <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                  <path d="M16 26.5C16 26.5 6 19.5 6 13.5C6 10 8.5 8 11.5 8C14 8 15.5 9.5 16 11C16.5 9.5 18 8 20.5 8C23.5 8 26 10 26 13.5C26 19.5 16 26.5 16 26.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Functional Animated ECG Pulse */}
                  <path 
                    d="M 9.5 15 H 12.5 L 13.5 16.5 L 16 9 L 18 20 L 19.5 15 H 22.5" 
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="35 35"
                  >
                    <animate attributeName="stroke-dashoffset" values="35;-35" dur="2s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
              
              <div 
                className="flex flex-col justify-center pt-1"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))' }}
              >
                <span className="text-[24px] leading-[0.9] tracking-tight text-black flex items-center">
                  <strong className="font-extrabold">Care</strong>
                  <span className="font-light">Track</span>
                </span>
                <span className="text-[8.5px] leading-tight font-semibold uppercase tracking-[0.2em] text-gray-500 mt-[3px]">
                  Less waiting. Better care.
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER: Refined Navigation Composition */}
          <nav className="hidden lg:flex flex-none items-center justify-center">
            <div className={cn(
              "flex items-center gap-1 transition-all duration-500 ease-out",
              isScrolled ? "bg-gray-50/80 px-2 py-1 rounded-sm border border-gray-200" : "px-0 py-0"
            )}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 xl:px-5 py-2 text-[12px] xl:text-[13px] uppercase tracking-[0.08em] font-bold text-gray-900 transition-all duration-300",
                    "hover:text-black hover:bg-black/[0.03] group overflow-hidden rounded-md whitespace-nowrap"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-1.5 left-5 right-5 h-[2px] bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </a>
              ))}
            </div>
          </nav>

          {/* RIGHT: Secondary Action & Signature CTA */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-4 xl:gap-6 z-50">

            {/* Highlighted Patient Login */}
            <Link
              to="/login"
              className={cn(
                "relative inline-flex items-center justify-center px-5 py-2.5 border border-black rounded-none",
                "text-[12px] xl:text-[13px] uppercase tracking-[0.05em] font-medium text-black",
                "transition-all duration-300 ease-out overflow-hidden group whitespace-nowrap",
                "hover:bg-black hover:text-white hover:shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]"
              )}
            >
              <span className="relative z-10">Patient Login</span>
            </Link>
            
            {/* Solid Book Appointment CTA */}
            <Link
              to="/book-appointment"
              className={cn(
                "group relative inline-flex items-center gap-2.5 px-5 xl:px-6 py-2.5 border border-black rounded-none",
                "bg-black text-white text-[12px] xl:text-[13px] uppercase tracking-[0.05em] font-medium",
                "transition-all duration-300 ease-out hover:-translate-y-0.5",
                "shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]",
                "overflow-hidden whitespace-nowrap"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-6" />
              <span className="relative z-10">Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex-1 flex justify-end z-50">
            <button
              className="flex items-center justify-center w-10 h-10 text-black hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Premium Mobile Navigation Panel */}
        <div
          className={cn(
            "fixed inset-0 bg-white/98 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center px-8",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col gap-6 mt-12">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-3xl font-light tracking-tight text-black hover:opacity-60 transition-opacity",
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${idx * 100}ms`, transitionDuration: '500ms' }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div 
            className={cn(
              "mt-12 flex flex-col gap-4 border-t border-gray-200 pt-8 transition-all duration-700 delay-300",
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center w-full py-4 border border-black rounded-none text-black text-sm uppercase tracking-widest font-medium transition-colors hover:bg-black hover:text-white"
            >
              Patient Login
            </Link>
            <Link
              to="/book-appointment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-none bg-black text-white text-sm uppercase tracking-widest font-medium shadow-lg transition-transform active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}