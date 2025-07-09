import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

export const useGetPermissions = () => {

  const query = useQuery({
    queryKey: ["permissions"], // Include filters in the query key
    queryFn: async () => {
      try {
        // Prepare the request body
        const requestData = {
          accessToken: Cookies.get('access_token'),
        };

        // Call the internal API with pagination and filters
        const response = await axios.post('/api/permissions', requestData);
        return response.data?.data
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error; // Rethrow Axios errors
        } else {
          throw new Error('An unknown error occurred'); // Handle unknown errors
        }
      }
    },
  });

  return query;
};
