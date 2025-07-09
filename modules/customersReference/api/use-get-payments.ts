import { ApiFilters } from "@/components/data-table-with-advance-filter";
import { NEXT_PUBLIC_SERVER_URI } from "@/secret";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

export const useGetPayments = (page = 1, limit = 10, filters: ApiFilters | null = null) => {

  const query = useQuery({
    queryKey: ["customers-payments", page, limit, filters],
    queryFn: async () => {
      try {
        // Prepare the request body
        const requestData = {
          accessToken: Cookies.get('access_token'),
          page,
          limit,
          filters: filters ? filters : {}, // Include filters if provided
        };
        const response = await axios.post('/api/customers-reference/payments', requestData);
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
