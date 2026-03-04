/**
 * Format a price in cents to a dollar string.
 */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Validate a US phone number.
 * Should accept: (555) 123-4567, 555-123-4567, 5551234567
 * Should reject: 123, abc, empty string
 */
export function validatePhone(phone: string): boolean {
  // BUG: This regex is too permissive — it accepts any string with 7+ digits
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7;
}

/**
 * Generate a short order ID.
 */
export function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}
