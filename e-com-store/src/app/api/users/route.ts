import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    message: "heelo",
    data: [
      {
        name: "üser1",
        email: "user1@gmail.com",
      },
      {
        name: "üser1",
        email: "user1@gmail.com",
      },
    ],
  });
}
