import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function GET() {
  try {
    // Get the session using the new method
    const session = await auth();

    // Check if user is authenticated and is admin
    if (!session || !session.user) {
      return Response.json(
        new ApiError(401, false, "Unauthorized: User not logged in"),
        {
          status: 401,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user || user.role !== "admin") {
      return Response.json(
        new ApiError(401, false, "Unauthorized: User not logged in"),
        {
          status: 401,
        }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
        payments: true,
        documents: {
          select: {
            id: true,
            title: true,
            status: true,
            fileUrl: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    return Response.json(
      new ApiResponse(200, true, users, "Users data fetched successfully"),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching payments:", error);
    return Response.json(new ApiError(500, false, "Internal Server Error"), {
      status: 500,
    });
  }
}
