"use client";

import { AdminPaymentManagement } from "@/components/admin/admin-payment-management";
import { AdminDashboardSummary } from "@/components/admin/admin-dashboard-summary";
import { DocumentReviewTable } from "@/components/admin/admin-document-review-table";
import { Navbar } from "@/components/navbar";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const navbarLinks = [{ name: "Dashboard", href: "/admin" }];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const secureAdminAccess = async () => {
      try {
        const response = await fetch("/api/check-admin");
        const { data } = await response.json();

        const response2 = await fetch("/api/get-all-users-data");
        const data2 = await response2.json();

        if (data2.success) {
          setUsersData(data2.data);
        }

        if (data.isAdmin) {
          toast({
            title: "Hello, Admin!",
            description: "Welcome to the admin dashboard.",
            variant: "default",
          });
        } else {
          await signOut({ redirect: false });
          router.push("/login");
          toast({
            title: "Unauthorized",
            description: "You are not authorized to access this page.",
            variant: "destructive",
          });
        }
      } catch (error) {
        await signOut({ redirect: false });
        router.push("/login");
        console.error("Error in admin access:", error);
        toast({
          title: "Error",
          description: "Uncaught server error.",
          variant: "destructive",
        });
      }
    };

    secureAdminAccess();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar name="PayGuard Admin" links={navbarLinks} />
      <main className="container mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>
        <AdminDashboardSummary usersData={usersData} />
        <div className="mt-10">
          <AdminPaymentManagement usersData={usersData} />
        </div>
        <div className="my-10">
          <h2 className="text-2xl mb-4 font-bold tracking-tight mt-8">
            Review Documents
          </h2>
          <DocumentReviewTable usersData={usersData} />
        </div>
      </main>
    </div>
  );
}
