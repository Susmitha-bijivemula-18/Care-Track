import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-md hover:bg-muted md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:block">
          <h2 className="text-lg font-medium">Welcome back, Susmitha</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full border border-card"></span>
        </button>

        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border ml-2 overflow-hidden">
          <span className="text-sm font-medium">SU</span>
        </div>
      </div>
    </header>
  );
}
