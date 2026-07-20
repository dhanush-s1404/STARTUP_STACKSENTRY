"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  },
) {
  return useQuery({
    queryKey: key,
    queryFn: () => api.get<T>(endpoint),
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  endpoint: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: TVariables) => {
      switch (method) {
        case "POST":
          return api.post<TData>(endpoint, variables);
        case "PUT":
          return api.put<TData>(endpoint, variables);
        case "PATCH":
          return api.patch<TData>(endpoint, variables);
        case "DELETE":
          return api.delete<TData>(endpoint);
      }
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
}
