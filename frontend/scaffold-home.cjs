const fs = require('fs');
const path = require('path');

const files = {
  'src/components/layout/Navbar.tsx': `import { useState, useEffect } from 'react';
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tighter">CareTrack</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="#specialities" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Specialities</Link>
            <Link to="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <Link to="#experience" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Patient Experience</Link>
          </nav>
        </div>
        
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
}`,

  'src/components/layout/Footer.tsx': `import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter mb-2">CareTrack</h2>
            <p className="text-muted-foreground text-sm">Your Health. One Clearer Journey.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">CareTrack</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="#about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="#specialities" className="hover:text-foreground transition-colors">Specialities</Link></li>
              <li><Link to="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Patient</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Login</Link></li>
              <li><Link to="/login" className="hover:text-foreground transition-colors">Book Appointment</Link></li>
              <li><Link to="#experience" className="hover:text-foreground transition-colors">Patient Experience</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hospital</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Care Speciality Hospital</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Specialities</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Contact</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 CareTrack. Prototype healthcare platform.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-foreground">Privacy</span>
            <span className="cursor-pointer hover:text-foreground">Terms</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground/50 mt-4 text-center md:text-left">
          Note: Care Speciality Hospital and associated statistics/testimonials are fictional demo content.
        </p>
      </div>
    </footer>
  );
}`,

  'src/components/home/Hero.tsx': `import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            Welcome to Care Speciality Hospital
          </h1>
          <h3 className="text-xl md:text-2xl font-medium text-muted-foreground mb-6">
            Your Health. One Clearer Journey.
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
            Compassionate healthcare, connected through thoughtful technology. Discover specialists, manage appointments, track your queue, and keep your healthcare journey organized with CareTrack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 transition-opacity text-center">
              Book an Appointment
            </Link>
            <Link to="/login" className="bg-card border border-border text-foreground px-8 py-4 rounded-xl text-base font-medium hover:bg-muted transition-colors text-center">
              Patient Login
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] rounded-3xl bg-muted border border-border overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-80 bg-card/90 backdrop-blur-xl border border-border p-6 rounded-2xl shadow-2xl"
          >
            <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">Today's Appointment</div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-semibold text-lg">Dr. Ananya Rao</div>
                <div className="text-sm text-muted-foreground">Cardiology</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">10:30 AM</div>
              </div>
            </div>
            <div className="pt-4 border-t border-border flex justify-between items-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Token</div>
                <div className="font-bold text-xl">A-27</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Estimated wait</div>
                <div className="font-medium">18 min</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}`,

  'src/components/home/HospitalStats.tsx': `export function HospitalStats() {
  const stats = [
    { value: "15K+", label: "Patients Served" },
    { value: "40+", label: "Specialists" },
    { value: "12+", label: "Medical Specialities" },
    { value: "10+", label: "Years of Care" },
    { value: "4.8/5", label: "Patient Experience" },
  ];

  return (
    <section className="py-12 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'src/pages/Home.tsx': `import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { HospitalStats } from '../components/home/HospitalStats';

export function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HospitalStats />
        {/* Placeholder for remaining sections to be generated next */}
        <div className="py-32 text-center text-muted-foreground border-b border-border">
          <p>More sections (About, Specialities, Queue Showcase, etc.) going here soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}`,

  'src/pages/Login.tsx': `import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Patient Login
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to book your appointment and manage your healthcare journey.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-card sm:rounded-2xl sm:px-10 border border-border">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  placeholder="susmitha@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-foreground hover:text-muted-foreground transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl border border-transparent bg-primary py-3 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              ← Back to CareTrack Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Scaffold complete.');
