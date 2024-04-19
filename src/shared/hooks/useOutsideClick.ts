import { useRef, useEffect } from "react";

export const useOutsideClick = (cb: () => void) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handler = (e: any) => {
      if (e.target.hasAttribute("data-ignore-outside-click")) {
        return;
      }

      if (ref.current && !ref.current.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [ref]);

  return ref;
};
