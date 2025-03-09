import { useState } from "react";
import { useBudgets } from "@/hooks/use-budgets";
import { useWallets } from "@/hooks/use-wallets";
import { useCategories } from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function BudgetsPage() {
  const {
    budgets,
    isLoading,
    createBudget,
    updateBudget,
    deleteBudget,
    isPending,
  } = useBudgets();
  const { wallets, isLoading: walletsLoading } = useWallets();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [open, setOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const budgetData = {
      category_id: data.category_id,
      wallet_id: data.wallet_id,
      amount: Number.parseFloat(data.amount),
      period: data.period,
      start_date: startDate.toISOString(),
      end_date: endDate ? endDate.toISOString() : null,
    };

    if (editingBudget) {
      await updateBudget({ id: editingBudget.id, data: budgetData });
    } else {
      await createBudget(budgetData);
    }

    setOpen(false);
    setEditingBudget(null);
    reset();
    setStartDate(new Date());
    setEndDate(null);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setValue("category_id", budget.category_id.toString());
    setValue("wallet_id", budget.wallet_id.toString());
    setValue("amount", budget.amount);
    setValue("period", budget.period);
    setStartDate(new Date(budget.start_date));
    setEndDate(budget.end_date ? new Date(budget.end_date) : null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      await deleteBudget(id);
    }
  };

  const expenseCategories =
    categories?.filter((cat) => cat.type === "expense") || [];

  // Calculate budget progress
  const calculateProgress = (budget) => {
    // This is a simplified calculation - in a real app, you'd calculate based on actual spending
    // For now, we'll just return a random percentage between 0 and 100
    return Math.floor(Math.random() * 100);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
          <p className="text-muted-foreground">
            Set and track your spending limits.
          </p>
        </div>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setEditingBudget(null);
              reset();
              setStartDate(new Date());
              setEndDate(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBudget ? "Edit Budget" : "Create New Budget"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="wallet_id">Wallet</Label>
                <Controller
                  name="wallet_id"
                  control={control}
                  rules={{ required: "Wallet is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        {walletsLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading wallets...
                          </SelectItem>
                        ) : wallets.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No wallets available
                          </SelectItem>
                        ) : (
                          wallets.map((wallet) => (
                            <SelectItem
                              key={wallet.id}
                              value={wallet.id.toString()}
                            >
                              {wallet.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.wallet_id && (
                  <p className="text-sm text-red-500">
                    {errors.wallet_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Controller
                  name="category_id"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading categories...
                          </SelectItem>
                        ) : (
                          expenseCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_id && (
                  <p className="text-sm text-red-500">
                    {errors.category_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Budget Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  {...register("amount", {
                    required: "Amount is required",
                    valueAsNumber: true,
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                  })}
                  placeholder="0.00"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Budget Period</Label>
                <Controller
                  name="period"
                  control={control}
                  rules={{ required: "Period is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.period && (
                  <p className="text-sm text-red-500">
                    {errors.period.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => date < startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setEditingBudget(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending
                    ? "Saving..."
                    : editingBudget
                      ? "Update Budget"
                      : "Create Budget"}
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
      ) : budgets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No budgets found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create your first budget to start managing your spending.
          </p>
          <Button className="mt-4" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Budget
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const progress = calculateProgress(budget);
            const wallet = wallets?.find((w) => w.id === budget.wallet_id);
            const category = categories?.find(
              (c) => c.id === budget.category_id,
            );

            return (
              <Card key={budget.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between">
                    <span>{category?.name || "Budget"}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {budget.period}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {wallet?.name || "Wallet"} •{" "}
                    {format(new Date(budget.start_date), "MMM d, yyyy")}
                    {budget.end_date &&
                      ` - ${format(new Date(budget.end_date), "MMM d, yyyy")}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {wallet?.currency || "KES"}{" "}
                    {Number.parseFloat(budget.amount).toLocaleString()}
                  </div>
                  <Progress value={progress} className="mt-2" />
                  <div className="mt-1 text-xs text-muted-foreground">
                    {progress}% used
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(budget)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(budget.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
