import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useConfirmCheckout } from "../check-in-out/useConfirmCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import {
  HiArrowDownOnSquare,
  HiArrowRightOnRectangle,
  HiTrash,
} from "react-icons/hi2";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useConfirmCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          <Button variation="secondary" size="medium" onClick={moveBack}>
            Back
          </Button>
          {status === "unconfirmed" && (
            <Button
              size="medium"
              variation="primary"
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check In
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              size="medium"
              variation="primary"
              icon={<HiArrowRightOnRectangle />}
              onClick={() => checkout(id)}
              disabled={isCheckingOut}
            >
              Check Out
            </Button>
          )}
          <Modal.Open opens="delete">
            <Button size="medium" variation="danger" icon={<HiTrash />}>
              Delete Booking
            </Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() =>
              deleteBooking(id, {
                onSettled: () => navigate(-1),
              })
            }
            disabled={isDeletingBooking}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
