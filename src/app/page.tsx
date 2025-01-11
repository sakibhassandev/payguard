import { Navbar } from "@/components/navbar";
import { PaymentRequestForm } from "@/components/home/payment-request";
import { SessionProvider } from "next-auth/react";

const navbarLinks = [
  { name: "Documents", href: "/documents" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function PaymentRequestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar name="PayGuard" links={navbarLinks} />
      <main className="mt-20 container mx-auto py-6 px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Create Payment Request
        </h1>
        <SessionProvider>
          <PaymentRequestForm />
        </SessionProvider>
      </main>
    </div>
  );
}
