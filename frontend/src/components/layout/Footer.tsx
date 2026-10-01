import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-tighter mb-4 hover:opacity-80 transition-opacity">
              <img src="/logo.jpg" alt="CareTrack" className="w-8 h-8 rounded-lg dark:invert" />
              CareTrack
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
              Compassionate healthcare, connected through thoughtful technology. Your journey to better health starts here.
            </p>
            <div className="flex items-center gap-5 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Website"><Globe className="w-4 h-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Email"><Mail className="w-4 h-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Phone"><Phone className="w-4 h-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors" aria-label="Location"><MapPin className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h3 className="font-semibold text-foreground tracking-tight mb-5">CareTrack</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#specialities" className="hover:text-foreground transition-colors">Specialities</a></li>
              <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#experience" className="hover:text-foreground transition-colors">Testimonials</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="font-semibold text-foreground tracking-tight mb-5">Patient Experience</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground transition-colors">Patient Login</Link></li>
              <li><Link to="/login" className="hover:text-foreground transition-colors">Book Appointment</Link></li>
              <li><a href="#queue" className="hover:text-foreground transition-colors">Live Queue Tracking</a></li>
              <li><a href="#records" className="hover:text-foreground transition-colors">Medical Records</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-semibold text-foreground tracking-tight mb-5">Care Speciality Hospital</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Find a Doctor</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Departments</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Contact Information</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Emergency Services</span></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareTrack. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Cookie Settings</span>
          </div>
        </div>
        
        <div className="mt-8 text-center md:text-left">
          <p className="text-xs text-muted-foreground/40 max-w-2xl">
            Note: Care Speciality Hospital and associated statistics, reviews, and images are fictional demonstration content created for prototype purposes. Do not submit real medical data.
          </p>
        </div>
      </div>
    </footer>
  );
}