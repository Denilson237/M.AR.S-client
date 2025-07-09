import axios from "axios";
import { toast } from "sonner"
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = any

export const useUpdateRole = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await axios.put(`/api/roles/${id}/update`, { data: json, accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Role updated.")
      queryClient.invalidateQueries({ queryKey: ["role", { id }] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["roles-permissions"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to edit Role.";
      toast.error(errorMessage);
    },
  });

  return mutation;
};
