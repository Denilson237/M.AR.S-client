import { toast } from "sonner"
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";


type RequestType = any

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,
    AxiosError,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await axios.post('/api/tickets/create', { data: json, accessToken: Cookies.get('access_token') });
      return response.data?.data;
    },
    onSuccess: () => {
      toast.success("Assignment Request has been created.")

      queryClient.invalidateQueries({ queryKey: ["requests-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["assignments-me"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error:any) => {
      console.log("[TICKET-CREATE]")
       // Vérifiez si l'erreur a une réponse et qu'elle contient des informations pertinentes
       if (error.response) {
        const errorMessage = error.response.data?.message ?? "Failed to create request.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  return mutation;
};
