import React from 'react';

export function Field({ label, value, onChange, placeholder, multiline = false }) {
  const classes = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-500/20';
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{label}</span>
      {multiline ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={classes} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={classes} />
      )}
    </label>
  );
}

export function Panel({ title, action, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
