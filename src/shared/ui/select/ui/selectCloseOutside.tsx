import { useSelectContext } from "../config/context";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";

export const SelectCloseOutside = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { setIsOpen } = useSelectContext();

  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      {children}
    </div>
  );
};

export default SelectCloseOutside;
