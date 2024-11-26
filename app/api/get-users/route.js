import { NextRequest, NextResponse } from "next/server";
import accountDB from '../server';

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            accountDB.query(`SELECT * FROM users`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("OK");
                    resolve(results);
                }
            });
        });
        
        console.log(results);
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, // Используйте error.message для получения текстового сообщения об ошибке
            {
                status: 500
            }
        );
    }
}