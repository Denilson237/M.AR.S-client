import { toast } from "sonner";
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteWorkflow = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError
  >({
    mutationFn: async () => {
      const response = await axios.post(`/api/workflows/${id}/delete`, {  accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Workflow deleted.")
      queryClient.invalidateQueries({ queryKey: ["workflow", { id }] });
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (error: any) => {
      console.log("[WORKFLOWS-DELETE]")
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
