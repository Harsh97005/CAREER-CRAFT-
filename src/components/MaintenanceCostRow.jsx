import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { C } from '../theme';
import { costBreakdown, maintenanceQueue, weeklyFleetUtil } from '../dashboardData';
import { Panel, PriBadge, Tip } from './DashboardPrimitives';

export default function MaintenanceCostRow() {
  return (
    <div className="grid-d" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 1fr', gap: 14 }}>
      <Panel title="Maintenance Queue (Priority)" accent={C.red}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>{['Bus ID', 'Type', 'Issue', 'Due', 'Est.', 'Priority'].map((h) => (
              <th key={h} style={{ padding: '6px 8px', textAlign: 'left', color: C.muted, borderBottom: `1px solid ${C.border}`, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {maintenanceQueue.map((item) => (
              <tr key={item.id} style={{ borderBottom: `1px solid ${C.border}55` }}>
                <td style={{ padding: '8px 8px', color: C.blue, fontFamily: 'Rajdhani', fontWeight: 700 }}>{item.id}</td>
                <td style={{ padding: '8px 8px', color: C.sub, fontSize: 11 }}>{item.type}</td>
                <td style={{ padding: '8px 8px', color: C.text }}>{item.issue}</td>
                <td style={{ padding: '8px 8px', color: item.due === 'Today' ? C.red : item.due === 'Tomorrow' ? C.amber : C.sub, fontSize: 11, fontWeight: 600 }}>{item.due}</td>
                <td style={{ padding: '8px 8px', color: C.sub }}>{item.est}</td>
                <td style={{ padding: '8px 8px' }}><PriBadge p={item.pri} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Panel title="Weekly Fleet Utilisation" accent={C.blue}>
        <ResponsiveContainer width="100%" height={205}>
          <BarChart data={weeklyFleetUtil}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="week" tick={{ fill: C.sub, fontSize: 11 }} />
            <YAxis tick={{ fill: C.sub, fontSize: 10 }} domain={[60, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="util" name="Utilisation %" radius={[5, 5, 0, 0]}>
              {weeklyFleetUtil.map((_, index) => <Cell key={index} fill={index === 4 ? C.blue : `${C.blue}66`} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Cost Breakdown" accent={C.amber}>
        <ResponsiveContainer width="100%" height={140}>
          <PieChart>
            <Pie data={costBreakdown} cx="50%" cy="50%" innerRadius={34} outerRadius={56} paddingAngle={3} dataKey="value">
              {costBreakdown.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip content={<Tip />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 5 }}>
          {costBreakdown.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 2, background: item.color, display: 'inline-block' }} />
                <span style={{ color: C.sub }}>{item.name}</span>
              </div>
              <span style={{ color: C.text, fontFamily: 'Rajdhani', fontWeight: 700 }}>{item.value}%</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
