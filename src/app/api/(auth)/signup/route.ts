import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json();

    if (!email || !password) {
      return Response.json(
        new ApiError(400, false, "All fields are required"),
        { status: 400 }
      );
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return Response.json(
        new ApiError(400, false, "User already exists with this email"),
        { status: 400 }
      );
    }

    const bcryptSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "user",
      },
      select: {
        email: true,
        role: true,
      },
    });

    return Response.json(new ApiResponse(201, true, user, "User registered"), {
      status: 201,
    });
  } catch (error) {
    console.log("Error registering new user", error);
    return Response.json(
      new ApiError(500, false, "Error registering new user"),
      { status: 500 }
    );
  }
}
