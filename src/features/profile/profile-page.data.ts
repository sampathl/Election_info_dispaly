export type ProfileCardTone = 'accent' | 'default' | 'muted';
export type ProfileTagTone =
  'accent' | 'brand' | 'danger' | 'info' | 'success' | 'surface' | 'warning';

export interface ProfileBadge {
  label: string;
  tone: ProfileTagTone;
}

export interface ProfileSnapshot {
  helper: string;
  label: string;
  value: string;
}

export interface ProfileCase {
  code: string;
  detail: string;
  penaltyContext: string;
}

export interface ProfileEducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ProfileLedgerItem {
  emphasis?: 'danger' | 'success';
  label: string;
  value: string;
}

export interface ProfileAction {
  cta: string;
  description: string;
  icon: 'compare' | 'policy';
  title: string;
  tone: 'ink' | 'brand';
}

export interface CandidateProfile {
  badges: ProfileBadge[];
  constituency: string;
  crime: {
    cases: ProfileCase[];
    status: string;
    totalCases: string;
  };
  education: ProfileEducationItem[];
  financial: {
    assets: ProfileLedgerItem[];
    debtStatus: string;
    fiscalYear: string;
    keyAsset: string;
    liabilities: ProfileLedgerItem[];
    netWorth: string;
  };
  name: string;
  party: string;
  portraitAlt: string;
  portraitSrc: string;
  relatedActions: ProfileAction[];
  snapshots: ProfileSnapshot[];
}

export const candidateProfile: CandidateProfile = {
  badges: [
    { label: 'Incumbent', tone: 'brand' },
    { label: '5-Year Record', tone: 'accent' },
  ],
  constituency: 'West Bengal, District A',
  crime: {
    cases: [
      {
        code: 'IPC Section 143',
        detail: 'Unlawful Assembly related to 2021 rally protests.',
        penaltyContext:
          'Punishment for being a member of an unlawful assembly may extend to six months, a fine, or both.',
      },
    ],
    status: 'Trial Pending in High Court',
    totalCases: '02',
  },
  education: [
    {
      degree: 'Master of Laws (LLM)',
      institution: 'University of Delhi',
      year: '2008',
    },
    {
      degree: 'Bachelor of Arts (Honors)',
      institution: "St. Stephen's College",
      year: '2005',
    },
  ],
  financial: {
    assets: [
      { label: 'Movable Assets', value: '₹ 4.2 Cr' },
      { label: 'Immovable Assets', value: '₹ 10.62 Cr' },
      { label: 'Spouse Assets', value: '₹ 2.15 Cr' },
    ],
    debtStatus: 'Home mortgage currently active with National Bank.',
    fiscalYear: 'FY 2023-24',
    keyAsset: 'Residential Property in Kolkata City Centre (3,500 sq.ft)',
    liabilities: [
      { label: 'Bank Loans', value: '₹ 1.85 Cr' },
      { label: 'Private Loans', value: '₹ 45.0 L' },
      { emphasis: 'success', label: 'Government Dues', value: 'Nil' },
    ],
    netWorth: '₹ 14.82 Cr',
  },
  name: 'SHYAM BAR',
  party: 'Bharatiya Jan Shakti Party',
  portraitAlt:
    'Studio portrait of candidate Shyam Bar wearing a white Nehru jacket against a navy backdrop.',
  portraitSrc:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB0mSX7HZK9cE8khozbzGGhk4IlQVbdNGzg1zb3Q5hbKDG9sUn3yACFIM3dofx5tkKHvNTm2SOL1dhVV9adDyw28YlHfQWcwQHhgstaIvULPS6nHKFy5xZvlnAVuEzO8bLsr_hP2E6MX2jugr9Nstqw1OjvXhv2bMTt8G2HpzBaII2aFidDQAE72noV8LPLzyRifXGDrDIna7nkrMJFdHlj9_R_LP3o_1UDLJuNbR_NWpzyyLHvqg5Xxd-LpRNG-4cnAw0QkuZJqx8',
  relatedActions: [
    {
      cta: 'Open comparison tool',
      description: 'See how Shyam Bar ranks against opponents in West Bengal.',
      icon: 'compare',
      title: 'Compare Profile',
      tone: 'ink',
    },
    {
      cta: 'View full archive',
      description: 'Historical record of voting patterns and bill sponsorships.',
      icon: 'policy',
      title: 'Policy Track',
      tone: 'brand',
    },
  ],
  snapshots: [
    {
      helper: 'Declared for FY 2023-24',
      label: 'Net Worth',
      value: '₹ 14.82 Cr',
    },
    {
      helper: 'Trial pending in High Court',
      label: 'Criminal Cases',
      value: '02',
    },
    {
      helper: 'Highest completed credential',
      label: 'Education',
      value: 'LLM',
    },
  ],
};
