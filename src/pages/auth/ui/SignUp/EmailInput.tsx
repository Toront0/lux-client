import { Input, axiosInstance } from "@/shared";
import { useTranslation } from "react-i18next";
import { ISignUpForm } from "../../lib/types";
import { useDebouncedValue } from "@/shared/hooks";

import request from "axios";

import { useEffect, useState } from "react";

interface IEmailInput {
  values: ISignUpForm;
  errors: ISignUpForm;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  handleChange: (n: keyof ISignUpForm, v: any) => void;
}

const check = async (email: string) => {
  const data = await axiosInstance({
    method: "POST",
    withCredentials: true,
    url: `/check-email`,
    data: {
      email
    }
  });

  return data;
};

const EmailInput = ({ values, errors, handleChange }: IEmailInput) => {
  const [debounced] = useDebouncedValue(values.email, 300);
  const [alreadyExist, setAlreadyExist] = useState(false);

  useEffect(() => {
    if (values.email?.length < 1 || errors.email) {
      return;
    }

    if (alreadyExist) {
      setAlreadyExist(false);
    }

    const handler = async () => {
      try {
        const res = await check(values.email);

        console.log("res", res);
      } catch (err) {
        if (
          request.isAxiosError(err) &&
          err.response &&
          err.response.status === 400
        ) {
          setAlreadyExist(true);
        }
      }
    };

    handler();
  }, [debounced]);

  const { t } = useTranslation();

  return (
    <>
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
          aria-label="Введите электронную почту"
          placeholder="example@mail.com"
          value={values.email}
          onChange={(e) =>
            handleChange(e.target.name as keyof ISignUpForm, e.target.value)
          }
        />
        {errors.email && (
          <div className="text-[13px] text-error mt-1">{errors.email}</div>
        )}
        {!errors.email && alreadyExist && (
          <div className="text-[13px] text-error mt-1">Already taken</div>
        )}
      </div>
    </>
  );
};

export default EmailInput;
