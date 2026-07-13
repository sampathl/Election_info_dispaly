import { RankedFinancePage } from '@/features/public-finance/components/RankedFinancePage';
import {
  electoralBondPartySource,
  publicFinanceCsv,
} from '@/features/public-finance/public-finance.data';

export function ElectoralBondPartiesPage() {
  return (
    <RankedFinancePage
      dataUrl={publicFinanceCsv.electoralBondParties}
      eyebrow="Electoral Bonds"
      title="Electoral bonds received by political parties."
      description="A party-wise ranking that preserves MyNeta’s name, amount, and highest-to-lowest content structure while using the application’s responsive card and table architecture."
      entityLabel="Party"
      sourceUrl={electoralBondPartySource}
    />
  );
}
