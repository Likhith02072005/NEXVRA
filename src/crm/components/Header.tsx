interface HeaderProps {
  activeView: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onNewLead: () => void;
}

const viewLabels: Record<string, { title: string; sub: string }> = {
  dashboard: { title: 'DASHBOARD', sub: 'COMMAND CENTER — REAL TIME OVERVIEW' },
  leads: { title: 'LEADS', sub: 'ALL INCOMING LEADS — FULL DATABASE' },
  pipeline: { title: 'PIPELINE', sub: 'DEAL STAGES — VISUAL KANBAN' },
  contacts: { title: 'CONTACTS', sub: 'CLIENT & PROSPECT DIRECTORY' },
  tasks: { title: 'TASKS', sub: 'ACTION ITEMS — FOLLOW UPS' },
  analytics: { title: 'ANALYTICS', sub: 'PERFORMANCE METRICS — REVENUE INTEL' },
  settings: { title: 'SETTINGS', sub: 'SYSTEM CONFIGURATION' },
};

export default function Header({ activeView, searchQuery, setSearchQuery, onNewLead }: HeaderProps) {
  const view = viewLabels[activeView] || { title: activeView.toUpperCase(), sub: '' };
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <header style={{
      background: 'var(--dark-gray)',
      borderBottom: '2px solid var(--mid-gray)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      flexShrink: 0,
      gap: '24px',
    }}>
      {/* Left: View title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
        <div style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '28px',
          letterSpacing: '3px',
          color: 'var(--white)',
          lineHeight: 1,
          flexShrink: 0,
        }}>
          {view.title}
        </div>
        <div style={{
          width: '1px',
          height: '24px',
          background: 'var(--mid-gray)',
          flexShrink: 0,
        }} />
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '8px',
          letterSpacing: '2px',
          color: 'var(--gray)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {view.sub}
        </div>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 1, maxWidth: '360px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: 'var(--gray)',
            letterSpacing: '1px',
          }}>
            //
          </span>
          <input
            type="text"
            placeholder="SEARCH LEADS, CONTACTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--black)',
              border: '1px solid var(--mid-gray)',
              borderBottom: '2px solid var(--mid-gray)',
              color: 'var(--white)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '1px',
              padding: '10px 16px 10px 32px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = 'var(--red)'; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderBottomColor = 'var(--mid-gray)'; }}
          />
        </div>
      </div>

      {/* Right: Date/Time + Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'var(--white)', letterSpacing: '1px' }}>
            {timeStr}
          </div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px' }}>
            {dateStr}
          </div>
        </div>
        <div style={{
          width: '1px',
          height: '24px',
          background: 'var(--mid-gray)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="status-dot" style={{ background: 'var(--green)', animation: 'pulse 2s infinite' }}></span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--green)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            LIVE
          </span>
        </div>
        <button
          onClick={onNewLead}
          style={{
            background: 'var(--red)',
            border: 'none',
            color: 'var(--black)',
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '8px 16px',
            fontWeight: 700,
            transition: 'all 0.15s',
          }}
        >
          + NEW LEAD
        </button>
      </div>
    </header>
  );
}
