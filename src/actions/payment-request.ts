import axios from "axios";

export async function createPaymentRequest(data: {
  title: string;
  amount: string;
}) {
  if (
    data.title.length < 2 ||
    isNaN(Number(data.amount)) ||
    Number(data.amount) <= 0
  ) {
    return { success: false, error: "Invalid form data" };
  }

  const mockOrderId = `ORDER-${Math.random().toString(36).substr(2, 9)}`;

  return {
    success: true,
    orderId: mockOrderId,
  };
}

export const createOrder = (data: { amount: string; title: string }) => {
  return {
    intent: "CAPTURE" as const,
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: data.amount,
        },
        description: data.title,
      },
    ],
  };
};

export const afterPaymentApprove = async (userData) => {
  const response = await axios.post("/api/create-payment", userData);
  return response.data;
};
