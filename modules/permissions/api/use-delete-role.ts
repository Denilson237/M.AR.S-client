import { toast } from "sonner";
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteRole = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError
  >({
    mutationFn: async () => {
      const response = await axios.post(`/api/roles/${id}/delete`, {  accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Role deleted.")
      queryClient.invalidateQueries({ queryKey: ["role", { id }] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["roles-permissions"] });
    },
    onError: (error: any) => {
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
