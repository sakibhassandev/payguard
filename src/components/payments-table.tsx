"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentDialog } from "@/components/payment-dialog";

const payments = [
  {
    id: 1,
    title: "Office Supplies",
    amount: 299.99,
    status: "pending",
    date: "2024-01-10",
  },
  {
    id: 2,
    title: "Software License",
    amount: 599.99,
    status: "approved",
    date: "2024-01-09",
  },
  {
    id: 3,
    title: "Conference Tickets",
    amount: 799.99,
    status: "rejected",
    date: "2024-01-08",
  },
];

export function PaymentsTable() {
  const [selectedPayment, setSelectedPayment] = useState<
    (typeof payments)[0] | null
  >(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPayments = payments.filter((payment) =>
    statusFilter === "all" ? true : payment.status === statusFilter
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          defaultValue="all"
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Export Data</span>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.title}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "approved"
                        ? "default"
                        : payment.status === "rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedPayment && (
        <PaymentDialog
          open={!!selectedPayment}
          onOpenChange={(open) => !open && setSelectedPayment(null)}
          payment={selectedPayment}
        />
      )}
    </div>
  );
}
