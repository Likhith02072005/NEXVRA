'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SectionSpec {
  prompt: string;
  screenshot: string;
}

interface SpecData {
  brandSettings: SectionSpec;
  sections: {
    [key: string]: SectionSpec;
  };
}

const SECTION_LABELS: { [key: string]: { label: string; file: string; desc: string } } = {
  brandSettings: {
    label: 'Brand Settings',
    file: 'Theme, Fonts & Colors',
    desc: 'Configure global settings like colors, font-families, and typography styles.'
  },
  navbar: {
    label: 'Navbar',
    file: 'components/sections/Navbar.tsx',
    desc: 'Modify the navigation links, logo size, sticky behavior, or responsive menu.'
  },
  hero: {
    label: 'Hero Section',
    file: 'components/sections/Hero.tsx',
    desc: 'Edit the primary headline, CTA buttons, metrics counters, or ballpit background config.'
  },
  trusted_by: {
    label: 'Trusted By Bar',
    file: 'app/page.tsx (Inline)',
    desc: 'Change client company names, logos, or scroll banner behavior.'
  },
  problem: {
    label: 'Problem Section',
    file: 'components/sections/Problem.tsx',
    desc: 'Rewrite pain points, visual cards, or structural layout.'
  },
  services: {
    label: 'Services Section',
    file: 'components/sections/Services.tsx',
    desc: 'Modify card icons, descriptions, tags, or hover zoom layouts.'
  },
  results: {
    label: 'Results & Case Studies',
    file: 'components/sections/Results.tsx',
    desc: 'Edit before/after stats, testimonials, and case study metrics.'
  },
  process: {
    label: 'Process Section',
    file: 'components/sections/Process.tsx',
    desc: 'Change step-by-step numbers, descriptions, or timelines.'
  },
  pricing: {
    label: 'Pricing Tiers',
    file: 'components/sections/Pricing.tsx',
    desc: 'Alter prices, package details, guarantees, or card borders.'
  },
  booking: {
    label: 'Booking Section',
    file: 'components/sections/Booking.tsx',
    desc: 'Modify form fields, date selectors, calendar logic, and submit handlers.'
  },
  footer: {
    label: 'Footer',
    file: 'components/sections/Footer.tsx',
    desc: 'Change legal links, copyright, social icons, or footer sections.'
  }
};

export default function SpecDashboard() {
  const [activeSection, setActiveSection] = useState<string>('brandSettings');
  const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');
  
  const [specData, setSpecData] = useState<SpecData>({
    brandSettings: { prompt: '', screenshot: '' },
    sections: {}
  });
  const [codes, setCodes] = useState<{ [key: string]: string }>({});
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Load specs and code references on mount
  useEffect(() => {
    fetchSpecs();
  }, []);

  const fetchSpecs = async () => {
    try {
      const res = await fetch('/api/get-specs');
      if (res.ok) {
        const data = await res.json();
        setSpecData(data.specData);
        setCodes(data.codes);
      }
    } catch (err) {
      console.error('Error fetching specifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset file state when section changes
  useEffect(() => {
    setSelectedFile(null);
    setPreviewUrl('');
  }, [activeSection]);

  const handlePromptChange = (val: string) => {
    setSpecData(prev => {
      const updated = { ...prev };
      if (activeSection === 'brandSettings') {
        if (!updated.brandSettings) {
          updated.brandSettings = { prompt: '', screenshot: '' };
        }
        updated.brandSettings.prompt = val;
      } else {
        if (!updated.sections) {
          updated.sections = {};
        }
        if (!updated.sections[activeSection]) {
          updated.sections[activeSection] = { prompt: '', screenshot: '' };
        }
        updated.sections[activeSection].prompt = val;
      }
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      const formData = new FormData();
      formData.append('specData', JSON.stringify(specData));
      formData.append('sectionKey', activeSection);
      if (selectedFile) {
        formData.append('screenshotFile', selectedFile);
      }

      const res = await fetch('/api/save-spec', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setSpecData(data.specData);
        setSelectedFile(null);
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const getSectionSpec = (key: string): SectionSpec => {
    if (key === 'brandSettings') return specData.brandSettings || { prompt: '', screenshot: '' };
    return (specData.sections && specData.sections[key]) || { prompt: '', screenshot: '' };
  };

  // Progress calculator
  const getProgress = () => {
    const keys = Object.keys(SECTION_LABELS);
    const completed = keys.filter(k => {
      const spec = getSectionSpec(k);
      return spec.prompt.trim().length > 0 || spec.screenshot.trim().length > 0;
    }).length;
    return Math.round((completed / keys.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06060c] flex items-center justify-center text-text-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-[#00d4ff] animate-spin"></div>
          <p className="text-sm font-semibold text-text-secondary">Loading your NEXVRA Specification Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06060c] text-text-primary font-sans flex flex-col">
      {/* Top Header */}
      <header className="h-16 border-b border-white/5 bg-[#0a0a14]/60 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#00d4ff]/20">
            <Image src="/brand-assets/nexvra-icon-square.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wider uppercase text-text-primary">NEXVRA <span className="text-[#00d4ff]">Spec Dashboard</span></h1>
            <p className="text-[10px] text-text-muted font-medium">Interactive website redesign workspace</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/15 px-3 py-1.5 rounded-full text-[#00d4ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse"></span>
            Agent Connected
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 border-r border-white/5 bg-[#08080f] flex flex-col shrink-0">
          <div className="p-5 border-b border-white/5">
            <div className="flex justify-between items-center text-xs font-bold text-text-secondary mb-2">
              <span>OVERALL COMPLETION</span>
              <span className="text-[#00d4ff]">{getProgress()}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] transition-all duration-500" 
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>

          <nav className="flex-grow overflow-y-auto p-4 space-y-1 scrollbar-thin">
            {Object.keys(SECTION_LABELS).map(key => {
              const spec = getSectionSpec(key);
              const isFilled = spec.prompt.trim().length > 0 || spec.screenshot.trim().length > 0;
              const isActive = activeSection === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/20 text-text-primary' 
                      : 'hover:bg-white/[0.02] border border-transparent text-text-secondary'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-xs font-bold ${isActive ? 'text-[#00d4ff]' : 'group-hover:text-text-primary'}`}>
                      {SECTION_LABELS[key].label}
                    </span>
                    <span className="text-[9px] text-text-muted font-medium truncate max-w-[200px]">
                      {SECTION_LABELS[key].file}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isFilled ? 'bg-[#00d4ff] shadow-[0_0_8px_#00d4ff]' : 'bg-white/5'}`}></span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Editor Area */}
        <main className="flex-grow flex flex-col bg-[#06060c] overflow-hidden">
          {/* Section Detail Header */}
          <div className="p-6 border-b border-white/5 bg-[#08080f]/40 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-lg font-extrabold text-text-primary">{SECTION_LABELS[activeSection].label}</h2>
              <p className="text-xs text-text-muted mt-0.5">{SECTION_LABELS[activeSection].desc}</p>
            </div>
            
            {/* Tabs Selector */}
            <div className="flex rounded-lg bg-white/5 p-1 border border-white/5 text-xs font-bold">
              <button 
                onClick={() => setActiveTab('prompt')}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  activeTab === 'prompt' ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary shadow-md' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Specifications
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  activeTab === 'code' ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary shadow-md' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Source Code
              </button>
            </div>
          </div>

          {/* Main Form or Code View */}
          <div className="flex-grow overflow-y-auto p-8 scrollbar-thin">
            {activeTab === 'prompt' ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Textarea Specification */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#00d4ff] uppercase tracking-wider block">YOUR PROMPT / CHANGES TO MAKE</label>
                  <textarea
                    className="w-full h-64 bg-[#0a0a14] border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-2xl p-6 text-sm outline-none transition-all focus:shadow-[0_0_20px_rgba(0,212,255,0.05)] resize-none font-medium leading-relaxed"
                    placeholder={`e.g. In the ${SECTION_LABELS[activeSection].label}, replace the main text with "A digital studio built on performance" and change the background to black metal mesh...`}
                    value={getSectionSpec(activeSection).prompt}
                    onChange={(e) => handlePromptChange(e.target.value)}
                  ></textarea>
                </div>

                {/* Drag-and-drop Image Upload */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#7c3aed] uppercase tracking-wider block">REFERENCE SCREENSHOT / MOCKUP</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Upload Box */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-white/10 hover:border-[#00d4ff]/30 bg-[#08080f]/60 hover:bg-[#08080f]/90 transition-all rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px]"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <span className="text-3xl mb-4">🖼️</span>
                      <p className="text-xs font-bold text-text-primary mb-1">Click to Upload / Drag & Drop</p>
                      <p className="text-[10px] text-text-muted max-w-[200px]">Supports PNG, JPG, JPEG. Placed in public/spec-uploads/</p>
                    </div>

                    {/* Preview / Current Image */}
                    <div className="border border-white/5 bg-[#08080f]/40 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
                      {previewUrl ? (
                        <div className="w-full flex flex-col items-center gap-3">
                          <p className="text-[10px] text-[#00d4ff] font-bold">NEW UPLOAD PREVIEW (Saves on click)</p>
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/10 bg-black">
                            <img src={previewUrl} alt="Preview" className="object-contain w-full h-full" />
                          </div>
                          <p className="text-[9px] text-text-muted truncate max-w-[250px]">{selectedFile?.name}</p>
                        </div>
                      ) : getSectionSpec(activeSection).screenshot ? (
                        <div className="w-full flex flex-col items-center gap-3">
                          <p className="text-[10px] text-emerald-400 font-bold">CURRENT LINKED SCREENSHOT</p>
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/10 bg-black">
                            <img src={getSectionSpec(activeSection).screenshot} alt="Current Spec" className="object-contain w-full h-full" />
                          </div>
                          <p className="text-[9px] text-text-muted truncate max-w-[250px]">{getSectionSpec(activeSection).screenshot}</p>
                        </div>
                      ) : (
                        <div className="text-center text-text-muted text-xs">
                          <span className="text-xl block mb-2">📸</span>
                          No screenshot attached yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Code Viewer */
              <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-text-muted font-mono">{SECTION_LABELS[activeSection].file}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(codes[activeSection] || '');
                      alert('Code copied to clipboard!');
                    }}
                    className="text-[10px] font-bold text-[#00d4ff] bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 px-3 py-1.5 rounded-md transition-all"
                  >
                    Copy Code
                  </button>
                </div>
                <div className="bg-[#030307] border border-white/5 rounded-2xl p-6 overflow-x-auto max-h-[600px] scrollbar-thin">
                  <pre className="text-xs font-mono text-slate-400 leading-relaxed">
                    <code>{codes[activeSection] || '// No code loaded'}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <footer className="h-20 border-t border-white/5 bg-[#08080f] px-8 flex items-center justify-between shrink-0 relative z-20">
            <div>
              {saveStatus === 'success' && (
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-2 animate-bounce">
                  <span>✓</span> Specifications successfully saved to disk!
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="text-xs font-bold text-red-400 flex items-center gap-2">
                  <span>⚠️</span> Error saving changes. Please check server console.
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(0,212,255,0.2)] hover:shadow-[0_4px_20px_rgba(0,212,255,0.4)] hover:scale-102 transition-all active:scale-98 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Section Changes'
              )}
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}
