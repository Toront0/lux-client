import { axiosInstance, reactQueryKeys } from "@/shared";
import { SongType } from "@/widgets";
import { useQuery } from "@tanstack/react-query";

const getSongs = async (): Promise<SongType[]> => {
  const { data } = await axiosInstance({
    url: "/music",
    withCredentials: true
  });

  return data;
};

export const useFetchSongs = () => {
  return useQuery({ queryKey: [reactQueryKeys.music], queryFn: getSongs });
};
