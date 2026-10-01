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
              <span className="text-5xl font-bold tracking-tighter">A-27</span>
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
    </div>
  );
}
