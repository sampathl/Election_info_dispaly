import {
  mapElectionExpenseRow,
  mapRankedAmountRow,
} from '@/features/public-finance/public-finance.data';
import { parseCsv } from '@/features/public-finance/static-csv';

describe('static CSV parsing', () => {
  it('parses quoted commas, escaped quotes, and Windows line endings', () => {
    const records = parseCsv(
      'name,amount,notes\r\n"President, Example Party",1200,"Said ""hello"""\r\n',
    );

    expect(records).toEqual([
      {
        amount: '1200',
        name: 'President, Example Party',
        notes: 'Said "hello"',
      },
    ]);
    expect(mapRankedAmountRow(records[0])).toEqual({
      amount: 1200,
      name: 'President, Example Party',
    });
  });

  it('maps an election-expense record into typed values', () => {
    const [record] = parseCsv(
      'candidate,constituency,party,amount\nExample Candidate,Example Seat,IND,5028193',
    );

    expect(mapElectionExpenseRow(record)).toEqual({
      amount: 5_028_193,
      candidate: 'Example Candidate',
      constituency: 'Example Seat',
      party: 'IND',
    });
  });

  it('rejects malformed rows instead of silently shifting fields', () => {
    expect(() => parseCsv('name,amount\nMissing amount')).toThrow(
      'CSV row 2 has 1 fields; expected 2.',
    );
  });
});
