import VideoPlayerProvider from "../lib/context";

import VideoPlayerContainer from "./VideoPlayerContainer";

interface IVideoPlayer {
  url: string;
  videoId: number;
  onManualPause?: () => void;
}

const VideoPlayer = ({ url, videoId }: IVideoPlayer) => {
  return (
    <VideoPlayerProvider>
      <VideoPlayerContainer url={url} videoId={videoId} />
    </VideoPlayerProvider>
  );
};

export default VideoPlayer;
