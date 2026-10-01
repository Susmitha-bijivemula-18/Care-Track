import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Calendar, 
  Users, 
  FileText, 
  Activity, 
  Bell, 
  User, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
  { name: 'Find Doctors', path: '/patient/doctors', icon: Search },
  { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
  { name: 'Queue', path: '/patient/queue', icon: Users },
  { name: 'Medical Records', path: '/patient/records', icon: FileText },
  { name: 'Health History', path: '/patient/history', icon: Activity },
  { name: 'Notifications', path: '/patient/notifications', icon: Bell },
  { name: 'Profile', path: '/patient/profile', icon: User },
  { name: 'Settings', path: '/patient/settings', icon: Settings },
];

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen border-r border-border bg-card">
      <div className="p-6">
        <h1 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
          <img src="/logo.jpg" alt="CareTrack" className="w-8 h-8 rounded-lg dark:invert" />
          CareTrack
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
