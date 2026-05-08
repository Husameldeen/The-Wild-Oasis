import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import StyledFormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editedId, ...editedValues } = cabinToEdit;
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  // console.log(editedValues);

  const isEditingForm = Boolean(editedId);
  // console.log(isEditingForm);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingForm ? editedValues : {},
  });
  const { errors } = formState;

  function onError(errors) {
    console.log(errors);
  }

  const isWorking = isCreating || isEditing;

  function onSubmitForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // console.log(data);

    if (isEditingForm)
      editCabin(
        { newCabinData: { ...data, image }, id: editedId },
        { onSuccess: reset() },
      );
    else
      createCabin(
        { newCabinData: { ...data, image: image }, id: null },
        { onSuccess: reset() },
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </StyledFormRow>
      <StyledFormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
        />
      </StyledFormRow>
      <StyledFormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />
      </StyledFormRow>
      <StyledFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              value <= getValues().regularPrice ||
                "Discount cannot be greater than regular price";
            },
          })}
        />
      </StyledFormRow>
      <StyledFormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>
      <StyledFormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingForm ? false : "This field is required",
          })}
        />
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button
          size="medium"
          variation="secondary"
          disabled={isWorking}
          type="reset"
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isWorking}>
          {isEditingForm ? "Edit Cabin" : "Create cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
