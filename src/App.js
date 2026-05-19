import React from 'react';
import { ResumeProvider } from './state/ResumeContext';
import ResumeBuilderPage from './pages/ResumeBuilderPage';

export default function App() {
  return (
    <ResumeProvider>
      <ResumeBuilderPage />
    </ResumeProvider>
  );
}
