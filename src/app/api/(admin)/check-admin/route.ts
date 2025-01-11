import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { auth } from "@/auth";

export async function GET() {
  try {
    // Get the session using auth()
    const session = await auth();

    if (!session || !session.user) {
      return Response.json(new ApiError(401, false, "Unauthorized"), {
        status: 401,
      });
    }

    const userId = session.user.id;

    // check user role
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return Response.json(new ApiError(404, false, "User not found"), {
        status: 404,
      });
    }

    // Return whether user is admin or not
    return Response.json(
      new ApiResponse(
        200,
        true,
        { isAdmin: user.role === "admin" },
        "Admin status checked successfully"
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error checking admin status", error);
    return Response.json(
      new ApiError(500, false, "Failed to check admin status"),
      { status: 500 }
    );
  }
}
