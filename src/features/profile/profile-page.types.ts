import type { DetailSectionId, ProfileFieldId } from '@/features/profile/profile-page.contract';

export type ProfileTagTone =
  'accent' | 'brand' | 'danger' | 'info' | 'success' | 'surface' | 'warning';

export type CandidateScope = 'contestants' | 'winners';
export type CandidateTableCellValue = number | string | null | undefined;
export type CandidateTableRow = Record<string, CandidateTableCellValue>;
export type CandidateTableSource = CandidateTableRow[] | string | null | undefined;

export interface CandidateProfilePathContext {
  election_type: string;
  election_year: number;
  scope: CandidateScope;
  state_name: string;
  state_slug: string;
}

export interface CandidateProfileRawRecord {
  age_details?: number | string | null;
  assets_description_details?: string | null;
  assets_description_summary?: string | null;
  candidate_link_summary?: string | null;
  candidate_summary?: string | null;
  cases_accused_details?: CandidateTableSource;
  cases_convicted_details?: CandidateTableSource;
  constituency_details?: string | null;
  constituency_summary?: string | null;
  criminal_case_summary?: number | string | null;
  criminal_cases_count_details?: number | string | null;
  education_category_details?: string | null;
  education_details_details?: string | null;
  education_summary?: string | null;
  immovable_assets_details?: CandidateTableSource;
  liabilities_description_details?: string | null;
  liabilities_description_summary?: string | null;
  liabilities_details?: CandidateTableSource;
  liabilities_summary?: string | null;
  movable_assets_details?: CandidateTableSource;
  name_details?: string | null;
  party_name_details?: string | null;
  party_summary?: string | null;
  relative_details?: string | null;
  self_profession_details?: string | null;
  spouse_profession_details?: string | null;
  total_assets_amount_summary?: number | string | null;
  total_assets_details?: number | string | null;
  total_assets_summary?: string | null;
  total_liabilities_amount_summary?: number | string | null;
  total_liabilities_details?: number | string | null;
  url_details?: string | null;
  voter_info_details?: string | null;
}

export interface CandidatePortraitAsset {
  alt: string;
  src: string;
}

export interface CandidatePartySymbolAsset {
  alt: string;
  imageSrc?: string;
  label: string;
  shortLabel: string;
}

export interface CandidateProfileSupplement {
  badges?: Array<{
    label: string;
    tone: ProfileTagTone;
  }>;
  defaultOpenSectionIds?: DetailSectionId[];
  narrativeSummary: string;
  partySymbol: CandidatePartySymbolAsset;
  portrait?: CandidatePortraitAsset;
}

export interface CandidateProfileSource {
  context: CandidateProfilePathContext;
  record: CandidateProfileRawRecord;
  supplement: CandidateProfileSupplement;
}

export interface ResolvedCandidateProfileRecord {
  accused_cases: CandidateTableRow[];
  age: number | null;
  assets_amount_inr: number | null;
  assets_label: string | null;
  candidate_id: string | null;
  constituency_label: string | null;
  constituency_name: string | null;
  convicted_cases: CandidateTableRow[];
  criminal_case_count: number;
  display_name: string;
  education_category: string | null;
  education_details: string | null;
  election_type: string;
  election_year: number;
  has_criminal_cases: boolean;
  immovable_assets_breakdown: CandidateTableRow[];
  is_winner: boolean;
  liabilities_amount_inr: number | null;
  liabilities_label: string | null;
  liability_breakdown: CandidateTableRow[];
  movable_assets_breakdown: CandidateTableRow[];
  net_assets_amount_inr: number | null;
  party: string | null;
  profile_url: string | null;
  relative_name: string | null;
  result_label: string;
  scope: CandidateScope;
  seat_reservation: 'SC' | 'ST' | null;
  self_profession: string | null;
  spouse_profession: string | null;
  state_name: string;
  state_slug: string;
  voter_roll_info: string | null;
}

export interface ProfileMetricItemViewModel {
  fieldId: ProfileFieldId;
  label: string;
  tone: ProfileTagTone;
  value: string;
}

export interface ProfileFieldValueItemViewModel {
  fieldId: ProfileFieldId;
  label: string;
  value: string;
}

export interface ProfileMetaItemViewModel {
  hideLabelOnCompact?: boolean;
  label: string;
  value: string;
}

export interface ProfileHeroViewModel {
  constituency: string;
  facts: ProfileMetaItemViewModel[];
  name: string;
  party: string;
  partySymbol: CandidatePartySymbolAsset;
  portrait?: CandidatePortraitAsset;
  state: string;
  year: string;
}

export interface DetailTableColumnViewModel {
  id: string;
  label: string;
}

export interface DetailTableViewModel {
  columns: DetailTableColumnViewModel[];
  rows: string[][];
}

export interface ProfileDetailTextItemViewModel {
  fieldId: ProfileFieldId;
  kind: 'badge' | 'paragraph' | 'text';
  label: string;
  tone?: ProfileTagTone;
  value: string;
}

export interface ProfileDetailLinkItemViewModel {
  fieldId: ProfileFieldId;
  href: string;
  kind: 'link';
  label: string;
  tone?: ProfileTagTone;
  value: string;
}

export interface ProfileDetailTableItemViewModel {
  fieldId: ProfileFieldId;
  kind: 'table';
  label: string;
  table: DetailTableViewModel;
}

export type ProfileDetailItemViewModel =
  ProfileDetailLinkItemViewModel | ProfileDetailTableItemViewModel | ProfileDetailTextItemViewModel;

export interface ProfileDetailSectionViewModel {
  defaultOpen: boolean;
  description: string;
  disabledMessage: string;
  id: DetailSectionId;
  isDisabled: boolean;
  items: ProfileDetailItemViewModel[];
  title: string;
}

export interface ProfileCrimePreviewViewModel {
  description: string;
  title: string;
  tone: ProfileTagTone;
}

export interface ProfileCrimeTableViewModel {
  fieldId: 'accused_cases' | 'convicted_cases';
  label: string;
  table: DetailTableViewModel;
  tone: ProfileTagTone;
}

export interface ProfileCrimeViewModel {
  caseTables: ProfileCrimeTableViewModel[];
  helper: string;
  severityTone: ProfileTagTone;
  summary: string;
  totalCases: string;
}

export interface CandidateProfilePageViewModel {
  assets: {
    items: ProfileMetricItemViewModel[];
  };
  crime: ProfileCrimeViewModel;
  detailSections: ProfileDetailSectionViewModel[];
  hero: ProfileHeroViewModel;
  summary: {
    items: ProfileFieldValueItemViewModel[];
  };
}
