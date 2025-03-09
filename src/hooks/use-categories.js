import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/api/services";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

export function useCategories() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Get all categories
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
    enabled: !!user?.id,
    // Add retry configuration
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    // Add error handling
    onError: (error) => {
      console.error("Error fetching categories:", error);
      // Don't show toast for every error to avoid spamming the user
    },
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create category");
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,
    error: categoriesQuery.error,
    createCategory: createCategoryMutation.mutate,
    isPending: createCategoryMutation.isPending,
  };
}
