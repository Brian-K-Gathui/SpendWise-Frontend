import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService, createSupabaseClient } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export function useSupabaseData() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user data from Supabase
  const userDataQuery = useQuery({
    queryKey: ["userData", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const supabase = await createSupabaseClient();
      return apiService.supabase.getUserData(supabase, user.id);
    },
    enabled: !!user?.id,
  });

  // Update user data mutation
  const updateUserDataMutation = useMutation({
    mutationFn: async (newData) => {
      const supabase = await createSupabaseClient();

      // Check if user data exists
      const existingData = await apiService.supabase.getUserData(
        supabase,
        user.id,
      );

      if (existingData) {
        // Update existing data
        return apiService.supabase.updateUserData(supabase, user.id, {
          ...existingData.data,
          ...newData,
        });
      } else {
        // Create new data
        return apiService.supabase.createUserData(supabase, user.id, {
          ...newData,
          email: user.email,
          full_name: user.fullName,
          avatar_url: user.imageUrl,
        });
      }
    },
    onSuccess: () => {
      toast.success("Data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userData", user?.id] });
    },
  });

  return {
    userData: userDataQuery.data?.data || {},
    isLoading: userDataQuery.isLoading,
    isError: userDataQuery.isError,
    error: userDataQuery.error,
    updateUserData: updateUserDataMutation.mutate,
    isPending: updateUserDataMutation.isPending,
  };
}
