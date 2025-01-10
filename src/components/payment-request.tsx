"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPaymentRequest } from "@/actions/payment-request";

export function PaymentRequestForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

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
      const result = await createPaymentRequest({ title, amount, description });
      if (result.success) {
        setPaypalOrderId(result.orderId);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to create payment request",
        });
      }
    } catch (error) {
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
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (Optional)
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details about the payment request"
          className="mt-1 resize-none"
        />
      </div>
      <Button type="submit">Create Payment Request</Button>
      {paypalOrderId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
          <PayPalScriptProvider
            options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
          >
            <PayPalButtons
              createOrder={() => Promise.resolve(paypalOrderId)}
              onApprove={async (data, actions) => {
                toast({
                  title: "Payment Successful",
                  description: `Payment completed for order ${data.orderID}`,
                });
                router.push("/dashboard");
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
