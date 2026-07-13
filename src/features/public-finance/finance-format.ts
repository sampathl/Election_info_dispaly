export const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 0,
  style: 'currency',
});

export function formatRupees(amount: number) {
  return rupeeFormatter.format(amount).replace('₹', 'Rs ');
}

export function formatCrores(amount: number) {
  return `${(amount / 10_000_000).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  })} crore`;
}
