import { Lead } from '../data/leads';

interface ContactsProps {
  searchQuery: string;
  leads: Lead[];
}

export default function Contacts({ searchQuery, leads }: ContactsProps) {
  const contacts = leads.filter(l => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.email.toLowerCase().includes(q);
  });

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '3px', color: 'var(--gray)', textTransform: 'uppercase' }}>
          {contacts.length} CONTACTS IN DATABASE
        </div>
        <button style={{
          background: 'none',
          border: '2px solid var(--white)',
          color: 'var(--white)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '9px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '10px 20px',
          transition: 'all 0.15s',
        }}>
          EXPORT CSV
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2px' }}>
        {contacts.map(contact => (
          <div key={contact.id} style={{
            background: 'var(--dark-gray)',
            border: '1px solid var(--mid-gray)',
            padding: '20px',
            transition: 'all 0.15s',
            position: 'relative',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--mid-gray)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--red)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--dark-gray)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--mid-gray)';
            }}
          >
            {/* ID badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '7px',
              letterSpacing: '1px',
              color: 'var(--gray)',
            }}>
              {contact.id}
            </div>

            {/* Avatar + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'var(--red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                color: 'var(--black)',
                flexShrink: 0,
              }}>
                {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--white)', lineHeight: 1.2 }}>
                  {contact.name}
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>
                  {contact.company}
                </div>
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'var(--concrete)', letterSpacing: '0px' }}>
                {contact.email}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'var(--gray)', letterSpacing: '0px' }}>
                {contact.phone}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {contact.location}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '7px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '3px 8px',
                border: '1px solid var(--mid-gray)',
                color: 'var(--gray)',
              }}>
                {contact.service}
              </span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '7px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '3px 8px',
                border: '1px solid var(--mid-gray)',
                color: 'var(--gray)',
              }}>
                {contact.source}
              </span>
            </div>

            {/* Status + Value */}
            <div style={{
              borderTop: '1px solid var(--mid-gray)',
              paddingTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '3px 8px',
                border: '1px solid var(--mid-gray)',
                color: 'var(--gray)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}>
                <span className="status-dot" style={{
                  background: contact.status === 'closed' ? 'var(--green)' : contact.status === 'new' ? 'var(--yellow)' : 'var(--gray)',
                  width: '5px',
                  height: '5px',
                }}></span>
                {contact.status}
              </span>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '16px', color: 'var(--white)', letterSpacing: '1px' }}>
                INR {(contact.value / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
