import { NextResponse } from "next/server";
import accountDB from '../server';

export async function POST(request) {
  try {
    const { userName, userAge } = await request.json();

    const result = await new Promise((resolve, reject) => {
      accountDB.query(
        "INSERT INTO users (Name, Age) VALUES (?, ?)",
        [userName, userAge],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (result && result.affectedRows === 1) {
      return NextResponse.json({ message: "User created successfully" });
    } else {
      return NextResponse.json(
        { message: "Failed to create user" },
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