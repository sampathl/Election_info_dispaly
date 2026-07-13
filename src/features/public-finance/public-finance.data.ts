import type { CsvRecord } from '@/features/public-finance/static-csv';

export interface RankedAmountRow {
  amount: number;
  name: string;
}

export interface ElectionExpenseRow {
  amount: number;
  candidate: string;
  constituency: string;
  party: string;
}

export interface PartyFinancialYearRow {
  assetsLacs: number;
  expenditureLacs: number;
  financialYear: string;
  incomeLacs: number;
  liabilitiesLacs: number;
}

export interface PartyDonationYearRow {
  averageDonation: number;
  donorCount: number;
  financialYear: string;
  totalDonation: number;
}

export const publicFinanceCsv = {
  electoralBondDonors: '/mock-data/data/public-finance/electoral-bond-donors.csv',
  electoralBondParties: '/mock-data/data/public-finance/electoral-bond-parties.csv',
  electionExpenses: '/mock-data/data/public-finance/election-expenses.csv',
  partyDonations: '/mock-data/data/public-finance/party-donations.csv',
  partyFinancials: '/mock-data/data/public-finance/party-financials.csv',
} as const;

export const electoralBondPartySource =
  'https://myneta.info/electoral_bonds/parties_highest_to_lowest.php';
export const electoralBondDonorSource =
  'https://myneta.info/electoral_bonds/donors_highest_to_lowest.php';
export const electionExpenseSource =
  'https://www.myneta.info/LokSabha2019/index.php?action=showWinnersExpense&sortExp=default';
export const partyFinancialSource =
  'https://www.myneta.info/party/index.php?action=summary&id=1449';

export const partyProfile = {
  address: '41, Hanuman Road, New Delhi, India 110001',
  name: 'Aam Aadmi Party',
  registeredState: 'Delhi',
  shortName: 'AAP',
  type: 'National Party',
};

function requiredText(record: CsvRecord, key: string) {
  const value = record[key]?.trim();

  if (!value) {
    throw new Error(`CSV row is missing required field “${key}”.`);
  }

  return value;
}

function requiredNumber(record: CsvRecord, key: string) {
  const value = Number(requiredText(record, key));

  if (!Number.isFinite(value)) {
    throw new Error(`CSV field “${key}” must be a valid number.`);
  }

  return value;
}

export function mapRankedAmountRow(record: CsvRecord): RankedAmountRow {
  return {
    amount: requiredNumber(record, 'amount'),
    name: requiredText(record, 'name'),
  };
}

export function mapElectionExpenseRow(record: CsvRecord): ElectionExpenseRow {
  return {
    amount: requiredNumber(record, 'amount'),
    candidate: requiredText(record, 'candidate'),
    constituency: requiredText(record, 'constituency'),
    party: requiredText(record, 'party'),
  };
}

export function mapPartyFinancialRow(record: CsvRecord): PartyFinancialYearRow {
  return {
    assetsLacs: requiredNumber(record, 'assets_lacs'),
    expenditureLacs: requiredNumber(record, 'expenditure_lacs'),
    financialYear: requiredText(record, 'financial_year'),
    incomeLacs: requiredNumber(record, 'income_lacs'),
    liabilitiesLacs: requiredNumber(record, 'liabilities_lacs'),
  };
}

export function mapPartyDonationRow(record: CsvRecord): PartyDonationYearRow {
  return {
    averageDonation: requiredNumber(record, 'average_donation'),
    donorCount: requiredNumber(record, 'donor_count'),
    financialYear: requiredText(record, 'financial_year'),
    totalDonation: requiredNumber(record, 'total_donation'),
  };
}
