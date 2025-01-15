import { NextResponse } from 'next/server';
import accountDB from '../../server2';

// Получение информации о пользователе
export async function GET(request, { params }) {
  try {
    const user = await new Promise((resolve, reject) => {
      accountDB.query(
        "SELECT * FROM users WHERE id = ?",
        [params.id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Обновление информации о пользователе
export async function PUT(request, { params }) {
  try {
    const { userName, userAge } = await request.json();

    const result = await new Promise((resolve, reject) => {
      accountDB.query(
        "UPDATE users SET Name = ?, Age = ? WHERE id = ?",
        [userName, userAge, params.id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: "User updated successfully" });
    } else {
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Удаление пользователя
export async function DELETE(request, { params }) {
  try {
    const result = await new Promise((resolve, reject) => {
      accountDB.query(
        "DELETE FROM users WHERE id = ?",
        [params.id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (result.affectedRows === 1) {
      return NextResponse.json({ message: "User deleted successfully" });
    } else {
      return NextResponse.json(
        { message: "Failed to delete user" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
