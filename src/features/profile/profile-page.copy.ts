import type { ProfileFieldId } from '@/features/profile/profile-page.contract';

export const profilePageCopy = {
  crime: {
    allClear: 'No structured criminal case rows are currently attached to this record.',
    description: 'Criminal case count with accused and convicted case detail tables.',
    emptyTables: 'No structured accused or convicted case rows are available for this profile.',
    eyebrow: 'Cases',
    title: 'Cases',
    withCases:
      'Reported cases are present and should be reviewed against the structured tables below.',
  },
  details: {
    description:
      'Each section is driven by the supplied field contract so disabled states, labels, and future localization stay predictable.',
    disabledMessage:
      'This section stays disabled until at least one usable field resolves from the source record.',
    disabledTag: 'Disabled',
    enabledTag: 'Available',
    eyebrow: 'Expanded Record',
    title: 'Record details',
  },
  hero: {
    auditLabel: 'Audit trail',
    constituencyLabel: 'Constituency',
    electionLabel: 'Election',
    noPortraitLabel: 'Profile photo can be attached later.',
    partyLabel: 'Party',
    partySymbolLabel: 'Party symbol',
    sourceLinkLabel: 'Open source profile',
  },
  summary: {
    description: 'Profile information grouped as plain text fields.',
    eyebrow: 'Summary',
    title: 'Summary',
  },
  assets: {
    description: 'Declared top-line assets, liabilities, and net assets.',
    eyebrow: 'Assets',
    title: 'Assets Info',
  },
} as const;

export const profileFieldLabels: Record<ProfileFieldId, string> = {
  accused_cases: 'Accused cases',
  age: 'Age',
  assets_amount_inr: 'Assets',
  assets_label: 'Asset note',
  candidate_id: 'Candidate ID',
  constituency_label: 'Constituency',
  constituency_name: 'Constituency name',
  convicted_cases: 'Convicted cases',
  criminal_case_count: 'Criminal cases',
  display_name: 'Candidate',
  education_category: 'Education',
  education_details: 'Education details',
  election_type: 'Election type',
  election_year: 'Year',
  has_criminal_cases: 'Has criminal cases',
  immovable_assets_breakdown: 'Immovable assets',
  is_winner: 'Winner',
  liabilities_amount_inr: 'Liabilities',
  liabilities_label: 'Liability note',
  liability_breakdown: 'Liability breakdown',
  movable_assets_breakdown: 'Movable assets',
  net_assets_amount_inr: 'Net assets',
  party: 'Party',
  profile_url: 'Source profile',
  relative_name: 'Relative name',
  result_label: 'Result',
  scope: 'Scope',
  seat_reservation: 'Seat reservation',
  self_profession: 'Profession',
  spouse_profession: 'Spouse profession',
  state_name: 'State',
  state_slug: 'State slug',
  voter_roll_info: 'Voter roll information',
};

export const profileTableColumnLabels: Record<string, string> = {
  act_section: 'Act / Section',
  amount: 'Amount',
  asset: 'Asset',
  case_no: 'Case No.',
  court: 'Court',
  institution: 'Institution',
  label: 'Label',
  offence: 'Offence',
  ownership: 'Ownership',
  serial_no_details: 'Serial',
  status: 'Status',
  value: 'Declared value',
};
