"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PaymentType } from "@/lib/definitions";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: PaymentType;
}

export function PaymentDialog({
  open,
  onOpenChange,
  payment,
}: PaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            View your payment information and download invoice
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Title:</span>
            <span className="col-span-3">{payment.title}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Amount:</span>
            <span className="col-span-3">${payment.amount}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Date:</span>
            <span className="col-span-3">
              {new Date(payment?.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">
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
            </span>
          </div>
          <Separator />
          <Button
            className="w-full"
            onClick={() => console.log("Download invoice")}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
