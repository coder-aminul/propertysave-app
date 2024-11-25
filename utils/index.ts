export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumberCommas = (num: string): string => {
  // Remove all non-numeric characters
  const n = num.replace(/\D/g, '');

  // Apply Bangladeshi comma formatting
  if (n.length > 3) {
    // Split into last 3 digits and the rest
    const lastThree = n.slice(-3);
    const otherDigits = n.slice(0, -3);
    // Format otherDigits in pairs, followed by the last three
    return otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return n; // Return the original if 3 or fewer digits
};

export function formatPrice(num: number) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

export const convertToTime = (dateString: any) => {
  const date = new Date(dateString);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
