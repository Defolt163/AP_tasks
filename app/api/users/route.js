import { NextResponse } from 'next/server';
import accountDB from '../server';

// Получение списка пользователей
export async function GET() {
    try {
        // Использование промиса для выполнения запроса
        const [results] = await accountDB.query('SELECT * FROM users');
        
        console.log(results); // Логирование результатов запроса
        return NextResponse.json(results);
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { userName, userAge } = await request.json();

        // Выполнение запроса для добавления пользователя
        const result = await accountDB.query(
            "INSERT INTO users (Name, Age) VALUES (?, ?)",
            [userName, userAge]
        );

        if (result && result.affectedRows === 1) {
            return NextResponse.json({ message: "User created successfully" });
        } else {
            return NextResponse.json({ message: "Failed to create user" }, { status: 400 });
        }
    } catch (error) {
        console.error("Ошибка при добавлении пользователя:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
