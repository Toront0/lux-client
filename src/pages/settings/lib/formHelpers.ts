import { axiosInstance } from "@/shared";
import { IFormData, SettingsData } from "./types";

export const extractChangedValues = (
  oldData: SettingsData,
  newData: IFormData
) => {
  const res = {} as Record<string, string>;

  for (const [key, value] of Object.entries(newData)) {
    if (value !== oldData[key as keyof SettingsData]) {
      res[key] = value;
    }
  }

  return res;
};

export const disableButton = (oldData: SettingsData, newData: IFormData) => {
  for (const [key, value] of Object.entries(newData)) {
    if (value !== oldData[key as keyof SettingsData]) {
      return false;
    }
  }

  return true;
};

export const handleChangeValues = async (
  oldData: SettingsData,
  vals: IFormData
) => {
  const res = extractChangedValues(oldData, vals);

  const { data } = await axiosInstance({
    method: "POST",
    url: "/users/update",
    withCredentials: true,
    headers: { "Content-Type": "text/plain" },
    data: res
  });

  return data;
};
