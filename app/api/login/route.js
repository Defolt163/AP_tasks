import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import accountDB from '../server'; // Подключение к базе данных

const SECRET_KEY = process.env.JWT_SECRET_KEY; // Секрет для JWT

export async function POST(req) {
    try {
        const { login, password } = await req.json();

        // Проверка пользователя
        console.log('Получен логин:', login);
        console.log('Получен пароль:', password);
        const [rows] = await accountDB.query('SELECT * FROM users WHERE login = ?', [login]);

        if (rows.length === 0) {
            console.log('Пользователь не найден');
            return new Response(
                JSON.stringify({ message: 'Не найден' }),
                { status: 404 }
            );
        }

        const user = rows[0];
        console.log('Найден пользователь:', user);

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Неверный пароль');
            return new Response(
                JSON.stringify({ message: 'Неверный пароль' }),
                { status: 401 }
            );
        }

        // Генерация JWT
        const token = jwt.sign({ id: user.id, name: user.Name, age: user.Age, login: user.login, role: user.role }, SECRET_KEY, {
            expiresIn: '7d',
        });
        console.log('Сгенерирован токен:', token);

        return new Response(
            JSON.stringify({ token }),
            { status: 200 }
        );
    } catch (err) {
        console.error('Ошибка на сервере:', err);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}

async function getUserFromToken(token) {
    try {
        console.log('Токен, который пришел на сервер:', token);

        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Декодированный токен:', decoded);

        const userId = decoded.id;

        const [rows] = await accountDB.query('SELECT * FROM users WHERE id = ?', [userId]);
        console.log('Результаты запроса в базу данных:', rows);

        if (rows.length === 0) {
            throw new Error('User not found');
        }

        return rows[0]; // Возвращаем данные пользователя
    } catch (error) {
        console.error('Ошибка при декодировании токена или запросе пользователя:', error);
        throw new Error('Invalid token or user not found');
    }
}

export async function GET(req) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        console.log('Токен не предоставлен');
        return new Response(JSON.stringify({ message: 'Tокен не предоставлен' }), { status: 401 });
    }

    try {
        const user = await getUserFromToken(token);
        console.log('Данные пользователя:', user);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error.message);
        return new Response(JSON.stringify({ message: error.message }), { status: 401 });
    }
}
