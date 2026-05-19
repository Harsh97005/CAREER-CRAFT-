import React from 'react';
import { RefreshCw } from 'lucide-react';
import { C, cardStyle } from '../theme';
import { footerStats } from '../dashboardData';
import LiveClock from './LiveClock';

export default function DashboardFooter({ liveDelay }) {
  return (
    <footer className="dashboard-footer" style={{ ...cardStyle, padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexShrink: 0 }}>
      {footerStats(liveDelay).map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ background: `${stat.color}18`, borderRadius: 8, padding: 8, display: 'flex' }}>
              <Icon size={15} color={stat.color} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: C.muted }}>{stat.label}</div>
              <div style={{ fontSize: 15, fontFamily: 'Rajdhani', fontWeight: 700, color: C.text }}>{stat.value}</div>
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
        <RefreshCw size={10} style={{ animation: 'spin 3s linear infinite' }} />
        Updated: <LiveClock />
      </div>
    </footer>
  );
}
