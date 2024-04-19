import { reactQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";

import { getPlaylists } from "../api/getPlaylists";

interface IPlaylistSlider {
  userId: string;
}

import Slider from "@/entities/Slider";
import { MusicPlaylistPreview } from "@/entities";
import CreatePlaylist from "./CreatePlaylist";
import { useTranslation } from "react-i18next";
import { useAuthSession } from "@/shared/hooks";

const PlaylistSlider = ({ userId }: IPlaylistSlider) => {
  const { t } = useTranslation();

  const authUser = useAuthSession();

  const { data } = useQuery({
    queryKey: [reactQueryKeys.userMusicPlaylists, userId],
    queryFn: () => getPlaylists(userId)
  });

  return (
    <>
      {data?.length !== 0 && (
        <div>
          <h3 className=" text-gray-4 dark:text-gray-12">{t("playlists")}</h3>

          <section className="mt-2 w-full">
            <Slider>
              {authUser?.id === +userId && <CreatePlaylist />}

              {data?.map((v) => (
                <MusicPlaylistPreview
                  key={v.id}
                  id={v.id}
                  coverImg={v.coverImg}
                  title={v.title}
                  creatorId={v.creatorId}
                />
              ))}
            </Slider>
          </section>
        </div>
      )}
    </>
  );
};

export default PlaylistSlider;
