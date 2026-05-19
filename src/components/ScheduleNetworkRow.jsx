import React from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { C } from '../theme';
import { scheduleData } from '../dashboardData';
import { Gauge, Panel, Tip } from './DashboardPrimitives';

export default function ScheduleNetworkRow() {
  return (
    <div className="grid-a" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 14 }}>
      <Panel title="Schedule Adherence - Hourly (Today)" accent={C.blue}>
        <ResponsiveContainer width="100%" height={235}>
          <ComposedChart data={scheduleData}>
            <defs>
              <linearGradient id="adhG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.green} stopOpacity={0.3} />
                <stop offset="100%" stopColor={C.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="t" tick={{ fill: C.sub, fontSize: 10 }} tickFormatter={(v) => `${v}:00`} />
            <YAxis yAxisId="l" tick={{ fill: C.sub, fontSize: 10 }} domain={[50, 100]} />
            <YAxis yAxisId="r" orientation="right" tick={{ fill: C.sub, fontSize: 10 }} />
            <Tooltip content={<Tip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: C.sub }} />
            <Line yAxisId="l" type="monotone" dataKey="target" stroke={C.muted} strokeDasharray="4 2" strokeWidth={1} name="Target %" dot={false} />
            <Area yAxisId="l" type="monotone" dataKey="adh" stroke={C.green} fill="url(#adhG)" strokeWidth={2} name="Adherence %" />
            <Bar yAxisId="r" dataKey="delay" name="Delays" fill={C.red} radius={[3, 3, 0, 0]} opacity={0.75} />
          </ComposedChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Network Health" accent={C.violet}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', paddingTop: 10 }}>
          <Gauge value={87} label="Fleet Coverage" color={C.blue} />
          <Gauge value={76} label="Schedule Fit" color={C.green} />
          <Gauge value={69} label="Maint. Ready" color={C.amber} />
        </div>
      </Panel>
    </div>
  );
}
