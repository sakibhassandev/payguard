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

export type usersDataType = {
  email: string;
  role: string;
  documents: {
    id: string;
    status: "pending" | "approved" | "rejected";
    fileUrl: string;
    title: string;
    uploadedAt: string;
    user: {
      email: string;
    };
  }[];
  payments: {
    id: string;
    amount: string;
    title: string;
    createdAt: string;
    status: "pending" | "approved" | "rejected";
    userId: string;
  }[];
};
