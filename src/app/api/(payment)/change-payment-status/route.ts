import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function PATCH(request: Request) {
  try {
    const { paymentId, status } = await request.json();

    if (!paymentId || !status) {
      return Response.json(
        new ApiError(400, false, "Payment ID and status are required"),
        {
          status: 400,
        }
      );
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: status,
      },
    });

    return Response.json(
      new ApiResponse(
        200,
        true,
        updatedPayment,
        "Payment status updated successfully."
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating payment status:", error);
    return Response.json(
      new ApiError(500, false, "Failed to update payment status."),
      { status: 500 }
    );
  }
}
