import { useState } from 'react';

interface NewLeadModalProps {
  onClose: () => void;
  onAddLead: (lead: any) => Promise<void>;
}

export default function NewLeadModal({ onClose, onAddLead }: NewLeadModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    source: 'Website',
    service: 'Web Development',
    value: '35000',
    status: 'new',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLeadData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAddLead({
        name: `${leadData.firstName} ${leadData.lastName}`.trim(),
        company: leadData.company,
        email: leadData.email,
        phone: leadData.phone,
        location: leadData.location || 'Bangalore',
        source: leadData.source,
        service: leadData.service,
        value: Number(leadData.value) || 0,
        status: leadData.status,
        notes: leadData.notes
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to save lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(2px)',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'var(--dark-gray)',
        border: '2px solid var(--mid-gray)',
        borderTop: '3px solid var(--red)',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflow: 'auto',
        animation: 'slideIn 0.2s ease',
      }}>
        {/* Modal header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--mid-gray)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '2px', color: 'var(--white)', lineHeight: 1 }}>
              NEW LEAD
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '3px', color: 'var(--gray)', textTransform: 'uppercase', marginTop: '2px' }}>
              ADD TO CRM DATABASE
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '2px solid var(--mid-gray)',
              color: 'var(--gray)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '12px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            X
          </button>
        </div>

        {submitted ? (
          <div style={{
            padding: '60px 28px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', color: 'var(--green)', lineHeight: 1, letterSpacing: '2px' }}>
              LEAD ADDED
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '3px', textTransform: 'uppercase' }}>
              SUCCESSFULLY ADDED TO DATABASE
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'var(--red)',
                border: 'none',
                color: 'var(--black)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '14px 32px',
                fontWeight: 700,
                marginTop: '16px',
                cursor: 'pointer',
              }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Step indicators */}
            <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--mid-gray)', display: 'flex', gap: '2px' }}>
              {[1, 2].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStep(s)}
                  style={{
                    background: step === s ? 'var(--red)' : 'none',
                    border: `1px solid ${step === s ? 'var(--red)' : 'var(--mid-gray)'}`,
                    color: step === s ? 'var(--black)' : 'var(--gray)',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '6px 16px',
                    fontWeight: step === s ? 700 : 400,
                  }}
                >
                  {s === 1 ? '01 CONTACT' : '02 DEAL'}
                </button>
              ))}
            </div>

            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {step === 1 ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <FormField label="First Name" name="firstName" value={leadData.firstName} onChange={handleChange} placeholder="Arjun" required />
                    <FormField label="Last Name" name="lastName" value={leadData.lastName} onChange={handleChange} placeholder="Sharma" required />
                  </div>
                  <FormField label="Company" name="company" value={leadData.company} onChange={handleChange} placeholder="TechVista Solutions" required />
                  <FormField label="Email" name="email" value={leadData.email} onChange={handleChange} placeholder="arjun@techvista.in" type="email" required />
                  <FormField label="Phone" name="phone" value={leadData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                  <FormField label="Location" name="location" value={leadData.location} onChange={handleChange} placeholder="Bangalore" />
                  <div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      LEAD SOURCE
                    </div>
                    <select 
                      name="source" 
                      value={leadData.source} 
                      onChange={handleChange} 
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
                      }}
                    >
                      {['Meta Ads', 'Google', 'Referral', 'Website', 'LinkedIn', 'WhatsApp'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      SERVICE REQUIRED
                    </div>
                    <select 
                      name="service" 
                      value={leadData.service} 
                      onChange={handleChange} 
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
                      }}
                    >
                      {['Web Development', 'Performance Marketing', 'Brand Design', 'SEO'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <FormField label="Estimated Value (INR)" name="value" value={leadData.value} onChange={handleChange} placeholder="80000" type="number" />
                  <div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      INITIAL STATUS
                    </div>
                    <select 
                      name="status" 
                      value={leadData.status} 
                      onChange={handleChange} 
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
                      }}
                    >
                      <option value="new">NEW</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="qualified">QUALIFIED</option>
                      <option value="proposal">PROPOSAL</option>
                      <option value="closed">CLOSED</option>
                      <option value="lost">LOST</option>
                    </select>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      NOTES
                    </div>
                    <textarea
                      name="notes"
                      value={leadData.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What does this lead need? Any context..."
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
                        resize: 'none',
                        lineHeight: 1.6,
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer buttons */}
            <div style={{
              padding: '20px 28px',
              borderTop: '1px solid var(--mid-gray)',
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
            }}>
              {step === 1 ? (
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      background: 'none',
                      border: '1px solid var(--mid-gray)',
                      color: 'var(--gray)',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      padding: '12px 20px',
                      cursor: 'pointer',
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      background: 'var(--white)',
                      border: 'none',
                      color: 'var(--black)',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      padding: '12px 24px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    NEXT: DEAL INFO
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--mid-gray)',
                      color: 'var(--gray)',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      padding: '12px 20px',
                      cursor: 'pointer',
                    }}
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: 'var(--red)',
                      border: 'none',
                      color: 'var(--black)',
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      padding: '12px 24px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {loading ? 'ADDING...' : 'ADD LEAD'}
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function FormField({ label, name, placeholder, value, onChange, type = 'text', required = false }: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: 'var(--red)', marginLeft: '4px' }}>*</span>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
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
  );
}
