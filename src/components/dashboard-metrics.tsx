import { Card, CardContent } from "@/components/ui/card";

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Total Payments
            </p>
            <div>
              <span className="text-2xl font-bold">5</span>
              <p className="text-sm text-muted-foreground">$899.98</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="text-2xl font-bold">1</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="text-2xl font-bold">4</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
