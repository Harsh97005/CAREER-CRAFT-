import React from 'react';
import { Bus, Calendar, ChevronDown, GitBranch, Route, UserCheck, Zap } from 'lucide-react';
import LiveClock from './LiveClock';
import { C } from '../theme';

export default function TopBar({ filterDay, setFilterDay }) {
  const stats = [
    { icon: Route, label: 'Active Routes', value: '247', sub: 'routes', color: C.blue },
    { icon: Bus, label: 'Fleet Allocated', value: '4,142', sub: 'allocated', color: C.green },
    { icon: UserCheck, label: 'Drivers Rostered', value: '3,510', sub: 'rostered', color: C.cyan },
    { icon: GitBranch, label: 'Schedule Adherence', value: '87.6%', sub: 'today', color: C.blue },
    { icon: Zap, label: 'Avg Fleet Utilisation', value: '76.5%', sub: 'utilisation', color: C.sub },
  ];

  return (
    <header style={{ minHeight: 98, background: C.panel, borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '360px 1fr 170px', alignItems: 'center', padding: '0 24px', gap: 20, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 54, height: 54, borderRadius: 15, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 14px 32px ${C.blue}35` }}>
          <Bus size={28} color="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 25, color: C.text, lineHeight: 1 }}>UPSRTC</div>
          <div style={{ fontSize: 12, color: C.sub, letterSpacing: 1.6, textTransform: 'uppercase', marginTop: 5 }}>Planning Dashboard</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.sub, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Depot
          <button style={{ minWidth: 192, background: C.bg, border: `1px solid ${C.border}`, color: C.text, borderRadius: 9, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Schedule Optimisation <ChevronDown size={15} color={C.sub} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.bg, borderRadius: 9, padding: 4, border: `1px solid ${C.border}` }}>
          {['Today', 'Week', 'Month'].map((day) => (
            <button key={day} onClick={() => setFilterDay(day)} style={{ background: filterDay === day ? C.blue : 'transparent', border: 'none', color: filterDay === day ? '#fff' : C.sub, borderRadius: 6, padding: '7px 12px', fontSize: 12, cursor: 'pointer' }}>{day}</button>
          ))}
        </div>
        <div className="topbar-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(92px, 1fr))', gap: 12, flex: 1, minWidth: 0 }}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} style={{ textAlign: 'center', color: C.sub }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap' }}>
                  <Icon size={13} color={C.sub} />{stat.label}
                </div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 26, color: stat.color, lineHeight: 1.05, marginTop: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 10 }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: 24, textAlign: 'right' }}>
        <div style={{ color: C.text, fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 31, lineHeight: 1 }}>
          <LiveClock />
        </div>
        <div style={{ color: C.sub, fontSize: 13, marginTop: 7, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
          <Calendar size={13} />14 May 2025
        </div>
      </div>
    </header>
  );
}
