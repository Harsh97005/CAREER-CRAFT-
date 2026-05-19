import React from 'react';
import { Bot, Sparkles, Target } from 'lucide-react';
import { useResume } from '../../state/ResumeContext';

export default function AISidePanel() {
  const { atsScore, atsBreakdown, aiSuggestions, matchedKeywords } = useResume();
  const breakdownRows = [
    ['Keywords', atsBreakdown.keywords, 34],
    ['Sections', atsBreakdown.sections, 18],
    ['Impact', atsBreakdown.impact, 16],
    ['Length', atsBreakdown.length, 12],
    ['Contact', atsBreakdown.contact, 10],
    ['Readability', atsBreakdown.readability, 10],
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-5 text-white shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-100">ATS estimate</p>
            <p className="mt-2 text-5xl font-black">{atsScore}</p>
          </div>
          <div className="grid h-20 w-20 place-items-center rounded-full border-8 border-white/25 text-lg font-black">{atsScore}%</div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-white/20">
          <div className="h-2 rounded-full bg-white" style={{ width: `${atsScore}%` }} />
        </div>
        <p className="mt-3 text-xs font-semibold leading-5 text-indigo-100">
          Conservative estimate based on keywords, sections, measurable impact, length, and ATS-friendly layout.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950">
        <h3 className="mb-4 font-black text-slate-950 dark:text-white">Score breakdown</h3>
        <div className="space-y-3">
          {breakdownRows.map(([label, value, max]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between text-xs font-black text-slate-500">
                <span>{label}</span>
                <span>{value}/{max}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
                <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Matched job keywords: {matchedKeywords.length || 0}
        </p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950">
        <div className="mb-4 flex items-center gap-2">
          <Bot className="text-indigo-500" size={20} />
          <h3 className="font-black text-slate-950 dark:text-white">AI suggestions</h3>
        </div>
        <div className="space-y-3">
          {aiSuggestions.map((suggestion, index) => (
            <div key={suggestion} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
              <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-500">
                {index === 0 ? <Sparkles size={14} /> : <Target size={14} />} Tip {index + 1}
              </div>
              <p className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
