import crypto, { randomUUID } from 'crypto';

export function encryptString(data: string): string {
  const securityKey = String(process.env.API_SECRET);
  const encryptionSecurity = crypto
    .createHash('sha512')
    .update(securityKey)
    .digest('hex')
    .substring(0, 32);

  const iv = crypto
    .createHash('sha512')
    .update(randomUUID())
    .digest('hex')
    .substring(0, 16);

  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionSecurity, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return `${iv}-${encryptedData}`;
}

export function decryptString(encryptedData: string): string {
  const securityKey = String(process.env.API_SECRET);
  const encryptionSecurity = crypto
    .createHash('sha512')
    .update(securityKey)
    .digest('hex')
    .substring(0, 32);

  const [iv, securedString] = encryptedData.split('-');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    encryptionSecurity,
    iv.toString(),
  );
  let decryptedData = decipher.update(securedString, 'hex', 'utf-8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
