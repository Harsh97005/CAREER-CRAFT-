export const initialResume = {
  template: 'modern',
  sectionOrder: ['profile', 'experience', 'education', 'skills', 'projects'],
  jobDescription: '',
  coverLetter: '',
  applications: [],
  personal: {
    name: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
};

export const formSteps = [
  { id: 'personal', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

export const templateOptions = [
  { id: 'modern', name: 'Modern', description: 'Clean recruiter-ready layout' },
  { id: 'executive', name: 'Executive', description: 'Classic leadership profile' },
  { id: 'creative', name: 'Creative', description: 'Bold portfolio-friendly style' },
  { id: 'minimal', name: 'Minimal', description: 'Elegant single-column format' },
  { id: 'technical', name: 'Technical', description: 'Skills-forward engineering resume' },
  { id: 'compact', name: 'Compact', description: 'Dense one-page ATS layout' },
];

export const aiSuggestions = [
  'Start bullets with strong action verbs like led, launched, improved, automated, or designed.',
  'Add measurable outcomes to at least two experience bullets for stronger ATS and recruiter signal.',
  'Mirror 3-5 keywords from the job description in your summary and skills section.',
];

export const keywordBank = ['saas', 'dashboards', 'design systems', 'ux research', 'prototyping', 'stakeholder', 'experimentation', 'impact', 'ai', 'figma'];
