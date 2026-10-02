import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-background/80 backdrop-blur-md border-border py-3" : "bg-background border-transparent py-5"
    )}>
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between relative">
        <div className="flex items-center ml-4 lg:ml-8">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            <img src="/logo.jpg" alt="CareTrack" className="w-8 h-8 rounded-lg dark:invert" />
            CareTrack
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <a href="#about" className="relative px-2 py-1 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group">
            About
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
          </a>
          <a href="#specialities" className="relative px-2 py-1 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group">
            Specialities
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
          </a>
          <a href="#how-it-works" className="relative px-2 py-1 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group">
            How It Works
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
          </a>
          <a href="#experience" className="relative px-2 py-1 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group">
            Patient Experience
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full"></span>
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/login" className="text-sm font-medium hover:text-muted-foreground transition-colors">Patient Login</Link>
          <Link to="/login" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Book Appointment
          </Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}