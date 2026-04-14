import { useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useConvexQuery = (query, ...args) => {
    const result = useQuery(query, ...args);
    
    const [data, setData] = useState(undefined);
    const [isLoading,setIsLoading] = useState(true);
    const [error ,setError] = useState(null);

    useEffect(() => {
        if(result === undefined){
            setIsLoading(true);
        } else {
            try {
                setData(result);
                setError(null);
            } catch (error) {
                setError(error);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    }, [result]);

    return {
        data,
        isLoading,
        error
    }
}

export const useConvexMutation = (mutationFn) => {
    const convexMutation = useMutation(mutationFn);

    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(async (...args) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await convexMutation(...args);
            setData(res);
            return res;
        } catch (err) {
            setError(err);
            toast.error(err?.message || "Something went wrong");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [convexMutation]);

    return { mutate, data, isLoading, error };
};