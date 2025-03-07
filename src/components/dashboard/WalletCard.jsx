import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function WalletCard({
  title,
  balance,
  currency = "KSH",
  cardNumber = "**** **** **** 5149",
  className,
}) {
  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <div className="text-2xl font-bold">
            {currency} {balance.toLocaleString()}
          </div>
          <div className="text-sm opacity-85">{cardNumber}</div>
        </div>
      </CardContent>
    </Card>
  );
}
