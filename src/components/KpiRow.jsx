import React from 'react';
import { AlertTriangle, Bus, GitBranch, Route, UserCheck, Zap } from 'lucide-react';
import { C } from '../theme';
import { Kpi } from './DashboardPrimitives';

export default function KpiRow({ liveDelay }) {
  return (
    <div className="kpi-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(150px, 1fr))', gap: 14 }}>
      <Kpi icon={Route} label="Active Routes" value="247" delta={3.2} color={C.blue} />
      <Kpi icon={Bus} label="Fleet Allocated" value="4,142" delta={1.8} color={C.green} sub="of 4,582 total" />
      <Kpi icon={UserCheck} label="Drivers Rostered" value="3,510" delta={-0.5} color={C.amber} sub="of 3,680 req." />
      <Kpi icon={GitBranch} label="Schedule Adherence" value="87.6%" delta={2.1} color={C.violet} />
      <Kpi icon={AlertTriangle} label="Maintenance Alerts" value={String(liveDelay)} delta={-5.3} color={C.red} />
      <Kpi icon={Zap} label="Avg Fleet Utilisation" value="76.5%" delta={1.4} color={C.cyan} />
    </div>
  );
}
