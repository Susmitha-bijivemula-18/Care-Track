import { motion } from 'framer-motion';
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
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
}