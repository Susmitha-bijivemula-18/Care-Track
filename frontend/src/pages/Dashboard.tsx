import { Search, Calendar, Users, FileText, ArrowUpRight, Activity } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Good morning, Susmitha</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your care today.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
             <Activity className="w-4 h-4 text-primary" />
             <span>Status: Healthy</span>
           </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Active Appointment Card Placeholder */}
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-8 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none">
            <Activity className="w-48 h-48" />
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Appointment
            </h2>
            <span className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full font-medium tracking-wide uppercase">Today, 10:30 AM</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
            <div className="flex-1 space-y-6">
              <div>
                <p className="font-semibold text-2xl text-foreground">Dr. Ananya Rao</p>
                <p className="text-muted-foreground font-medium">Cardiology</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Currently Serving</span>
                  <p className="font-medium text-lg">A-21</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Patients Ahead</span>
                  <p className="font-medium text-lg">5</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-sm text-muted-foreground">Estimated Wait</span>
                  <p className="font-medium text-lg text-foreground">~32 min</p>
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-48 aspect-square rounded-2xl bg-primary text-primary-foreground flex flex-col items-center justify-center p-6 text-center shadow-lg transform transition-transform group-hover:scale-105">
              <span className="text-xs font-semibold opacity-70 uppercase tracking-widest mb-2">Your Token</span>
              <span className="text-6xl font-bold tracking-tighter">A-27</span>
            </div>
          </div>
        </div>

        {/* Quick Access Features */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <h2 className="font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground shadow-sm group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-foreground">Find Doctor</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground shadow-sm group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-foreground">Book Appt</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground shadow-sm group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-foreground">Live Queue</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-all text-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-foreground shadow-sm group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm text-foreground">Records</span>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* Recent Medical Records */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Recent Records</h2>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors group">
              View all
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { title: 'Blood Test Report', doctor: 'Dr. Ramesh Kumar', date: 'Oct 01, 2026', type: 'PDF' },
              { title: 'Cardiology Consultation', doctor: 'Dr. Ananya Rao', date: 'Sep 15, 2026', type: 'Note' },
              { title: 'X-Ray Chest PA View', doctor: 'Dr. Sarah Smith', date: 'Aug 22, 2026', type: 'Image' },
            ].map((record, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-border bg-transparent hover:bg-secondary/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center group-hover:bg-background group-hover:shadow-sm transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">{record.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{record.doctor} • {record.date}</p>
                  </div>
                </div>
                <div className="text-[10px] font-semibold px-2 py-1 bg-secondary rounded uppercase tracking-wider text-secondary-foreground">
                  {record.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Upcoming Visits</h2>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors group">
              View all
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { title: 'General Checkup', doctor: 'Dr. Amit Patel', date: 'Oct 12, 2026', time: '09:00 AM', dept: 'General Medicine' },
              { title: 'Dermatology Follow-up', doctor: 'Dr. Sneha Reddy', date: 'Oct 28, 2026', time: '04:15 PM', dept: 'Dermatology' },
            ].map((appt, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group">
                <div className="w-14 h-14 rounded-xl bg-secondary flex flex-col items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Oct</span>
                  <span className="text-xl font-bold leading-none mt-0.5">{appt.date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{appt.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{appt.doctor} • {appt.dept}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-foreground bg-secondary px-2.5 py-1 rounded-md">{appt.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
