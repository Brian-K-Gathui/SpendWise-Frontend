import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function WalletCard({
  title,
  balance,
  currency = "KES",
  cardNumber = "**** **** **** 5149",
  description,
  type,
  className,
}) {
  // Different gradient backgrounds based on wallet type
  const getGradient = () => {
    switch (type) {
      case "savings":
        return "bg-gradient-to-br from-blue-500 to-blue-700";
      case "investment":
        return "bg-gradient-to-br from-green-500 to-green-700";
      case "shared":
        return "bg-gradient-to-br from-purple-500 to-purple-700";
      default:
        return "bg-gradient-to-br from-primary to-primary/80";
    }
  };

  return (
    <Card className={cn(getGradient(), "text-primary-foreground", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <p className="text-sm opacity-85">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <div className="text-2xl font-bold">
            {currency} {Number.parseFloat(balance).toLocaleString()}
          </div>
          <div className="text-sm opacity-85">{cardNumber}</div>
          {type && (
            <div className="mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-white/20">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
