import { Lead, LeadStatus, getStatusColor, pipelineStages, stageLabels } from '../data/leads';

export default function Pipeline({ leads }: { leads: Lead[] }) {
  const getLeadsByStatus = (status: LeadStatus) => leads.filter(l => l.status === status);

  const getColumnValue = (status: LeadStatus) =>
    getLeadsByStatus(status).reduce((sum, l) => sum + l.value, 0);

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {pipelineStages.map(stage => {
            const count = getLeadsByStatus(stage).length;
            const val = getColumnValue(stage);
            return (
              <div key={stage} style={{
                background: 'var(--dark-gray)',
                border: '1px solid var(--mid-gray)',
                borderTop: `2px solid ${getStatusColor(stage)}`,
                padding: '10px 16px',
                minWidth: '100px',
              }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {stageLabels[stage]}
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: getStatusColor(stage), lineHeight: 1 }}>
                  {count}
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'var(--gray)', letterSpacing: '1px', marginTop: '2px' }}>
                  INR {(val / 1000).toFixed(0)}K
                </div>
              </div>
            );
          })}
        </div>
        <div style={{
          background: 'var(--dark-gray)',
          border: '1px solid var(--mid-gray)',
          borderLeft: '3px solid var(--red)',
          padding: '10px 20px',
        }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
            TOTAL PIPELINE
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: 'var(--white)', lineHeight: 1 }}>
            INR {(leads.reduce((s, l) => s + l.value, 0) / 1000).toFixed(0)}K
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${pipelineStages.length}, 1fr)`,
        gap: '2px',
        flex: 1,
        overflow: 'hidden',
      }}>
        {pipelineStages.map(stage => {
          const stageLeads = getLeadsByStatus(stage);
          return (
            <div key={stage} style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--dark-gray)',
              border: '1px solid var(--mid-gray)',
              overflow: 'hidden',
            }}>
              {/* Column header */}
              <div style={{
                padding: '12px 14px',
                borderBottom: `2px solid ${getStatusColor(stage)}`,
                background: 'var(--black)',
                flexShrink: 0,
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                }}>
                  <span className="status-dot" style={{ background: getStatusColor(stage) }}></span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: getStatusColor(stage), textTransform: 'uppercase' }}>
                    {stageLabels[stage]}
                  </span>
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', color: 'var(--white)', lineHeight: 1, letterSpacing: '1px' }}>
                  {stageLeads.length} LEADS
                </div>
              </div>

              {/* Cards */}
              <div style={{ flex: 1, overflow: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {stageLeads.map(lead => (
                  <PipelineCard key={lead.id} lead={lead} stage={stage} />
                ))}
                {stageLeads.length === 0 && (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '2px',
                    color: 'var(--gray)',
                    textTransform: 'uppercase',
                    opacity: 0.5,
                    border: '1px dashed var(--mid-gray)',
                    marginTop: '8px',
                  }}>
                    EMPTY
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PipelineCard({ lead, stage }: { lead: Lead; stage: LeadStatus }) {
  return (
    <div style={{
      background: 'var(--black)',
      border: '1px solid var(--mid-gray)',
      borderLeft: `2px solid ${getStatusColor(stage)}`,
      padding: '12px',
      transition: 'all 0.15s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'var(--mid-gray)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.background = 'var(--black)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* ID + Source */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'var(--gray)', letterSpacing: '1px' }}>
          {lead.id}
        </span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {lead.source}
        </span>
      </div>

      {/* Name */}
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--white)', marginBottom: '2px' }}>
        {lead.name}
      </div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
        {lead.company}
      </div>

      {/* Service tag */}
      <div style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '7px',
        letterSpacing: '1px',
        color: 'var(--gray)',
        textTransform: 'uppercase',
        padding: '3px 6px',
        border: '1px solid var(--mid-gray)',
        display: 'inline-block',
        marginBottom: '10px',
      }}>
        {lead.service}
      </div>

      {/* Value */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--mid-gray)',
        paddingTop: '8px',
      }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: 'var(--white)', lineHeight: 1, letterSpacing: '1px' }}>
          INR {(lead.value / 1000).toFixed(0)}K
        </div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'var(--gray)', letterSpacing: '1px' }}>
          {lead.date}
        </div>
      </div>
    </div>
  );
}
