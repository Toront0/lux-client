import { ChangeEvent, useRef, useState } from "react";
import { getBase64Img } from "../helpers/utils";

type Options = {
  imgStore?: "multiple" | "single";
  sizeLimit?: number;
  onSuccess?: (img: string) => void;
};

export const useGetImage = (opts?: Options) => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>();

  const getImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }

    try {
      const res = await getBase64Img(e, opts?.sizeLimit);

      if (opts?.imgStore === "multiple") {
        setImages((p) => p.concat(res));
      } else {
        const newImage = [res];
        setImages(newImage);
      }

      opts?.onSuccess && opts?.onSuccess(res);
    } catch (error) {
      setError(String(error).replace(/^Error:\s*/, ""));
    }
  };

  return { inputRef, images, error, getImageFile };
};
