import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Moon,
  Sun,
  Flame
} from 'lucide-react';
import { KeyboardShortcutsModal } from '../common/KeyboardShortcutsModal';

export const Header: React.FC<{ onOpenTimerModal?: () => void }> = ({ onOpenTimerModal }) => {
  const {
    settings,
    toggleDarkMode,
    setIsSearchOpen,
    weeklyStudyHours
  } = useApp();

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between gap-4 text-slate-200">
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-indigo-500/50 text-slate-400 hover:text-slate-200 text-sm transition-all max-w-xs md:max-w-md w-full shadow-inner"
        >
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <span className="truncate text-left flex-1">Search assignments, projects, resources...</span>
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak / Hours Widget */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{weeklyStudyHours}h studied this week</span>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
            title={settings.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {settings.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Student Badge */}
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {settings.studentName.charAt(0)}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-100 leading-none truncate max-w-[120px]">
                {settings.studentName}
              </span>
              <span className="text-[10px] text-teal-400 font-medium truncate max-w-[120px] mt-0.5">
                {settings.degreeName}
              </span>
            </div>
          </div>
        </div>
      </header>

      <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </>
  );
};
