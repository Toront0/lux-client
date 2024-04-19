import { Input, SpinnerLoader } from "@/shared";
import { onLogin } from "../../api/api";

import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import EmailNotFound from "./EmailNotFound";
import InvalidPassword from "./InvalidPassword";
import { useTranslation } from "react-i18next";
import { ILoginForm } from "../../lib/types";
import { useForm } from "@/shared/hooks";
import { SyntheticEvent } from "react";

const LoginForm = () => {
  const { t } = useTranslation();

  const { values, errors, handleChange } = useForm<ILoginForm>();

  const { mutate, isPending, error } = useMutation<AxiosResponse, AxiosError>({
    mutationFn: () => onLogin(values.email, values.password),
    onSuccess: () => {
      window.location.replace("/");
    }
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    mutate();
  };

  return (
    <>
      {error?.response?.status === 404 && <EmailNotFound />}
      {error?.response?.status === 409 && <InvalidPassword />}

      <form onSubmit={handleSubmit}>
        <div className="">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-4 dark:text-gray-12"
          >
            {t("email")}
          </label>
          <Input
            id="email"
            name="email"
            placeholder="example@mail.com"
            value={values.email || ""}
            onChange={(e) =>
              handleChange(e.target.name as keyof ILoginForm, e.target.value)
            }
          />
        </div>
        <div className="mt-3">
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
            type="password"
            value={values.password || ""}
            onChange={(e) =>
              handleChange(e.target.name as keyof ILoginForm, e.target.value)
            }
          />
        </div>

        <button
          disabled={
            Object.values(values).length < 2 ||
            Object.values(values).some((v) => v.length < 1) ||
            Object.values(errors).length > 1 ||
            isPending
          }
          type="submit"
          className="w-full mt-4 py-1.5 flex items-center justify-center gap-2 rounded disabled:cursor-not-allowed text-sm bg-blue-7 disabled:dark:bg-blue-5 disabled:dark:text-gray-8 disabled:bg-blue-11 text-white"
        >
          {isPending && <SpinnerLoader />}
          {t("login")}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
