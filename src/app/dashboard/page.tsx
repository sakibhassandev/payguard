"use client";

import { DashboardMetrics } from "@/components/dashboard-metrics";
import { Navbar } from "@/components/navbar";
import { PaymentsTable } from "@/components/payments-table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [payments, setPayments] = useState();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.post("/api/get-payments", {
          userId,
        });
        setPayments(response.data.data);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      }
    };
    fetchPayments();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">My Payments</h1>
        <DashboardMetrics payments={payments ?? []} />
        <PaymentsTable payments={payments ?? []} />
      </main>
    </div>
  );
}
