import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, PlayCircle, ShieldCheck, Wand2, Zap } from 'lucide-react';
import { useResume } from '../state/ResumeContext';
import Header from '../components/layout/Header';
import ResumeForm from '../components/builder/ResumeForm';
import ResumePreview from '../components/preview/ResumePreview';
import AISidePanel from '../components/builder/AISidePanel';
import PowerTools from '../components/builder/PowerTools';

const features = [
  { icon: Wand2, title: 'AI Bullet Point Suggestions', text: 'Turn blank responsibilities into outcome-led bullets that sound crisp and recruiter friendly.' },
  { icon: ShieldCheck, title: 'Instant ATS Scoring', text: 'See keyword coverage, measurable impact, and structure strength while you edit.' },
  { icon: Zap, title: 'Pro Templates + Export', text: 'Switch themes, reorder sections, and export polished PDF or DOCX files.' },
];

export default function ResumeBuilderPage() {
  const { darkMode } = useResume();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-950 transition dark:bg-slate-950">
        <Header />
        <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
              <Wand2 size={14} /> AI-powered resume building is here
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Build your dream career with <span className="text-indigo-600">AI-powered</span> resumes
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-slate-600 dark:text-slate-300">
              Create polished resumes with multi-step forms, real-time ATS feedback, AI writing guidance, live previews, and export-ready templates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#builder" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-black text-white shadow-glow transition hover:bg-indigo-500">
                Start Building For Free <ArrowRight size={18} />
              </a>
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-800 transition hover:border-indigo-300 dark:border-white/10 dark:bg-slate-900 dark:text-white">
                <PlayCircle size={18} /> Watch Demo
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-500 dark:text-slate-400">
              {['12,000+ builders', 'ATS-aware', 'No credit card'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={17} /> {item}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="relative">
            <div className="absolute -right-3 top-8 z-10 rounded-3xl bg-white p-4 shadow-soft dark:bg-slate-900">
              <p className="text-3xl font-black text-indigo-600">85%</p>
              <p className="text-xs font-bold text-slate-500">ATS Score</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-900">
              <div className="h-4 w-32 rounded bg-blue-100" />
              <div className="mt-5 h-8 w-4/5 rounded bg-slate-950 dark:bg-white" />
              <div className="mt-6 space-y-3">
                <div className="h-3 w-40 rounded bg-indigo-100" />
                <div className="h-3 w-full rounded bg-slate-100 dark:bg-white/10" />
                <div className="h-3 w-11/12 rounded bg-slate-100 dark:bg-white/10" />
                <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-white/10" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="h-28 rounded-xl bg-blue-100" />
                <div className="h-28 rounded-xl bg-indigo-50" />
                <div className="h-28 rounded-xl bg-blue-100" />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">Powerful features to land your next role</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">Everything needed to move from rough notes to a credible, high-signal resume.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15">
                  <feature.icon size={21} />
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">{feature.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="builder" className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px_1.05fr] lg:px-8">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Builder workspace</p>
              <h2 className="text-3xl font-black text-slate-950 dark:text-white">Edit once. Preview everywhere.</h2>
            </div>
            <ResumeForm />
            <div className="mt-6">
              <PowerTools />
            </div>
          </div>
          <AISidePanel />
          <div className="lg:col-span-3 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:row-span-2">
            <ResumePreview />
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-indigo-600 p-8 text-center text-white shadow-glow sm:p-12">
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">Ready to land your dream job?</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm font-semibold text-indigo-100">Join thousands of job seekers who improve their hire rate with CareerCraft AI.</p>
            <a href="#builder" className="mt-7 inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black text-indigo-700">Start Building Now</a>
          </div>
        </section>
      </main>
    </div>
  );
}
