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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type PaymentRequest = {
  id: number;
  title: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  documents: File[];
};

export function PaymentRequestsTable() {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([
    {
      id: 1,
      title: "Office Supplies",
      amount: 299.99,
      status: "Pending",
      documents: [],
    },
  ]);
  const [newRequest, setNewRequest] = useState({ title: "", amount: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>(
    {}
  );
  const { toast } = useToast();

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.amount) {
      const newId = Math.max(...paymentRequests.map((r) => r.id), 0) + 1;
      setPaymentRequests([
        ...paymentRequests,
        {
          id: newId,
          title: newRequest.title,
          amount: parseFloat(newRequest.amount),
          status: "Pending",
          documents: [],
        },
      ]);
      setNewRequest({ title: "", amount: "" });
      setIsDialogOpen(false);
      toast({
        title: "Payment Request Created",
        description: "Your payment request has been submitted for approval.",
      });
    }
  };

  const handleDocumentUpload = async (
    requestId: number,
    files: FileList | null
  ) => {
    if (!files) return;

    // Start progress at 0
    setUploadProgress((prev) => ({ ...prev, [requestId]: 0 }));

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const currentProgress = prev[requestId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Clear progress after a delay
          setTimeout(() => {
            setUploadProgress((prev) => {
              const { [requestId]: _, ...rest } = prev;
              return rest;
            });
          }, 2000);
          return prev;
        }
        return { ...prev, [requestId]: currentProgress + 10 };
      });
    }, 200);

    // Update the payment request with the new documents
    setPaymentRequests((requests) =>
      requests.map((request) =>
        request.id === requestId
          ? {
              ...request,
              documents: [...request.documents, ...Array.from(files)],
            }
          : request
      )
    );

    toast({
      title: "Documents Uploaded",
      description: `${files.length} document(s) have been uploaded.`,
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Payment Requests</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-black hover:bg-black/90">
              Create Payment Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Payment Request</DialogTitle>
              <DialogDescription>
                Enter the details for your new payment request.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newRequest.amount}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, amount: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateRequest}>Create Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead className="w-[30%]">Amount</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[15%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.title}</TableCell>
                <TableCell>${request.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "Approved"
                        ? "default"
                        : request.status === "Rejected"
                        ? "destructive"
                        : "secondary"
                    }
                    className={
                      request.status === "Pending"
                        ? "bg-black text-white hover:bg-black/90"
                        : ""
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) =>
                          handleDocumentUpload(request.id, e.target.files)
                        }
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 w-full"
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4" />
                          Upload Documents
                        </span>
                      </Button>
                    </label>
                    {uploadProgress[request.id] !== undefined && (
                      <Progress
                        value={uploadProgress[request.id]}
                        className="h-2"
                      />
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
