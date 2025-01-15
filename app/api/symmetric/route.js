import crypto from 'crypto';
import { NextResponse } from 'next/server';

const AES_ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

export async function POST(request) {
  try {
    const { action, data, key } = await request.json();

    if (!data || !key || (action !== 'encrypt' && action !== 'decrypt')) {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      );
    }

    const keyBuffer = Buffer.from(key, 'hex');
    if (keyBuffer.length !== 32) {
      return NextResponse.json(
        { error: 'Длина ключа должна составлять 32 байта (256 бит).' },
        { status: 400 }
      );
    }

    if (action === 'encrypt') {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(AES_ALGORITHM, keyBuffer, iv);
      let encrypted = cipher.update(data, 'utf-8', 'base64');
      encrypted += cipher.final('base64');
      return NextResponse.json({
        encrypted: `${iv.toString('base64')}:${encrypted}`,
      });
    } else if (action === 'decrypt') {
      const [ivBase64, encryptedData] = data.split(':');
      if (!ivBase64 || !encryptedData) {
        return NextResponse.json(
          { error: 'Недопустимый формат зашифрованных данных' },
          { status: 400 }
        );
      }

      const iv = Buffer.from(ivBase64, 'base64');
      const decipher = crypto.createDecipheriv(AES_ALGORITHM, keyBuffer, iv);
      let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');
      return NextResponse.json({ decrypted });
    }
  } catch (error) {
    console.error('Ошибка шифрования/дешифрования:', error.message);
    return NextResponse.json(
      { error: 'Ошибка расшифровки/шифрования', details: error.message },
      { status: 400 }
    );
  }
}
