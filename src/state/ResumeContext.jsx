import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { aiSuggestions, initialResume, keywordBank } from '../data/resumeData';

const ResumeContext = createContext(null);
const draftKey = 'careercraft-draft-v2';

const newId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const stopWords = new Set(['about', 'above', 'after', 'again', 'being', 'could', 'every', 'their', 'there', 'these', 'those', 'which', 'while', 'with', 'your', 'role', 'requiring', 'required']);

const resumeBodyText = (resume) => [
  resume.personal.name,
  resume.personal.role,
  resume.personal.summary,
  resume.experience.map((item) => [item.role, item.company, item.bullets.join(' ')].join(' ')).join(' '),
  resume.education.map((item) => [item.school, item.degree].join(' ')).join(' '),
  resume.skills.join(' '),
  resume.projects.map((item) => [item.name, item.description].join(' ')).join(' '),
].join(' ').toLowerCase();

const extractJobKeywords = (jobDescription) => {
  const words = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));
  return [...new Set(words)].slice(0, 28);
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get('resume');
      if (shared) {
        const parsed = JSON.parse(decodeURIComponent(escape(atob(shared))));
        return { ...initialResume, ...parsed, personal: { ...initialResume.personal, ...parsed.personal } };
      }
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialResume, ...parsed, personal: { ...initialResume.personal, ...parsed.personal } };
      }
      return initialResume;
    } catch {
      return initialResume;
    }
  });
  const [darkMode, setDarkMode] = useState(false);
  const [activeStep, setActiveStep] = useState('personal');

  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(resume));
  }, [resume]);

  const matchedKeywords = useMemo(() => {
    const text = resumeBodyText(resume);
    const extracted = extractJobKeywords(resume.jobDescription);
    const targetKeywords = extracted.length ? extracted : keywordBank;
    return targetKeywords.filter((keyword) => text.includes(keyword));
  }, [resume]);

  const atsBreakdown = useMemo(() => {
    const text = resumeBodyText(resume);
    const jobKeywords = extractJobKeywords(resume.jobDescription);
    const targetKeywords = jobKeywords.length ? jobKeywords : keywordBank;
    const keywordRatio = targetKeywords.length ? matchedKeywords.length / targetKeywords.length : 0;
    const bulletText = resume.experience.flatMap((item) => item.bullets);
    const quantifiedBullets = bulletText.filter((bullet) => /\d|%|reduced|increased|improved|saved|grew|launched|delivered/i.test(bullet)).length;
    const contactFields = ['email', 'phone', 'location', 'linkedin', 'github'].filter((field) => resume.personal[field]).length;
    const sectionCount = [resume.personal.summary.length > 80, resume.experience.length > 0, resume.education.length > 0, resume.skills.length >= 6, resume.projects.length > 0].filter(Boolean).length;
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    return {
      contact: Math.round((contactFields / 5) * 10),
      sections: Math.round((sectionCount / 5) * 18),
      keywords: Math.round(keywordRatio * 34),
      impact: Math.min(16, quantifiedBullets * 4),
      length: wordCount >= 300 && wordCount <= 750 ? 12 : wordCount >= 180 ? 8 : 3,
      readability: resume.template === 'creative' ? 5 : 10,
    };
  }, [matchedKeywords, resume]);

  const atsScore = useMemo(() => {
    const score = Object.values(atsBreakdown).reduce((sum, value) => sum + value, 0);
    return Math.max(18, Math.min(92, score));
  }, [atsBreakdown]);

  const updatePersonal = (field, value) => {
    setResume((current) => ({ ...current, personal: { ...current.personal, [field]: value } }));
  };

  const updateTemplate = (template) => setResume((current) => ({ ...current, template }));

  const updateRoot = (field, value) => setResume((current) => ({ ...current, [field]: value }));

  const updateCollectionItem = (section, id, field, value) => {
    setResume((current) => ({
      ...current,
      [section]: current[section].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

  const updateBullet = (id, index, value) => {
    setResume((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, bullets: item.bullets.map((bullet, i) => (i === index ? value : bullet)) } : item
      ),
    }));
  };

  const addBullet = (id) => {
    setResume((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, bullets: [...item.bullets, ''] } : item
      ),
    }));
  };

  const removeBullet = (id, index) => {
    setResume((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, bullets: item.bullets.filter((_, i) => i !== index) } : item
      ),
    }));
  };

  const addItem = (section) => {
    const item =
      section === 'experience'
        ? { id: newId('exp'), company: '', role: '', start: '', end: '', location: '', bullets: [''] }
        : section === 'education'
          ? { id: newId('edu'), school: '', degree: '', start: '', end: '' }
          : { id: newId('proj'), name: '', description: '' };
    setResume((current) => ({ ...current, [section]: [...current[section], item] }));
  };

  const removeItem = (section, id) => {
    setResume((current) => ({ ...current, [section]: current[section].filter((item) => item.id !== id) }));
  };

  const updateSkills = (value) => {
    setResume((current) => ({ ...current, skills: value.split(',').map((skill) => skill.trim()).filter(Boolean) }));
  };

  const generateSummary = () => {
    setResume((current) => ({
      ...current,
      personal: {
        ...current.personal,
        summary: `${current.personal.role || 'Professional'} with experience in ${current.skills.slice(0, 3).join(', ') || 'relevant skills'}. Known for delivering measurable outcomes, collaborating across teams, and adapting quickly to role requirements.`,
      },
    }));
  };

  const generateBullet = (id) => {
    setResume((current) => ({
      ...current,
      experience: current.experience.map((item) =>
        item.id === id ? { ...item, bullets: [...item.bullets, `Delivered ${current.skills[0] || 'role-relevant'} improvements that increased team efficiency by 28%.`] } : item
      ),
    }));
  };

  const generateCoverLetter = () => {
    setResume((current) => ({
      ...current,
      coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for this opportunity. My experience across ${current.skills.slice(0, 4).join(', ') || 'the required skills'} aligns with your job requirements, especially the need for measurable impact and consistent ownership.\n\nI would welcome the chance to discuss how my background can support your team.\n\nSincerely,\n${current.personal.name || 'Your Name'}`,
    }));
  };

  const reorderSection = (from, to) => {
    setResume((current) => {
      const order = [...current.sectionOrder];
      const [moved] = order.splice(from, 1);
      order.splice(to, 0, moved);
      return { ...current, sectionOrder: order };
    });
  };

  const importProfile = (type) => {
    setResume((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [type]: type === 'github' ? 'github.com/your-username' : 'linkedin.com/in/your-profile',
      },
      projects: [
        ...current.projects,
        { id: newId('proj'), name: '', description: `Add a ${type} profile highlight here.` },
      ],
    }));
  };

  const value = {
    resume,
    darkMode,
    setDarkMode,
    activeStep,
    setActiveStep,
    atsScore,
    atsBreakdown,
    matchedKeywords,
    aiSuggestions,
    updatePersonal,
    updateTemplate,
    updateRoot,
    updateCollectionItem,
    updateBullet,
    addBullet,
    removeBullet,
    addItem,
    removeItem,
    updateSkills,
    generateSummary,
    generateBullet,
    generateCoverLetter,
    reorderSection,
    importProfile,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export const useResume = () => useContext(ResumeContext);
