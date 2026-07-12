'use client';

import React, { useState, useEffect } from 'react';

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const BUSINESS_TYPES = [
  { value: 'restaurant', label: 'Restaurant / Cafe' },
  { value: 'retail', label: 'Retail / E-commerce' },
  { value: 'fitness', label: 'Fitness / Wellness' },
  { value: 'beauty', label: 'Beauty / Salon' },
  { value: 'healthcare', label: 'Healthcare / Clinic' },
  { value: 'education', label: 'Education / Coaching' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'startup', label: 'Startup / Tech' },
  { value: 'other', label: 'Other' }
];

export default function Booking() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: ''
  });

  // Calendar & Slot State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Render Calendar Helper
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayIndex = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Map Sunday=6, Monday=0
  };

  const year = currentDate.getFullYear();
  const monthIdx = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, monthIdx - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, monthIdx + 1, 1));
  };

  const daysInMonth = getDaysInMonth(year, monthIdx);
  const firstDayIdx = getFirstDayIndex(year, monthIdx);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Generate days array
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayIdx; i++) {
    calendarCells.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(i);
  }

  const selectDate = (day: number) => {
    const formatted = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDateStr(formatted);
  };

  const isDaySelected = (day: number) => {
    const formatted = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDateStr === formatted;
  };

  const isDayPast = (day: number) => {
    const d = new Date(year, monthIdx, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  // Form Submit Action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) return setErrorMsg('Full Name is required.');
    if (!formData.email.trim()) return setErrorMsg('Email Address is required.');
    if (!formData.phone.trim()) return setErrorMsg('Phone Number is required.');
    if (!formData.businessType) return setErrorMsg('Please select your business type.');
    if (!selectedDateStr) return setErrorMsg('Please select a preferred date.');
    if (!selectedTimeSlot) return setErrorMsg('Please select a preferred time slot.');

    setIsLoading(true);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.businessType,
          date: selectedDateStr,
          time: selectedTimeSlot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking.');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#00d4ff]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Benefits Info */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00d4ff] bg-[#00d4ff]/10 px-3.5 py-1.5 rounded-full border border-[#00d4ff]/15">
              Let's Talk
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mt-6 mb-6 leading-tight font-display">
              Book Your Free <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Strategy Call</span>
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              In 30 minutes, I'll show you exactly how to turn your website into a lead-generating machine. No pitch, no pressure — just value.
            </p>

            <ul className="space-y-6">
              {[
                { emoji: '🎯', title: 'Personalized audit of your current digital presence' },
                { emoji: '📊', title: 'Competitor analysis and opportunity mapping' },
                { emoji: '🗺️', title: 'Custom roadmap tailored to your business goals' },
                { emoji: '💰', title: 'Revenue projection based on your industry benchmarks' },
                { emoji: '🤝', title: 'Zero obligation — keep the strategy even if we don\'t work together' }
              ].map((b, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-lg bg-white/5 border border-white/5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">{b.emoji}</span>
                  <span className="text-text-secondary text-sm font-medium pt-1.5">{b.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Dynamic Form Card */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5 relative overflow-hidden glass-panel" data-cursor-label="Schedule">
              
              {!success ? (
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">Schedule Your Call</h3>
                  <p className="text-text-secondary text-xs md:text-sm mb-6">Pick a date and time that works for you.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error display */}
                    {errorMsg && (
                      <div className="p-3 text-xs font-semibold text-red-400 bg-red-950/20 border border-red-500/15 rounded-lg">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Phone *</label>
                        <input
                          type="tel"
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-xs text-text-secondary font-semibold mb-2">Business Type *</label>
                        <select
                          className="w-full bg-bg-secondary border border-white/5 focus:border-[#00d4ff]/30 text-text-primary rounded-xl px-4 py-3 text-xs md:text-sm outline-none transition-colors"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          required
                        >
                          <option value="">Select your industry</option>
                          {BUSINESS_TYPES.map((b) => (
                            <option key={b.value} value={b.value}>{b.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Interactive Calendar DatePicker */}
                    <div className="flex flex-col">
                      <label className="text-xs text-text-secondary font-semibold mb-3">Preferred Date *</label>
                      <div className="bg-bg-secondary border border-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-text-primary uppercase tracking-wider">{monthName} {year}</span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-primary text-xs font-bold transition-all"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-primary text-xs font-bold transition-all"
                            >
                              ›
                            </button>
                          </div>
                        </div>

                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-text-muted font-bold mb-2">
                          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>

                        {/* Day Cells Grid */}
                        <div className="grid grid-cols-7 gap-1.5">
                          {calendarCells.map((day, idx) => {
                            if (day === null) {
                              return <div key={`empty-${idx}`} />;
                            }

                            const past = isDayPast(day);
                            const selected = isDaySelected(day);

                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                disabled={past}
                                onClick={() => selectDate(day)}
                                className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                                  selected
                                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-extrabold shadow-[0_4px_10px_rgba(0,212,255,0.25)]'
                                    : past
                                    ? 'text-slate-700 cursor-not-allowed'
                                    : 'text-text-secondary bg-white/[0.02] hover:bg-white/[0.08]'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Preferred Time slots */}
                    <div className="flex flex-col">
                      <label className="text-xs text-text-secondary font-semibold mb-3">Preferred Time *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 rounded-xl text-center text-xs font-semibold transition-all ${
                              selectedTimeSlot === slot
                                ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary shadow-[0_4px_10px_rgba(0,212,255,0.25)]'
                                : 'bg-bg-secondary border border-white/5 text-text-secondary hover:bg-white/[0.08]'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-center py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-text-primary font-extrabold text-xs md:text-sm tracking-wider shadow-[0_8px_24px_rgba(0,212,255,0.3)] hover:shadow-[0_8px_35px_rgba(0,212,255,0.5)] transition-all hover:scale-102"
                    >
                      {isLoading ? 'Booking...' : "Confirm Booking — It's Free →"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-2xl text-emerald-400 mb-6 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2 font-display">You're All Set! 🎉</h3>
                  <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
                    Your strategy call has been booked. I'll send a confirmation to your email shortly. Talk soon!
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
