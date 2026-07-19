import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NewLeadModal from './components/NewLeadModal';
import Dashboard from './views/Dashboard';
import Leads from './views/Leads';
import Pipeline from './views/Pipeline';
import Contacts from './views/Contacts';
import Tasks from './views/Tasks';
import Analytics from './views/Analytics';
import Settings from './views/Settings';
import { Lead, LeadStatus } from './data/leads';

interface CRMData {
  leads: Lead[];
  events: any[];
  counters: Record<string, number>;
  checklist: Record<string, boolean>;
  dailyLog: Record<string, string>;
}

// Robust data normalization to prevent frontend crashes on legacy/empty DB fields
const normalizeLeads = (rawLeads: any[]): Lead[] => {
  if (!Array.isArray(rawLeads)) return [];
  return rawLeads.map((lead: any) => {
    let status = String(lead.status || 'new').toLowerCase();
    // Map old status codes to new brutalist CRM equivalents
    if (status === 'lead') status = 'new';
    if (status === 'call') status = 'contacted';
    
    const validStatuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'closed', 'lost'];
    if (!validStatuses.includes(status as LeadStatus)) {
      status = 'new';
    }

    return {
      id: String(lead.id || lead.email || Date.now() + Math.random().toString(36).substr(2, 5)),
      name: String(lead.name || 'Unknown Lead'),
      company: String(lead.company || lead.business || 'Individual'),
      email: String(lead.email || ''),
      phone: String(lead.phone || ''),
      status: status as LeadStatus,
      source: String(lead.source || 'Website'),
      value: Number(lead.value) || 0,
      location: String(lead.location || 'Bangalore'),
      date: String(lead.date || lead.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0]),
      lastContact: String(lead.lastContact || lead.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0]),
      notes: String(lead.notes || ''),
      service: String(lead.service || 'Web Development'),
      assignedTo: String(lead.assignedTo || 'Admin')
    };
  });
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewLead, setShowNewLead] = useState(false);

  // Authentication & Data state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [crmData, setCrmData] = useState<CRMData>({
    leads: [],
    events: [],
    counters: {},
    checklist: {},
    dailyLog: {}
  });

  // Check sessionStorage on mount for saved auth
  useEffect(() => {
    const savedCode = sessionStorage.getItem('crm_passcode');
    const isAuth = sessionStorage.getItem('crm_authenticated');
    if (savedCode && isAuth === 'true') {
      setPasscode(savedCode);
      fetchLeads(savedCode);
    }
  }, []);

  const fetchLeads = async (code: string) => {
    setLoading(true);
    setAuthError(false);
    try {
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${code}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        
        // Normalize leads data to guarantee clean React states
        const cleanedLeads = normalizeLeads(data?.leads);
        
        setCrmData({
          leads: cleanedLeads,
          events: Array.isArray(data?.events) ? data.events : [],
          counters: data?.counters || {},
          checklist: data?.checklist || {},
          dailyLog: data?.dailyLog || {}
        });
        
        setIsAuthenticated(true);
        sessionStorage.setItem('crm_authenticated', 'true');
        sessionStorage.setItem('crm_passcode', code);
      } else {
        setAuthError(true);
        sessionStorage.removeItem('crm_passcode');
        sessionStorage.removeItem('crm_authenticated');
      }
    } catch (err) {
      console.error(err);
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    fetchLeads(passcode);
  };

  const saveCrmData = async (updatedData: CRMData) => {
    const code = sessionStorage.getItem('crm_passcode') || passcode;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${code}`
        },
        body: JSON.stringify(updatedData)
      });
    } catch (err) {
      console.error("Error saving CRM data to DB:", err);
    }
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    const currentLeads = crmData.leads || [];
    let updatedLeads = [];
    
    if ((newStatus as string) === 'delete') {
      const confirmed = window.confirm("Are you sure you want to permanently delete this lead?");
      if (!confirmed) return;
      updatedLeads = currentLeads.filter(l => l.id !== id);
    } else {
      updatedLeads = currentLeads.map(l => {
        if (l.id === id) {
          return { ...l, status: newStatus, lastContact: new Date().toISOString().split('T')[0] };
        }
        return l;
      });
    }
    
    const updatedData = { ...crmData, leads: updatedLeads };
    setCrmData(updatedData);
    await saveCrmData(updatedData);
  };

  const handleAddLead = async (leadInfo: any) => {
    const currentLeads = crmData.leads || [];
    const newLead: Lead = {
      id: String(Date.now()),
      name: leadInfo.name,
      company: leadInfo.company || 'Individual/Personal',
      email: leadInfo.email,
      phone: leadInfo.phone,
      status: leadInfo.status || 'new',
      source: leadInfo.source || 'Website',
      value: leadInfo.value || 35000,
      location: leadInfo.location || 'Bangalore',
      date: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      notes: leadInfo.notes || '',
      service: leadInfo.service || 'Web Development',
      assignedTo: 'Admin'
    };

    const updatedLeads = [...currentLeads, newLead];
    const updatedData = { ...crmData, leads: updatedLeads };
    setCrmData(updatedData);
    await saveCrmData(updatedData);
  };

  const renderView = () => {
    const leadsList = crmData.leads || [];
    switch (activeView) {
      case 'dashboard': return <Dashboard leads={leadsList} />;
      case 'leads': return <Leads searchQuery={searchQuery} leads={leadsList} onUpdateLeadStatus={handleUpdateLeadStatus} />;
      case 'pipeline': return <Pipeline leads={leadsList} />;
      case 'contacts': return <Contacts searchQuery={searchQuery} leads={leadsList} />;
      case 'tasks': return <Tasks />;
      case 'analytics': return <Analytics leads={leadsList} />;
      case 'settings': return <Settings />;
      default: return <Dashboard leads={leadsList} />;
    }
  };

  // Render passcode gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#050505',
        fontFamily: 'Space Grotesk, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          background: '#0d0d0d',
          border: '3px solid #ff3333',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '8px 8px 0px #ff3333',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '36px',
            color: '#fff',
            letterSpacing: '2px',
            margin: '0 0 10px 0'
          }}>
            NEXVRA CRM ACCESS
          </h1>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: '#888',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0 0 30px 0'
          }}>
            CONFIDENTIAL DEVELOPER CONSOLE
          </p>

          <form onSubmit={handleAuthSubmit}>
            <input
              type="password"
              placeholder="ENTER SECURE PASSCODE"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              required
              disabled={loading}
              style={{
                width: '100%',
                background: '#000',
                border: '2px solid #333',
                color: '#fff',
                fontFamily: 'Space Mono, monospace',
                fontSize: '14px',
                textAlign: 'center',
                padding: '14px',
                outline: 'none',
                letterSpacing: '4px',
                marginBottom: '20px',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#ff3333'}
              onBlur={e => e.target.style.borderColor = '#333'}
            />

            {authError && (
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px',
                color: '#ff3333',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}>
                ❌ ACCESS DENIED: INVALID PASSCODE
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: '#ff3333',
                border: 'none',
                color: '#000',
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                padding: '14px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {loading ? 'VERIFYING...' : 'AUTHORIZE ACCESS'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--black)',
    }}>
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        <Header
          activeView={activeView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNewLead={() => setShowNewLead(true)}
        />
        <main style={{
          flex: 1,
          overflow: activeView === 'leads' ? 'hidden' : 'auto',
          background: 'var(--black)',
        }}>
          {renderView()}
        </main>
      </div>

      {/* New Lead Modal */}
      {showNewLead && (
        <NewLeadModal 
          onClose={() => setShowNewLead(false)} 
          onAddLead={handleAddLead} 
        />
      )}
    </div>
  );
}
