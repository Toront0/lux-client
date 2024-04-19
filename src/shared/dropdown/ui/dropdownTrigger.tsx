import { useDropdownContext } from "../config/context";

const DropdownTrigger = ({ children }: { children: React.ReactNode }) => {
  const ctx = useDropdownContext();

  return (
    <div onClick={() => ctx.setIsOpen((p) => !p)} className="">
      {children}
    </div>
  );
};

export default DropdownTrigger;
