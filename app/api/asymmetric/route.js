import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const keyPath = path.join(process.cwd(), 'keys');
const privateKeyPath = path.join(keyPath, 'private.pem');
const publicKeyPath = path.join(keyPath, 'public.pem');

function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  if (!fs.existsSync(keyPath)) {
    fs.mkdirSync(keyPath);
  }

  fs.writeFileSync(privateKeyPath, privateKey.export({ type: 'pkcs1', format: 'pem' }));
  fs.writeFileSync(publicKeyPath, publicKey.export({ type: 'pkcs1', format: 'pem' }));
}

export async function POST(request) {
  try {
    const { action, message, signature } = await request.json();

    if (action === 'generate') {
      generateKeys();
      return NextResponse.json({ message: 'Ключ сгенерирован' });
    }

    if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
      return NextResponse.json(
        { error: 'Ключи не найдены. Сначала сгенерируйте их.' },
        { status: 400 }
      );
    }

    const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf-8');

    if (action === 'sign') {
      const signer = crypto.createSign('sha256');
      signer.update(message);
      const signature = signer.sign(privateKey, 'hex');
      return NextResponse.json({ signature });
    }

    if (action === 'verify') {
      const verifier = crypto.createVerify('sha256');
      verifier.update(message);
      const isValid = verifier.verify(publicKey, signature, 'hex');
      return NextResponse.json({ isValid });
    }

    return NextResponse.json({ error: 'Недопустимое действие' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка' },
      { status: 400 }
    );
  }
}
