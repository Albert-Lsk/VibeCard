/**
 * Slugify a string by converting to lowercase, removing non-alphanumeric characters,
 * and replacing spaces with dashes
 * @param {string} str - The string to slugify
 * @returns {string} - The slugified string
 */
export function slugify(str) {
  if (!str) return '';

  return str
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces with dashes
    .replace(/\s+/g, '-')
    // Remove all non-alphanumeric characters except dashes
    .replace(/[^\w\-]+/g, '')
    // Replace multiple dashes with single dash
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing dashes
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Format date as YYYYMMDD
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date string
 */
export function formatDateForFilename(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

/**
 * Generate filename for exported card
 * @param {string} username - The username from form/state
 * @returns {string} - The formatted filename
 */
export function generateCardFilename(username) {
  const dateStr = formatDateForFilename();
  const slug = slugify(username || 'user');
  return `VibeCard-${dateStr}-${slug}.png`;
}
