export type PaymentType = {
  id: number;
  userId: number;
  title: string;
  status: "pending" | "approved" | "rejected";
  amount: number | string;
  createdAt: Date;
};
