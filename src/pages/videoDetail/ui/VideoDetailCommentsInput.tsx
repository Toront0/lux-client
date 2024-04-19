import { CommentInput } from "@/entities";
import { reactQueryKeys } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { insertComment } from "../api/insertComment";
import { queryClient } from "@/app/config/react-query/queryClient";

interface IVideoDetailCommentsInput {
  videoId: number;
}

const VideoDetailCommentsInput = ({ videoId }: IVideoDetailCommentsInput) => {
  const [inputValue, setInputValue] = useState("");

  const { mutate } = useMutation({
    mutationFn: () => insertComment(videoId, inputValue),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [reactQueryKeys.videoComments, videoId]
      })
  });

  return (
    <div>
      <CommentInput
        id="commentInput"
        name="commentInput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSend={() => mutate()}
      />
    </div>
  );
};

export default VideoDetailCommentsInput;
