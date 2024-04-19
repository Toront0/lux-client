import SelectProvider from "../config/context";
import SelectCloseOutside from "./selectCloseOutside";

const Select = ({ children }: { children: React.ReactNode }) => {
  return (
    <SelectProvider>
      <SelectCloseOutside>{children}</SelectCloseOutside>
    </SelectProvider>
  );
};

export default Select;
