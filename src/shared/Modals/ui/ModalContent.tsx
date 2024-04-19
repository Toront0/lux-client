import { BasisModalProps } from "../config/types";
import { createPortal } from "react-dom";
import { useMemo } from "react";

const ModalContent = ({ children, onClose }: BasisModalProps) => {
  const el = useMemo(() => {
    const el = document.getElementById("modal");

    return el;
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed top-0 left-0 z-50 w-full h-full px-2  bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[500px] rounded bg-white border border-opac-b-2 shadow-elev-2 dark:shadow-elev-2-dark dark:border-opac-w-2 p-4 dark:bg-gray-1 "
      >
        {children}
      </div>
    </div>,
    el as HTMLElement
  );
};

export default ModalContent;
