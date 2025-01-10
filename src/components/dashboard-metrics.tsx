import { Card, CardContent } from "@/components/ui/card";
import { PaymentType } from "@/lib/definitions";

export function DashboardMetrics({ payments }: { payments: PaymentType[] }) {
  // total payments
  const totalPayments = payments.length;
  const totalPaymentsAmount = payments.reduce(
    (acc, payment) => acc + Number(String(payment.amount)),
    0
  );
  // pending payments
  const pendingPayments = payments.filter(
    (payment) => payment.status === "pending"
  ).length;
  // completed payments
  const completedPayments = payments.filter(
    (payment) => payment.status === "approved"
  ).length;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Payments
            </p>
            <div>
              <span className="text-2xl font-bold">{totalPayments}</span>
              <p className="text-sm text-muted-foreground">
                ${totalPaymentsAmount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="text-2xl font-bold">{pendingPayments}</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="text-2xl font-bold">{completedPayments}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
