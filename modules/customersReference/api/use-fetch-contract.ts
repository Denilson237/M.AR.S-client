import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

async function fetchContract(reference: string) {
    try {
        if (!reference) return null;
        const res = await axios.post(`/api/customers-reference/contracts/${reference}`, { accessToken: Cookies.get('access_token') });
        return res.data?.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        } else {
            throw new Error('Une erreur inconnue s\'est produite');
        }
    }
}

export function useFetchContract(reference: string) {
    return useQuery({
        queryKey: ["contract", reference],
        queryFn: () => fetchContract(reference),
        enabled: !!reference, // Ne lance pas l'appel si reference est vide
    });
}