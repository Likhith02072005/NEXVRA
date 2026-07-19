import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>

      {/* System info bar */}
      <div style={{
        background: 'var(--black)',
        border: '1px solid var(--mid-gray)',
        borderLeft: '3px solid var(--green)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-dot" style={{ background: 'var(--green)', animation: 'pulse 2s infinite' }}></span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--green)', textTransform: 'uppercase' }}>
            SYSTEM ONLINE
          </span>
        </div>
        <div style={{ width: '1px', height: '16px', background: 'var(--mid-gray)' }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
          NEXVRA CRM v1.0.0
        </span>
        <div style={{ width: '1px', height: '16px', background: 'var(--mid-gray)' }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
          BUILD: 2025-JAN-17
        </span>
      </div>

      {/* Settings grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>

        {/* Workspace */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--mid-gray)', fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
            WORKSPACE
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Agency Name', value: 'NEXVRA Digital' },
              { label: 'Admin Email', value: 'admin@nexvra.in' },
              { label: 'Phone', value: '+91 98765 00000' },
              { label: 'Location', value: 'Bangalore, Karnataka' },
              { label: 'Currency', value: 'INR' },
              { label: 'Timezone', value: 'Asia/Kolkata (IST)' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {label}
                </div>
                <input
                  defaultValue={value}
                  style={{
                    width: '100%',
                    background: 'var(--black)',
                    border: '1px solid var(--mid-gray)',
                    borderBottom: '2px solid var(--mid-gray)',
                    color: 'var(--white)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '12px',
                    padding: '10px 14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderBottomColor = 'var(--red)'; }}
                  onBlur={e => { e.target.style.borderBottomColor = 'var(--mid-gray)'; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--mid-gray)', fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
            NOTIFICATIONS
          </div>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'New Lead Alert', sub: 'Notify when a new lead is created', on: true },
              { label: 'Follow-up Reminder', sub: 'Alert for overdue follow-ups', on: true },
              { label: 'Deal Closed', sub: 'Celebrate won deals', on: true },
              { label: 'Lead Lost', sub: 'Notify when a lead is marked lost', on: false },
              { label: 'Weekly Report', sub: 'Sunday pipeline summary email', on: true },
              { label: 'WhatsApp Integration', sub: 'Auto-notify leads via WhatsApp', on: false },
            ].map((item, i) => (
              <ToggleRow key={i} label={item.label} sub={item.sub} defaultOn={item.on} />
            ))}
          </div>
        </div>

        {/* Pipeline stages */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--mid-gray)', fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
            PIPELINE STAGES
          </div>
          <div style={{ padding: '16px 0' }}>
            {[
              { stage: 'NEW', color: 'var(--yellow)', desc: 'Fresh lead, not yet contacted' },
              { stage: 'CONTACTED', color: '#4fc3f7', desc: 'Initial contact made' },
              { stage: 'QUALIFIED', color: 'var(--green)', desc: 'Budget + need confirmed' },
              { stage: 'PROPOSAL', color: '#ce93d8', desc: 'Proposal sent, awaiting decision' },
              { stage: 'CLOSED', color: 'var(--red)', desc: 'Deal won and signed' },
              { stage: 'LOST', color: 'var(--gray)', desc: 'Deal not converted' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--mid-gray)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span className="status-dot" style={{ background: s.color, width: '8px', height: '8px' }}></span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: s.color, letterSpacing: '2px', textTransform: 'uppercase', width: '90px', flexShrink: 0 }}>
                  {s.stage}
                </span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', color: 'var(--gray)' }}>
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div style={{ background: 'var(--dark-gray)', border: '1px solid var(--mid-gray)' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--mid-gray)', fontFamily: 'Space Mono, monospace', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--white)' }}>
            INTEGRATIONS
          </div>
          <div style={{ padding: '16px 0' }}>
            {[
              { name: 'Meta Ads', status: 'connected', color: 'var(--green)' },
              { name: 'Google Ads', status: 'connected', color: 'var(--green)' },
              { name: 'WhatsApp Business', status: 'connected', color: 'var(--green)' },
              { name: 'Gmail / SMTP', status: 'not configured', color: 'var(--red)' },
              { name: 'Razorpay', status: 'not configured', color: 'var(--red)' },
              { name: 'Slack Notifications', status: 'disconnected', color: 'var(--gray)' },
            ].map((intg, i) => (
              <div key={i} style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--mid-gray)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span className="status-dot" style={{ background: intg.color }}></span>
                <span style={{ flex: 1, fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', color: 'var(--white)', fontWeight: 500 }}>
                  {intg.name}
                </span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: intg.color, textTransform: 'uppercase' }}>
                  {intg.status}
                </span>
                <button style={{
                  background: 'none',
                  border: '1px solid var(--mid-gray)',
                  color: 'var(--gray)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  transition: 'all 0.15s',
                }}>
                  CONFIG
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Save button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button style={{
          background: 'none',
          border: '2px solid var(--mid-gray)',
          color: 'var(--gray)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '14px 28px',
        }}>
          RESET
        </button>
        <button
          onClick={handleSave}
          style={{
            background: saved ? 'var(--green)' : 'var(--red)',
            border: 'none',
            color: 'var(--black)',
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '14px 32px',
            fontWeight: 700,
            transition: 'background 0.2s',
          }}
        >
          {saved ? 'SAVED' : 'SAVE CHANGES'}
        </button>
      </div>

    </div>
  );
}

function ToggleRow({ label, sub, defaultOn }: { label: string; sub: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{
      padding: '14px 0',
      borderBottom: '1px solid var(--mid-gray)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--white)', marginBottom: '2px' }}>
          {label}
        </div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {sub}
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        style={{
          width: '40px',
          height: '20px',
          background: on ? 'var(--red)' : 'var(--mid-gray)',
          border: 'none',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute',
          top: '2px',
          left: on ? '22px' : '2px',
          width: '16px',
          height: '16px',
          background: 'var(--white)',
          transition: 'left 0.2s',
        }} />
      </button>
    </div>
  );
}
