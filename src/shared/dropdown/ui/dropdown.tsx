import DropdownProvider from "../config/context";
import DropdownOutsideClick from "./dropdownOutsideClick";

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownProvider>
      <DropdownOutsideClick>{children}</DropdownOutsideClick>
    </DropdownProvider>
  );
};

export default Dropdown;
