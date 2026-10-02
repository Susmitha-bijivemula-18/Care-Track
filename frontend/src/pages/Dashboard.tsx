import { Search, Calendar, Users, FileText } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Good morning, Susmitha</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your care today.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Active Appointment Card Placeholder */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Active Appointment</h2>
            <span className="text-sm px-2 py-1 bg-muted rounded-full font-medium">Today, 10:30 AM</span>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <p className="font-medium text-lg">Dr. Ananya Rao</p>
              <p className="text-muted-foreground text-sm">Cardiologist</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Currently Consulting</span>
                  <span className="font-medium">A-21</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Patients Ahead</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Estimated Wait</span>
                  <span className="font-medium">32 min</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-48 aspect-square rounded-lg bg-primary text-primary-foreground flex flex-col items-center justify-center p-4 text-center">
              <span className="text-sm font-medium opacity-80 uppercase tracking-wider mb-2">Your Token</span>
              <span className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">A-27</span>
            </div>
          </div>
        </div>

        {/* Quick Access Features */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-subtle">
          <h2 className="font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:bg-muted transition-colors text-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <span className="font-medium text-xs">Find Doctor</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:bg-muted transition-colors text-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-medium text-xs">Appointments</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:bg-muted transition-colors text-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-medium text-xs">Queue</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:bg-muted transition-colors text-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-xs">Records</span>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* Recent Medical Records */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-subtle flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Recent Medical Records</h2>
            <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Blood Test Report', doctor: 'Dr. Ramesh Kumar', date: 'Oct 01, 2026', type: 'PDF' },
              { title: 'Cardiology Consultation', doctor: 'Dr. Ananya Rao', date: 'Sep 15, 2026', type: 'Note' },
              { title: 'X-Ray Chest PA View', doctor: 'Dr. Sarah Smith', date: 'Aug 22, 2026', type: 'Image' },
            ].map((record, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground group-hover:text-blue-500 transition-colors">{record.title}</h4>
                    <p className="text-xs text-muted-foreground">{record.doctor} • {record.date}</p>
                  </div>
                </div>
                <div className="text-xs font-semibold px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  {record.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-subtle flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">Upcoming Appointments</h2>
            <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {[
              { title: 'General Checkup', doctor: 'Dr. Amit Patel', date: 'Oct 12, 2026', time: '09:00 AM', dept: 'General Medicine' },
              { title: 'Dermatology Follow-up', doctor: 'Dr. Sneha Reddy', date: 'Oct 28, 2026', time: '04:15 PM', dept: 'Dermatology' },
            ].map((appt, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex flex-col items-center justify-center border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Oct</span>
                  <span className="text-lg font-black leading-none">{appt.date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{appt.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{appt.doctor} • {appt.dept}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-foreground bg-muted px-2 py-1 rounded-md">{appt.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
