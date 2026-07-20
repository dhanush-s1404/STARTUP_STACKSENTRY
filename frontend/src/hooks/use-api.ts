"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useApiQuery<T>(
  key: string[],
  endpoint: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    staleTime?: number;
    gcTime?: number;
  },
) {
  return useQuery({
    queryKey: key,
    queryFn: () => api.get<T>(endpoint),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  endpoint: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    invalidateKeys?: string[] | (() => string[]);
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

      if (options?.invalidateKeys) {
        const keys =
          typeof options.invalidateKeys === "function"
            ? options.invalidateKeys()
            : options.invalidateKeys;
        keys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
    },
    onError: (error) => {
      options?.onError?.(error as Error);
    },
  });
}
