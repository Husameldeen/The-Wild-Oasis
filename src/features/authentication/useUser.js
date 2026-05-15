import { useQuery } from "@tanstack/react-query";
import { loadUser } from "../../services/apiAuth";

export function useUser() {
  const { isPending: isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: loadUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
