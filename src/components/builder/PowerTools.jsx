import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, BriefcaseBusiness, Copy, FilePlus2, Github, GripVertical, Linkedin, Mic, Share2, Wand2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useResume } from '../../state/ResumeContext';

const toolButton = 'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white transition hover:bg-indigo-500';

export default function PowerTools() {
  const {
    resume,
    matchedKeywords,
    updateRoot,
    generateSummary,
    generateBullet,
    generateCoverLetter,
    reorderSection,
    importProfile,
  } = useResume();
  const [dragIndex, setDragIndex] = useState(null);
  const [shared, setShared] = useState(false);

  const skillData = resume.skills.slice(0, 6).map((skill, index) => ({ skill, score: 58 + index * 7 }));
  const share = async () => {
    const link = `${window.location.origin}${window.location.pathname}?resume=${btoa(unescape(encodeURIComponent(JSON.stringify(resume))))}`;
    await navigator.clipboard.writeText(link);
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => updateRoot('jobDescription', `${resume.jobDescription} ${event.results[0][0].transcript}`);
    recognition.start();
  };

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-black text-slate-950 dark:text-white"><Wand2 className="text-indigo-500" size={19} /> AI writing studio</h3>
          <button onClick={generateSummary} className={toolButton}>AI summary</button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {resume.experience.slice(0, 2).map((item) => (
            <button key={item.id} onClick={() => generateBullet(item.id)} className="rounded-2xl border border-slate-200 p-3 text-left text-sm font-bold text-slate-600 transition hover:border-indigo-300 dark:border-white/10 dark:text-slate-300">
              Generate bullet for {item.company}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-black text-slate-950 dark:text-white"><BriefcaseBusiness className="text-indigo-500" size={19} /> Job keyword matcher</h3>
          <button onClick={startVoice} className={toolButton}><Mic size={14} /> Voice</button>
        </div>
        <textarea value={resume.jobDescription} onChange={(e) => updateRoot('jobDescription', e.target.value)} className="h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
        <div className="mt-3 flex flex-wrap gap-2">
          {matchedKeywords.map((keyword) => <span key={keyword} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{keyword}</span>)}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-black text-slate-950 dark:text-white"><FilePlus2 className="text-indigo-500" size={19} /> Cover letter generator</h3>
          <button onClick={generateCoverLetter} className={toolButton}>Generate</button>
        </div>
        <textarea value={resume.coverLetter} onChange={(e) => updateRoot('coverLetter', e.target.value)} className="h-44 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold leading-6 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-slate-900 dark:text-white" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <h3 className="mb-4 flex items-center gap-2 font-black text-slate-950 dark:text-white"><GripVertical className="text-indigo-500" size={19} /> Drag-and-drop sections</h3>
        <div className="space-y-2">
          <AnimatePresence>
            {resume.sectionOrder.map((section, index) => (
              <motion.div
                layout
                key={section}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dragIndex !== null && reorderSection(dragIndex, index)}
                className="flex cursor-grab items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-black capitalize text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
              >
                <GripVertical size={16} /> {section}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <h3 className="mb-4 flex items-center gap-2 font-black text-slate-950 dark:text-white"><BarChart3 className="text-indigo-500" size={19} /> Resume analytics dashboard</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="skill" tick={{ fontSize: 10 }} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <h3 className="mb-4 font-black text-slate-950 dark:text-white">Career launchpad</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <button onClick={() => importProfile('linkedin')} className={toolButton}><Linkedin size={14} /> LinkedIn importer</button>
          <button onClick={() => importProfile('github')} className={toolButton}><Github size={14} /> GitHub importer</button>
          <button onClick={() => updateRoot('portfolioUrl', `${resume.personal.website}/portfolio`)} className={toolButton}><Copy size={14} /> Portfolio generator</button>
          <button onClick={share} className={toolButton}><Share2 size={14} /> {shared ? 'Copied' : 'Share link'}</button>
        </div>
        <div className="mt-4 space-y-2">
          {resume.applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm font-bold dark:bg-slate-900">
              <span className="text-slate-700 dark:text-slate-200">{app.company} · {app.role}</span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">{app.stage}</span>
            </div>
          ))}
        </div>
        {resume.portfolioUrl && <p className="mt-3 text-sm font-bold text-emerald-600">Portfolio draft: {resume.portfolioUrl}</p>}
      </div>
    </div>
  );
}
