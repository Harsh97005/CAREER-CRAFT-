import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { C, cardStyle } from '../theme';

export function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.panel2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: C.sub, marginBottom: 5 }}>{label}</div>
      {payload.map((p, i) => p.value != null && (
        <div key={i} style={{ color: p.color || C.text, marginBottom: 2 }}>
          {p.name}: <b>{typeof p.value === 'number' ? p.value.toLocaleString('en-IN') : p.value}</b>
        </div>
      ))}
    </div>
  );
}

export function Kpi({ icon: Icon, label, value, delta, color, sub }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const numberValue = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    let step = 0;
    const steps = 50;
    const id = setInterval(() => {
      step += 1;
      setAnimatedValue(numberValue * Math.min(step / steps, 1));
      if (step >= steps) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [numberValue]);

  const raw = String(value);
  const suffix = raw.match(/[^0-9.,]+$/)?.[0] || '';
  const display = raw.includes('.')
    ? `${animatedValue.toFixed(1)}${suffix}`
    : `${Math.round(animatedValue).toLocaleString('en-IN')}${suffix}`;

  return (
    <div style={{ ...cardStyle, padding: '18px 18px', position: 'relative', overflow: 'hidden', animation: 'fadeUp .45s ease both' }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 92% 8%, ${color}18 0%, transparent 60%)` }} />
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ background: `${color}1f`, borderRadius: 8, padding: 7, display: 'flex' }}>
            <Icon size={17} color={color} />
          </div>
          <span style={{ fontSize: 11, color: delta > 0 ? C.green : C.red, display: 'flex', alignItems: 'center', gap: 3 }}>
            {delta > 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}{Math.abs(delta)}%
          </span>
        </div>
        <div style={{ fontSize: 30, fontFamily: 'Rajdhani', fontWeight: 700, color: color === C.red ? C.red : C.text, lineHeight: 1 }}>{display}</div>
        <div style={{ fontSize: 11, color: C.sub, marginTop: 7, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
        {sub && <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

export function Panel({ title, children, cols = 1, accent }) {
  return (
    <section style={{ ...cardStyle, padding: 18, gridColumn: `span ${cols}`, animation: 'fadeUp .55s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          {accent && <div style={{ width: 3, height: 16, borderRadius: 2, background: accent, boxShadow: `0 0 18px ${accent}55` }} />}
          <span style={{ color: C.text, fontFamily: 'Rajdhani', fontWeight: 700, fontSize: 15, letterSpacing: 1, textTransform: 'uppercase' }}>{title}</span>
        </div>
      </div>
      {children}
    </section>
  );
}

export function PriBadge({ p }) {
  const map = { High: [C.red, '#ff4d5222'], Medium: [C.amber, '#f59e0b22'], Low: [C.green, '#20d46b22'] };
  const [color, background] = map[p] || [C.sub, C.border];
  return <span style={{ background, color, borderRadius: 4, padding: '2px 7px', fontSize: 10 }}>{p}</span>;
}

export function Gauge({ value, label, color }) {
  const r = 34;
  const cx = 44;
  const cy = 44;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ * 0.75;
  const offset = circ * 0.125;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <svg width={88} height={64} style={{ overflow: 'visible' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={7} strokeDasharray={`${circ * 0.75} ${circ * 0.25}`} strokeDashoffset={-offset} strokeLinecap="round" transform={`rotate(135 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} strokeLinecap="round" transform={`rotate(135 ${cx} ${cy})`} style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 5px ${color}99)` }} />
        <text x={cx} y={cy + 5} textAnchor="middle" fill={C.text} fontSize={14} fontFamily="Rajdhani" fontWeight={700}>{value}%</text>
      </svg>
      <span style={{ fontSize: 10, color: C.sub, textAlign: 'center' }}>{label}</span>
    </div>
  );
}

export function Spark({ data, color }) {
  const w = 70;
  const h = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
    </svg>
  );
}
