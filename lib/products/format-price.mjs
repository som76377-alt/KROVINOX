export function formatPricePaise(amountPaise) {
  if (!Number.isInteger(amountPaise) || amountPaise < 0) {
    throw new TypeError("Price must be a non-negative integer number of paise.");
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}
