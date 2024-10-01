export const formatAddress = (address: string) => {
  if (!address) return null;
  const firstPart = address.slice(0, 6);
  const lastPart = address.slice(-6);
  return `${firstPart}...${lastPart}`;
};
