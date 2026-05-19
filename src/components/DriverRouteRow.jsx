import React from 'react';
import { C } from '../theme';
import { driverData, routeMatrix } from '../dashboardData';
import { Panel } from './DashboardPrimitives';

export default function DriverRouteRow() {
  return (
    <div className="grid-c" style={{ display: 'grid', gridTemplateColumns: '1.4fr 2.6fr', gap: 14 }}>
      <Panel title="Driver Shift Roster" accent={C.amber}>
        {driverData.map((driver) => (
          <div key={driver.shift} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, gap: 10 }}>
              <span style={{ color: C.text, fontWeight: 600 }}>{driver.shift}</span>
              <div style={{ display: 'flex', gap: 10, fontSize: 11 }}>
                <span style={{ color: C.muted }}>Abs: <span style={{ color: C.red }}>{driver.absent}</span></span>
                <span style={{ color: C.muted }}>OT: <span style={{ color: C.cyan }}>{driver.overtime}</span></span>
                <span style={{ color: driver.coverage >= 95 ? C.green : driver.coverage >= 90 ? C.amber : C.red, fontFamily: 'Rajdhani', fontWeight: 700 }}>{driver.coverage}%</span>
              </div>
            </div>
            <div style={{ background: C.border, borderRadius: 4, height: 7, overflow: 'hidden' }}>
              <div style={{ width: `${driver.coverage}%`, height: 7, borderRadius: 4, background: driver.coverage >= 95 ? C.green : driver.coverage >= 90 ? C.amber : C.red, transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.muted, marginTop: 4 }}>
              <span>{driver.assigned} assigned</span><span>{driver.req} required</span>
            </div>
          </div>
        ))}
      </Panel>
      <Panel title="Route Performance Matrix" accent={C.cyan}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>{['Route', 'Buses', 'Trips/Day', 'Util%', 'On-Time%', 'Rev (\u20b9Cr)', 'Status'].map((h) => (
                <th key={h} style={{ padding: '7px 10px', textAlign: 'left', color: C.muted, borderBottom: `1px solid ${C.border}`, fontWeight: 600, fontSize: 11, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 0.8 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {routeMatrix.map((route, index) => {
                const status = route.util >= 80 ? ['Optimal', C.green] : route.util >= 65 ? ['Normal', C.blue] : ['Under-used', C.amber];
                return (
                  <tr key={route.route} style={{ borderBottom: `1px solid ${C.border}55`, background: index % 2 === 0 ? 'transparent' : `${C.cyan}05` }}>
                    <td style={{ padding: '9px 10px', color: C.text, fontWeight: 700 }}>{route.route}</td>
                    <td style={{ padding: '9px 10px', color: C.sub }}>{route.buses}</td>
                    <td style={{ padding: '9px 10px', color: C.sub }}>{route.trips}</td>
                    <td style={{ padding: '9px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 38, height: 5, background: C.border, borderRadius: 3 }}>
                          <div style={{ width: `${route.util}%`, height: 5, borderRadius: 3, background: route.util >= 80 ? C.green : route.util >= 65 ? C.blue : C.amber }} />
                        </div>
                        <span style={{ fontSize: 11, color: C.sub }}>{route.util}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '9px 10px', color: route.ontime >= 80 ? C.green : C.amber }}>{route.ontime}%</td>
                    <td style={{ padding: '9px 10px', color: C.text, fontFamily: 'Rajdhani', fontWeight: 700 }}>&#8377;{route.revenue}Cr</td>
                    <td style={{ padding: '9px 10px' }}>
                      <span style={{ background: `${status[1]}18`, color: status[1], border: `1px solid ${status[1]}33`, borderRadius: 4, padding: '2px 7px', fontSize: 10 }}>{status[0]}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
