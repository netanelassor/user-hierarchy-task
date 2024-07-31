import { useFormik } from "formik";
import { User } from "../user.types";
import { Button, Label, TextInput } from "flowbite-react";
import {
  GENERAL,
  USER_HIERARCHY,
} from "../../../constants/locals/en-Us.constants";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../users-hierarchy.service";
import { queryClient } from "../../../utils/query-client";

type EditUserFormProps = {
  user: User;
  handleClose: () => void;
};

export default function EditUserForm({ user, handleClose}: EditUserFormProps): JSX.Element {
  const transPrefix = USER_HIERARCHY.EDIT_USER;

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleClose();
    },
  });

  const initialValues = useMemo(
    () => ({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    }),
    [user]
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  function handleSubmit(values: Partial<User>) {
    mutate({id: user.id, ...values});
  }

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div className="flex gap-4">
          <div className="flex flex-col text-start w-full">
            <Label htmlFor="firstName" value={transPrefix.FIRST_NAME_LBL} />
            <TextInput
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <Label htmlFor="lastName" value={transPrefix.LAST_NAME_LBL} />
            <TextInput
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-col text-start w-full">
            <Label htmlFor="lastName" value={transPrefix.EMAIL_LBL} />
            <TextInput
              id="email"
              name="email"
              type="text"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Button
            gradientDuoTone="purpleToBlue"
            pill
            type="submit"
            disabled={!formik.isValid}
            isProcessing={isPending}
          >
            {GENERAL.UPDATE_BTN}
          </Button>
          <Button gradientDuoTone="purpleToBlue" pill outline type="button" onClick={handleClose}>
            {GENERAL.CANCEL_BTN}
          </Button>
        </div>
      </form>
    </>
  );
}
