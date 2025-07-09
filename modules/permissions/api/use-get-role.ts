import Cookies from "js-cookie";;
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetRole = (id?: string) => {
  const query = useQuery({
    enabled: !!id,   // Fetch only if we have the id
    queryKey: ["role", { id }],
    queryFn: async () => {
      try {
        const response = await axios.post(`/api/roles/${id}` ,{ accessToken : Cookies.get('access_token') });
        return response.data?.data;
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
