'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Lead {
  id: number;
  name: string;
  business: string;
  industry: string;
  value: number;
  phone: string;
  email: string;
  instagram: string;
  source: string;
  notes: string;
  status: 'lead' | 'contacted' | 'call' | 'proposal' | 'closed' | 'lost';
  createdAt: string;
  ipDetails?: any;
  phoneDetails?: any;
  history?: Array<{ date: string; action: string; status: string }>;
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  leadId?: number;
  type: 'call' | 'meeting' | 'followup' | 'other';
}

interface CRMData {
  leads: Lead[];
  events: EventItem[];
  counters: Record<string, number>;
  checklist: Record<string, boolean>;
  dailyLog: Record<string, string>;
}

const INITIAL_DATA: CRMData = {
  leads: [],
  events: [],
  counters: { dms: 0, responses: 0, 'calls-made': 0, followups: 0, content: 0 },
  checklist: {},
  dailyLog: {}
};

export default function CRMPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // CRM State
  const [crmData, setCrmData] = useState<CRMData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pipeline' | 'clients' | 'calendar' | 'daily'>('dashboard');

  // Modal control
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [selectedLeadForView, setSelectedLeadForView] = useState<Lead | null>(null);

  // Form states
  const [leadForm, setLeadForm] = useState({
    name: '',
    business: '',
    industry: 'other',
    value: 35000,
    phone: '',
    email: '',
    instagram: '',
    source: 'dm',
    notes: '',
    status: 'lead' as Lead['status']
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '12:00',
    type: 'call' as EventItem['type']
  });

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Authenticate from SessionStorage
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem('crm_passcode');
    const authStatus = sessionStorage.getItem('crm_authenticated');
    if (savedPasscode && authStatus === 'true') {
      setPasscode(savedPasscode);
      fetchLeads(savedPasscode);
    }
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(false);
    try {
      const response = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${passcode}` }
      });
      if (response.status === 200) {
        sessionStorage.setItem('crm_authenticated', 'true');
        sessionStorage.setItem('crm_passcode', passcode);
        setIsAuthenticated(true);
        const data = await response.json();
        setCrmData(data);
      } else {
        setAuthError(true);
      }
    } catch (err) {
      setAuthError(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchLeads = async (code: string) => {
    try {
      const response = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${code}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCrmData(data);
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('crm_passcode');
        sessionStorage.removeItem('crm_authenticated');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const syncToCloud = async (updatedData: CRMData) => {
    const currentCode = sessionStorage.getItem('crm_passcode') || passcode;
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentCode}`
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        console.error('Failed to sync data to cloud.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateLeadStatus = (leadId: number, nextStatus: Lead['status']) => {
    const updatedLeads = crmData.leads.map((l) => {
      if (l.id === leadId) {
        const history = l.history || [];
        return {
          ...l,
          status: nextStatus,
          history: [...history, { date: new Date().toISOString(), action: `Status updated to ${nextStatus}`, status: nextStatus }]
        };
      }
      return l;
    });

    const newData = { ...crmData, leads: updatedLeads };
    setCrmData(newData);
    syncToCloud(newData);
  };

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: Date.now(),
      ...leadForm,
      createdAt: new Date().toISOString(),
      history: [{ date: new Date().toISOString(), action: 'Lead created manually', status: leadForm.status }]
    };

    const newData = { ...crmData, leads: [...crmData.leads, newLead] };
    setCrmData(newData);
    syncToCloud(newData);
    setActiveModal(null);
    setLeadForm({
      name: '',
      business: '',
      industry: 'other',
      value: 35000,
      phone: '',
      email: '',
      instagram: '',
      source: 'dm',
      notes: '',
      status: 'lead'
    });
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: EventItem = {
      id: Date.now(),
      ...eventForm
    };

    const newData = { ...crmData, events: [...crmData.events, newEvent] };
    setCrmData(newData);
    syncToCloud(newData);
    setActiveModal(null);
    setEventForm({
      title: '',
      date: '',
      time: '12:00',
      type: 'call'
    });
  };

  const deleteLead = (leadId: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    const updatedLeads = crmData.leads.filter((l) => l.id !== leadId);
    const updatedEvents = crmData.events.filter((ev) => ev.leadId !== leadId);
    const newData = { ...crmData, leads: updatedLeads, events: updatedEvents };
    setCrmData(newData);
    syncToCloud(newData);
    setSelectedLeadForView(null);
  };

  const updateCounter = (field: string, diff: number) => {
    const val = crmData.counters[field] || 0;
    const updatedCounters = {
      ...crmData.counters,
      [field]: Math.max(0, val + diff)
    };
    const newData = { ...crmData, counters: updatedCounters };
    setCrmData(newData);
    syncToCloud(newData);
  };

  const toggleChecklist = (checkId: string) => {
    const updatedChecklist = {
      ...crmData.checklist,
      [checkId]: !crmData.checklist[checkId]
    };
    const newData = { ...crmData, checklist: updatedChecklist };
    setCrmData(newData);
    syncToCloud(newData);
  };

  // Stats calculators
  const totalRevenue = crmData.leads
    .filter((l) => l.status === 'closed')
    .reduce((sum, l) => sum + Number(l.value || 0), 0);

  const numLeads = crmData.leads.length;
  const numCalls = crmData.leads.filter((l) => l.status === 'call').length;
  const numProposals = crmData.leads.filter((l) => l.status === 'proposal').length;
  const numClosed = crmData.leads.filter((l) => l.status === 'closed').length;
  const conversionRate = numLeads > 0 ? Math.round((numClosed / numLeads) * 100) : 0;

  // Calendar Helpers
  const renderCalendarDays = () => {
    const y = calendarDate.getFullYear();
    const m = calendarDate.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(y, m, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1; // Map Sunday=6, Monday=0

    const days: React.ReactNode[] = [];
    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 border border-white/5 bg-transparent" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = crmData.events.filter((e) => e.date === dateStr);

      days.push(
        <div key={`day-${day}`} className="h-20 border border-white/5 bg-white/[0.01] p-1 flex flex-col justify-between overflow-y-auto">
          <span className="text-[10px] font-bold text-text-muted">{day}</span>
          <div className="flex flex-col gap-1">
            {dayEvents.map((ev) => (
              <span 
                key={ev.id} 
                className={`text-[8px] px-1.5 py-0.5 rounded font-semibold truncate ${
                  ev.type === 'call' ? 'bg-orange-500/10 text-orange-400' :
                  ev.type === 'meeting' ? 'bg-violet-500/10 text-violet-400' : 'bg-blue-500/10 text-blue-400'
                }`}
              >
                {ev.time} {ev.title}
              </span>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const changeMonth = (diff: number) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + diff, 1));
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-bg-primary z-50 flex items-center justify-center p-6">
        <form onSubmit={handleAuthSubmit} className="bg-white/[0.01] border border-white/5 p-10 rounded-2xl w-full max-w-[400px] text-center shadow-2xl glass-panel relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />
          <h2 className="text-xl font-extrabold tracking-tight text-text-primary mb-2 font-display">NEXVRA Command Center</h2>
          <p className="text-text-secondary text-xs mb-8">Please enter your passcode to access the CRM.</p>
          
          <input
            type="password"
            className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-center text-lg tracking-[0.3em] font-bold outline-none transition-colors mb-6"
            placeholder="••••"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
            autoFocus
          />

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(0,212,255,0.25)]"
          >
            {authLoading ? 'Verifying...' : 'Access Dashboard'}
          </button>

          {authError && (
            <p className="text-xs font-semibold text-red-400 mt-4">⚠️ Invalid Passcode. Please try again.</p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      {/* Header bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-bg-primary/80 backdrop-blur-md z-40 px-6 flex items-center justify-between">
        <div className="flex items-center text-sm font-extrabold text-text-primary">
          <span className="relative w-6 h-6 rounded overflow-hidden mr-2">
            <Image 
              src="/brand-assets/nexvra-icon-square.jpg" 
              alt="NEXVRA" 
              fill 
              sizes="24px"
              className="object-cover"
            />
          </span>
          ⚡ NEXVRA <span className="text-[#00d4ff] ml-1.5 font-medium">CRM</span>
        </div>

        {/* Tab Links */}
        <div className="flex gap-1">
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'pipeline', label: '🔄 Pipeline' },
            { id: 'clients', label: '👥 Clients' },
            { id: 'calendar', label: '📅 Calendar' },
            { id: 'daily', label: '✅ Tracker' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/10'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-[10px] md:text-xs">
          <div className="flex flex-col items-end">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] font-extrabold text-xs md:text-sm">
              ₹{totalRevenue.toLocaleString()}
            </span>
            <span className="text-text-muted">Total Closed Revenue</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 px-6 max-w-7xl mx-auto w-full pb-12 relative z-10">
        
        {/* ===================== DASHBOARD TAB ===================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-text-primary">CRM Dashboard</h2>
              <span className="text-xs text-text-muted font-semibold">{new Date().toDateString()}</span>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { title: 'Total Leads', val: numLeads, bar: 'bg-[#00d4ff]' },
                { title: 'Calls Booked', val: numCalls, bar: 'bg-orange-500' },
                { title: 'Proposals', val: numProposals, bar: 'bg-pink-500' },
                { title: 'Deals Closed', val: numClosed, bar: 'bg-emerald-500' },
                { title: 'Revenue', val: `₹${totalRevenue.toLocaleString()}`, bar: 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]' },
                { title: 'Conv. Rate', val: `${conversionRate}%`, bar: 'bg-violet-500' }
              ].map((s, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-[2.5px] ${s.bar}`} />
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block mb-1">{s.title}</span>
                  <div className="text-xl md:text-2xl font-extrabold text-text-primary font-display mt-1">{s.val}</div>
                </div>
              ))}
            </div>

            {/* Recent Leads list */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary">Recent Activity Log</h3>
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5">
                      <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Created Date</th>
                      <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Client</th>
                      <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Business</th>
                      <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Current Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {crmData.leads.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-text-muted font-medium">No leads in database yet. Submit one from the home form! 🚀</td>
                      </tr>
                    ) : (
                      crmData.leads.slice(-5).reverse().map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.01]">
                          <td className="p-4 text-text-secondary">{new Date(lead.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 font-bold text-text-primary">{lead.name}</td>
                          <td className="p-4 text-text-secondary">{lead.business}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                              lead.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400' :
                              lead.status === 'lost' ? 'bg-red-500/10 text-red-400' :
                              lead.status === 'call' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== PIPELINE TAB ===================== */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-text-primary">Sales Pipeline</h2>
              <button 
                onClick={() => {
                  setEditingLead(null);
                  setLeadForm({
                    name: '',
                    business: '',
                    industry: 'other',
                    value: 35000,
                    phone: '',
                    email: '',
                    instagram: '',
                    source: 'dm',
                    notes: '',
                    status: 'lead'
                  });
                  setActiveModal('add-lead');
                }} 
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(0,212,255,0.25)]"
              >
                + Add Lead
              </button>
            </div>

            {/* Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {(['lead', 'contacted', 'call', 'proposal', 'closed'] as const).map((status) => {
                const statusLeads = crmData.leads.filter((l) => l.status === status);
                return (
                  <div key={status} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        status === 'lead' ? 'text-[#00d4ff]' :
                        status === 'contacted' ? 'text-violet-400' :
                        status === 'call' ? 'text-orange-400' :
                        status === 'proposal' ? 'text-pink-400' : 'text-emerald-400'
                      }`}>
                        {status === 'lead' ? '🎯 New' : status === 'contacted' ? '💬 Contact' : status === 'call' ? '📞 Calls' : status === 'proposal' ? '📋 Proposal' : '🎉 Won'}
                      </span>
                      <span className="text-[10px] bg-white/5 text-text-muted font-semibold px-2 py-0.5 rounded-full">{statusLeads.length}</span>
                    </div>

                    <div className="space-y-3 flex-grow">
                      {statusLeads.map((l) => (
                        <div 
                          key={l.id} 
                          onClick={() => setSelectedLeadForView(l)}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00d4ff]/30 transition-all cursor-pointer group"
                        >
                          <div className="text-xs font-bold text-text-primary mb-1 group-hover:text-[#00d4ff] transition-colors">{l.name}</div>
                          <div className="text-[10px] text-text-secondary mb-3">{l.business}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-emerald-400">₹{Number(l.value || 0).toLocaleString()}</span>
                            
                            {/* Simple inline select to shift status */}
                            <select
                              value={l.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateLeadStatus(l.id, e.target.value as any)}
                              className="text-[9px] bg-bg-primary border border-white/10 text-text-secondary rounded px-1 py-0.5 focus:outline-none"
                            >
                              <option value="lead">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="call">Call</option>
                              <option value="proposal">Proposal</option>
                              <option value="closed">Closed</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== CLIENTS TAB ===================== */}
        {activeTab === 'clients' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-text-primary">Client Database</h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Name</th>
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Business</th>
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Phone & Email</th>
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Carrier & Region</th>
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Status</th>
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Value</th>
                    <th className="p-4 text-[10px] font-bold text-text-secondary uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {crmData.leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-text-muted font-medium">No client records found.</td>
                    </tr>
                  ) : (
                    crmData.leads.map((l) => {
                      const ipInfo = l.ipDetails;
                      const numCheck = l.phoneDetails;
                      return (
                        <tr key={l.id} className="hover:bg-white/[0.01]">
                          <td className="p-4 font-bold text-text-primary">{l.name}</td>
                          <td className="p-4 text-text-secondary">{l.business}</td>
                          <td className="p-4 text-text-secondary">
                            <div>{l.phone}</div>
                            <div className="text-[10px] text-text-muted mt-0.5">{l.email}</div>
                          </td>
                          <td className="p-4 text-[10px]">
                            {numCheck ? (
                              <div className={numCheck.valid ? 'text-emerald-400' : 'text-red-400'}>
                                {numCheck.carrier || 'Unknown'} check ({numCheck.valid ? 'Valid' : 'Invalid'})
                              </div>
                            ) : <div className="text-slate-600">—</div>}
                            {ipInfo ? (
                              <div className="text-text-muted mt-0.5">{ipInfo.city || 'Location'}, {ipInfo.country_name}</div>
                            ) : null}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                              l.status === 'closed' ? 'bg-emerald-500/10 text-emerald-400' :
                              l.status === 'lost' ? 'bg-red-500/10 text-red-400' :
                              l.status === 'call' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="p-4 font-extrabold text-emerald-400">₹{Number(l.value || 0).toLocaleString()}</td>
                          <td className="p-4 flex gap-2">
                            <button 
                              onClick={() => setSelectedLeadForView(l)}
                              className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] hover:text-text-primary transition-colors"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => deleteLead(l.id)}
                              className="px-2 py-1 bg-red-950/20 border border-red-500/10 rounded text-[10px] text-red-400 hover:bg-red-950/45 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== CALENDAR TAB ===================== */}
        {activeTab === 'calendar' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-text-primary">Call Scheduler</h2>
              <div className="flex items-center gap-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs">←</button>
                <span className="text-sm font-bold uppercase tracking-wider text-text-primary">
                  {calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs">→</button>
              </div>
              <button 
                onClick={() => setActiveModal('add-event')} 
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(0,212,255,0.25)]"
              >
                + Add Event
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1 border border-white/5 rounded-2xl bg-white/[0.01] overflow-hidden">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d} className="p-3 text-center text-[10px] font-bold text-text-muted uppercase bg-white/[0.02] border-b border-white/5">{d}</div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>
        )}

        {/* ===================== TRACKER TAB ===================== */}
        {activeTab === 'daily' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-text-primary">Daily Action Tracker</h2>
              <span className="text-xs text-text-muted font-semibold">{new Date().toDateString()}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Outreach counters */}
              <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00d4ff] border-b border-white/5 pb-3">📬 Outreach Counters</h3>
                {[
                  { id: 'dms', label: 'Instagram DMs (Target: 40)' },
                  { id: 'responses', label: 'Responses Received' },
                  { id: 'calls-made', label: 'Outbound Calls' },
                  { id: 'followups', label: 'Follow-ups Completed' },
                  { id: 'content', label: 'Social Reels Posted' }
                ].map((c) => (
                  <div key={c.id} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="text-xs text-text-secondary font-semibold">{c.label}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateCounter(c.id, -1)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-bold text-text-secondary hover:text-text-primary transition-colors">−</button>
                      <span className="text-sm font-bold text-text-primary w-6 text-center">{crmData.counters[c.id] || 0}</span>
                      <button onClick={() => updateCounter(c.id, 1)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-bold text-text-secondary hover:text-text-primary transition-colors">+</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7c3aed] border-b border-white/5 pb-3">✅ Daily Habit Checklist</h3>
                {[
                  { id: 'check-1', label: 'Morning mindset visualization (15 min)' },
                  { id: 'check-2', label: 'Review straight-line selling workbook (30 min)' },
                  { id: 'check-3', label: 'Build brand asset portfolio folder' },
                  { id: 'check-4', label: 'Review Vercel & Redis logs' },
                  { id: 'check-5', label: 'Reply to client email tickets' }
                ].map((check) => (
                  <div key={check.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer" onClick={() => toggleChecklist(check.id)}>
                    <input 
                      type="checkbox" 
                      checked={!!crmData.checklist[check.id]}
                      onChange={() => {}} // Swallowed, parent onClick handles toggle
                      className="w-5 h-5 rounded accent-[#00d4ff] cursor-pointer" 
                    />
                    <span className={`text-xs font-semibold transition-colors ${
                      crmData.checklist[check.id] ? 'text-text-muted line-through' : 'text-text-secondary'
                    }`}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ===================== VIEW LEAD DETAIL MODAL ===================== */}
      {selectedLeadForView && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-bg-secondary border border-white/5 rounded-2xl max-w-[500px] w-full p-8 shadow-2xl relative text-left">
            <button onClick={() => setSelectedLeadForView(null)} className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-lg font-bold">×</button>
            <h3 className="text-lg font-bold font-display text-text-primary mb-2">{selectedLeadForView.name}</h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold uppercase tracking-wider">{selectedLeadForView.status}</span>

            <div className="mt-6 space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">Business Name</span>
                  <span className="text-text-primary font-semibold">{selectedLeadForView.business}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">Expected Deal Value</span>
                  <span className="text-emerald-400 font-extrabold">₹{Number(selectedLeadForView.value || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">Phone Number</span>
                  <span className="text-text-primary font-semibold">{selectedLeadForView.phone || '—'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block mb-0.5">Email Address</span>
                  <span className="text-text-primary font-semibold">{selectedLeadForView.email || '—'}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold block mb-1">Notes & Validation Reports</span>
                <div className="p-3 bg-bg-primary border border-white/5 rounded-xl text-text-secondary text-xs font-mono whitespace-pre-wrap leading-relaxed">
                  {selectedLeadForView.notes}
                </div>
              </div>

              {selectedLeadForView.history && (
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block mb-1">Timeline Log</span>
                  <div className="space-y-1.5 pl-2 border-l border-white/5">
                    {selectedLeadForView.history.map((hist, idx) => (
                      <div key={idx} className="text-[10px] text-text-secondary">
                        ● {new Date(hist.date).toLocaleDateString()}: <span className="text-text-secondary font-medium">{hist.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end gap-3 text-xs font-bold">
              <button onClick={() => deleteLead(selectedLeadForView.id)} className="px-4 py-2.5 rounded-full bg-red-950/20 border border-red-500/10 text-red-400 hover:bg-red-950/40">Delete Record</button>
              <button onClick={() => setSelectedLeadForView(null)} className="px-5 py-2.5 rounded-full border border-white/10 text-text-secondary hover:text-text-primary">Close View</button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD EVENT MODAL ===================== */}
      {activeModal === 'add-event' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <form onSubmit={addEvent} className="bg-bg-secondary border border-white/5 rounded-2xl max-w-[420px] w-full p-8 shadow-2xl relative text-left">
            <h3 className="text-base font-bold font-display text-text-primary mb-6">Create New Calendar Event</h3>

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up Call"
                  className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Date *</label>
                  <input
                    type="date"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Time *</label>
                  <input
                    type="text"
                    placeholder="12:00"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Event Type *</label>
                <select
                  className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                  value={eventForm.type}
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as any })}
                  required
                >
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="followup">Followup</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 text-xs font-bold">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-full border border-white/10 text-text-secondary hover:text-text-primary">Cancel</button>
              <button type="submit" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary">Save Event</button>
            </div>
          </form>
        </div>
      )}

      {/* ===================== ADD LEAD MODAL ===================== */}
      {activeModal === 'add-lead' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <form onSubmit={addLead} className="bg-bg-secondary border border-white/5 rounded-2xl max-w-[450px] w-full p-8 shadow-2xl relative text-left">
            <h3 className="text-base font-bold font-display text-text-primary mb-6">Create Manually Added Lead</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Client Name *</label>
                  <input
                    type="text"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Business Name *</label>
                  <input
                    type="text"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={leadForm.business}
                    onChange={(e) => setLeadForm({ ...leadForm, business: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Email *</label>
                  <input
                    type="email"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Deal Value (₹) *</label>
                  <input
                    type="number"
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={leadForm.value}
                    onChange={(e) => setLeadForm({ ...leadForm, value: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Pipeline Stage *</label>
                  <select
                    className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary"
                    value={leadForm.status}
                    onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value as any })}
                    required
                  >
                    <option value="lead">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="call">Call Booked</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="closed">Closed Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] text-text-muted font-bold uppercase mb-1.5">Notes</label>
                <textarea
                  rows={3}
                  className="bg-bg-primary border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#00d4ff]/30 text-text-primary resize-none"
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 text-xs font-bold">
              <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2.5 rounded-full border border-white/10 text-text-secondary hover:text-text-primary">Cancel</button>
              <button type="submit" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary">Add Lead</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
