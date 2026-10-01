import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { HospitalStats } from '../components/home/HospitalStats';
import { AboutHospital } from '../components/home/AboutHospital';
import { Specialities } from '../components/home/Specialities';
import { CareTrackIntro } from '../components/home/CareTrackIntro';
import { QueueShowcase } from '../components/home/QueueShowcase';
import { MedicalRecordsShowcase } from '../components/home/MedicalRecordsShowcase';
import { Testimonials } from '../components/home/Testimonials';
import { FinalCTA } from '../components/home/FinalCTA';

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <HospitalStats />
        <AboutHospital />
        <Specialities />
        <CareTrackIntro />
        <QueueShowcase />
        <MedicalRecordsShowcase />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}