"use client";

import { useState } from "react";
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
import { Check, Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Payment = {
  id: number;
  userEmail: string;
  title: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  documentStatus: "Not Uploaded" | "Pending Review" | "Approved" | "Rejected";
  documents: {
    name: string;
    url: string;
  }[];
};

export function AdminPaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      userEmail: "user@example.com",
      title: "Office Supplies",
      amount: 299.99,
      status: "Pending",
      documentStatus: "Pending Review",
      documents: [{ name: "invoice.pdf", url: "#" }],
    },
    {
      id: 2,
      userEmail: "john@example.com",
      title: "Software License",
      amount: 599.99,
      status: "Approved",
      documentStatus: "Approved",
      documents: [{ name: "license.pdf", url: "#" }],
    },
  ]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDocuments, setSelectedDocuments] = useState<
    Payment["documents"] | null
  >(null);
  const { toast } = useToast();

  const handleStatusChange = (
    paymentId: number,
    newStatus: "Approved" | "Rejected"
  ) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: newStatus,
              documentStatus: newStatus,
            }
          : payment
      )
    );
    toast({
      title: `Payment ${newStatus}`,
      description: `Payment #${paymentId} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleExportData = () => {
    // Convert payments to CSV
    const headers = ["User", "Title", "Amount", "Status", "Document Status"];
    const csvData = payments
      .filter(
        (payment) => statusFilter === "all" || payment.status === statusFilter
      )
      .map((payment) =>
        [
          payment.userEmail,
          payment.title,
          payment.amount,
          payment.status,
          payment.documentStatus,
        ].join(",")
      );

    const csv = [headers.join(","), ...csvData].join("\n");

    // Create and trigger download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment-requests.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Payment data has been exported to CSV.",
    });
  };

  const filteredPayments = payments.filter(
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
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleExportData}
        >
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Document Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.userEmail}</TableCell>
                <TableCell>{payment.title}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Approved"
                        ? "default"
                        : payment.status === "Rejected"
                        ? "destructive"
                        : "secondary"
                    }
                    className={
                      payment.status === "Pending"
                        ? "bg-black text-white hover:bg-black/90"
                        : ""
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.documentStatus === "Approved"
                        ? "default"
                        : payment.documentStatus === "Rejected"
                        ? "destructive"
                        : payment.documentStatus === "Not Uploaded"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {payment.documentStatus}
                  </Badge>
                  {payment.documents.length > 0 && (
                    <Button
                      variant="link"
                      className="ml-2 p-0 h-auto"
                      onClick={() => setSelectedDocuments(payment.documents)}
                    >
                      View
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {payment.status === "Pending" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                          onClick={() =>
                            handleStatusChange(payment.id, "Approved")
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() =>
                            handleStatusChange(payment.id, "Rejected")
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

      <Dialog
        open={!!selectedDocuments}
        onOpenChange={() => setSelectedDocuments(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Documents</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {selectedDocuments?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{doc.name}</span>
                <Button variant="outline" asChild>
                  <a href={doc.url} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
