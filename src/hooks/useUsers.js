import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUser, updateUser, deleteUser } from "../api/users";
import { toast } from "react-toastify";

// fetch all users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    },
  });
};

// fetch a single user
export const useUser = (userId) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId, // Only run the query if userId is provided
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    },
  });
};

// update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      //  user in the cache
      queryClient.setQueryData(["users", updatedUser.id], updatedUser);

      //  users list to refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update user");
    },
  });
};

//  delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, variables) => {
      // Remove the user from the cache
      queryClient.removeQueries({ queryKey: ["users", variables] });

      // Invalidate the users list to refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });
};
