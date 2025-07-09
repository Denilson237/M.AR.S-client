import axios from "axios";
import { toast } from "sonner"
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = any

export const useUpdateWorkflow= (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await axios.put(`/api/workflows/${id}/update`, { data: json, accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Workflow updated.")
      queryClient.invalidateQueries({ queryKey: ["workflow", { id }] });
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to edit User.";
      toast.error(errorMessage);
    },
  });

  return mutation;
};
