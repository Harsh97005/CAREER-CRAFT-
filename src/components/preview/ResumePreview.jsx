import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import TemplateRenderer from '../../templates/TemplateRenderer';
import { useResume } from '../../state/ResumeContext';

export default function ResumePreview() {
  const { resume } = useResume();
  const previewRef = useRef(null);
  const exportRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const downloadPdf = async () => {
    if (!exportRef.current) return;
    setExporting(true);
    const canvas = await html2canvas(exportRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      width: 794,
      height: 1123,
      windowWidth: 794,
      windowHeight: 1123,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`${resume.personal.name.replace(/\s+/g, '-')}-resume.pdf`);
    setExporting(false);
  };

  const downloadDocx = async () => {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ children: [new TextRun({ text: resume.personal.name, bold: true, size: 36 })] }),
          new Paragraph([resume.personal.role, resume.personal.email, resume.personal.phone, resume.personal.linkedin, resume.personal.github].filter(Boolean).join(' | ')),
          new Paragraph(''),
          new Paragraph({ children: [new TextRun({ text: 'Summary', bold: true })] }),
          new Paragraph(resume.personal.summary),
          new Paragraph({ children: [new TextRun({ text: 'Experience', bold: true })] }),
          ...resume.experience.flatMap((item) => [
            new Paragraph({ children: [new TextRun({ text: `${item.role} - ${item.company}`, bold: true })] }),
            ...item.bullets.map((bullet) => new Paragraph({ text: bullet, bullet: { level: 0 } })),
          ]),
          new Paragraph({ children: [new TextRun({ text: 'Skills', bold: true })] }),
          new Paragraph(resume.skills.join(', ')),
        ],
      }],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${resume.personal.name.replace(/\s+/g, '-')}-resume.docx`);
  };

  return (
    <div className="sticky top-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Live preview</p>
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">Recruiter-ready resume</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadDocx} className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition hover:border-indigo-300 dark:border-white/10 dark:bg-slate-900 dark:text-white sm:inline-flex">
            <Download size={17} /> DOCX
          </button>
          <button onClick={downloadPdf} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-extrabold text-white shadow-glow transition hover:bg-indigo-500">
            <Download size={17} /> {exporting ? 'Exporting' : 'PDF'}
          </button>
        </div>
      </div>
      <motion.div layout className="overflow-auto rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900">
        <div className="origin-top-left scale-[0.47] sm:scale-[0.62] lg:scale-[0.48] xl:scale-[0.58]" style={{ width: 794, height: 1123 }}>
          <div ref={previewRef} className="shadow-2xl">
            <TemplateRenderer resume={resume} />
          </div>
        </div>
      </motion.div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
        <FileText className="text-indigo-500" size={20} />
        Preview updates instantly as you edit each step.
      </div>
      <div className="pdf-export pointer-events-none fixed -left-[9999px] top-0 opacity-0" aria-hidden="true">
        <div ref={exportRef}>
          <TemplateRenderer resume={resume} />
        </div>
      </div>
    </div>
  );
}
