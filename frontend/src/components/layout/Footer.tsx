import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[80rem] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* CTA SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-20 border-b border-border mb-16">
          <div className="flex flex-col max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-foreground leading-[1.1] mb-4">
              Ready for a better care experience?
            </h2>
            <p className="text-[14px] text-muted-foreground leading-relaxed">
              Book your appointment and stay informed every step of the way.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-foreground text-background px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
            >
              Book an Appointment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto flex justify-center text-[10px] font-bold tracking-[0.2em] uppercase text-foreground hover:text-muted-foreground transition-colors items-center gap-2 group"
            >
              Patient Login
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* MAIN LINKS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col items-start pr-4 lg:pr-8">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-foreground mb-3 hover:opacity-80 transition-opacity">
              CareTrack.
            </Link>
            <div className="text-[9px] font-bold tracking-[0.25em] uppercase text-foreground mb-4">
              Less Waiting. Better Care.
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px] mb-8">
              Connected healthcare designed around your time, your care, and your journey.
            </p>
            {/* Minimal Social Icons */}
            <div className="flex items-center gap-5 text-[10px] font-bold tracking-widest text-foreground/40">
              <a href="#" className="hover:text-foreground transition-colors uppercase">X</a>
              <a href="#" className="hover:text-foreground transition-colors uppercase">IN</a>
              <a href="#" className="hover:text-foreground transition-colors uppercase">IG</a>
            </div>
          </div>
          
          {/* LINKS COLUMNS */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-foreground mb-6">CareTrack</h3>
            <ul className="space-y-4 text-[13px] text-muted-foreground">
              <li><Link to="/" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">About Us</span></Link></li>
              <li><Link to="/" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">Specialties</span></Link></li>
              <li><Link to="/" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">How it Works</span></Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-8">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-foreground mb-6">Patient Experience</h3>
            <ul className="space-y-4 text-[13px] text-muted-foreground">
              <li><Link to="/login" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">Patient Login</span></Link></li>
              <li><Link to="/login" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">Book Appointment</span></Link></li>
              <li><Link to="/" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">Live Queue</span></Link></li>
              <li><Link to="/" className="group inline-flex items-center hover:text-foreground transition-colors"><span className="group-hover:translate-x-1 transition-transform">Connected History</span></Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-10">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-foreground mb-6">Care Specialty Hospital</h3>
            <ul className="space-y-4 text-[13px] text-muted-foreground">
              <li><span className="group inline-flex items-center hover:text-foreground transition-colors cursor-pointer"><span className="group-hover:translate-x-1 transition-transform">Find a Doctor</span></span></li>
              <li><span className="group inline-flex items-center hover:text-foreground transition-colors cursor-pointer"><span className="group-hover:translate-x-1 transition-transform">Departments</span></span></li>
              <li><span className="group inline-flex items-center hover:text-foreground transition-colors cursor-pointer"><span className="group-hover:translate-x-1 transition-transform">Contact Information</span></span></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-border">
            <p className="text-[11px] text-muted-foreground">
              © 2026 CareTrack. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-[11px] text-muted-foreground font-medium">
              <span className="cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span>
              <span className="cursor-pointer hover:text-foreground transition-colors">Terms of Service</span>
              <span className="cursor-pointer hover:text-foreground transition-colors">Cookie Settings</span>
            </div>
          </div>
          
          <p className="text-[10px] text-muted-foreground/40 leading-relaxed max-w-4xl">
            Note: Care Speciality Hospital and associated statistics, reviews, and images are fictional demonstration content created for prototype purposes. Do not submit real medical data.
          </p>
        </div>

      </div>
    </footer>
  );
}