import axios, { AxiosError } from 'axios';
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';


// Define a generic type for the request payload
type RequestType = any

// Custom hook for editing a request(transaction)
export const useRejectTicket= (id?: string) => {
  const queryClient = useQueryClient(); // Access the query client for managing cache

  // Define the mutation for editing a request
  const mutation = useMutation<
    ResponseType,  // Type of the response from the mutation
    AxiosError,         // Type of error that may occur
    RequestType    // Type of the payload sent to the mutation
  >({
    // Function that handles the mutation
    mutationFn: async (json) => {
      // Send a POST request to update the request
      const response = await axios.put(`/api/tickets/${id}/reject`, { data: json, accessToken: Cookies.get('access_token') });

      // Return the data from the response
      return response.data?.data;
    },
     // Callback executed on a successful mutation
    onSuccess: (data) => {
      toast.success("Ticket validé."); 
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["ticket", { id }] });
      queryClient.invalidateQueries({ queryKey: ["assignments-me"] });
      queryClient.invalidateQueries({ queryKey: ["assignments-pending"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requests-all"] });
      queryClient.invalidateQueries({ queryKey: ["requests-assignments"] });
      queryClient.invalidateQueries({ queryKey: ["requests-unassignments"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    // Callback executed on an error during the mutation
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to validate request.") // Show error message
    },
  });

  return mutation; // Return the mutation object for use in components
};
