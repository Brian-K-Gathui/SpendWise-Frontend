import { useState } from "react";
import { useWallets } from "@/hooks/use-wallets";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export function WalletsPage() {
  const { wallets, isLoading, createWallet, isPending } = useWallets();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await createWallet({
      title: data.title,
      balance: Number.parseFloat(data.balance),
      currency: data.currency || "KSH",
      cardNumber:
        data.cardNumber ||
        "**** **** **** " + Math.floor(1000 + Math.random() * 9000),
    });
    setOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wallets</h2>
          <p className="text-muted-foreground">
            Manage your wallets and payment methods.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Wallet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Wallet Name</Label>
                <Input
                  id="title"
                  {...register("title", {
                    required: "Wallet name is required",
                  })}
                  placeholder="Main Wallet"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance">Initial Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  {...register("balance", {
                    required: "Balance is required",
                    valueAsNumber: true,
                  })}
                  placeholder="0.00"
                />
                {errors.balance && (
                  <p className="text-sm text-red-500">
                    {errors.balance.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  {...register("currency")}
                  placeholder="KSH"
                  defaultValue="KSH"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number (Last 4 digits)</Label>
                <Input
                  id="cardNumber"
                  {...register("cardNumber")}
                  placeholder="1234"
                  maxLength={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Wallet"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[180px] w-full" />
          ))}
        </div>
      ) : wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No wallets found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create your first wallet to start tracking your finances.
          </p>
          <Button className="mt-4" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Wallet
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              title={wallet.title}
              balance={wallet.balance}
              currency={wallet.currency}
              cardNumber={wallet.cardNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
}
