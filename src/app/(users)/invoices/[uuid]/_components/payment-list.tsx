import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export default function PaymentList() {
  const payments: number[] = [];

  return (
    <Card className="bg-neutral-50 rounded-lg border-2 border-zinc-100 p-4 mt-4">
      <header className="mb-4 flex justify-between items-center">
        <h3 className="font-bold text-xl">Payment History</h3>

        <Button>
          <span className="text-sm">Add Payment</span>
        </Button>
      </header>

      <CardContent className="p-0">
        {payments.length > 0 &&
          payments.map((_, index) => (
            <div
              key={index}
              className="py-4 border-b flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Receipt className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">January 2025</p>
                  <p className="text-sm text-muted-foreground">
                    Paid on 02/01/2025
                  </p>
                </div>
              </div>
              <Badge variant="secondary">Paid</Badge>
            </div>
          ))}

        {payments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <Receipt className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              No payments have been made yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
