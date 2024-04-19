import { Link } from "react-router-dom";
import { MusicPlaylistPreviewType } from "../lib/types";

const MusicPlaylistPreview = ({
  id,
  coverImg,
  title,
  creatorId
}: MusicPlaylistPreviewType) => {
  return (
    <Link
      to={`/${creatorId}/music/playlists/${id}`}
      className={`  mx-1 min-w-[33%] w-1/3 lg:min-w-[25%] lg:w-1/4 xl:min-w-[16%] xl:w-1/6`}
    >
      <div key={id} className=" rounded aspect-square ">
        <img
          src={coverImg}
          alt={title}
          className="w-full dark:brightness-50 h-full object-cover rounded"
        />
        <h4 className="text-sm mt-1 text-gray-4 dark:text-gray-12">{title}</h4>
      </div>
    </Link>
  );
};

export default MusicPlaylistPreview;
