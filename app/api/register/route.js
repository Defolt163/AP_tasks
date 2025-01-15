import bcrypt from 'bcrypt';
import pool from '../server';

export async function POST(req) {
    try {
        const { name, age, login, password } = await req.json();

        // Проверка, существует ли пользователь
        const [rows] = await pool.query('SELECT * FROM users WHERE login = ?', [login]);

        if (rows.length > 0) {
            return new Response(
                JSON.stringify({ message: 'Пользователь уже существует' }),
                { status: 400 }
            );
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Сохранение пользователя в базе данных
        await pool.query('INSERT INTO users (Name, Age, login, password) VALUES (?, ?, ?, ?)', [name, age, login, hashedPassword]);

        return new Response(
            JSON.stringify({ message: 'Готово' }),
            { status: 201 }
        );
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        return new Response(
            JSON.stringify({ message: 'Ошибка' }),
            { status: 500 }
        );
    }
}
