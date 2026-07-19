import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  lead: string;
  company: string;
  type: 'call' | 'email' | 'proposal' | 'follow-up' | 'meeting';
  priority: 'high' | 'medium' | 'low';
  due: string;
  done: boolean;
}

const initialTasks: Task[] = [
  { id: 'T001', title: 'Call Arjun re: website brief', lead: 'Arjun Sharma', company: 'TechVista Solutions', type: 'call', priority: 'high', due: '2025-01-17', done: false },
  { id: 'T002', title: 'Send proposal to Sneha', lead: 'Sneha Krishnan', company: 'Artisan Collective', type: 'proposal', priority: 'high', due: '2025-01-17', done: false },
  { id: 'T003', title: 'Follow up with Priya - no response 48hrs', lead: 'Priya Nair', company: 'Bloom Retail', type: 'follow-up', priority: 'medium', due: '2025-01-17', done: false },
  { id: 'T004', title: 'Discovery call with Aditya', lead: 'Aditya Kumar', company: 'FintechPro', type: 'meeting', priority: 'high', due: '2025-01-18', done: false },
  { id: 'T005', title: 'Send onboarding docs to Vikram', lead: 'Vikram Patel', company: 'MedTech Innovations', type: 'email', priority: 'medium', due: '2025-01-18', done: true },
  { id: 'T006', title: 'Qualify Suresh — real estate project scope', lead: 'Suresh Babu', company: 'RealEdge Properties', type: 'call', priority: 'high', due: '2025-01-18', done: false },
  { id: 'T007', title: 'Send case studies to Deepika', lead: 'Deepika Singh', company: 'Urban Nest', type: 'email', priority: 'low', due: '2025-01-19', done: false },
  { id: 'T008', title: 'Proposal revision for Anjali', lead: 'Anjali Verma', company: 'PureSkin Beauty', type: 'proposal', priority: 'medium', due: '2025-01-19', done: false },
  { id: 'T009', title: 'Re-engage Kavitha in Q2', lead: 'Kavitha Reddy', company: 'Saveur Cafe', type: 'follow-up', priority: 'low', due: '2025-04-01', done: false },
  { id: 'T010', title: 'Project kickoff call — Mohan', lead: 'Mohan Rajan', company: 'EduLeap Academy', type: 'meeting', priority: 'medium', due: '2025-01-20', done: true },
];

const typeColors: Record<string, string> = {
  call: 'var(--yellow)',
  email: '#4fc3f7',
  proposal: '#ce93d8',
  'follow-up': 'var(--red)',
  meeting: 'var(--green)',
};

const priorityColors: Record<string, string> = {
  high: 'var(--red)',
  medium: 'var(--yellow)',
  low: 'var(--gray)',
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('pending');

  const toggleDone = (id: string) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const filtered = tasks.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.done).length;

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
        {[
          { label: 'Pending Tasks', value: pending, color: 'var(--yellow)' },
          { label: 'Completed', value: done, color: 'var(--green)' },
          { label: 'High Priority', value: highPriority, color: 'var(--red)' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--dark-gray)',
            border: '1px solid var(--mid-gray)',
            borderBottom: `3px solid ${s.color}`,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gray)' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: s.color, lineHeight: 1 }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {(['all', 'pending', 'done'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'var(--red)' : 'none',
              border: `1px solid ${filter === f ? 'var(--red)' : 'var(--mid-gray)'}`,
              color: filter === f ? 'var(--black)' : 'var(--gray)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '9px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '8px 16px',
              fontWeight: filter === f ? 700 : 400,
              transition: 'all 0.15s',
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase' }}>
          {filtered.length} TASKS
        </div>
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {filtered.map(task => (
          <div key={task.id} style={{
            background: task.done ? 'var(--black)' : 'var(--dark-gray)',
            border: '1px solid var(--mid-gray)',
            borderLeft: `3px solid ${task.done ? 'var(--gray)' : priorityColors[task.priority]}`,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            opacity: task.done ? 0.5 : 1,
            transition: 'all 0.15s',
          }}>
            {/* Checkbox */}
            <button
              onClick={() => toggleDone(task.id)}
              style={{
                width: '20px',
                height: '20px',
                border: `2px solid ${task.done ? 'var(--green)' : 'var(--mid-gray)'}`,
                background: task.done ? 'var(--green)' : 'none',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--black)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                fontWeight: 700,
                transition: 'all 0.15s',
              }}
            >
              {task.done ? 'X' : ''}
            </button>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: task.done ? 'var(--gray)' : 'var(--white)',
                marginBottom: '4px',
                textDecoration: task.done ? 'line-through' : 'none',
              }}>
                {task.title}
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: 'var(--gray)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {task.lead} — {task.company}
              </div>
            </div>

            {/* Type badge */}
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '7px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '3px 8px',
              border: `1px solid ${typeColors[task.type]}`,
              color: typeColors[task.type],
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {task.type}
            </span>

            {/* Priority */}
            <span style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '7px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '3px 8px',
              border: `1px solid ${priorityColors[task.priority]}`,
              color: priorityColors[task.priority],
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {task.priority}
            </span>

            {/* Due date */}
            <div style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '8px',
              color: 'var(--gray)',
              letterSpacing: '1px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              DUE {task.due}
            </div>

            {/* ID */}
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'var(--gray)', letterSpacing: '1px', flexShrink: 0 }}>
              {task.id}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
