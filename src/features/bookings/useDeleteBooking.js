import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success("Booking was successfully deleted");
    },
    onError: () => {
      toast.error("There was error deleting booking");
    },
  });

  return { deleteBooking, isDeletingBooking };
}
