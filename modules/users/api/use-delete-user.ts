import { toast } from "sonner";
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteUser = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError
  >({
    mutationFn: async () => {
      const response = await axios.post(`/api/users/${id}/delete`, {  accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("User deleted.")
      queryClient.invalidateQueries({ queryKey: ["user", { id }] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
    },
    onError: (error: any) => {
      console.log("[USERS-DELETE]")
      if (error.response) {
        const errorMessage = error.response.data?.message || "Failed to handle request.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  return mutation;
};
