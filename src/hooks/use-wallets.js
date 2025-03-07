import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/api";
import { toast } from "react-toastify";

export function useWallets() {
  const queryClient = useQueryClient();

  // Get all wallets
  const walletsQuery = useQuery({
    queryKey: ["wallets"],
    queryFn: apiService.wallets.getAll,
  });

  // Create wallet mutation
  const createWalletMutation = useMutation({
    mutationFn: apiService.wallets.create,
    onSuccess: () => {
      toast.success("Wallet created successfully");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  // Update wallet mutation
  const updateWalletMutation = useMutation({
    mutationFn: ({ id, data }) => apiService.wallets.update(id, data),
    onSuccess: () => {
      toast.success("Wallet updated successfully");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  // Delete wallet mutation
  const deleteWalletMutation = useMutation({
    mutationFn: apiService.wallets.delete,
    onSuccess: () => {
      toast.success("Wallet deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  return {
    wallets: walletsQuery.data || [],
    isLoading: walletsQuery.isLoading,
    isError: walletsQuery.isError,
    error: walletsQuery.error,
    createWallet: createWalletMutation.mutate,
    updateWallet: updateWalletMutation.mutate,
    deleteWallet: deleteWalletMutation.mutate,
    isPending:
      createWalletMutation.isPending ||
      updateWalletMutation.isPending ||
      deleteWalletMutation.isPending,
  };
}
