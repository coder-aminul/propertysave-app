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
