import { DashboardMetrics } from "@/components/dashboard-metrics";
import { PaymentsTable } from "@/components/payments-table";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">My Payments</h1>
        <DashboardMetrics />
        <PaymentsTable />
      </main>
    </div>
  );
}
