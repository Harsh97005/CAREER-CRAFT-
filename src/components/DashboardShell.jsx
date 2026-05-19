import React, { useEffect, useState } from 'react';
import DashboardFooter from './DashboardFooter';
import DriverRouteRow from './DriverRouteRow';
import FleetPlanningRow from './FleetPlanningRow';
import KpiRow from './KpiRow';
import MaintenanceCostRow from './MaintenanceCostRow';
import ScheduleNetworkRow from './ScheduleNetworkRow';
import TabBar from './TabBar';
import TopBar from './TopBar';
import { C } from '../theme';

export default function DashboardShell() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [filterDay, setFilterDay] = useState('Today');
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicker((value) => value + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const liveDelay = 342 + (ticker % 3 === 0 ? 1 : ticker % 3 === 1 ? -1 : 0);
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Exo+2:wght@300;400;500;600&display=swap');
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes spin{to{transform:rotate(360deg)}}
    *{box-sizing:border-box;}
    ::-webkit-scrollbar{width:5px;height:5px;}
    ::-webkit-scrollbar-track{background:${C.bg};}
    ::-webkit-scrollbar-thumb{background:${C.border};border-radius:6px;}
    body{margin:0;background:${C.bg};}
    button{font-family:inherit;}
    @media (max-width: 1500px){
      .topbar-stats{display:none !important;}
      .kpi-row{grid-template-columns:repeat(3,minmax(180px,1fr)) !important;}
    }
    @media (max-width: 1100px){
      header{grid-template-columns:1fr !important;padding:18px 20px !important;}
      header > div{justify-content:flex-start !important;text-align:left !important;border-left:0 !important;padding-left:0 !important;}
      nav{overflow-x:auto;justify-content:flex-start !important;}
      .grid-a,.grid-b,.grid-c,.grid-d{grid-template-columns:1fr !important;}
      .dashboard-footer{flex-wrap:wrap !important;justify-content:flex-start !important;}
    }
    @media (max-width: 760px){
      .kpi-row{grid-template-columns:1fr !important;}
      main{padding:14px !important;}
      nav button{min-width:145px !important;}
    }
  `;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Exo 2', sans-serif", color: C.text, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{css}</style>
      <TopBar filterDay={filterDay} setFilterDay={setFilterDay} />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg2} 100%)` }}>
        <KpiRow liveDelay={liveDelay} />
        <ScheduleNetworkRow />
        <FleetPlanningRow />
        <DriverRouteRow />
        <MaintenanceCostRow />
        <DashboardFooter liveDelay={liveDelay} />
      </main>
    </div>
  );
}
