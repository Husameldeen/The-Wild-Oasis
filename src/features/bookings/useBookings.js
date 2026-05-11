import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  // FILTER BOOLINGS BASED ON SEARCH PARAMS
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // SORT BOOLINGS BASED ON SEARCH PARAMS
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRow.split("-");

  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}
