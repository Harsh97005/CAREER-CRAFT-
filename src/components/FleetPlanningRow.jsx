import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { C } from '../theme';
import { fleetData, radarData } from '../dashboardData';
import { Panel, Spark, Tip } from './DashboardPrimitives';

export default function FleetPlanningRow() {
  return (
    <div className="grid-b" style={{ display: 'grid', gridTemplateColumns: '2fr 1.6fr', gap: 14 }}>
      <Panel title="Fleet Allocation by Type" accent={C.green}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>{['Bus Type', 'Allocated', 'Required', 'Util %', 'Gap', 'Trend'].map((h) => (
              <th key={h} style={{ padding: '7px 10px', textAlign: 'left', color: C.muted, borderBottom: `1px solid ${C.border}`, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {fleetData.map((row, i) => {
              const gap = row.alloc - row.req;
              return (
                <tr key={row.type} style={{ borderBottom: `1px solid ${C.border}55`, background: i % 2 === 0 ? 'transparent' : `${C.blue}05` }}>
                  <td style={{ padding: '9px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: row.color, display: 'inline-block' }} />
                      <span style={{ color: C.text, fontWeight: 600 }}>{row.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: '9px 10px', color: C.text, fontFamily: 'Rajdhani', fontWeight: 700 }}>{row.alloc.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '9px 10px', color: C.sub }}>{row.req.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '9px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 44, height: 5, background: C.border, borderRadius: 3 }}>
                        <div style={{ width: `${row.util}%`, height: 5, borderRadius: 3, background: row.color }} />
                      </div>
                      <span style={{ color: row.color, fontSize: 11 }}>{row.util}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '9px 10px', color: gap >= 0 ? C.green : C.red }}>{gap >= 0 ? `+${gap}` : gap}</td>
                  <td style={{ padding: '9px 10px' }}><Spark data={[72, 75, 78, 80, row.util]} color={row.color} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
      <Panel title="Planning Health Radar" accent={C.violet}>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radarData} cx="50%" cy="50%">
            <PolarGrid stroke={C.border} />
            <PolarAngleAxis dataKey="axis" tick={{ fill: C.sub, fontSize: 9 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: C.muted, fontSize: 8 }} tickCount={4} />
            <Radar dataKey="val" stroke={C.violet} fill={C.violet} fillOpacity={0.2} strokeWidth={2} name="Health Score" />
            <Tooltip content={<Tip />} />
          </RadarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}
