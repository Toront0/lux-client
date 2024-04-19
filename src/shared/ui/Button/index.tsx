interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ ...rest }: IButton) => {
  return (
    <button
      {...rest}
      className="w-7 md:w-7 hover:bg-opac-b-1 dark:hover:bg-opac-w-1 rounded h-7 md:h-7 text-black dark:text-gray-12 flex items-center justify-center"
    >
      <div className="w-5 md:w-[22px] h-5 md:h-[22px]">{rest.children}</div>
    </button>
  );
};

export default Button;
