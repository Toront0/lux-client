import { useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";

interface ISearchInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = ({ ...rest }: ISearchInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const onClick = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      onFocus={onClick}
      onBlur={onBlur}
      className={`w-full mt-2 bg-white border ${
        isFocused
          ? "dark:bg-black border-blue-7 dark:border-blue-8"
          : "   dark:bg-gray-2 border-opac-b-2 dark:border-opac-w-1"
      } cursor-text px-2  flex items-center gap-2 py-1.5 rounded  text-gray-4 dark:text-gray-12 `}
    >
      <FiSearch className="text-xl" />
      <input
        type="text"
        onBlur={onBlur}
        {...rest}
        ref={inputRef as React.RefObject<HTMLInputElement>}
        className="w-full bg-transparent  focus:outline-none text-sm"
      />
    </div>
  );
};

export default SearchInput;
