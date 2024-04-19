import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 60000
    }
  },
  queryCache: new QueryCache({
    onError: (e) => {
      if (e.message === "Network Error") {
        window.location.replace("/auth");
      }

      console.log("123", e.message === "Network Error");
    }
  })
});
