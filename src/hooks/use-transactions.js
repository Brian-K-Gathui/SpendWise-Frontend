import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/api";
import { toast } from "react-toastify";

export function useTransactions(filters = {}) {
  const queryClient = useQueryClient();

  // Get all transactions with filters
  const transactionsQuery = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => apiService.transactions.getAll(filters),
  });

  // Create transaction mutation
  const createTransactionMutation = useMutation({
    mutationFn: apiService.transactions.create,
    onSuccess: () => {
      toast.success("Transaction created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // Also invalidate wallets as balance might change
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  // Update transaction mutation
  const updateTransactionMutation = useMutation({
    mutationFn: ({ id, data }) => apiService.transactions.update(id, data),
    onSuccess: () => {
      toast.success("Transaction updated successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  // Delete transaction mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: apiService.transactions.delete,
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  return {
    transactions: transactionsQuery.data || [],
    isLoading: transactionsQuery.isLoading,
    isError: transactionsQuery.isError,
    error: transactionsQuery.error,
    createTransaction: createTransactionMutation.mutate,
    updateTransaction: updateTransactionMutation.mutate,
    deleteTransaction: deleteTransactionMutation.mutate,
    isPending:
      createTransactionMutation.isPending ||
      updateTransactionMutation.isPending ||
      deleteTransactionMutation.isPending,
  };
}
