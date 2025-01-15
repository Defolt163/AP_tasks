import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { algorithm, data, hashToVerify } = await request.json();

    if (!data || !algorithm) {
      return NextResponse.json(
        { error: 'Требуются данные и алгоритм' },
        { status: 400 }
      );
    }

    const hash = crypto.createHash(algorithm).update(data).digest('hex');


    if (hashToVerify) {
      const isValid = hash === hashToVerify;
      return NextResponse.json({ isValid });
    }

    return NextResponse.json({ hash });
  } catch (error) {
    return NextResponse.json(
      { error: 'Неподдерживаемый алгоритм' },
      { status: 400 }
    );
  }
}
