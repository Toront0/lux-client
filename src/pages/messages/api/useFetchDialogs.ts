import { PersonalMessageType, axiosInstance, reactQueryKeys } from "@/shared";

import { useQuery } from "@tanstack/react-query";

const getDialogs = async (): Promise<PersonalMessageType[]> => {
  const { data } = await axiosInstance({
    url: `/dialogs`,
    withCredentials: true
  });

  return data;
};

export const useFetchDialogs = () => {
  return useQuery({ queryKey: [reactQueryKeys.dialogs], queryFn: getDialogs });
};
