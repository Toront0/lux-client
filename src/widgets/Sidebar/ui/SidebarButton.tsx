import { ButtonHTMLAttributes } from "react";

interface ISidebarLink extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarButton = ({ ...rest }: ISidebarLink) => {
  return (
    <button
      {...rest}
      className={`flex my-2 w-full relative items-center lg:hover:bg-opac-b-1 lg:dark:hover:bg-opac-w-1 text-gray-5 dark:text-gray-8 py-2 px-4  gap-2 `}
    >
      {rest.children}
    </button>
  );
};

export default SidebarButton;
