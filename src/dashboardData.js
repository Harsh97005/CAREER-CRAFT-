import { Bus, CheckCircle, Navigation, Shield, XCircle, Zap } from 'lucide-react';
import { C } from './theme';

export const scheduleData = [
  { t: '06', adh: 94, delay: 3, target: 90 }, { t: '07', adh: 88, delay: 8, target: 90 },
  { t: '08', adh: 72, delay: 18, target: 90 }, { t: '09', adh: 69, delay: 22, target: 90 },
  { t: '10', adh: 85, delay: 11, target: 90 }, { t: '11', adh: 91, delay: 6, target: 90 },
  { t: '12', adh: 87, delay: 9, target: 90 }, { t: '13', adh: 83, delay: 12, target: 90 },
  { t: '14', adh: 79, delay: 16, target: 90 }, { t: '15', adh: 76, delay: 19, target: 90 },
  { t: '16', adh: 70, delay: 24, target: 90 }, { t: '17', adh: 65, delay: 29, target: 90 },
  { t: '18', adh: 68, delay: 25, target: 90 }, { t: '19', adh: 78, delay: 15, target: 90 },
  { t: '20', adh: 88, delay: 8, target: 90 }, { t: '21', adh: 93, delay: 4, target: 90 },
];

export const fleetData = [
  { type: 'AC Sleeper', alloc: 420, req: 480, util: 87, color: C.blue },
  { type: 'AC Seater', alloc: 580, req: 550, util: 91, color: C.green },
  { type: 'Non-AC Deluxe', alloc: 1240, req: 1100, util: 78, color: C.amber },
  { type: 'Ordinary', alloc: 902, req: 950, util: 83, color: C.violet },
];

export const routeMatrix = [
  { route: 'LKO\u2013NOIDA', buses: 42, trips: 186, util: 87, ontime: 82, revenue: 2.4 },
  { route: 'DEL\u2013LKO', buses: 38, trips: 162, util: 76, ontime: 79, revenue: 2.1 },
  { route: 'KNP\u2013DEL', buses: 29, trips: 124, util: 71, ontime: 74, revenue: 1.6 },
  { route: 'AGRA\u2013LKO', buses: 22, trips: 98, util: 65, ontime: 71, revenue: 1.2 },
  { route: 'VNS\u2013LKO', buses: 18, trips: 82, util: 61, ontime: 68, revenue: 1.0 },
  { route: 'MRT\u2013LKO', buses: 15, trips: 70, util: 58, ontime: 72, revenue: 0.9 },
  { route: 'GZB\u2013LKO', buses: 12, trips: 56, util: 54, ontime: 69, revenue: 0.7 },
];

export const maintenanceQueue = [
  { id: 'UP32-9312', type: 'AC Sleeper', issue: 'Engine overheating', due: 'Today', pri: 'High', est: '3h' },
  { id: 'UP32-7841', type: 'Non-AC Deluxe', issue: 'Brake pad replacement', due: 'Tomorrow', pri: 'High', est: '2h' },
  { id: 'UP32-4523', type: 'AC Seater', issue: 'AC compressor fault', due: '14 May', pri: 'Medium', est: '4h' },
  { id: 'UP32-6612', type: 'Ordinary', issue: 'Tyre rotation', due: '15 May', pri: 'Low', est: '1h' },
  { id: 'UP32-2901', type: 'AC Sleeper', issue: 'Windshield crack', due: '15 May', pri: 'Medium', est: '2h' },
];

export const driverData = [
  { shift: 'Morning', req: 1300, assigned: 1240, absent: 42, overtime: 18, coverage: 95.4 },
  { shift: 'Afternoon', req: 1050, assigned: 980, absent: 35, overtime: 12, coverage: 93.3 },
  { shift: 'Evening', req: 900, assigned: 870, absent: 28, overtime: 8, coverage: 96.7 },
  { shift: 'Night', req: 480, assigned: 420, absent: 18, overtime: 5, coverage: 87.5 },
];

export const radarData = [
  { axis: 'Fleet Coverage', val: 87 }, { axis: 'Stop Density', val: 74 },
  { axis: 'Schedule Fit', val: 81 }, { axis: 'Driver Avail.', val: 93 },
  { axis: 'Maintenance', val: 69 }, { axis: 'Route Balance', val: 78 },
];

export const weeklyFleetUtil = [
  { week: 'W14', util: 78 }, { week: 'W15', util: 81 },
  { week: 'W16', util: 76 }, { week: 'W17', util: 83 }, { week: 'W18', util: 85 },
];

export const costBreakdown = [
  { name: 'Fuel', value: 42, color: C.amber },
  { name: 'Driver Pay', value: 28, color: C.blue },
  { name: 'Maintenance', value: 16, color: C.violet },
  { name: 'Admin', value: 8, color: C.cyan },
  { name: 'Other', value: 6, color: C.muted },
];

export const footerStats = (liveDelay) => [
  { icon: Navigation, label: 'Total Distance', value: '7,25,698 km', color: C.blue },
  { icon: Bus, label: 'Total Trips', value: '17,842', color: C.green },
  { icon: CheckCircle, label: 'On-Time Perf.', value: '87.6%', color: C.green },
  { icon: XCircle, label: 'Buses Delayed', value: `${liveDelay}`, color: C.red },
  { icon: Zap, label: 'Avg Speed', value: '46 km/h', color: C.amber },
  { icon: Shield, label: 'Maint. Complete', value: '156 / 203', color: C.violet },
];

export const tabs = ['Overview', 'Fleet & Drivers', 'Routes & Stops', 'Maintenance', 'Cost Analysis'];
