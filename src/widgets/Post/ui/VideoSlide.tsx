import { VideoPlayer } from "@/widgets";

import { useIntersection } from "@/shared/hooks";

interface IVideoSlide {
  url: string;
  videoId: number;
}

const VideoSlide = ({ url, videoId }: IVideoSlide) => {
  const { ref } = useIntersection({ threshold: 1 });

  return (
    <div ref={ref} className="w-full  h-full flex items-center">
      <VideoPlayer url={url} videoId={videoId} />
    </div>
  );
};

export default VideoSlide;
