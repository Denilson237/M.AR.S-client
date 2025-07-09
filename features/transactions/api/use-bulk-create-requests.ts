import axios from "axios";
import { toast } from "sonner"
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";


type RequestType = any;

export const useBulkCreateRequests = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation<
      ResponseType,
      Error, 
      RequestType
    >({
      mutationFn: async (json) => {
        const response = await axios.post('/api/requests', { enpoint: '/create-bulk', data: json ,accessToken: Cookies.get('access_token') });
        return response.data?.data;
      },
      onSuccess: () => {
        toast.success("Transactions created successfully")
        queryClient.invalidateQueries({ queryKey: ["requests?status=validated"] });
        queryClient.invalidateQueries({ queryKey: ["requests-all"] });
        queryClient.invalidateQueries({ queryKey: ["requests"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });
  
      },
      onError: () => {
        toast.error("Failed to build create transactions.")
      },
    });
  
    return mutation;
  };
  