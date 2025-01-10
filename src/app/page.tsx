import { Navbar } from "@/components/navbar";
import { PaymentRequestForm } from "@/components/payment-request";
import { SessionProvider } from "next-auth/react";

export default function PaymentRequestPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
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
