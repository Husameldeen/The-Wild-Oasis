import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins";
import StyledFormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onError(errors) {
    console.log(errors);
  }

  function onSubmitForm(data) {
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <StyledFormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              console.log(value, getValues().regularPrice);
              value <= getValues().regularPrice ||
                "Discount cannot be greater than regular price";
            },
          })}
        />
      </StyledFormRow>
      <StyledFormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </StyledFormRow>
      <StyledFormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </StyledFormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button
          size="medium"
          variation="secondary"
          disabled={isCreating}
          type="reset"
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isCreating}>
          Create cabin
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
