import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    return NextResponse.json(data)
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}