import axios, { AxiosError } from 'axios';
import { toast } from "sonner"
import Cookies from 'js-cookie';
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = any

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await axios.post('/api/roles/create', { data: json, accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Roles has been created.")
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["roles-permissions"] });
    },
    onError: (error: any) => {
       // Retrieve the error message from the error response
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
