"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import { elysia as api } from "../../../api/src/client";

// ---------------------------------------------
// CONFIGURAÇÃO E PROVEDOR
// ---------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// ---------------------------------------------
// HOOK useCakes
// ---------------------------------------------

export const CAKES_QUERY_KEY = ["cakes"];

const fetchCakes = async () => {
  const { data, error } = await api.cakes.get();

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  return data;
};

export const useCakes = () => {
  return useQuery({
    queryKey: CAKES_QUERY_KEY,
    queryFn: fetchCakes,

    staleTime: 1000 * 60 * 5,
  });
};
