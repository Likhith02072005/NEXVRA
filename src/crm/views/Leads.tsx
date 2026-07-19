import { useState } from 'react';
import { Lead, LeadStatus, getStatusColor, pipelineStages, stageLabels } from '../data/leads';

interface LeadsProps {
  searchQuery: string;
  leads: Lead[];
  onUpdateLeadStatus: (id: string, newStatus: LeadStatus) => void;
}

export default function Leads({ searchQuery, leads: allLeads, onUpdateLeadStatus }: LeadsProps) {
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'name'>('date');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filtered = allLeads
    .filter(l => {
      if (filterStatus !== 'all' && l.status !== filterStatus) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.service.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'value') return b.value - a.value;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  const totalValue = filtered.reduce((sum, l) => sum + l.value, 0);

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Main table area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Toolbar */}
        <div style={{
          background: 'var(--dark-gray)',
          borderBottom: '2px solid var(--mid-gray)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
          flexWrap: 'wrap',
        }}>
          {/* Status filters */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginRight: '8px' }}>
              FILTER
            </div>
            {(['all', ...pipelineStages] as (LeadStatus | 'all')[]).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  background: filterStatus === status ? (status === 'all' ? 'var(--red)' : getStatusColor(status as LeadStatus)) : 'none',
                  border: `1px solid ${status === 'all' ? 'var(--mid-gray)' : getStatusColor(status as LeadStatus)}`,
                  color: filterStatus === status ? 'var(--black)' : (status === 'all' ? 'var(--gray)' : getStatusColor(status as LeadStatus)),
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  transition: 'all 0.15s',
                  fontWeight: filterStatus === status ? 700 : 400,
                }}
              >
                {status === 'all' ? 'ALL' : stageLabels[status as LeadStatus]}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '20px', background: 'var(--mid-gray)' }} />

          {/* Sort */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginRight: '8px' }}>
              SORT
            </div>
            {(['date', 'value', 'name'] as const).map(sort => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                style={{
                  background: sortBy === sort ? 'var(--mid-gray)' : 'none',
                  border: '1px solid var(--mid-gray)',
                  color: sortBy === sort ? 'var(--white)' : 'var(--gray)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                }}
              >
                {sort.toUpperCase()}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Summary */}
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
            {filtered.length} LEADS &nbsp;|&nbsp; INR {(totalValue / 1000).toFixed(0)}K TOTAL VALUE
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
              <tr style={{ background: 'var(--black)', borderBottom: '2px solid var(--mid-gray)' }}>
                {['ID', 'LEAD', 'COMPANY', 'SERVICE', 'SOURCE', 'STATUS', 'VALUE', 'DATE', 'ACTIONS'].map(col => (
                  <th key={col} style={{
                    padding: '10px 16px',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '2px',
                    color: 'var(--gray)',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                    fontWeight: 400,
                    borderRight: '1px solid var(--mid-gray)',
                    whiteSpace: 'nowrap',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead === selectedLead ? null : lead)}
                  style={{
                    borderBottom: '1px solid var(--mid-gray)',
                    background: selectedLead?.id === lead.id ? 'var(--mid-gray)' : i % 2 === 0 ? 'var(--dark-gray)' : 'var(--black)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => {
                    if (selectedLead?.id !== lead.id) (e.currentTarget as HTMLTableRowElement).style.background = '#1a1a1a';
                  }}
                  onMouseLeave={e => {
                    if (selectedLead?.id !== lead.id) (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? 'var(--dark-gray)' : 'var(--black)';
                  }}
                >
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'var(--gray)', letterSpacing: '1px' }}>
                      {lead.id}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 600, color: 'var(--white)', marginBottom: '2px' }}>
                      {lead.name}
                    </div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px' }}>
                      {lead.email}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', color: 'var(--concrete)', whiteSpace: 'nowrap' }}>
                      {lead.company}
                    </div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {lead.location}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '1px', color: 'var(--gray)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {lead.service}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '1px', color: 'var(--gray)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {lead.source}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
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
                      whiteSpace: 'nowrap',
                    }}>
                      <span className="status-dot" style={{ background: getStatusColor(lead.status), width: '5px', height: '5px' }}></span>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: 'var(--white)', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                      INR {lead.value.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', borderRight: '1px solid var(--mid-gray)' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                      {lead.date}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{
                        background: 'none',
                        border: '1px solid var(--mid-gray)',
                        color: 'var(--gray)',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '8px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        padding: '4px 8px',
                        transition: 'all 0.15s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--white)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--white)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--mid-gray)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray)'; }}
                      >
                        VIEW
                      </button>
                      <button style={{
                        background: 'none',
                        border: '1px solid var(--mid-gray)',
                        color: 'var(--gray)',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '8px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        padding: '4px 8px',
                        transition: 'all 0.15s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--red)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--red)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--mid-gray)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--gray)'; }}
                      >
                        EDIT
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div style={{
              padding: '80px 40px',
              textAlign: 'center',
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '3px',
              color: 'var(--gray)',
              textTransform: 'uppercase',
            }}>
              NO LEADS MATCH CURRENT FILTERS
            </div>
          )}
        </div>
      </div>

      {/* Lead detail panel */}
      {selectedLead && (
        <div style={{
          width: '320px',
          background: 'var(--dark-gray)',
          borderLeft: '2px solid var(--mid-gray)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
          animation: 'slideIn 0.2s ease',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--mid-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
              LEAD DETAIL
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              style={{
                background: 'none',
                border: '1px solid var(--mid-gray)',
                color: 'var(--gray)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              X
            </button>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
            {/* ID + Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'var(--gray)', letterSpacing: '2px' }}>
                {selectedLead.id}
              </span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '3px 8px',
                border: `1px solid ${getStatusColor(selectedLead.status)}`,
                color: getStatusColor(selectedLead.status),
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                <span className="status-dot" style={{ background: getStatusColor(selectedLead.status), width: '5px', height: '5px' }}></span>
                {selectedLead.status}
              </span>
            </div>

            {/* Name */}
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', lineHeight: 1, color: 'var(--white)', marginBottom: '4px', letterSpacing: '1px' }}>
              {selectedLead.name}
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', color: 'var(--gray)', marginBottom: '20px' }}>
              {selectedLead.company} — {selectedLead.location}
            </div>

            {/* Value */}
            <div style={{
              background: 'var(--black)',
              border: '1px solid var(--mid-gray)',
              borderLeft: '3px solid var(--green)',
              padding: '12px 16px',
              marginBottom: '20px',
            }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '4px' }}>
                DEAL VALUE
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', color: 'var(--green)', lineHeight: 1, letterSpacing: '1px' }}>
                INR {selectedLead.value.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Details */}
            {[
              { label: 'Email', value: selectedLead.email },
              { label: 'Phone', value: selectedLead.phone },
              { label: 'Service', value: selectedLead.service },
              { label: 'Source', value: selectedLead.source },
              { label: 'Lead Date', value: selectedLead.date },
              { label: 'Last Contact', value: selectedLead.lastContact },
              { label: 'Assigned To', value: selectedLead.assignedTo },
            ].map(({ label, value }) => (
              <div key={label} style={{
                borderBottom: '1px solid var(--mid-gray)',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '8px',
              }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', flexShrink: 0 }}>
                  {label}
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'var(--concrete)', textAlign: 'right' }}>
                  {value}
                </div>
              </div>
            ))}

            {/* Notes */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '8px' }}>
                NOTES
              </div>
              <div style={{
                background: 'var(--black)',
                border: '1px solid var(--mid-gray)',
                padding: '12px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '11px',
                color: 'var(--concrete)',
                lineHeight: 1.6,
              }}>
                {selectedLead.notes}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
              <button 
                onClick={() => onUpdateLeadStatus(selectedLead.id, 'contacted')}
                style={{
                  background: 'var(--red)',
                  border: 'none',
                  color: 'var(--black)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '12px 20px',
                  fontWeight: 700,
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                MARK AS CONTACTED
              </button>
              <button 
                onClick={() => onUpdateLeadStatus(selectedLead.id, 'proposal')}
                style={{
                  background: 'none',
                  border: '1px solid var(--mid-gray)',
                  color: 'var(--gray)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                SEND PROPOSAL
              </button>
              <button 
                onClick={() => onUpdateLeadStatus(selectedLead.id, 'closed')}
                style={{
                  background: 'none',
                  border: '1px solid var(--green)',
                  color: 'var(--green)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                CLOSE DEAL (WON)
              </button>
              <button 
                onClick={() => onUpdateLeadStatus(selectedLead.id, 'lost')}
                style={{
                  background: 'none',
                  border: '1px solid #ff5555',
                  color: '#ff5555',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                MARK AS LOST
              </button>
              <button 
                onClick={() => onUpdateLeadStatus(selectedLead.id, 'delete' as any)}
                style={{
                  background: 'rgba(255, 85, 85, 0.1)',
                  border: '1px dashed #ff5555',
                  color: '#ff5555',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                DELETE PERMANENTLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
