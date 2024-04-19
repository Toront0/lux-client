import { axiosInstance, reactQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import Form from "./Form";
import { SettingsData } from "../lib/types";
import { useTranslation } from "react-i18next";

const getUserSettings = async (): Promise<SettingsData> => {
  const { data } = await axiosInstance({
    url: "/settings",
    withCredentials: true
  });

  return data;
};

const SettingsPage = () => {
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: [reactQueryKeys.userSettings],
    queryFn: getUserSettings
  });

  return (
    <div className="h-full w-full">
      <div className="w-full h-full">
        <div className="p-2 md:p-6 max-w-[1140px]">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-gray-12">
            {t("settings")}
          </h2>
          {data && <Form data={data} />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
