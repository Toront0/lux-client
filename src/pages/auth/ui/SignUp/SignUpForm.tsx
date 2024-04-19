import { Input, SpinnerLoader } from "@/shared";

import { validateSignUpForm } from "../../lib/validate";
import { onSignup } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import OtherError from "../Login/OtherError";
import { useTranslation } from "react-i18next";
import { ISignUpForm } from "../../lib/types";
import { useForm } from "@/shared/hooks";
import EmailInput from "./EmailInput";

const SignUpForm = () => {
  const { t } = useTranslation();

  const { values, errors, handleChange } = useForm<ISignUpForm>({
    validate: validateSignUpForm
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      onSignup(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      ),
    onSuccess: () => {
      window.location.replace("/");
    }
  });

  return (
    <div className="">
      {error && <OtherError />}
      <EmailInput errors={errors} values={values} handleChange={handleChange} />
      <div className="my-3">
        <label
          htmlFor="firstName"
          className="text-sm font-semibold text-gray-4 dark:text-gray-12"
        >
          {t("firstName")}
        </label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Ivan"
          value={values.firstName || ""}
          error={errors.firstName}
          onChange={(e) =>
            handleChange(e.target.name as keyof ISignUpForm, e.target.value)
          }
        />
      </div>
      <div className="my-3">
        <label
          htmlFor="lastName"
          className="text-sm font-semibold text-gray-4 dark:text-gray-12"
        >
          {t("lastName")}
        </label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Zolo"
          error={errors.lastName}
          value={values.lastName || ""}
          onChange={(e) =>
            handleChange(e.target.name as keyof ISignUpForm, e.target.value)
          }
        />
      </div>
      <div className="my-3">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-4 dark:text-gray-12"
        >
          {t("password")}
        </label>
        <Input
          id="password"
          placeholder="example@mail.com"
          name="password"
          error={errors.password}
          value={values.password || ""}
          type="password"
          onChange={(e) =>
            handleChange(e.target.name as keyof ISignUpForm, e.target.value)
          }
        />
      </div>
      <div className="">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-semibold text-gray-4 dark:text-gray-12"
        >
          {t("confirmPassword")}
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Zolo"
          error={errors.confirmPassword}
          value={values.confirmPassword || ""}
          type="password"
          onChange={(e) =>
            handleChange(e.target.name as keyof ISignUpForm, e.target.value)
          }
        />
      </div>
      <button
        type="submit"
        disabled={
          Object.values(values).length < 5 ||
          Object.values(values).some((v) => v.length < 1) ||
          Object.values(errors).length >= 1 ||
          isPending
        }
        onClick={() => mutate()}
        className="w-full mt-4 py-1.5 flex items-center justify-center gap-2 rounded disabled:cursor-not-allowed text-sm bg-blue-7 disabled:dark:bg-blue-5 disabled:dark:text-gray-8 disabled:bg-blue-11 text-white"
      >
        {isPending && <SpinnerLoader />}
        {t("createAccount")}
      </button>
    </div>
  );
};

export default SignUpForm;
