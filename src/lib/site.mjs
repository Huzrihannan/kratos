export const locales = ['en', 'si', 'ta'];
export const pages = [
  '',
  'solutions',
  'case-studies',
  'case-studies/restaurant',
  'case-studies/poultry',
  'how-we-work',
  'about',
  'contact',
  'privacy',
];
export function localizedPath(locale, slug = '') {
  const lang = locales.includes(locale) ? locale : 'en';
  const clean = String(slug).replace(/^\/+|\/+$/g, '');
  return `/${lang}/${clean ? clean + '/' : ''}`;
}
export function whatsappUrl(phone, message = '') {
  const raw = String(phone || '').trim();
  if (!/^\+?[\d\s()-]+$/.test(raw)) return null;
  const digits = raw.replace(/\D/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}${message ? '?text=' + encodeURIComponent(message) : ''}`;
}
