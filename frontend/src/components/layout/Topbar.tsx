import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { CareTrackIcon } from '../ui/Logo';

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
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10 backdrop-blur-md bg-background/80">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-1.5 -ml-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <CareTrackIcon className="w-6 h-6 md:hidden" />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <button className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full border-[1.5px] border-background"></span>
        </button>

        <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center border border-border ml-2 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-[11px] font-semibold text-secondary-foreground tracking-wider">SU</span>
        </div>
      </div>
    </header>
  );
}
