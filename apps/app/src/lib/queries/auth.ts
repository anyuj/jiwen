import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSession } from "@/functions/auth";

export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: ["session"],
    queryFn: () => getSession(),
    staleTime: 5 * 60 * 1000,
  });

export function useAuthSession() {
  return useQuery(sessionQueryOptions());
}

export function useRefreshSession() {
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.invalidateQueries({
      queryKey: ["session"],
      exact: true,
      refetchType: "none",
    });

    return queryClient.fetchQuery({
      ...sessionQueryOptions(),
      staleTime: 0,
    });
  };
}
