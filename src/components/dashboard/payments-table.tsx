"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
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
import { PaymentDialog } from "@/components/dashboard/payment-dialog";
import { PaymentType } from "@/lib/definitions";

export function PaymentsTable({ payments }: { payments: PaymentType[] }) {
  const [selectedPayment, setSelectedPayment] = useState<
    (typeof payments)[0] | null
  >(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPayments = payments?.filter((payment) =>
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
            {filteredPayments?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.title}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>
                  {new Date(payment?.createdAt).toLocaleDateString()}
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
                    {payment.status?.toUpperCase()}
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
