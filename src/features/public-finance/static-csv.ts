import { useEffect, useState } from 'react';

export type CsvRecord = Record<string, string>;
export type StaticCsvStatus = 'error' | 'loading' | 'ready';

interface StaticCsvResult<T> {
  data: T[];
  error: string | null;
  status: StaticCsvStatus;
}

function parseCsvCells(text: string) {
  const rows: string[][] = [];
  let cell = '';
  let row: string[] = [];
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (character === ',' && !insideQuotes) {
      row.push(cell);
      cell = '';
    } else if ((character === '\n' || character === '\r') && !insideQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }

      row.push(cell);
      if (row.some((value) => value.trim().length > 0)) {
        rows.push(row);
      }
      row = [];
      cell = '';
    } else {
      cell += character;
    }
  }

  if (insideQuotes) {
    throw new Error('CSV contains an unterminated quoted field.');
  }

  row.push(cell);
  if (row.some((value) => value.trim().length > 0)) {
    rows.push(row);
  }

  return rows;
}

export function parseCsv(text: string): CsvRecord[] {
  const [headerRow, ...dataRows] = parseCsvCells(text.replace(/^\uFEFF/, ''));

  if (!headerRow) {
    return [];
  }

  const headers = headerRow.map((header) => header.trim());

  if (headers.some((header) => header.length === 0)) {
    throw new Error('CSV contains an empty column heading.');
  }

  return dataRows.map((values, rowIndex) => {
    if (values.length !== headers.length) {
      throw new Error(
        `CSV row ${rowIndex + 2} has ${values.length} fields; expected ${headers.length}.`,
      );
    }

    return Object.fromEntries(headers.map((header, index) => [header, values[index].trim()]));
  });
}

export function useStaticCsv<T>(url: string, mapRecord: (record: CsvRecord) => T) {
  const [result, setResult] = useState<StaticCsvResult<T>>({
    data: [],
    error: null,
    status: 'loading',
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadCsv() {
      setResult({ data: [], error: null, status: 'loading' });

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`CSV request failed with status ${response.status}.`);
        }

        const records = parseCsv(await response.text());
        const data = records.map(mapRecord);

        if (!controller.signal.aborted) {
          setResult({ data, error: null, status: 'ready' });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({
            data: [],
            error: error instanceof Error ? error.message : 'The CSV file could not be loaded.',
            status: 'error',
          });
        }
      }
    }

    void loadCsv();

    return () => controller.abort();
  }, [mapRecord, url]);

  return result;
}
