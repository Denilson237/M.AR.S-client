import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";


// Custom hook to fetch a specific request by ID
export const useGetAssignmentRequest = (id?: string) => {
  // Use the useQuery hook to manage the request fetching
  const query = useQuery({
    enabled: !!id,                 // Fetch only if we have the id
    queryKey: ["ticket", { id }], // Unique key for the query
    queryFn: async () => {
      try {
        // Make a POST request to fetch the request data
        const response = await axios.post(`/api/tickets/${id}`, { accessToken: Cookies.get('access_token') });
        // Return the data from the response
        return response.data.data;
      } catch (error) {
        console.log('[TICKET-GET-ID] Une erreur inconnue s\'est produite', error);
        // Handle any errors that occur during the request
        if (axios.isAxiosError(error)) {
          // Rethrow Axios errors
          throw error;
        } else {
          // Throw a generic error for other cases
          throw new Error('Une erreur inconnue s\'est produite');
        }
      }

    },
  });

  return query;  // Return the query object for use in components
};
