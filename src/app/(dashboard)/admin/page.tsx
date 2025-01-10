import { Navbar } from "@/components/navbar";
import { AdminPaymentManagement } from "@/components/admin-payment-management";
import { AdminDashboardSummary } from "@/components/admin-dashboard-summary";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>
        <AdminDashboardSummary />
        <div className="mt-10">
          <AdminPaymentManagement />
        </div>
      </main>
    </div>
  );
}
