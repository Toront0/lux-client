import { useRef, useEffect } from "react";

export const useInterval = (cb: () => void) => {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        cb();
      }, 10000);

      return () => {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      };
    }
  }, [timerRef.current]);
};
