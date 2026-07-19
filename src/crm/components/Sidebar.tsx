import { useState } from 'react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', abbr: 'DSH' },
  { id: 'leads', label: 'Leads', abbr: 'LDS' },
  { id: 'pipeline', label: 'Pipeline', abbr: 'PPL' },
  { id: 'contacts', label: 'Contacts', abbr: 'CTX' },
  { id: 'tasks', label: 'Tasks', abbr: 'TSK' },
  { id: 'analytics', label: 'Analytics', abbr: 'ANL' },
  { id: 'settings', label: 'Settings', abbr: 'SET' },
];

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? '64px' : '220px',
        background: 'var(--dark-gray)',
        borderRight: '2px solid var(--mid-gray)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        flexShrink: 0,
        zIndex: 10,
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 20px',
        borderBottom: '2px solid var(--mid-gray)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        minHeight: '64px',
      }}>
        {!collapsed && (
          <div>
            <div style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '22px',
              letterSpacing: '2px',
              color: 'var(--white)',
              lineHeight: 1,
            }}>
              NEX<em style={{ color: 'var(--red)', fontStyle: 'normal' }}>VRA</em>
            </div>
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '7px',
              letterSpacing: '3px',
              color: 'var(--gray)',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>
              CRM SYSTEM
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '18px',
            letterSpacing: '1px',
            color: 'var(--white)',
          }}>N<em style={{ color: 'var(--red)', fontStyle: 'normal' }}>X</em></div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none',
            border: '1px solid var(--mid-gray)',
            color: 'var(--gray)',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            flexShrink: 0,
          }}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      {/* System status */}
      {!collapsed && (
        <div style={{
          padding: '10px 20px',
          borderBottom: '1px solid var(--mid-gray)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span className="status-dot" style={{ background: 'var(--green)', animation: 'pulse 2s infinite' }}></span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
            SYSTEM ONLINE
          </span>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {!collapsed && (
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '7px',
            letterSpacing: '3px',
            color: 'var(--gray)',
            textTransform: 'uppercase',
            padding: '8px 20px 4px',
            opacity: 0.5,
          }}>
            NAVIGATION
          </div>
        )}
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              style={{
                width: '100%',
                padding: collapsed ? '14px 0' : '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: isActive ? 'var(--mid-gray)' : 'none',
                border: 'none',
                borderLeft: isActive ? '3px solid var(--red)' : '3px solid transparent',
                color: isActive ? 'var(--white)' : 'var(--gray)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign: 'left',
                transition: 'all 0.15s',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px',
                color: isActive ? 'var(--red)' : 'var(--gray)',
                letterSpacing: '1px',
                flexShrink: 0,
              }}>
                {item.abbr}
              </span>
              {!collapsed && (
                <span>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{
        padding: collapsed ? '16px 0' : '16px 20px',
        borderTop: '2px solid var(--mid-gray)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          background: 'var(--red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '14px',
          color: 'var(--black)',
          flexShrink: 0,
        }}>
          AD
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', color: 'var(--white)', fontWeight: 600 }}>
              Admin
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              NEXVRA
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
