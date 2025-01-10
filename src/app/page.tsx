import { PaymentRequestForm } from "@/components/payment-request";

export default function PaymentRequestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Payment Request</h1>
      <PaymentRequestForm />
    </div>
  );
}
