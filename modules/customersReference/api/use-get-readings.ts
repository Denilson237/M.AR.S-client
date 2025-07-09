import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

import { ApiFilters } from "@/components/data-table-with-advance-filter";


export const useGetReadings = (page = 1, limit = 10, filters: ApiFilters | null = null) => {

  const query = useQuery({
    queryKey: ["customers-meter-readings", page, limit, filters],
    queryFn: async () => {
      try {
        // Prepare the request body
        const requestData = {
          accessToken: Cookies.get('access_token'),
          page,
          limit,
          filters: filters ? filters : {}, // Include filters if provided
        };
        const response = await axios.post('/api/customers-reference/meters/reading', requestData);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error;
        } else {
          throw new Error('Une erreur inconnue s\'est produite');
        }
      }
    },
  });

  return query;
};
