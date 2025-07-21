import { toast } from "sonner";
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDisReactiveWorkflow = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError
  >({
    mutationFn: async () => {
      const response = await axios.put(
        `/api/workflows/${id}/disactive-reactive`,
        { accessToken: Cookies.get('access_token') }
      );
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Workflow updated.")
      queryClient.invalidateQueries({ queryKey: ["workflow", { id }] });
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to modify Workflow.";
      toast.error(errorMessage);
    },
  });

  return mutation;
};