import { test } from 'node:test';
import assert from 'node:assert/strict';
const site = await import('../src/lib/site.mjs').catch(() => ({}));
const enquiry = await import('../src/lib/enquiry.mjs').catch(() => ({}));

test('switching language preserves nested case study and rejects unsupported locales', () => {
  assert.equal(
    typeof site.localizedPath,
    'function',
    'locale routing is implemented',
  );
  assert.equal(
    site.localizedPath('ta', 'case-studies/restaurant'),
    '/ta/case-studies/restaurant/',
  );
  assert.equal(site.localizedPath('xx', 'solutions'), '/en/solutions/');
  assert.equal(site.localizedPath('si', ''), '/si/');
});
test('unconfigured WhatsApp never generates a fake recipient; text is encoded safely', () => {
  assert.equal(
    typeof site.whatsappUrl,
    'function',
    'contact routing is implemented',
  );
  assert.equal(site.whatsappUrl('', 'Hello'), null);
  assert.equal(site.whatsappUrl('123', 'Hello'), null);
  assert.equal(
    site.whatsappUrl('+94 77 123 4567', 'ආයුබෝවන් & hello'),
    'https://wa.me/94771234567?text=' + encodeURIComponent('ආයුබෝවන් & hello'),
  );
});
test('enquiry validates whitespace, short phone, invalid email and oversized messages', () => {
  assert.equal(
    typeof enquiry.validateEnquiry,
    'function',
    'enquiry validation is implemented',
  );
  assert.deepEqual(
    enquiry.validateEnquiry({
      name: ' ',
      business: 'Shop',
      phone: '123',
      email: 'x@',
      message: 'x',
    }).errors,
    { name: 'required', phone: 'phone', email: 'email', message: 'short' },
  );
  assert.equal(
    enquiry.validateEnquiry({
      name: 'A',
      business: 'B',
      phone: '0771234567',
      message: 'a'.repeat(3001),
    }).errors.message,
    'long',
  );
});
test('valid Unicode enquiry stays intact and optional email stays optional', () => {
  assert.equal(typeof enquiry.validateEnquiry, 'function');
  const result = enquiry.validateEnquiry({
    name: '  නිමල්  ',
    business: 'කඩය',
    phone: '077 123 4567',
    message: 'මගේ ව්‍යාපාරයේ තොග කළමනාකරණය අවශ්‍යයි.',
  });
  assert.deepEqual(result.errors, {});
  assert.equal(result.values.name, 'නිමල්');
  assert.equal(result.values.business, 'කඩය');
});
