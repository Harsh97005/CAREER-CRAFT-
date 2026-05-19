import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../state/ResumeContext';
import { Field, Panel } from './FormControls';
import StepTabs from './StepTabs';
import TemplatePicker from './TemplatePicker';

const MotionBlock = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
    {children}
  </motion.div>
);

const AddButton = ({ onClick, children }) => (
  <button onClick={onClick} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950">
    <Plus size={14} /> {children}
  </button>
);

const RemoveButton = ({ onClick, label = 'Remove' }) => (
  <button onClick={onClick} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-50">
    <Trash2 size={14} /> {label}
  </button>
);

export default function ResumeForm() {
  const {
    resume,
    activeStep,
    updatePersonal,
    updateCollectionItem,
    updateBullet,
    addBullet,
    removeBullet,
    addItem,
    removeItem,
    updateSkills,
  } = useResume();

  return (
    <div className="space-y-5">
      <StepTabs />
      <TemplatePicker />
      <AnimatePresence mode="wait">
        {activeStep === 'personal' && (
          <MotionBlock key="personal">
            <Panel title="Profile details">
              <div className="grid gap-4 sm:grid-cols-2">
                {['name', 'role', 'email', 'phone', 'location', 'website', 'linkedin', 'github'].map((field) => (
                  <Field key={field} label={field} value={resume.personal[field]} onChange={(value) => updatePersonal(field, value)} />
                ))}
                <div className="sm:col-span-2">
                  <Field label="Professional summary" value={resume.personal.summary} onChange={(value) => updatePersonal('summary', value)} multiline />
                </div>
              </div>
            </Panel>
          </MotionBlock>
        )}

        {activeStep === 'experience' && (
          <MotionBlock key="experience">
            <div className="space-y-4">
              {resume.experience.map((item) => (
                <Panel key={item.id} title={item.company} action={<RemoveButton onClick={() => removeItem('experience', item.id)} />}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {['role', 'company', 'start', 'end', 'location'].map((field) => (
                      <Field key={field} label={field} value={item[field]} onChange={(value) => updateCollectionItem('experience', item.id, field, value)} />
                    ))}
                  </div>
                  <div className="mt-5 space-y-3">
                    {item.bullets.map((bullet, index) => (
                      <div key={index} className="flex gap-2">
                        <Field label={`Bullet ${index + 1}`} value={bullet} onChange={(value) => updateBullet(item.id, index, value)} />
                        <div className="pt-7"><RemoveButton onClick={() => removeBullet(item.id, index)} label="" /></div>
                      </div>
                    ))}
                    <AddButton onClick={() => addBullet(item.id)}>Add bullet</AddButton>
                  </div>
                </Panel>
              ))}
              <AddButton onClick={() => addItem('experience')}>Add experience</AddButton>
            </div>
          </MotionBlock>
        )}

        {activeStep === 'education' && (
          <MotionBlock key="education">
            <div className="space-y-4">
              {resume.education.map((item) => (
                <Panel key={item.id} title={item.school} action={<RemoveButton onClick={() => removeItem('education', item.id)} />}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {['school', 'degree', 'start', 'end'].map((field) => (
                      <Field key={field} label={field} value={item[field]} onChange={(value) => updateCollectionItem('education', item.id, field, value)} />
                    ))}
                  </div>
                </Panel>
              ))}
              <AddButton onClick={() => addItem('education')}>Add education</AddButton>
            </div>
          </MotionBlock>
        )}

        {activeStep === 'skills' && (
          <MotionBlock key="skills">
            <Panel title="Skills">
              <Field label="Comma separated skills" value={resume.skills.join(', ')} onChange={updateSkills} multiline />
            </Panel>
          </MotionBlock>
        )}

        {activeStep === 'projects' && (
          <MotionBlock key="projects">
            <div className="space-y-4">
              {resume.projects.map((item) => (
                <Panel key={item.id} title={item.name} action={<RemoveButton onClick={() => removeItem('projects', item.id)} />}>
                  <div className="grid gap-4">
                    <Field label="Project name" value={item.name} onChange={(value) => updateCollectionItem('projects', item.id, 'name', value)} />
                    <Field label="Description" value={item.description} onChange={(value) => updateCollectionItem('projects', item.id, 'description', value)} multiline />
                  </div>
                </Panel>
              ))}
              <AddButton onClick={() => addItem('projects')}>Add project</AddButton>
            </div>
          </MotionBlock>
        )}
      </AnimatePresence>
    </div>
  );
}
