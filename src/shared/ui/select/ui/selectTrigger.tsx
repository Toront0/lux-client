import { useSelectContext } from "../config/context";

const SelectTrigger = ({ defaultValue }: { defaultValue: string }) => {
  const { setIsOpen, chosenOption, chosenValue } = useSelectContext();

  return (
    <button
      type="button"
      onClick={() => setIsOpen((p) => !p)}
      className="text-sm text-gray-4 dark:text-gray-12 px-3 border border-opac-w-1 flex items-center justify-between min-w-[132px] w-full py-2 rounded bg-opac-b-1 dark:bg-opac-w-1 cursor-pointer"
    >
      {chosenOption === -1 ? defaultValue : chosenValue}
      <div className="w-6 h-6">
        <svg
          fill="#ffffff"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M620.6 562.3l36.2 36.2L512 743.3 367.2 598.5l36.2-36.2L512 670.9l108.6-108.6zM512 353.1l108.6 108.6 36.2-36.2L512 280.7 367.2 425.5l36.2 36.2L512 353.1z"></path>
          </g>
        </svg>
      </div>
    </button>
  );
};

export default SelectTrigger;
