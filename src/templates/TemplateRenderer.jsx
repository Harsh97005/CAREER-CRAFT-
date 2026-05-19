import React from 'react';
import { Github, Linkedin, Link, Mail, MapPin, Phone } from 'lucide-react';

const Section = ({ title, children }) => (
  <section className="mt-6">
    <h3 className="mb-2 text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">{title}</h3>
    {children}
  </section>
);

const contactItems = (resume) => [
  { icon: Mail, value: resume.personal.email },
  { icon: Phone, value: resume.personal.phone },
  { icon: MapPin, value: resume.personal.location },
  { icon: Link, value: resume.personal.website },
  { icon: Linkedin, value: resume.personal.linkedin },
  { icon: Github, value: resume.personal.github },
].filter((item) => item.value);

const Contact = ({ resume, light = false }) => (
  <div className={`contact-row mt-3 text-[11px] ${light ? 'text-white/90' : 'text-slate-600'}`}>
    {contactItems(resume).map(({ icon: Icon, value }) => (
      <span key={value} className="contact-item">
        <span className="contact-icon">
          <Icon size={12} strokeWidth={2.2} />
        </span>
        <span className="contact-text">{value}</span>
      </span>
    ))}
  </div>
);

const PlainContact = ({ resume, className = '' }) => (
  <div className={className}>
    {contactItems(resume).map(({ value }) => <p key={value}>{value}</p>)}
  </div>
);

const Experience = ({ resume }) => (
  <Section title="Experience">
    <div className="space-y-4">
      {resume.experience.map((item) => (
        <div key={item.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold text-slate-950">{item.role}</p>
              <p className="text-xs font-semibold text-indigo-600">{item.company} | {item.location}</p>
            </div>
            <p className="whitespace-nowrap text-[11px] font-bold text-slate-500">{item.start} - {item.end}</p>
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-slate-700">
            {item.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

const Education = ({ resume }) => (
  <Section title="Education">
    {resume.education.map((item) => (
      <div key={item.id} className="mb-3">
        <p className="text-sm font-extrabold text-slate-950">{item.degree}</p>
        <p className="text-xs text-slate-600">{item.school} | {item.start} - {item.end}</p>
      </div>
    ))}
  </Section>
);

const Skills = ({ resume }) => (
  <Section title="Skills">
    <div className="flex flex-wrap gap-2">
      {resume.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700">{skill}</span>)}
    </div>
  </Section>
);

const Projects = ({ resume }) => (
  <Section title="Projects">
    {resume.projects.map((project) => (
      <p key={project.id} className="mb-2 text-xs leading-5 text-slate-700"><strong className="text-slate-950">{project.name}:</strong> {project.description}</p>
    ))}
  </Section>
);

const hasExperience = (resume) => resume.experience.some((item) => item.role || item.company || item.bullets.some(Boolean));
const hasEducation = (resume) => resume.education.some((item) => item.school || item.degree);
const hasProjects = (resume) => resume.projects.some((item) => item.name || item.description);

const orderedSections = (resume) => ({
  profile: resume.personal.summary ? <Section key="profile" title="Profile"><p className="text-sm leading-6 text-slate-700">{resume.personal.summary}</p></Section> : null,
  experience: hasExperience(resume) ? <Experience key="experience" resume={resume} /> : null,
  education: hasEducation(resume) ? <Education key="education" resume={resume} /> : null,
  skills: resume.skills.length ? <Skills key="skills" resume={resume} /> : null,
  projects: hasProjects(resume) ? <Projects key="projects" resume={resume} /> : null,
});

const OrderedContent = ({ resume, include = resume.sectionOrder }) => {
  const sections = orderedSections(resume);
  return include.map((section) => sections[section]).filter(Boolean);
};

function ModernTemplate({ resume }) {
  return (
    <div className="resume-page p-12 text-slate-900">
      <div className="border-b-4 border-indigo-600 pb-7">
        <h1 className="text-5xl font-black tracking-tight">{resume.personal.name}</h1>
        <p className="mt-2 text-lg font-bold text-indigo-600">{resume.personal.role}</p>
        <Contact resume={resume} />
      </div>
      <OrderedContent resume={resume} />
    </div>
  );
}

function ExecutiveTemplate({ resume }) {
  return (
    <div className="resume-page grid grid-cols-[250px_1fr] text-slate-900">
      <aside className="bg-slate-950 p-9 text-white">
        <h1 className="text-4xl font-black leading-none">{resume.personal.name}</h1>
        <p className="mt-3 text-sm font-bold text-cyan-200">{resume.personal.role}</p>
        <PlainContact resume={resume} className="mt-8 space-y-2 break-words text-xs text-slate-200" />
        {resume.skills.length > 0 && <Skills resume={resume} />}
      </aside>
      <main className="p-10">
        <OrderedContent resume={resume} include={resume.sectionOrder.filter((section) => section !== 'skills')} />
      </main>
    </div>
  );
}

function CreativeTemplate({ resume }) {
  return (
    <div className="resume-page p-10 text-slate-900">
      <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white">
        <h1 className="text-5xl font-black">{resume.personal.name}</h1>
        <p className="mt-2 text-xl font-bold">{resume.personal.role}</p>
        <Contact resume={resume} light />
      </div>
      <div className="grid grid-cols-[1.15fr_0.85fr] gap-8 pt-8">
        <main>
          <OrderedContent resume={resume} include={resume.sectionOrder.filter((section) => ['profile', 'experience'].includes(section))} />
        </main>
        <aside>
          <OrderedContent resume={resume} include={resume.sectionOrder.filter((section) => ['education', 'skills', 'projects'].includes(section))} />
        </aside>
      </div>
    </div>
  );
}

function MinimalTemplate({ resume }) {
  return (
    <div className="resume-page p-14 text-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight">{resume.personal.name}</h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.28em] text-slate-500">{resume.personal.role}</p>
        <div className="flex justify-center"><Contact resume={resume} /></div>
      </div>
      <div className="mx-auto mt-8 h-px w-32 bg-slate-300" />
      <OrderedContent resume={resume} />
    </div>
  );
}

function TechnicalTemplate({ resume }) {
  return (
    <div className="resume-page grid grid-cols-[285px_1fr] text-slate-900">
      <aside className="bg-indigo-50 p-10">
        <h1 className="text-4xl font-black leading-tight text-indigo-950">{resume.personal.name}</h1>
        <p className="mt-3 text-sm font-black text-indigo-700">{resume.personal.role}</p>
        <PlainContact resume={resume} className="mt-8 space-y-2 break-words text-[11px] font-bold text-slate-600" />
        {resume.skills.length > 0 && <Skills resume={resume} />}
      </aside>
      <main className="p-10">
        {resume.personal.summary && <Section title="Technical Profile"><p className="text-sm leading-6 text-slate-700">{resume.personal.summary}</p></Section>}
        {hasExperience(resume) && <Experience resume={resume} />}
        {hasProjects(resume) && <Projects resume={resume} />}
        {hasEducation(resume) && <Education resume={resume} />}
      </main>
    </div>
  );
}

function CompactTemplate({ resume }) {
  return (
    <div className="resume-page p-10 text-slate-900">
      <div className="border-b border-slate-300 pb-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black">{resume.personal.name}</h1>
            <p className="mt-1 text-sm font-extrabold text-indigo-600">{resume.personal.role}</p>
          </div>
          <div className="max-w-[330px] text-right text-[10px] font-semibold leading-4 text-slate-600">
            {contactItems(resume).map(({ value }) => value).join(' | ')}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_220px] gap-7">
        <main>
          {resume.personal.summary && <Section title="Profile"><p className="text-xs leading-5 text-slate-700">{resume.personal.summary}</p></Section>}
          {hasExperience(resume) && <Experience resume={resume} />}
        </main>
        <aside>
          {resume.skills.length > 0 && <Skills resume={resume} />}
          {hasEducation(resume) && <Education resume={resume} />}
          {hasProjects(resume) && <Projects resume={resume} />}
        </aside>
      </div>
    </div>
  );
}

export default function TemplateRenderer({ resume }) {
  if (resume.template === 'executive') return <ExecutiveTemplate resume={resume} />;
  if (resume.template === 'creative') return <CreativeTemplate resume={resume} />;
  if (resume.template === 'minimal') return <MinimalTemplate resume={resume} />;
  if (resume.template === 'technical') return <TechnicalTemplate resume={resume} />;
  if (resume.template === 'compact') return <CompactTemplate resume={resume} />;
  return <ModernTemplate resume={resume} />;
}
