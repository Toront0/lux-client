import { Input, SpinnerLoader } from "@/shared";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFormData, SettingsData } from "../lib/types";
import { disableButton, handleChangeValues } from "../lib/formHelpers";

import { useMutation } from "@tanstack/react-query";
import ProfileImg from "./ProfileImg";
import BannerImg from "./BannerImg";

interface IForm {
  data: SettingsData;
}

const Form = ({ data }: IForm) => {
  const [values, setValues] = useState<IFormData>({
    firstName: data?.firstName,
    lastName: data?.lastName,
    profileImg: data?.profileImg,
    bannerImg: data?.bannerImg,
    email: data?.email,
    status: data?.status
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => handleChangeValues(data, values)
  });

  console.log("values", values);

  const { t } = useTranslation();

  return (
    <div className="mt-6 w-1/2">
      <ProfileImg
        currentImage={values.profileImg || data?.profileImg}
        setCurrentImg={(img) => setValues((p) => ({ ...p, profileImg: img }))}
      />

      <BannerImg
        currentImage={values.bannerImg || data?.bannerImg}
        setCurrentImg={(img) => setValues((p) => ({ ...p, bannerImg: img }))}
      />
      <div className="mt-6">
        <div>
          <label
            htmlFor="firstName"
            className="text-sm text-gray-2 font-medium dark:text-gray-14"
          >
            {t("firstName")}
          </label>
          <Input
            value={values.firstName}
            name="firstName"
            id="firstName"
            onChange={(e) =>
              setValues((p) => ({ ...p, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="lastName"
            className="text-sm text-gray-2 font-medium dark:text-gray-14"
          >
            {t("lastName")}
          </label>
          <Input
            value={values.lastName}
            id="lastName"
            name="lastName"
            onChange={(e) =>
              setValues((p) => ({ ...p, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="status"
            className="text-sm text-gray-2 font-medium dark:text-gray-14"
          >
            {t("status")}
          </label>
          <Input
            value={values?.status}
            id="status"
            name="status"
            onChange={(e) =>
              setValues((p) => ({ ...p, status: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => mutate()}
          disabled={disableButton(data, values) || isPending}
          className="px-3 py-1.5 rounded bg-blue-7 flex items-center gap-2 disabled:bg-blue-12 disabled:cursor-not-allowed disabled:dark:bg-blue-4 disabled:dark:text-gray-8 text-white text-sm"
        >
          {isPending && <SpinnerLoader className="w-5 h-5" />}
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};

export default Form;
