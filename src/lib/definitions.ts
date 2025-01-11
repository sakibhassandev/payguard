export type PaymentType = {
  id: number;
  userId: number;
  title: string;
  status: "pending" | "approved" | "rejected";
  amount: number | string;
  createdAt: Date;
};

export type NavbarProps = {
  name: string;
  links: { name: string; href: string }[];
};
