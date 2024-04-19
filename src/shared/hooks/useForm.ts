import { useState, useEffect } from "react";

type DefaultOptions<T> = {
  validate?: (vals: T) => T;
};

export const getDefValues = () => {
  return {
    firstName: "123"
  };
};
/* eslint-disable @typescript-eslint/no-explicit-any */
export const useForm = <T extends Record<string, any>>(
  req?: DefaultOptions<T>
) => {
  const [values, setValues] = useState({} as T);
  const [errors, setErrors] = useState({} as T);

  useEffect(() => {
    if (req?.validate) {
      setErrors(req.validate(values));
    }
  }, [values]);

  const handleChange = (n: keyof T, v: any) => {
    setValues((p) => ({
      ...p,
      [n]: v
    }));
  };

  return { values, errors, handleChange };
};
