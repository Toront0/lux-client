import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext
} from "react";

type SelectContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  chosenOption: number;
  setChosenOption: Dispatch<SetStateAction<number>>;
  chosenValue: string;
  setChosenValue: Dispatch<SetStateAction<string>>;
  hoverIdx: number;
  setHoverIdx: Dispatch<SetStateAction<number>>;
};

const SelectContext = createContext({} as SelectContextType);

export default function SelectProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenOption, setChosenOption] = useState(-1);
  const [chosenValue, setChosenValue] = useState("");
  const [hoverIdx, setHoverIdx] = useState(-1);

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        chosenOption,
        setChosenOption,
        chosenValue,
        setChosenValue,
        hoverIdx,
        setHoverIdx
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export const useSelectContext = () => {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error("useSelectContext must be used in the SelectProvider");
  }

  return ctx;
};
