interface IDropdownButtonItem
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownButtonItem = ({ ...rest }: IDropdownButtonItem) => {
  return (
    <button
      {...rest}
      className="flex items-center gap-2 text-gray-4 dark:text-gray-12 px-2 py-1.5 hover:bg-opac-b-1 dark:hover:bg-opac-w-1 w-full rounded"
    >
      {rest.children}
    </button>
  );
};

export default DropdownButtonItem;
