"use server";

export async function createPaymentRequest(data: {
  title: string;
  amount: string;
  description?: string;
}) {
  if (
    data.title.length < 2 ||
    isNaN(Number(data.amount)) ||
    Number(data.amount) <= 0
  ) {
    return { success: false, error: "Invalid form data" };
  }

  try {
    // Here you would typically save the payment request to your database
    // and create a PayPal order

    // This is a mock PayPal order creation
    const mockOrderId = `ORDER-${Math.random().toString(36).substr(2, 9)}`;

    return {
      success: true,
      orderId: mockOrderId,
    };
  } catch (error) {
    console.error("Failed to create payment request:", error);
    return { success: false, error: "Failed to create payment request" };
  }
}
