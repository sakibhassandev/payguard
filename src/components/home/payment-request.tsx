"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  afterPaymentApprove,
  createOrder,
  createPaymentRequest,
} from "@/actions/payment-request";
import { useSession } from "next-auth/react";

export function PaymentRequestForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  const userId = session.data?.user?.id;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const result = await createPaymentRequest({ title, amount });
      if (result.success) {
        setPaypalOrderId(result.orderId ?? null);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to create payment request",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Payment for services"
          className="mt-1"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <Input
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100.00"
          className="mt-1"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
      </div>
      <Button type="submit">Create Payment Request</Button>
      {paypalOrderId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create(createOrder({ amount, title }));
              }}
              onApprove={async (data) => {
                toast({
                  title: "Payment Successful",
                  description: `Payment completed for order ${data.orderID}`,
                });
                afterPaymentApprove({ userId, title, amount });
                router.push("/dashboard");
              }}
              onCancel={(data) => {
                toast({
                  title: "Payment Cancelled",
                  description: `Payment was cancelled for order ${data.orderID}`,
                });
              }}
              onError={() => {
                toast({
                  variant: "destructive",
                  title: "Payment Failed",
                  description: "There was an error processing your payment.",
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </form>
  );
}
