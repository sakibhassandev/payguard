"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { usersDataType } from "@/lib/definitions";
import axios from "axios";

export function AdminPaymentManagement({
  usersData,
}: {
  usersData: usersDataType[];
}) {
  const [users, setUsers] = useState<usersDataType[]>(usersData);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  const handleStatusChange = async (
    paymentId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      await axios.patch("/api/change-payment-status", {
        paymentId,
        status: newStatus,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update payment status. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setUsers(
      users.map((userData) => ({
        ...userData,
        payments: userData.payments.map((payment) =>
          payment.id === paymentId ? { ...payment, status: newStatus } : payment
        ),
      }))
    );

    toast({
      title: `Payment ${newStatus}`,
      description: `Payment #${paymentId} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const filteredPayments = users
    .flatMap((userData) =>
      userData.payments.map((payment) => ({
        ...payment,
        userEmail: userData.email,
      }))
    )
    .filter(
      (payment) => statusFilter === "all" || payment.status === statusFilter
    );

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.userEmail}</TableCell>
                <TableCell>{payment.title}</TableCell>
                <TableCell>${parseInt(payment.amount).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "approved"
                        ? "default"
                        : payment.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      payment.status === "pending"
                        ? "bg-black text-white hover:bg-black/90"
                        : ""
                    }
                  >
                    {payment.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {payment.status === "pending" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                          onClick={() =>
                            handleStatusChange(payment.id, "approved")
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() =>
                            handleStatusChange(payment.id, "rejected")
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
