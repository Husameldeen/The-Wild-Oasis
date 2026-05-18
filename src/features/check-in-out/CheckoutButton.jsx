import Button from "../../ui/Button";
import { useConfirmCheckout } from "./useConfirmCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useConfirmCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
