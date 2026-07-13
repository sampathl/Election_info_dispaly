import { RankedFinancePage } from '@/features/public-finance/components/RankedFinancePage';
import {
  electoralBondDonorSource,
  publicFinanceCsv,
} from '@/features/public-finance/public-finance.data';

export function ElectoralBondDonorsPage() {
  return (
    <RankedFinancePage
      dataUrl={publicFinanceCsv.electoralBondDonors}
      eyebrow="Electoral Bonds"
      title="Electoral bond purchasers ranked by amount."
      description="A donor-wise ranking that retains MyNeta’s donor, amount, and highest-to-lowest content model with clearer filtering and mobile table behavior."
      entityLabel="Donor"
      sourceUrl={electoralBondDonorSource}
    />
  );
}
