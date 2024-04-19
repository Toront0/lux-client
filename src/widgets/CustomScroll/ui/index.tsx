/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<Element>(null);

  const [pageHeight, setPageHeight] = useState(0);

  const resizePageHeight = useCallback((entries: any) => {
    for (const entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries: any) =>
      resizePageHeight(entries)
    );
    scrollRef.current && resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);

  console.log("");

  return (
    <>
      <div
        ref={scrollRef as React.LegacyRef<HTMLDivElement>}
        className="scroll-container"
      >
        {children}
      </div>
      <div style={{ height: pageHeight }} />
    </>
  );
};

export default SmoothScroll;
