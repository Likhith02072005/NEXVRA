export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
export type LeadSource = 'Meta Ads' | 'Google' | 'Referral' | 'Website' | 'LinkedIn' | 'WhatsApp';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  value: number;
  location: string;
  date: string;
  lastContact: string;
  notes: string;
  service: string;
  assignedTo: string;
}

export const leads: Lead[] = [];

export const getStatusColor = (status: LeadStatus): string => {
  const map: Record<LeadStatus, string> = {
    new: 'var(--yellow)',
    contacted: '#4fc3f7',
    qualified: 'var(--green)',
    proposal: '#ce93d8',
    closed: 'var(--red)',
    lost: 'var(--gray)',
  };
  return map[status];
};

export const pipelineStages: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal', 'closed', 'lost'];

export const stageLabels: Record<LeadStatus, string> = {
  new: 'NEW',
  contacted: 'CONTACTED',
  qualified: 'QUALIFIED',
  proposal: 'PROPOSAL',
  closed: 'CLOSED',
  lost: 'LOST',
};
