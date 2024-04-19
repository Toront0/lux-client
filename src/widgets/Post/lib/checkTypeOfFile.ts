type PossibleTypes = "img" | "video" | "";

export const checkTypeOfAFile = (file: string): PossibleTypes => {
  if (/[.](gif|jpg|jpeg|tiff|png|webp)$/i.test(file)) {
    return "img";
  }

  if (/[.](mp4|mp3|mp2|mpe|mpv)$/i.test(file)) {
    return "video";
  }

  return "";
};
