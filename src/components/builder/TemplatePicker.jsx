import React from 'react';
import { LayoutTemplate } from 'lucide-react';
import { templateOptions } from '../../data/resumeData';
import { useResume } from '../../state/ResumeContext';

export default function TemplatePicker() {
  const { resume, updateTemplate } = useResume();
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {templateOptions.map((template) => (
        <button key={template.id} onClick={() => updateTemplate(template.id)} className={`rounded-2xl border p-4 text-left transition ${resume.template === template.id ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-100 dark:bg-indigo-500/15 dark:ring-indigo-500/20' : 'border-slate-200 bg-white hover:border-indigo-200 dark:border-white/10 dark:bg-slate-950'}`}>
          <LayoutTemplate className="mb-4 text-indigo-500" size={22} />
          <p className="font-black text-slate-950 dark:text-white">{template.name}</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
