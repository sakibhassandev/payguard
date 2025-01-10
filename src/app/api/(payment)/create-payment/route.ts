import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  try {
    const { userId, title, amount } = await request.json();

    if (!userId || !title || !amount) {
      return Response.json(
        new ApiError(400, false, "All fields are required"),
        { status: 400 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        title,
        amount,
      },
    });

    return Response.json(
      new ApiResponse(
        201,
        true,
        payment,
        "Payment request created successfully"
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error creating Payment request", error);
    return Response.json(
      new ApiError(500, false, "Failed to create payment request"),
      { status: 500 }
    );
  }
}
