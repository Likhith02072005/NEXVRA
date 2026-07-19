import { Lead, getStatusColor, pipelineStages, stageLabels } from '../data/leads';

function BarChart({ data, maxVal }: { data: { label: string; value: number; color: string }[]; maxVal: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {data.map(({ label, value, color }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '1px', color: 'var(--gray)', textTransform: 'uppercase', width: '80px', flexShrink: 0, textAlign: 'right' }}>
            {label}
          </div>
          <div style={{ flex: 1, height: '20px', background: 'var(--black)', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              height: '100%',
              width: `${(value / maxVal) * 100}%`,
              background: color,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: 'var(--white)', lineHeight: 1, width: '60px', textAlign: 'right', letterSpacing: '1px' }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Analytics({ leads }: { leads: Lead[] }) {
  const totalLeads = leads.length;
  const closedLeads = leads.filter(l => l.status === 'closed');
  const lostLeads = leads.filter(l => l.status === 'lost');
  const activeLeads = leads.filter(l => !['closed', 'lost'].includes(l.status));

  const totalRevenue = closedLeads.reduce((s, l) => s + l.value, 0);
  const pipelineValue = activeLeads.reduce((s, l) => s + l.value, 0);
  const avgDealSize = totalRevenue / (closedLeads.length || 1);
  const winRate = ((closedLeads.length / (closedLeads.length + lostLeads.length || 1)) * 100).toFixed(0);

  const statusData = pipelineStages.map(s => ({
    label: stageLabels[s],
    value: leads.filter(l => l.status === s).length,
    color: getStatusColor(s),
  }));
  const maxStatusCount = Math.max(...statusData.map(d => d.value), 1);

  const sourceData = Object.entries(
    leads.reduce((acc, l) => { acc[l.source] = (acc[l.source] || 0) + 1; return acc; }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value, color: 'var(--red)' }));
  const maxSourceCount = Math.max(...sourceData.map(d => d.value), 1);

  const serviceData = Object.entries(
    leads.reduce((acc, l) => { acc[l.service] = (acc[l.service] || 0) + 1; return acc; }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value, color: 'var(--yellow)' }));
  const maxServiceCount = Math.max(...serviceData.map(d => d.value), 1);

  const locationData = Object.entries(
    leads.reduce((acc, l) => { acc[l.location] = (acc[l.location] || 0) + 1; return acc; }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value, color: 'var(--green)' }));
  const maxLocationCount = Math.max(...locationData.map(d => d.value), 1);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
        {[
          { label: 'Total Revenue', value: `INR ${(totalRevenue / 1000).toFixed(0)}K`, sub: 'From closed deals', accent: 'var(--green)' },
          { label: 'Pipeline Value', value: `INR ${(pipelineValue / 1000).toFixed(0)}K`, sub: 'Active opportunities', accent: 'var(--yellow)' },
          { label: 'Avg Deal Size', value: `INR ${(avgDealSize / 1000).toFixed(0)}K`, sub: 'Per closed lead', accent: '#4fc3f7' },
          { label: 'Win Rate', value: `${winRate}%`, sub: 'Close vs lost ratio', accent: 'var(--red)' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            background: 'var(--dark-gray)',
            border: '1px solid var(--mid-gray)',
            borderBottom: `3px solid ${kpi.accent}`,
            padding: '24px',
          }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '12px' }}>
              {kpi.label}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '38px', lineHeight: 1, color: 'var(--white)', marginBottom: '6px' }}>
              {kpi.value}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Secondary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
        {[
          { label: 'Total Leads', val: totalLeads, color: 'var(--white)' },
          { label: 'Active', val: activeLeads.length, color: 'var(--yellow)' },
          { label: 'Closed Won', val: closedLeads.length, color: 'var(--green)' },
          { label: 'Lost', val: lostLeads.length, color: 'var(--red)' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--dark-gray)',
            border: '1px solid var(--mid-gray)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gray)' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: s.color, lineHeight: 1 }}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>

        {/* Status breakdown */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)', padding: '24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '24px' }}>
            LEADS BY STATUS
          </div>
          <BarChart data={statusData} maxVal={maxStatusCount} />
        </div>

        {/* Source breakdown */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)', padding: '24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '24px' }}>
            LEADS BY SOURCE
          </div>
          <BarChart data={sourceData} maxVal={maxSourceCount} />
        </div>

        {/* Service breakdown */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)', padding: '24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '24px' }}>
            LEADS BY SERVICE
          </div>
          <BarChart data={serviceData} maxVal={maxServiceCount} />
        </div>

        {/* Location breakdown */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)', padding: '24px' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '24px' }}>
            LEADS BY LOCATION
          </div>
          <BarChart data={locationData} maxVal={maxLocationCount} />
        </div>
      </div>

      {/* Revenue table */}
      <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--mid-gray)', fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
          CLOSED DEALS — REVENUE BREAKDOWN
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--mid-gray)', background: 'var(--black)' }}>
              {['CLIENT', 'COMPANY', 'SERVICE', 'VALUE', 'DATE'].map(col => (
                <th key={col} style={{ padding: '10px 20px', fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', textAlign: 'left', fontWeight: 400, borderRight: '1px solid var(--mid-gray)' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {closedLeads.sort((a, b) => b.value - a.value).map((lead, i) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid var(--mid-gray)', background: i % 2 === 0 ? 'var(--dark-gray)' : 'var(--black)' }}>
                <td style={{ padding: '12px 20px', borderRight: '1px solid var(--mid-gray)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>
                  {lead.name}
                </td>
                <td style={{ padding: '12px 20px', borderRight: '1px solid var(--mid-gray)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', color: 'var(--concrete)' }}>
                  {lead.company}
                </td>
                <td style={{ padding: '12px 20px', borderRight: '1px solid var(--mid-gray)', fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {lead.service}
                </td>
                <td style={{ padding: '12px 20px', borderRight: '1px solid var(--mid-gray)', fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: 'var(--green)', letterSpacing: '1px' }}>
                  INR {lead.value.toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '12px 20px', fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px' }}>
                  {lead.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
