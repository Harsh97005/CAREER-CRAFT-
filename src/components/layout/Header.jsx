import React from 'react';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useResume } from '../../state/ResumeContext';

export default function Header() {
  const { darkMode, setDarkMode } = useResume();
  return (
    <header className="no-print mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white shadow-glow">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-lg font-black text-slate-950 dark:text-white">CareerCraft AI</p>
          <p className="text-xs font-bold text-slate-500">Resume Builder</p>
        </div>
      </div>
      <button onClick={() => setDarkMode(!darkMode)} className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-300 dark:border-white/10 dark:bg-slate-950 dark:text-white" aria-label="Toggle theme">
        {darkMode ? <Sun size={19} /> : <Moon size={19} />}
      </button>
    </header>
  );
}
