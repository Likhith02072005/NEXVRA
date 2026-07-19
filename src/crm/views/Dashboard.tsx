import { getStatusColor, Lead } from '../data/leads';

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: string }) {
  return (
    <div style={{
      background: 'var(--dark-gray)',
      border: '1px solid var(--mid-gray)',
      borderBottom: `3px solid ${accent || 'var(--red)'}`,
      padding: '24px',
      position: 'relative',
    }}>
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '8px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--gray)',
        marginBottom: '12px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '42px',
        lineHeight: 1,
        color: 'var(--white)',
        marginBottom: '6px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '8px',
        letterSpacing: '2px',
        color: 'var(--gray)',
        textTransform: 'uppercase',
      }}>
        {sub}
      </div>
    </div>
  );
}

export default function Dashboard({ leads }: { leads: Lead[] }) {
  const total = leads.length || 1;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const closedLeads = leads.filter(l => l.status === 'closed').length;
  const totalValue = leads.filter(l => l.status === 'closed').reduce((sum, l) => sum + l.value, 0);
  const pipelineValue = leads.filter(l => !['lost', 'closed'].includes(l.status)).reduce((sum, l) => sum + l.value, 0);
  const conversionRate = ((closedLeads / total) * 100).toFixed(0);

  const recentLeads = [...leads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

  const statusBreakdown = [
    { status: 'new', label: 'NEW', count: leads.filter(l => l.status === 'new').length },
    { status: 'contacted', label: 'CONTACTED', count: leads.filter(l => l.status === 'contacted').length },
    { status: 'qualified', label: 'QUALIFIED', count: leads.filter(l => l.status === 'qualified').length },
    { status: 'proposal', label: 'PROPOSAL', count: leads.filter(l => l.status === 'proposal').length },
    { status: 'closed', label: 'CLOSED', count: leads.filter(l => l.status === 'closed').length },
    { status: 'lost', label: 'LOST', count: leads.filter(l => l.status === 'lost').length },
  ];

  const sourceBreakdown = leads.reduce((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sources = Object.entries(sourceBreakdown).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Ticker bar */}
      <div style={{
        background: 'var(--black)',
        border: '1px solid var(--mid-gray)',
        borderLeft: '3px solid var(--red)',
        overflow: 'hidden',
        padding: '10px 0',
      }}>
        <div className="ticker-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              letterSpacing: '3px',
              color: 'var(--gray)',
              textTransform: 'uppercase',
              padding: '0 48px',
              whiteSpace: 'nowrap',
            }}>
              TOTAL LEADS: {total} &nbsp;&nbsp; PIPELINE VALUE: INR {(pipelineValue / 1000).toFixed(0)}K &nbsp;&nbsp; CONVERSION RATE: {conversionRate}% &nbsp;&nbsp; CLOSED REVENUE: INR {(totalValue / 1000).toFixed(0)}K &nbsp;&nbsp; NEW TODAY: {newLeads} &nbsp;&nbsp; SYSTEM: OPERATIONAL
            </span>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
        <StatCard
          label="Total Leads"
          value={String(total)}
          sub="All time database"
          accent="var(--red)"
        />
        <StatCard
          label="Pipeline Value"
          value={`INR ${(pipelineValue / 1000).toFixed(0)}K`}
          sub="Active opportunities"
          accent="var(--yellow)"
        />
        <StatCard
          label="Closed Revenue"
          value={`INR ${(totalValue / 1000).toFixed(0)}K`}
          sub="Won deals total"
          accent="var(--green)"
        />
        <StatCard
          label="Conversion Rate"
          value={`${conversionRate}%`}
          sub="Lead to close ratio"
          accent="#4fc3f7"
        />
      </div>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2px' }}>

        {/* Recent Leads */}
        <div style={{
          background: 'var(--dark-gray)',
          border: '1px solid var(--mid-gray)',
        }}>
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--mid-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
              RECENT LEADS
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--red)', textTransform: 'uppercase' }}>
              LAST 6 ENTRIES
            </div>
          </div>
          <div>
            {recentLeads.map((lead, i) => (
              <div key={lead.id} style={{
                padding: '14px 24px',
                borderBottom: i < recentLeads.length - 1 ? '1px solid var(--mid-gray)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--mid-gray)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
              >
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '8px',
                  color: 'var(--gray)',
                  letterSpacing: '1px',
                  width: '32px',
                  flexShrink: 0,
                }}>
                  {lead.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--white)', marginBottom: '2px' }}>
                    {lead.name}
                  </div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {lead.company} — {lead.service}
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    border: `1px solid ${getStatusColor(lead.status)}`,
                    color: getStatusColor(lead.status),
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    <span className="status-dot" style={{ background: getStatusColor(lead.status) }}></span>
                    {lead.status}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '16px',
                  color: 'var(--white)',
                  letterSpacing: '1px',
                  flexShrink: 0,
                  width: '80px',
                  textAlign: 'right',
                }}>
                  INR {(lead.value / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>

          {/* Status breakdown */}
          <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--mid-gray)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--white)',
            }}>
              PIPELINE STAGES
            </div>
            {statusBreakdown.map((s) => (
              <div key={s.status} style={{
                padding: '10px 20px',
                borderBottom: '1px solid var(--mid-gray)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span className="status-dot" style={{ background: getStatusColor(s.status as any) }}></span>
                <div style={{ flex: 1, fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '20px',
                  color: getStatusColor(s.status as any),
                  lineHeight: 1,
                }}>
                  {s.count}
                </div>
                <div style={{
                  width: '60px',
                  height: '3px',
                  background: 'var(--mid-gray)',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${(s.count / total) * 100}%`,
                    background: getStatusColor(s.status as any),
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Source breakdown */}
          <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)', flex: 1 }}>
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--mid-gray)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--white)',
            }}>
              LEAD SOURCES
            </div>
            {sources.map(([source, count]) => (
              <div key={source} style={{
                padding: '10px 20px',
                borderBottom: '1px solid var(--mid-gray)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{ flex: 1, fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
                  {source}
                </div>
                <div style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '18px',
                  color: 'var(--white)',
                  lineHeight: 1,
                }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
        <div style={{
          padding: '14px 24px',
          borderBottom: '1px solid var(--mid-gray)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '9px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--white)',
        }}>
          SYSTEM ACTIVITY LOG
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--mid-gray)' }}>
          {[
            { time: '14:32', event: 'New lead created', detail: 'Suresh Babu — RealEdge Properties', type: 'new' },
            { time: '13:15', event: 'Status updated', detail: 'Sneha Krishnan — QUALIFIED to PROPOSAL', type: 'update' },
            { time: '11:48', event: 'Deal closed', detail: 'Meena Chandran — INR 1.2L won', type: 'closed' },
            { time: '10:20', event: 'Follow-up due', detail: 'Priya Nair — No response 48hrs', type: 'alert' },
          ].map((log, i) => (
            <div key={i} style={{
              background: 'var(--dark-gray)',
              padding: '16px 20px',
              borderLeft: `2px solid ${log.type === 'new' ? 'var(--yellow)' : log.type === 'closed' ? 'var(--green)' : log.type === 'alert' ? 'var(--red)' : '#4fc3f7'}`,
            }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', marginBottom: '6px' }}>
                {log.time} TODAY
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--white)', marginBottom: '4px' }}>
                {log.event}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {log.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
