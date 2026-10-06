import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, CheckCircle2, Clock, Activity, Bell, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const STATES = [
  { id: 'confirmed', duration: 3000 },
  { id: 'queue', duration: 3000 },
  { id: 'approaching', duration: 4000 },
  { id: 'consultation', duration: 3000 },
  { id: 'history', duration: 3000 },
];

export function Hero() {
  const [currentStateIdx, setCurrentStateIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle auto-advance
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setTimeout(() => {
      setCurrentStateIdx((prev) => (prev + 1) % STATES.length);
    }, STATES[currentStateIdx].duration);
    
    return () => clearTimeout(timer);
  }, [currentStateIdx, isHovered]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#FAFAF9]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* LEFT: Copy */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1B3D]/60">
                Smart Appointment Care
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-[#0B1B3D] leading-[1.05]"
            >
              Less waiting.<br />
              <span className="text-gray-400">Better care.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-lg text-gray-500 max-w-md leading-relaxed"
            >
              Know when it's your turn. Get real-time appointment updates,
              arrive at the right time, and keep your consultation history connected.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0B1B3D] text-white text-[13px] uppercase tracking-[0.05em] font-medium transition-all hover:bg-black hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(11,27,61,0.2)]"
              >
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0B1B3D] border border-gray-200 text-[13px] uppercase tracking-[0.05em] font-medium transition-all hover:bg-gray-50"
              >
                See How It Works
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </Link>
            </motion.div>
          </div>
          
          {/* RIGHT: Dynamic Product Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 aspect-[4/3.5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3.5] xl:aspect-[4/3]"
          >
             <div 
               className="absolute inset-0 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
             >
                {/* Product Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2">
                     <div className="w-5 h-5 bg-[#0B1B3D] text-white flex items-center justify-center text-[9px] font-bold">CT</div>
                     <span className="text-xs font-semibold text-[#0B1B3D] tracking-tight">CareTrack</span>
                  </div>
                  {isHovered && <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium animate-pulse">Paused</span>}
                </div>
                
                {/* Dynamic Content Area */}
                <div className="flex-1 relative bg-white overflow-hidden p-6 md:p-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <ProductState key={currentStateIdx} stateId={STATES[currentStateIdx].id} />
                  </AnimatePresence>
                </div>
             </div>
             
             {/* Decorative background elements */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 to-transparent opacity-50 blur-2xl -z-10 rounded-3xl pointer-events-none" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

// Separate component for the states to keep it clean
function ProductState({ stateId }: { stateId: string }) {
  const variants = {
    initial: { opacity: 0, y: 10, filter: 'blur(2px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -10, filter: 'blur(2px)', transition: { duration: 0.3 } }
  };

  switch (stateId) {
    case 'confirmed':
      return (
        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="w-full max-w-sm flex flex-col gap-6">
           <div className="flex flex-col gap-1 text-center items-center">
             <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
               <CheckCircle2 className="w-6 h-6 text-emerald-500" />
             </div>
             <h3 className="text-lg font-semibold text-[#0B1B3D]">Appointment Confirmed</h3>
             <p className="text-sm text-gray-500">Your consultation is scheduled</p>
           </div>
           
           <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col gap-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                 <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover"/>
               </div>
               <div>
                 <h4 className="text-sm font-semibold text-[#0B1B3D]">Dr. Ananya Rao</h4>
                 <p className="text-xs text-gray-500">General Consultation</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
               <div className="flex items-center gap-1.5 text-sm text-[#0B1B3D] font-medium">
                 <Calendar className="w-4 h-4 text-gray-400" />
                 Today
               </div>
               <div className="flex items-center gap-1.5 text-sm text-[#0B1B3D] font-medium">
                 <Clock className="w-4 h-4 text-gray-400" />
                 10:30 AM
               </div>
             </div>
           </div>
        </motion.div>
      );
      
    case 'queue':
      return (
        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="w-full max-w-sm flex flex-col gap-6">
           <div className="flex items-center justify-between">
             <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400">Your Place in Line</h3>
             <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
               <span className="relative flex h-1.5 w-1.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
               </span>
               Live
             </div>
           </div>
           
           <div className="flex items-end justify-between border-b border-gray-100 pb-6">
             <div>
               <span className="text-6xl font-light text-[#0B1B3D] tracking-tighter leading-none">#04</span>
             </div>
             <div className="text-right">
               <div className="text-2xl font-medium text-[#0B1B3D]">18 min</div>
               <div className="text-xs text-gray-500 mt-1">Estimated wait</div>
             </div>
           </div>
           
           <div>
             <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
               <span>Current: #01</span>
               <span>3 patients ahead</span>
             </div>
             <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: "10%" }}
                 animate={{ width: "25%" }}
                 transition={{ duration: 2.5, ease: "easeInOut" }}
                 className="h-full bg-[#0B1B3D] rounded-full"
               />
             </div>
           </div>
        </motion.div>
      );
      
    case 'approaching':
      return (
        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="w-full max-w-sm flex flex-col gap-5">
           <div className="bg-[#0B1B3D] rounded-xl p-6 text-white shadow-lg shadow-blue-900/10 relative overflow-hidden">
             <div className="absolute -top-4 -right-4 p-4 opacity-10 pointer-events-none">
               <Bell className="w-32 h-32" />
             </div>
             
             <div className="relative z-10">
               <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 mb-4">
                 <Bell className="w-5 h-5 text-blue-300 animate-[bounce_2s_infinite]" />
               </div>
               
               <h3 className="text-lg font-semibold mb-2">Your turn is approaching</h3>
               <p className="text-sm text-blue-100/80 leading-relaxed pr-4">
                 Please arrive at the consultation area within the next 10 minutes.
               </p>
             </div>
           </div>
           
           <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
             <div className="text-3xl font-light text-[#0B1B3D] w-12">#04</div>
             <div className="h-8 w-[1px] bg-gray-200"></div>
             <div>
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Next in line for</div>
               <div className="text-sm font-semibold text-[#0B1B3D]">Dr. Ananya Rao</div>
             </div>
           </div>
        </motion.div>
      );
      
    case 'consultation':
      return (
        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="w-full max-w-sm flex flex-col items-center text-center gap-6">
           <div className="relative mt-4">
             <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-md overflow-hidden relative z-10">
               <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover"/>
             </div>
             {/* Pulse rings */}
             <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 z-0"></div>
             <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-10 delay-700 z-0"></div>
           </div>
           
           <div>
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider mb-4">
               <Activity className="w-3.5 h-3.5" />
               Consultation in Progress
             </div>
             <h3 className="text-xl font-semibold text-[#0B1B3D]">Dr. Ananya Rao</h3>
             <p className="text-sm text-gray-500">General Consultation</p>
           </div>
           
           <div className="w-full border-t border-gray-100 pt-5 mt-2">
             <div className="flex items-center justify-center gap-2 text-sm">
               <span className="text-gray-500">Started at</span>
               <span className="font-semibold text-[#0B1B3D] px-2 py-1 bg-gray-50 rounded">10:30 AM</span>
             </div>
           </div>
        </motion.div>
      );
      
    case 'history':
      return (
        <motion.div variants={variants} initial="initial" animate="animate" exit="exit" className="w-full max-w-sm flex flex-col gap-4">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">Previous Consultation</h3>
           
           <div className="group border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-white">
             <div className="flex items-start justify-between mb-5">
               <div className="flex flex-col gap-1">
                 <span className="text-[13px] font-semibold text-[#0B1B3D]">06 Oct 2026</span>
                 <span className="text-sm text-gray-500">General Consultation</span>
               </div>
               <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                 <FileText className="w-4 h-4" />
               </div>
             </div>
             
             <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
               <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                 <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop" alt="Dr" className="w-full h-full object-cover"/>
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-semibold text-[#0B1B3D]">Dr. Ananya Rao</h4>
               </div>
             </div>
             
             <div className="mt-6 flex items-center text-[12px] font-bold uppercase tracking-wider text-blue-600 group-hover:text-blue-700">
               View prescription & notes
               <ChevronRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
             </div>
           </div>
        </motion.div>
      );
      
    default:
      return null;
  }
}