import { NextResponse } from "next/server";
import accountDB from '../server';

export async function DELETE(request) {
  try {
    const { userName } = await request.json();

    const result = await new Promise((resolve, reject) => {
      // Исправлено: добавлены скобки для передачи параметров
      accountDB.query(
        "DELETE FROM users WHERE users.Name = ?",
        [userName], // параметры передаются здесь, должна быть запятая
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    // Проверяем, был ли удален пользователь
    if (result && result.affectedRows === 1) {
      return NextResponse.json({ message: "User deleted" });
    } else {
      return NextResponse.json(
        { message: "Failed to remove user" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}