import { queryClient } from "@/app/config/react-query/queryClient";
import { VideoPreviewType } from "@/entities";
import { axiosInstance, reactQueryKeys } from "@/shared";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

const getVideoDetailFromServer = async (
  videoId: string
): Promise<VideoPreviewType> => {
  const { data } = await axiosInstance({
    url: `/videos/${videoId}`,
    withCredentials: true
  });

  return data;
};

export const useFetchVideo = (videoId: string) => {
  const res = useQuery<VideoPreviewType, AxiosError>({
    queryKey: [reactQueryKeys.videoDetail, videoId],
    queryFn: () => getVideo(videoId)
  });

  if (res.error?.response?.status === 404) {
    throw new Response("404", { status: 404 });
  }

  console.log("res.error?.response", res.error?.response);

  return res;
};

export const videoDetailQuery = (id: string) => ({
  queryKey: [reactQueryKeys.videoDetail, id],
  queryFn: () => getVideo(id)
});

export const loader =
  (queryClient: QueryClient) => async (params: LoaderFunctionArgs) => {
    const { id } = params.params;

    if (!id) {
      throw new Response("Something went wrong", { status: 400 });
    }

    console.log("id", id);
    console.log("params", params);

    const query = videoDetailQuery(id);

    return (
      queryClient.getQueryData([reactQueryKeys.videoDetail, id]) ??
      (await queryClient.fetchQuery(query))
    );
  };

const getVideo = async (videoId: string) => {
  if (!videoId) {
    throw new Error("Что то пошло не так");
  }

  const cachedVideos = queryClient.getQueryData<VideoPreviewType[]>([
    reactQueryKeys.videos
  ]);

  if (cachedVideos) {
    const cachedVideo = cachedVideos.find((v) => v.id === +videoId);

    if (!cachedVideo) {
      return getVideoDetailFromServer(videoId);
    }

    return cachedVideo;
  }

  return getVideoDetailFromServer(videoId);
};

export const videoDetailLoader = async (params: LoaderFunctionArgs) => {
  const { id } = params.params;

  if (!id) {
    throw new Error("Что то пошло не так");
  }

  const cachedVideos = queryClient.getQueryData<VideoPreviewType[]>([
    reactQueryKeys.videos
  ]);

  if (cachedVideos) {
    const cachedVideo = cachedVideos.find((v) => v.id === +id);

    if (!cachedVideo) {
      return getVideoDetailFromServer(id);
    }

    return cachedVideo;
  }

  return getVideoDetailFromServer(id);
};
