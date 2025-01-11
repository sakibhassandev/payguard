"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usersDataType } from "@/lib/definitions";

export function AdminDashboardSummary({
  usersData,
}: {
  usersData: usersDataType[];
}) {
  const [summary, setSummary] = useState({
    totalPayments: 0,
    totalAmount: 0,
    pendingPayments: 0,
    approvedPayments: 0,
  });

  //   Calculate the total payments, total amount, pending payments, and approved payments
  useEffect(() => {
    const totalPayments = usersData.reduce((acc, user) => {
      return acc + user.payments.length;
    }, 0);

    const totalAmount = usersData.reduce((acc, user) => {
      return (
        acc +
        user.payments.reduce((acc, payment) => {
          return acc + parseFloat(payment.amount);
        }, 0)
      );
    }, 0);

    const pendingPayments = usersData.reduce((acc, user) => {
      return (
        acc +
        user.payments.filter((payment) => payment.status === "pending").length
      );
    }, 0);

    const approvedPayments = usersData.reduce((acc, user) => {
      return (
        acc +
        user.payments.filter((payment) => payment.status === "approved").length
      );
    }, 0);

    setSummary({
      totalPayments,
      totalAmount,
      pendingPayments,
      approvedPayments,
    });
  }, [usersData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalPayments}</div>
          <p className="text-xs text-muted-foreground">
            ${summary.totalAmount.toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.pendingPayments}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Approved Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.approvedPayments}</div>
        </CardContent>
      </Card>
    </div>
  );
}
