import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export async function PATCH(request: Request) {
  try {
    const { documentId, status } = await request.json();

    if (!documentId || !status) {
      return Response.json(
        new ApiError(400, false, "Document ID and status are required"),
        {
          status: 400,
        }
      );
    }

    const updatedDocument = await prisma.documents.update({
      where: {
        id: documentId,
      },
      data: {
        status: status,
      },
    });

    return Response.json(
      new ApiResponse(
        200,
        true,
        updatedDocument,
        "Document status updated successfully."
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating Document status:", error);
    return Response.json(
      new ApiError(500, false, "Failed to update Document status."),
      { status: 500 }
    );
  }
}
