import { AdminPaymentManagement } from "@/components/admin/admin-payment-management";
import { AdminDashboardSummary } from "@/components/admin/admin-dashboard-summary";
import { DocumentReviewTable } from "@/components/admin/admin-document-review-table";
import { Navbar } from "@/components/navbar";

const navbarLinks = [{ name: "User Dashboard", href: "/dashboard" }];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar name="PayGuard Admin" links={navbarLinks} />
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>
        <AdminDashboardSummary />
        <div className="mt-10">
          <AdminPaymentManagement />
        </div>
        <div className="my-10">
          <h2 className="text-2xl mb-4 font-bold tracking-tight mt-8">
            Review Documents
          </h2>
          <DocumentReviewTable />
        </div>
      </main>
    </div>
  );
}
