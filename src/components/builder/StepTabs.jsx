import React from 'react';
import { motion } from 'framer-motion';
import { formSteps } from '../../data/resumeData';
import { useResume } from '../../state/ResumeContext';

export default function StepTabs() {
  const { activeStep, setActiveStep } = useResume();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      {formSteps.map((step, index) => (
        <button key={step.id} onClick={() => setActiveStep(step.id)} className={`relative rounded-2xl px-3 py-3 text-sm font-extrabold transition ${activeStep === step.id ? 'text-white' : 'bg-white text-slate-600 hover:text-indigo-600 dark:bg-slate-950 dark:text-slate-300'}`}>
          {activeStep === step.id && <motion.span layoutId="active-step" className="absolute inset-0 rounded-2xl bg-indigo-600" />}
          <span className="relative z-10">{index + 1}. {step.label}</span>
        </button>
      ))}
    </div>
  );
}
