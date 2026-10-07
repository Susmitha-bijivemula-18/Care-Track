import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yProduct = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={containerRef} className="relative min-h-[88vh] md:min-h-[92vh] pt-32 pb-16 md:pt-40 md:pb-32 flex items-center bg-background transition-colors duration-500 overflow-hidden">
      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-[42%_58%] gap-12 lg:gap-24 items-center">
          
          {/* LEFT: Copy (42%) */}
          <motion.div style={{ y: yText }} className="flex flex-col items-start relative z-10 h-full justify-center py-4 lg:py-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[1px] h-4 bg-foreground/30"></div>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-500">
                Smart Appointment Care
              </span>
            </div>
            
            <h1 className="text-[3.25rem] sm:text-6xl md:text-[5.5rem] font-medium tracking-tight text-foreground leading-[1.05] mb-8 transition-colors duration-500">
              LESS<br />WAITING.<br />
              <span className="text-muted-foreground">BETTER<br />CARE.</span>
            </h1>

            <p className="text-[14px] text-muted-foreground max-w-[320px] leading-relaxed mb-10 transition-colors duration-500">
              Know when it's your turn. CareTrack keeps you updated in real time, so you spend less time waiting and more time getting the care you need.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 w-full sm:w-auto">
              <Link to="/book-appointment" className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.1em] font-medium rounded-sm hover:opacity-90 transition-all duration-300">
                Book an appointment
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              
              <Link to="#how-it-works" className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] font-medium text-foreground hover:text-muted-foreground transition-colors">
                See how it works
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            </div>
            
            <div className="w-full max-w-[360px] h-[1px] bg-border mb-6 transition-colors duration-500" />
            <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium transition-colors duration-500">
              <span>Real-Time Updates</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Smart Queue</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Consultation History</span>
            </div>
          </motion.div>
          
          {/* RIGHT: Dynamic Journey Sequence (58%) */}
          <motion.div 
            style={{ y: yProduct }}
            className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center lg:pl-16 mb-12 lg:mb-0"
          >
            <QueueJourney />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

const STAGES = [
  { id: 'discover', duration: 4000 },
  { id: 'booked', duration: 3000 },
  { id: 'waiting', duration: 4000 },
  { id: 'notified', duration: 5000 },
  { id: 'consult', duration: 3000 },
  { id: 'history', duration: 3000 }
];

function QueueJourney() {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    // Dynamic duration based on current stage
    const timer = setTimeout(() => {
      setStageIdx(prev => (prev + 1) % STAGES.length);
    }, STAGES[stageIdx].duration); 
    
    return () => clearTimeout(timer);
  }, [stageIdx]);

  const stage = STAGES[stageIdx].id;

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center py-12 border border-border bg-card shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-500">
      
      {/* Top Context - static frame */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start pt-8 px-8 lg:px-12 z-20">
        <div className="flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.25em] text-foreground font-medium mb-1.5 transition-colors duration-500">CareTrack</div>
          <div className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium transition-colors duration-500">Live Journey</div>
        </div>
      </div>

      {/* Center Dynamic Content */}
      <div className="w-full flex-1 relative flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STATE 0: Discover / Find Doctor */}
          {stage === 'discover' && (
            <motion.div 
              key="discover"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full px-6 lg:px-12"
            >
              <div className="w-full max-w-sm flex flex-col gap-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center font-medium">Select Specialist</div>
                
                {/* Doctor 1 (Target - currently booking) */}
                <div className="relative overflow-hidden flex items-center gap-4 p-4 border border-foreground bg-foreground/[0.02] transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-card">
                    <img src="/doctor_profile.jpg" alt="Dr. Ananya Rao" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-foreground mb-0.5">Dr. Ananya Rao</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-widest">General Consultation</div>
                  </div>
                  <div className="text-[9px] font-medium uppercase tracking-widest text-foreground flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
                    Booking
                  </div>
                  {/* Progress bar line indicating the "booking" action */}
                  <motion.div 
                    initial={{ scaleX: 0 }} 
                    animate={{ scaleX: 1 }} 
                    transition={{ duration: 3.5, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-[2px] bg-foreground origin-left w-full"
                  />
                </div>

                {/* Doctor 2 (Inactive) */}
                <div className="flex items-center gap-4 p-4 border border-border opacity-40">
                  <div className="w-12 h-12 rounded-full bg-secondary border border-border"></div>
                  <div className="flex-1 text-left hidden sm:block">
                    <div className="text-sm font-medium text-foreground mb-0.5">Dr. Sarah Chen</div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-widest">Neurology</div>
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground hidden sm:block">Available</div>
                </div>

              </div>
            </motion.div>
          )}

          {/* STATE 1: Booked */}
          {stage === 'booked' && (
            <motion.div 
              key="booked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center w-full px-6"
            >
              <div className="w-16 h-16 border border-border flex items-center justify-center mb-8 relative">
                <Check className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                <div className="absolute inset-0 border border-foreground/20 animate-ping opacity-20" />
              </div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-6">Appointment Confirmed</div>
              
              <div className="text-3xl sm:text-4xl font-light tracking-tight text-foreground mb-2">Dr. Ananya Rao</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-8">General Consultation</div>

              <div className="text-sm font-medium tracking-widest text-foreground border-t border-border pt-8 w-48 mx-auto">
                10:30 AM
              </div>
            </motion.div>
          )}

          {/* STATE 2: Waiting */}
          {stage === 'waiting' && (
            <motion.div 
              key="waiting"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center w-full px-6"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-4 sm:mb-8 mt-6 sm:mt-0">Estimated Wait</div>
              <div className="text-[8rem] sm:text-[12rem] lg:text-[14rem] leading-[0.8] font-light tracking-tighter text-foreground -ml-4">
                15
              </div>
              <div className="text-xl sm:text-3xl font-light tracking-widest text-border mt-4 sm:mt-6 mb-8 sm:mb-12">
                MINUTES
              </div>

              <div className="flex flex-col items-center border-t border-border pt-10 w-full max-w-[320px]">
                <div className="text-[10px] uppercase tracking-[0.2em] text-foreground font-medium mb-1.5">Your Position: #04</div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground mb-6">03 Patients Ahead</div>
                
                <div className="flex items-center text-[10px] font-medium text-border tracking-[0.2em] w-full">
                  <span className="text-foreground">01</span>
                  <div className="flex-1 h-[1px] bg-border mx-3 sm:mx-4" />
                  <span className="text-foreground">02</span>
                  <div className="flex-1 h-[1px] bg-border mx-3 sm:mx-4" />
                  <span className="text-foreground">03</span>
                  <div className="flex-1 h-[1px] bg-border mx-3 sm:mx-4" />
                  <span className="text-foreground border border-foreground px-2 py-1">04</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE 3: Notified */}
          {stage === 'notified' && (
            <motion.div 
              key="notified"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center w-full px-6"
            >
              <div className="w-full max-w-[420px] bg-[#0A0A0A] dark:bg-[#17181A] text-white p-10 sm:p-12 shadow-2xl dark:shadow-none dark:border dark:border-[#28292C] transition-colors duration-500">
                <div className="flex gap-4 items-center justify-center mb-8">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <div className="text-[9px] uppercase tracking-[0.25em] font-medium text-gray-400">Your turn is approaching</div>
                </div>
                
                <div className="text-xl sm:text-2xl font-light tracking-wide text-white leading-relaxed mb-6 sm:mb-10">
                  Please arrive at the consultation area in approx. 10 minutes.
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8 text-left">
                  <div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Current Position</div>
                    <div className="text-xl sm:text-2xl font-light tracking-tight text-white flex items-center gap-3">
                      <span className="text-gray-500 line-through text-base sm:text-lg">#04</span>
                      <ArrowRight className="w-3 h-3 text-gray-500" />
                      <span>#03</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-gray-500 mb-2">Estimated Wait</div>
                    <div className="text-xl sm:text-2xl font-light tracking-tight text-white">10 MIN</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE 4: Consultation */}
          {stage === 'consult' && (
            <motion.div 
              key="consulting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center w-full px-6"
            >
              <div className="relative mb-12">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border border-border relative z-10 bg-card">
                  <img src="/doctor_profile.jpg" alt="Dr. Ananya Rao" className="w-full h-full object-cover" />
                </div>
                {/* Minimal B&W radar rings */}
                <div className="absolute inset-0 rounded-full border border-border animate-[ping_3s_linear_infinite]" />
                <div className="absolute inset-0 rounded-full border border-border animate-[ping_3s_linear_infinite] delay-1000" />
              </div>
              
              <div className="inline-flex items-center gap-3 border border-border bg-background px-5 py-2.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
                <div className="text-[9px] uppercase tracking-[0.25em] font-medium text-foreground">Consultation Active</div>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground mb-3">Dr. Ananya Rao</h3>
              <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Room 04 · General Consultation</p>
            </motion.div>
          )}

          {/* STATE 5: History */}
          {stage === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center w-full px-6"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-10 font-medium">Consultation Completed</div>
              
              <div className="w-16 h-16 rounded-full overflow-hidden border border-border mb-6">
                <img src="/doctor_profile.jpg" alt="Dr. Ananya Rao" className="w-full h-full object-cover" />
              </div>

              <div className="text-2xl sm:text-3xl font-light tracking-tight text-foreground mb-2">Dr. Ananya Rao</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-12">General Consultation · Today</div>
              
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground hover:text-muted-foreground transition-colors cursor-pointer border-b border-border pb-1.5 group">
                View consultation history
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Bottom Sequence Indicator */}
      <div className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-10 px-4 sm:px-8 lg:px-12 w-full z-20">
         <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2 text-[7px] sm:text-[9px] font-medium text-muted-foreground tracking-[0.1em] sm:tracking-[0.2em] w-full">
            {/* FIND is active for idx 0, completed for > 0 */}
            <span className={stageIdx === 0 ? "text-foreground" : stageIdx > 0 ? "opacity-50" : ""}>FIND</span>
            
            <div className="flex-1 h-[1px] bg-border mx-2 sm:mx-4 relative overflow-hidden">
               <motion.div className="absolute top-0 left-0 h-full bg-foreground/20" initial={false} animate={{ width: stageIdx >= 1 ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>

            {/* BOOKED is active for idx 1, completed for > 1 */}
            <span className={stageIdx === 1 ? "text-foreground" : stageIdx > 1 ? "opacity-50" : ""}>BOOKED</span>
            
            <div className="flex-1 h-[1px] bg-border mx-2 sm:mx-4 relative overflow-hidden">
               <motion.div className="absolute top-0 left-0 h-full bg-foreground/20" initial={false} animate={{ width: stageIdx >= 2 ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
            
            <span className={stageIdx === 2 ? "text-foreground" : stageIdx > 2 ? "opacity-50" : ""}>WAITING</span>
            
            <div className="flex-1 h-[1px] bg-border mx-2 sm:mx-4 relative overflow-hidden">
               <motion.div className="absolute top-0 left-0 h-full bg-foreground/20" initial={false} animate={{ width: stageIdx >= 3 ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
            
            <span className={stageIdx === 3 ? "text-foreground" : stageIdx > 3 ? "opacity-50" : ""}>NOTIFIED</span>
            
            <div className="flex-1 h-[1px] bg-border mx-2 sm:mx-4 relative overflow-hidden">
               <motion.div className="absolute top-0 left-0 h-full bg-foreground/20" initial={false} animate={{ width: stageIdx >= 4 ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
            
            {/* CONSULT handles both active consult (4) and history (5) */}
            <span className={stageIdx >= 4 ? "text-foreground" : ""}>CONSULT</span>
         </div>
      </div>
    </div>
  )
}