import { Navbar } from "@/components/navbar";
import { PaymentRequestsTable } from "@/components/payment-requests-table";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <PaymentRequestsTable />
      </main>
    </div>
  );
}
