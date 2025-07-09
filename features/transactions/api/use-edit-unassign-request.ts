import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { toast } from "sonner"

// Define a generic type for the request payload
type RequestType = any

// Custom hook for editing a request(transaction)
export const useEditUnassignRequest = (id?: string) => {
  const queryClient = useQueryClient(); // Access the query client for managing cache

  // Define the mutation for editing a request
  const mutation = useMutation<
    ResponseType,  // Type of the response from the mutation
    AxiosError,         // Type of error that may occur
    RequestType    // Type of the payload sent to the mutation
  >({
    // Function that handles the mutation
    mutationFn: async (payload) => {
      // Send a POST request to update the request
      const response = await axios.post(`/api/requests/unassignment`, { 
        id:id,
        data: payload,                               // Payload containing the updated data
        accessToken: Cookies.get('access_token')     // Access token for authentication
      });

      // Return the data from the response
      return response.data?.data;
    },
     // Callback executed on a successful mutation
    onSuccess: () => {
      toast.success("Request updated.") // Show success message
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["request", { id }] });
      queryClient.invalidateQueries({ queryKey: ["requests?status=validated"] });
      queryClient.invalidateQueries({ queryKey: ["requests-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["requests-unassignments"] });
      queryClient.invalidateQueries({ queryKey: ["requests-all"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    // Callback executed on an error during the mutation
    onError: (error:any) => {
      console.log("[REQUEST-UNASSIGNMENT]")
       // Vérifiez si l'erreur a une réponse et qu'elle contient des informations pertinentes
       if (error.response) {
        const errorMessage = error.response.data?.message || "Failed to create request.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
    },
  });

  return mutation; // Return the mutation object for use in components
};
