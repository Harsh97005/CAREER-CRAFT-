import React from 'react';
import { BarChart2, Bus, GitBranch, Route, UserCheck } from 'lucide-react';
import { C } from '../theme';
import { tabs } from '../dashboardData';

const tabIcons = [GitBranch, Bus, Route, BarChart2, UserCheck];

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <nav style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, padding: '0 24px', display: 'flex', justifyContent: 'center', gap: 4, flexShrink: 0 }}>
      {tabs.map((tab, index) => {
        const Icon = tabIcons[index];
        const active = activeTab === tab;
        return (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ minWidth: 170, background: active ? `${C.blue}12` : 'transparent', border: 'none', borderBottom: active ? `3px solid ${C.blue}` : '3px solid transparent', color: active ? C.blue : C.sub, padding: '17px 18px 15px', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, whiteSpace: 'nowrap' }}>
            <Icon size={18} />{tab}
          </button>
        );
      })}
    </nav>
  );
}
