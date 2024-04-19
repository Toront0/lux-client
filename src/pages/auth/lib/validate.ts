import { ISignUpForm } from "./types";

export const validateSignUpForm = (val: ISignUpForm) => {
  const errors = {} as ISignUpForm;

  if (
    val.email !== undefined &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.email)
  ) {
    errors.email = "Please, provide valid email address";
  }

  if (val.firstName?.length < 2) {
    errors.firstName = "First name must contain at least 2 characters";
  }

  if (val.lastName?.length < 2) {
    errors.lastName = "Last name must contain at least 2 characters";
  }

  if (val.password?.length < 8) {
    errors.password = "Password must contain at least 8 characters";
  }
  if (val.password?.length > 0 && val.confirmPassword !== val.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
