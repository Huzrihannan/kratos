export function validateEnquiry(input) {
  const values = Object.fromEntries(
    ['name', 'business', 'phone', 'email', 'type', 'message'].map((key) => [
      key,
      typeof input[key] === 'string' ? input[key].trim() : '',
    ]),
  );
  const errors = {};
  for (const key of ['name', 'business', 'phone', 'message'])
    if (!values[key]) errors[key] = 'required';
  for (const key of ['name', 'business'])
    if (values[key].length > 120) errors[key] = 'long';
  if (
    values.phone &&
    (!/^[+\d\s()-]+$/.test(values.phone) ||
      !/^\d{9,15}$/.test(values.phone.replace(/\D/g, '')))
  )
    errors.phone = 'phone';
  if (
    values.email &&
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
      values.email.length > 254)
  )
    errors.email = 'email';
  if (values.message && values.message.length < 10) errors.message = 'short';
  if (values.message.length > 3000) errors.message = 'long';
  return { values, errors };
}
