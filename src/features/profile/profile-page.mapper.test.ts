import { describe, expect, it } from 'vitest';

import {
  buildCandidateProfilePageViewModel,
  resolveCandidateProfileRecord,
} from '@/features/profile/profile-page.mapper';
import { sampleCandidateProfileSource } from '@/features/profile/profile-page.mock';

describe('profile page mapper', () => {
  it('resolves derived fields from the contract inputs', () => {
    const resolved = resolveCandidateProfileRecord(sampleCandidateProfileSource);

    expect(resolved.candidate_id).toBe('18');
    expect(resolved.result_label).toBe('Contestant');
    expect(resolved.seat_reservation).toBe('SC');
    expect(resolved.net_assets_amount_inr).toBe(144200000);
    expect(resolved.convicted_cases).toHaveLength(0);
  });

  it('applies contract-driven section gating to the detail accordion', () => {
    const viewModel = buildCandidateProfilePageViewModel(sampleCandidateProfileSource);

    expect(viewModel.hero.state).toBe('West Bengal');
    expect(viewModel.hero.facts.some((item) => item.label === 'Party')).toBe(true);
    expect(viewModel.hero.facts.some((item) => item.label === 'Criminal cases')).toBe(true);
    expect(viewModel.crime.severityTone).toBe('warning');
    expect(viewModel.crime.caseTables.some((item) => item.fieldId === 'accused_cases')).toBe(true);
    expect(viewModel.summary.items.some((item) => item.fieldId === 'education_details')).toBe(true);
    expect(viewModel.summary.items.some((item) => item.fieldId === 'voter_roll_info')).toBe(true);
    expect(viewModel.summary.items.some((item) => item.fieldId === 'self_profession')).toBe(false);
    expect(viewModel.summary.items.some((item) => item.fieldId === 'relative_name')).toBe(false);
    expect(viewModel.assets.items.map((item) => item.fieldId)).toEqual([
      'assets_amount_inr',
      'liabilities_amount_inr',
      'net_assets_amount_inr',
    ]);
    expect(
      viewModel.detailSections.find((section) => section.id === 'finance_breakdown')?.isDisabled,
    ).toBe(true);
    expect(
      viewModel.detailSections.find((section) => section.id === 'legal_details')?.isDisabled,
    ).toBe(false);
  });
});
