import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { useDropdownContext } from "../config/context";

const DropdownOutsideClick = ({ children }: { children: React.ReactNode }) => {
  const ctx = useDropdownContext();

  const ref = useOutsideClick(() => ctx.setIsOpen(false));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      {children}
    </div>
  );
};

export default DropdownOutsideClick;
