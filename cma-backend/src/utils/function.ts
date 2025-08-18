import crypto from 'crypto';

export const formatPhoneNumber = (phone: string): string => {

    if (/^016\d{9}$/.test(phone)) return phone.replace(/^016/, '84');
    if (/^0\d{9}$/.test(phone)) return phone.replace(/^0/, '84');
    if (/^84\d{9}$/.test(phone)) return phone;
    if (/^\+84\d{9}$/.test(phone)) return phone.replace('+', '');
    if (/^\d{9}$/.test(phone)) return '84' + phone;
    return phone
}

export const gen6DigitCode = (): string => {
 const n = crypto.randomInt(0, 1000000);
  return n.toString().padStart(6, '0');
}
