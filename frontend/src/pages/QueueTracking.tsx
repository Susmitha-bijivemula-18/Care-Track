import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, User, ChevronRight, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QueueTracking() {
  const navigate = useNavigate();

  // Mock data to demonstrate the queue UI
  const currentToken = 'A-23';
  const userToken = 'A-27';
  const doctorName = 'Dr. Ananya Rao';
  const specialty = 'Cardiology';
  const estimatedWait = 18; // minutes
  const patientsAhead = 3;

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/patient/dashboard')}
          className="p-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-heading font-semibold tracking-tight text-foreground">
            Live Queue Tracking
          </h1>
          <p className="text-[13px] text-muted-foreground mt-1 font-medium">
            Stay updated on your appointment status
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Queue Card ───────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
          >
            {/* Top Section */}
            <div className="p-6 border-b border-border/50">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-secondary border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&q=80" 
                      alt="Doctor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-foreground">{doctorName}</h2>
                    <p className="text-[12px] font-semibold tracking-wider uppercase text-muted-foreground mt-0.5">{specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand/5 border border-brand/20">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-brand">Live Queue</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Queue Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 p-6 gap-6 md:gap-4 bg-secondary/20">
              <div className="flex flex-col border-r border-border/50">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Current Token</span>
                <span className="text-3xl font-heading font-semibold text-foreground">{currentToken}</span>
              </div>
              
              <div className="flex flex-col md:border-r border-border/50">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Your Token</span>
                <span className="text-3xl font-heading font-semibold text-brand">{userToken}</span>
              </div>
              
              <div className="flex flex-col border-r border-border/50">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Patients Ahead</span>
                <span className="text-3xl font-heading font-semibold text-foreground">{patientsAhead}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Est. Wait</span>
                <span className="text-3xl font-heading font-semibold text-foreground">
                  {estimatedWait} <span className="text-sm font-medium tracking-normal text-muted-foreground">min</span>
                </span>
              </div>
            </div>

            {/* Bottom Section: Progress Bar */}
            <div className="p-6 border-t border-border/50 bg-card">
              <div className="flex justify-between items-center mb-3 text-[13px] font-semibold">
                <span className="text-brand">In Progress</span>
                <span className="text-muted-foreground">You're next in ~{estimatedWait} mins</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }} />
              </div>
            </div>
          </motion.div>

          {/* ── Notification Banner ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-brand/5 border border-brand/20 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-semibold text-brand mb-1">Your turn is approaching</h3>
              <p className="text-[13px] text-foreground/80 leading-relaxed font-medium">
                Please proceed to the Cardiology waiting area. Your doctor will be ready to see you in approximately 18 minutes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Right Sidebar ─────────────────────────────────────────── */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border p-5 shadow-sm"
          >
            <h3 className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-4">Location Details</h3>
            
            <div className="flex gap-3 items-start mb-5 pb-5 border-b border-border/50">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5 text-foreground/70">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Cardiology Department</p>
                <p className="text-[13px] text-muted-foreground mt-1">Building B, 3rd Floor, Room 304</p>
              </div>
            </div>

            <button className="w-full py-3 border border-border rounded-xl text-sm font-semibold hover:bg-secondary transition-colors text-foreground">
              View Hospital Map
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-5 shadow-sm"
          >
            <h3 className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-4">Appointment Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Date</span>
                <span className="font-semibold text-foreground">Oct 12, 2026</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Time</span>
                <span className="font-semibold text-foreground">2:30 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Fee</span>
                <span className="font-semibold text-foreground">₹800</span>
              </div>
            </div>
            
            <div className="mt-5 pt-5 border-t border-border/50 text-center">
              <button className="text-[13px] font-semibold text-brand hover:underline">
                Reschedule or Cancel
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
