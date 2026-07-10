import {
  candidateProfileContract,
  type ProfileFieldFormatter,
  type ProfileFieldId,
} from '@/features/profile/profile-page.contract';
import {
  profileFieldLabels,
  profilePageCopy,
  profileTableColumnLabels,
} from '@/features/profile/profile-page.copy';
import type {
  CandidateProfileRawRecord,
  CandidateProfileSource,
  CandidateTableRow,
  CandidateTableSource,
  CandidateTableCellValue,
  CandidateProfilePageViewModel,
  DetailTableColumnViewModel,
  DetailTableViewModel,
  ProfileFieldValueItemViewModel,
  ProfileDetailItemViewModel,
  ProfileMetricItemViewModel,
  ProfileTagTone,
  ResolvedCandidateProfileRecord,
} from '@/features/profile/profile-page.types';

const emptyRawValueSet = new Set<string>(
  candidateProfileContract.uiGenerationDefaults.emptyRawValues,
);
const placeholderValueSet = new Set<string>(
  candidateProfileContract.uiGenerationDefaults.placeholderValues,
);

const numberFormatter = new Intl.NumberFormat('en-IN');

const summaryLabels = Object.fromEntries(
  candidateProfileContract.uiLayout.summaryBrief.map((item) => [item.fieldId, item.label]),
) as Partial<Record<ProfileFieldId, string>>;

const profileSummaryFieldIds: ProfileFieldId[] = [
  'education_details',
  'spouse_profession',
  'voter_roll_info',
];

const profileAssetFieldIds: ProfileFieldId[] = [
  'assets_amount_inr',
  'liabilities_amount_inr',
  'net_assets_amount_inr',
];

function cleanString(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed || emptyRawValueSet.has(trimmed) || placeholderValueSet.has(trimmed)) {
    return null;
  }

  return trimmed;
}

function parseNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed || emptyRawValueSet.has(trimmed) || placeholderValueSet.has(trimmed)) {
    return null;
  }

  const parsed = Number(trimmed.replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function pickFirst(...values: Array<unknown>) {
  for (const value of values) {
    const stringValue = cleanString(value);

    if (stringValue) {
      return stringValue;
    }

    const numericValue = parseNumber(value);

    if (numericValue !== null) {
      return numericValue;
    }
  }

  return null;
}

function titleCaseKey(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatCompactInr(value: number) {
  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 10000000) {
    return `Rs ${(value / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }

  if (absoluteValue >= 100000) {
    return `Rs ${(value / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
  }

  return `Rs ${numberFormatter.format(value)}`;
}

function extractCandidateId(...urls: Array<unknown>) {
  for (const urlValue of urls) {
    const rawUrl = cleanString(urlValue);

    if (!rawUrl) {
      continue;
    }

    try {
      const candidateId = new URL(rawUrl).searchParams.get('candidate_id');

      if (candidateId) {
        return candidateId;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function normalizeConstituencyLabel(value: unknown) {
  return cleanString(value);
}

function deriveSeatReservation(constituencyLabel: string | null) {
  const suffix = constituencyLabel?.match(/\((SC|ST)\)\s*$/)?.[1];

  if (suffix === 'SC' || suffix === 'ST') {
    return suffix;
  }

  return null;
}

function deriveConstituencyName(constituencyLabel: string | null) {
  if (!constituencyLabel) {
    return null;
  }

  return constituencyLabel.replace(/\s*\((SC|ST)\)\s*$/, '').trim();
}

function normalizeTableRows(value: CandidateTableSource) {
  if (Array.isArray(value)) {
    return value
      .map((row) => sanitizeRow(row))
      .filter((row): row is CandidateTableRow => row !== null);
  }

  const rawString = cleanString(value);

  if (!rawString) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawString);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((row) => sanitizeRow(row as CandidateTableRow))
      .filter((row): row is CandidateTableRow => row !== null);
  } catch {
    return [];
  }
}

function sanitizeRow(row: CandidateTableRow) {
  const nextRow = Object.entries(row).reduce<CandidateTableRow>((accumulator, [key, value]) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      accumulator[key] = value;
      return accumulator;
    }

    const stringValue = cleanDisplayString(value);

    if (stringValue !== null) {
      accumulator[key] = stringValue;
    }

    return accumulator;
  }, {});

  if (Object.keys(nextRow).length === 0) {
    return null;
  }

  const values = Object.values(nextRow);

  if (values.every((value) => value === '---------No Cases--------')) {
    return null;
  }

  if (values.every((value) => typeof value === 'string' && placeholderValueSet.has(value))) {
    return null;
  }

  return nextRow;
}

function cleanDisplayString(value: CandidateTableCellValue) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed || emptyRawValueSet.has(trimmed)) {
    return null;
  }

  return trimmed;
}

function hasUsableScalar(value: unknown) {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value === 'boolean') {
    return true;
  }

  if (typeof value === 'string') {
    return cleanString(value) !== null;
  }

  return value !== null && value !== undefined;
}

function hasUsableValue(fieldId: ProfileFieldId, record: ResolvedCandidateProfileRecord) {
  const value = record[fieldId];

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value === 'boolean') {
    return true;
  }

  return hasUsableScalar(value);
}

function getFieldLabel(fieldId: ProfileFieldId) {
  return summaryLabels[fieldId] ?? profileFieldLabels[fieldId];
}

function formatFieldValue(fieldId: ProfileFieldId, record: ResolvedCandidateProfileRecord) {
  const value = record[fieldId];
  const formatter = candidateProfileContract.fieldCatalog[fieldId].formatter;

  if (Array.isArray(value)) {
    return value.length > 0 ? String(value.length) : null;
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (value === null || value === undefined) {
    return null;
  }

  return formatValueByFormatter(value, formatter);
}

function formatValueByFormatter(value: number | string, formatter: ProfileFieldFormatter) {
  switch (formatter) {
    case 'inr_compact':
      return typeof value === 'number' ? formatCompactInr(value) : null;
    case 'integer':
      return typeof value === 'number' ? numberFormatter.format(value) : null;
    case 'years':
      return typeof value === 'number' ? `${numberFormatter.format(value)} years` : null;
    case 'year':
      return typeof value === 'number' ? String(value) : null;
    default:
      return String(value);
  }
}

function inferMetricTone(
  fieldId: ProfileFieldId,
  record: ResolvedCandidateProfileRecord,
): ProfileTagTone {
  if (fieldId === 'criminal_case_count') {
    return record.criminal_case_count > 0 ? 'danger' : 'success';
  }

  if (fieldId === 'result_label') {
    return record.is_winner ? 'success' : 'brand';
  }

  if (fieldId === 'education_category' || fieldId === 'seat_reservation') {
    return 'info';
  }

  if (
    fieldId === 'assets_amount_inr' ||
    fieldId === 'liabilities_amount_inr' ||
    fieldId === 'net_assets_amount_inr'
  ) {
    return 'accent';
  }

  return 'surface';
}

function inferDetailTone(
  fieldId: ProfileFieldId,
  record: ResolvedCandidateProfileRecord,
): ProfileTagTone {
  if (fieldId === 'criminal_case_count') {
    return record.criminal_case_count > 0 ? 'danger' : 'success';
  }

  if (fieldId === 'result_label') {
    return record.is_winner ? 'success' : 'brand';
  }

  return 'surface';
}

function buildTableColumns(rows: CandidateTableRow[]) {
  const orderedColumnIds: string[] = [];

  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!orderedColumnIds.includes(key)) {
        orderedColumnIds.push(key);
      }
    });
  });

  return orderedColumnIds.map<DetailTableColumnViewModel>((id) => ({
    id,
    label: profileTableColumnLabels[id] ?? titleCaseKey(id),
  }));
}

function buildTableRows(rows: CandidateTableRow[], columnIds: string[]) {
  return rows.map((row) => columnIds.map((columnId) => formatTableCell(row[columnId])));
}

function buildTableViewModel(rows: CandidateTableRow[]) {
  if (rows.length === 0) {
    return null;
  }

  const columns = buildTableColumns(rows);
  const columnIds = columns.map((column) => column.id);

  return {
    columns,
    rows: buildTableRows(rows, columnIds),
  } satisfies DetailTableViewModel;
}

function formatTableCell(value: CandidateTableCellValue) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return numberFormatter.format(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  return '-';
}

function buildProfileDetailItem(
  fieldId: ProfileFieldId,
  record: ResolvedCandidateProfileRecord,
): ProfileDetailItemViewModel | null {
  if (!hasUsableValue(fieldId, record)) {
    return null;
  }

  const formatter = candidateProfileContract.fieldCatalog[fieldId].formatter;
  const label = getFieldLabel(fieldId);

  if (formatter === 'table') {
    const rows = record[fieldId];

    if (!Array.isArray(rows) || rows.length === 0) {
      return null;
    }

    const columns = buildTableColumns(rows);
    const columnIds = columns.map((column) => column.id);

    return {
      fieldId,
      kind: 'table',
      label,
      table: {
        columns,
        rows: buildTableRows(rows, columnIds),
      },
    };
  }

  if (formatter === 'external_link') {
    const href = record[fieldId];

    if (typeof href !== 'string') {
      return null;
    }

    return {
      fieldId,
      href,
      kind: 'link',
      label,
      tone: 'brand',
      value: profilePageCopy.hero.sourceLinkLabel,
    };
  }

  const value = formatFieldValue(fieldId, record);

  if (!value) {
    return null;
  }

  if (formatter === 'badge' || formatter === 'boolean_badge') {
    return {
      fieldId,
      kind: 'badge',
      label,
      tone: inferDetailTone(fieldId, record),
      value,
    };
  }

  if (formatter === 'paragraph') {
    return {
      fieldId,
      kind: 'paragraph',
      label,
      value,
    };
  }

  return {
    fieldId,
    kind: 'text',
    label,
    value,
  };
}

function evaluateSectionCondition(condition: string, record: ResolvedCandidateProfileRecord) {
  if (condition === 'criminal_case_count > 0') {
    return record.criminal_case_count > 0;
  }

  if (condition in record) {
    return hasUsableValue(condition as ProfileFieldId, record);
  }

  return false;
}

function resolveDisplayName(record: CandidateProfileRawRecord) {
  return (
    cleanString(record.candidate_summary) ?? cleanString(record.name_details) ?? 'Unnamed candidate'
  );
}

function buildProfileFieldValueItem(
  fieldId: ProfileFieldId,
  record: ResolvedCandidateProfileRecord,
): ProfileFieldValueItemViewModel | null {
  const value = formatFieldValue(fieldId, record);

  if (!value) {
    return null;
  }

  return {
    fieldId,
    label: getFieldLabel(fieldId),
    value,
  };
}

function buildProfileMetricItem(
  fieldId: ProfileFieldId,
  record: ResolvedCandidateProfileRecord,
): ProfileMetricItemViewModel | null {
  const value = formatFieldValue(fieldId, record);

  if (!value) {
    return null;
  }

  return {
    fieldId,
    label: getFieldLabel(fieldId),
    tone: inferMetricTone(fieldId, record),
    value,
  };
}

export function resolveCandidateProfileRecord(
  source: CandidateProfileSource,
): ResolvedCandidateProfileRecord {
  const { context, record } = source;
  const constituencyLabel = normalizeConstituencyLabel(
    pickFirst(record.constituency_summary, record.constituency_details),
  );
  const assetsAmount = parseNumber(
    pickFirst(record.total_assets_details, record.total_assets_amount_summary),
  );
  const liabilitiesAmount = parseNumber(
    pickFirst(record.total_liabilities_amount_summary, record.total_liabilities_details),
  );
  const criminalCaseCount =
    parseNumber(pickFirst(record.criminal_case_summary, record.criminal_cases_count_details)) ?? 0;

  return {
    accused_cases: normalizeTableRows(record.cases_accused_details),
    age: parseNumber(record.age_details),
    assets_amount_inr: assetsAmount,
    assets_label: cleanString(
      pickFirst(
        record.assets_description_details,
        record.assets_description_summary,
        record.total_assets_summary,
      ),
    ),
    candidate_id: extractCandidateId(record.candidate_link_summary, record.url_details),
    constituency_label: constituencyLabel,
    constituency_name: deriveConstituencyName(constituencyLabel),
    convicted_cases: normalizeTableRows(record.cases_convicted_details),
    criminal_case_count: criminalCaseCount,
    display_name: resolveDisplayName(record),
    education_category: cleanString(
      pickFirst(record.education_summary, record.education_category_details),
    ),
    education_details: cleanString(record.education_details_details),
    election_type: context.election_type,
    election_year: context.election_year,
    has_criminal_cases: criminalCaseCount > 0,
    immovable_assets_breakdown: normalizeTableRows(record.immovable_assets_details),
    is_winner: context.scope === 'winners',
    liabilities_amount_inr: liabilitiesAmount,
    liabilities_label: cleanString(
      pickFirst(
        record.liabilities_summary,
        record.liabilities_description_details,
        record.liabilities_description_summary,
      ),
    ),
    liability_breakdown: normalizeTableRows(record.liabilities_details),
    movable_assets_breakdown: normalizeTableRows(record.movable_assets_details),
    net_assets_amount_inr:
      assetsAmount !== null && liabilitiesAmount !== null ? assetsAmount - liabilitiesAmount : null,
    party: cleanString(pickFirst(record.party_summary, record.party_name_details)),
    profile_url: cleanString(pickFirst(record.candidate_link_summary, record.url_details)),
    relative_name: cleanString(record.relative_details),
    result_label: context.scope === 'winners' ? 'Winner' : 'Contestant',
    scope: context.scope,
    seat_reservation: deriveSeatReservation(constituencyLabel),
    self_profession: cleanString(record.self_profession_details),
    spouse_profession: cleanString(record.spouse_profession_details),
    state_name: context.state_name,
    state_slug: context.state_slug,
    voter_roll_info: cleanString(record.voter_info_details),
  };
}

export function buildCandidateProfilePageViewModel(
  source: CandidateProfileSource,
): CandidateProfilePageViewModel {
  const resolved = resolveCandidateProfileRecord(source);

  const summaryItems = profileSummaryFieldIds.reduce<ProfileFieldValueItemViewModel[]>(
    (items, fieldId) => {
      const item = buildProfileFieldValueItem(fieldId, resolved);

      if (item) {
        items.push(item);
      }

      return items;
    },
    [],
  );

  const assetItems = profileAssetFieldIds.reduce<ProfileMetricItemViewModel[]>((items, fieldId) => {
    const item = buildProfileMetricItem(fieldId, resolved);

    if (item) {
      items.push(item);
    }

    return items;
  }, []);

  const detailSections = candidateProfileContract.uiLayout.detailsSections.map((section) => {
    const allFieldsEmpty =
      section.disableWhenAllFieldsEmpty &&
      section.fields.every((fieldId) => !hasUsableValue(fieldId, resolved));
    const enableRulesPass =
      'enableWhenAny' in section
        ? section.enableWhenAny.some((condition) => evaluateSectionCondition(condition, resolved))
        : true;
    const isDisabled = allFieldsEmpty || !enableRulesPass;
    const items = isDisabled
      ? []
      : section.fields
          .map((fieldId) => buildProfileDetailItem(fieldId, resolved))
          .filter((item): item is ProfileDetailItemViewModel => item !== null);

    return {
      defaultOpen:
        !isDisabled &&
        Boolean(source.supplement.defaultOpenSectionIds?.includes(section.sectionId)),
      description: section.description,
      disabledMessage: profilePageCopy.details.disabledMessage,
      id: section.sectionId,
      isDisabled,
      items,
      title: section.label,
    };
  });

  const crimeSeverityTone: ProfileTagTone =
    resolved.criminal_case_count === 0
      ? 'info'
      : resolved.criminal_case_count > 3
        ? 'danger'
        : 'warning';

  const crimeCaseTables = [
    {
      fieldId: 'accused_cases' as const,
      label: getFieldLabel('accused_cases'),
      rows: resolved.accused_cases,
      tone: 'warning' as const,
    },
    {
      fieldId: 'convicted_cases' as const,
      label: getFieldLabel('convicted_cases'),
      rows: resolved.convicted_cases,
      tone: 'danger' as const,
    },
  ]
    .map((entry) => {
      const table = buildTableViewModel(entry.rows);

      if (!table) {
        return null;
      }

      return {
        fieldId: entry.fieldId,
        label: entry.label,
        table,
        tone: entry.tone,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const heroFacts = [
    {
      hideLabelOnCompact: true,
      label: profilePageCopy.hero.partyLabel,
      value: resolved.party ?? 'Party unavailable',
    },
    ...(resolved.age !== null
      ? [
          {
            hideLabelOnCompact: true,
            label: profileFieldLabels.age,
            value: `${resolved.age} years`,
          },
        ]
      : []),
    ...(resolved.self_profession
      ? [
          {
            hideLabelOnCompact: true,
            label: profileFieldLabels.self_profession,
            value: resolved.self_profession,
          },
        ]
      : []),
    ...(resolved.criminal_case_count > 0
      ? [
          {
            label: profileFieldLabels.criminal_case_count,
            value: numberFormatter.format(resolved.criminal_case_count),
          },
        ]
      : []),
  ];

  return {
    assets: {
      items: assetItems,
    },
    crime: {
      caseTables: crimeCaseTables,
      helper:
        resolved.criminal_case_count > 0
          ? profilePageCopy.crime.withCases
          : profilePageCopy.crime.allClear,
      severityTone: crimeSeverityTone,
      summary:
        resolved.criminal_case_count > 0
          ? `${resolved.criminal_case_count} reported criminal cases appear in the supplied profile record.`
          : 'No reported criminal cases appear in the supplied profile record.',
      totalCases: String(resolved.criminal_case_count),
    },
    detailSections,
    hero: {
      constituency: resolved.constituency_label ?? 'Constituency unavailable',
      facts: heroFacts,
      name: resolved.display_name,
      party: resolved.party ?? 'Party unavailable',
      partySymbol: source.supplement.partySymbol,
      portrait: source.supplement.portrait,
      state: resolved.state_name,
      year: String(resolved.election_year),
    },
    summary: {
      items: summaryItems,
    },
  };
}
