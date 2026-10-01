const fs = require('fs');
const path = require('path');

const files = {
  'src/components/home/AboutHospital.tsx': `export function AboutHospital() {
  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6">
            Care that begins with listening.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Care Speciality Hospital, we believe healthcare should feel personal, coordinated, and accessible. Our approach combines experienced specialists with thoughtful technology to create a smoother experience for every patient.
          </p>
          <div className="mt-8 inline-block px-3 py-1 bg-muted rounded-full text-xs font-semibold tracking-widest uppercase">
            Care Speciality Hospital
          </div>
        </div>
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-border">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-90" />
        </div>
      </div>
    </section>
  );
}`,

  'src/components/home/Specialities.tsx': `import { Heart, Activity, Brain, Stethoscope, Baby, Scissors, Ear, Activity as Gynecology } from 'lucide-react';
import { motion } from 'framer-motion';

export function Specialities() {
  const specialities = [
    { icon: Heart, name: 'Cardiology', desc: 'Specialized care focused on heart health and cardiovascular conditions.' },
    { icon: Activity, name: 'Dermatology', desc: 'Expert diagnosis and treatment of skin, hair, and nail conditions.' },
    { icon: Stethoscope, name: 'General Medicine', desc: 'Comprehensive primary care and preventive health services.' },
    { icon: Scissors, name: 'Orthopedics', desc: 'Advanced treatment for bone, joint, and muscle conditions.' },
    { icon: Baby, name: 'Pediatrics', desc: 'Compassionate medical care for infants, children, and adolescents.' },
    { icon: Brain, name: 'Neurology', desc: 'Expertise in diagnosing and treating nervous system disorders.' },
    { icon: Gynecology, name: 'Gynecology', desc: 'Comprehensive women\\'s health and reproductive care.' },
    { icon: Ear, name: 'ENT', desc: 'Specialized treatment for ear, nose, and throat conditions.' },
  ];

  return (
    <section id="specialities" className="py-24 bg-card border-y border-border px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Expertise when you need it.</h2>
          <p className="text-lg text-muted-foreground">Connect with specialists across a range of healthcare disciplines.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialities.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-2xl border border-border bg-background hover:shadow-card transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{spec.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{spec.desc}</p>
                <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <span className="text-foreground">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`,

  'src/components/home/CareTrackIntro.tsx': `export function CareTrackIntro() {
  const steps = [
    { num: '01', title: 'FIND', desc: 'Find a doctor based on specialty, availability, and preferred schedule.' },
    { num: '02', title: 'BOOK', desc: 'Choose your doctor, date, and available appointment time.' },
    { num: '03', title: 'TRACK', desc: 'Receive your token and follow your position in the queue.' },
    { num: '04', title: 'CONTINUE', desc: 'Keep your consultation history and healthcare documents organized for future visits.' },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Healthcare that stays with you.</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          CareTrack brings your appointments, queue updates, medical records, and healthcare history together in one simple patient experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-8 left-12 right-12 h-px bg-border -z-10" />
        {steps.map((step, i) => (
          <div key={i} className="bg-background pt-4">
            <div className="text-sm font-bold text-muted-foreground mb-4">— {step.num}</div>
            <h3 className="text-xl font-semibold mb-3 tracking-tight">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}`,

  'src/components/home/QueueShowcase.tsx': `import { motion } from 'framer-motion';

export function QueueShowcase() {
  return (
    <section className="py-24 bg-foreground text-background px-4 md:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 text-background">Know when it's your turn.</h2>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            No more guessing how long you will wait. CareTrack keeps you informed as your appointment moves through the queue in real-time.
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md bg-background text-foreground rounded-2xl p-8 shadow-2xl"
          >
            <div className="border-b border-border pb-6 mb-6">
              <div className="font-semibold text-xl">DR. ANANYA RAO</div>
              <div className="text-muted-foreground">Cardiology</div>
            </div>

            <div className="mb-8">
              <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Your Token</div>
              <div className="text-6xl font-black tracking-tighter">A-27</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Current</div>
                <div className="font-semibold text-xl">A-23</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Ahead</div>
                <div className="font-semibold text-xl">3</div>
              </div>
              <div className="col-span-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Estimated Wait</div>
                <div className="font-semibold text-xl text-foreground">18 min</div>
              </div>
            </div>

            <div className="space-y-3">
              {['A-23', 'A-24', 'A-25', 'A-26'].map((token, i) => (
                <div key={token} className="flex items-center gap-4 text-muted-foreground opacity-50">
                  <span className="w-12 font-medium">{token}</span>
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
              ))}
              <div className="flex items-center gap-4 font-semibold">
                <span className="w-12">A-27</span>
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span className="text-sm">YOU</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}`,

  'src/components/home/MedicalRecordsShowcase.tsx': `export function MedicalRecordsShowcase() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative h-[500px] bg-background rounded-2xl border border-border p-6 shadow-subtle overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
          
          <div className="space-y-6 pt-12">
            {[
              { date: '08 OCT 2026', title: 'Cardiology Consultation', doc: 'Dr. Ananya Rao', files: 2 },
              { date: '21 AUG 2026', title: 'Blood Test', doc: 'Laboratory', files: 1 },
              { date: '12 JUN 2026', title: 'General Consultation', doc: 'Dr. Rahul Mehta', files: 1 },
            ].map((record, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-card">
                <div className="text-xs font-bold tracking-widest text-muted-foreground mb-3">{record.date}</div>
                <div className="font-semibold text-lg">{record.title}</div>
                <div className="text-sm text-muted-foreground mb-4">{record.doc}</div>
                <div className="flex justify-between items-center text-sm pt-4 border-t border-border">
                  <span>{record.files} document{record.files > 1 ? 's' : ''}</span>
                  <span className="font-medium hover:text-muted-foreground cursor-pointer transition-colors">View record →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Your healthcare history, in one place.</h2>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Keep your prescriptions, lab reports, and consultation records securely organized. CareTrack ensures your medical history is always accessible for your next visit.
          </p>
        </div>
      </div>
    </section>
  );
}`,

  'src/components/home/Testimonials.tsx': `export function Testimonials() {
  const reviews = [
    "I could see my queue position without constantly checking at the reception.",
    "My appointments and previous documents are much easier to keep track of.",
    "The entire appointment experience feels much more organized."
  ];

  return (
    <section id="experience" className="py-24 bg-background px-4 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Designed around the patient.</h2>
          <div className="inline-flex items-center gap-2 mt-4">
            <span className="text-2xl font-bold">4.8/5</span>
            <span className="text-foreground text-xl tracking-widest">★★★★★</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Prototype / demo rating</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((text, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border border-border">
              <p className="text-lg font-medium leading-relaxed mb-6">"{text}"</p>
              <div className="w-10 h-1 bg-foreground/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'src/components/home/FinalCTA.tsx': `import { Link } from 'react-router-dom';

export function FinalCTA() {
  return (
    <section className="py-32 px-4 md:px-8 bg-foreground text-background text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Your Health. One Clearer Journey.</h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-12">
          Start managing your healthcare experience with CareTrack.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="bg-background text-foreground px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 transition-opacity">
            Book an Appointment
          </Link>
          <Link to="/login" className="bg-transparent border border-background text-background px-8 py-4 rounded-xl text-base font-medium hover:bg-background/10 transition-colors">
            Patient Login
          </Link>
        </div>
      </div>
    </section>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Scaffold 2 complete.');
