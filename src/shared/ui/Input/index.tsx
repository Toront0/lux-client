import { MdError } from "react-icons/md";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = ({ error, ...rest }: IInput) => {
  return (
    <>
      <div
        className={`flex items-center w-full bg-opac-b-2 dark:bg-opac-w-2  border rounded ${
          error ? "border-[#b44040]" : "border-opac-b-1 dark:border-opac-w-1"
        }`}
      >
        <input
          {...rest}
          autoComplete="off"
          className={`w-full px-2 text-gray-2 dark:text-gray-15 bg-transparent  placeholder:text-gray-8 py-2 rounded   text-sm focus:outline-none`}
        />
        {error && (
          <div className="px-2 text-xl text-error">
            <MdError />
          </div>
        )}
      </div>
      <div
        className={`grid transition-[grid]  ${
          error ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className=" overflow-hidden">
          {error && <div className="text-[13px] text-error mt-1">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Input;
