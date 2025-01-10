import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json(new ApiError(400, false, "User ID is required"), {
        status: 400,
      });
    }

    // check user role
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    // if user is admin, fetch all payment requests
    if (user?.role === "admin") {
      const payment = await prisma.payment.findMany({
        include: {
          user: true,
        },
      });

      return Response.json(
        new ApiResponse(
          200,
          true,
          payment,
          "Payment requests fetched successfully"
        ),
        {
          status: 200,
        }
      );
    }

    // if user is not admin, fetch only their payment requests
    const payment = await prisma.payment.findMany({
      where: {
        userId,
      },
    });

    return Response.json(
      new ApiResponse(
        200,
        true,
        payment,
        "Payment requests fetched successfully"
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error fetching Payment request", error);
    return Response.json(
      new ApiError(500, false, "Failed to fetch payment requests"),
      { status: 500 }
    );
  }
}
