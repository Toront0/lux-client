import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";

import { axiosInstance, reactQueryKeys } from "@/shared";
import { UserType } from "../config/types";

export const getUserDetail = async (userId: string): Promise<UserType> => {
  const { data } = await axiosInstance({
    url: `/users/${userId}`,
    withCredentials: true
  });

  return data;
};

export const userDetailLoader =
  (queryClient: QueryClient) => async (params: LoaderFunctionArgs) => {
    const { id } = params.params;

    return queryClient.fetchQuery({
      queryKey: [reactQueryKeys.userDetail, id],
      queryFn: () => getUserDetail(id || "0")
    });
  };
