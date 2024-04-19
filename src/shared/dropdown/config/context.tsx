import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext
} from "react";

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const DropdownContext = createContext({} as DropdownContextType);

export default function DropdownProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);

  if (!ctx) {
    throw new Error("useDropdownContext must be used in the DropdownProvider");
  }

  return ctx;
};
