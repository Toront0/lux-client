import { useParams } from "react-router-dom";
import InfiniteSongs from "./InfiniteSongs";
import PlaylistSlider from "./playlistSlider";
import { MusicPlayer } from "@/widgets";
import { useMusicState } from "@/stores";

const UserDetailMusic = () => {
  const { id } = useParams();

  const { musicUrl } = useMusicState(["musicUrl"]);

  return (
    <div className="w-full h-full relative overflow-y-auto">
      <div className="relative z-30 flex h-full flex-col">
        <PlaylistSlider userId={id || "0"} />

        <div className="bg-gray-15 dark:bg-black pt-12 h-full">
          {musicUrl && <MusicPlayer />}
          <div className="">
            <InfiniteSongs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailMusic;
