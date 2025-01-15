import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Асинхронная функция проверки токена
async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

// Имитация функции получения данных пользователя из базы данных
async function getUserDataFromDatabase(userId) {
  // Здесь должна быть логика доступа к вашей базе данных.
  return { id: userId, name: 'John Doe', email: 'john@example.com' };
}

// Обработка GET-запросов
export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Invalid token format' }, { status: 401 });
  }

  try {
    const decoded = await verifyToken(token); // Проверяем токен

    // Извлекаем данные пользователя из базы данных
    const userData = await getUserDataFromDatabase(decoded.id);

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
