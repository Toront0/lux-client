import { BsCheck } from "react-icons/bs";

interface ICheckBox {
  label: string;
  onChange: (n: string, v: any) => void; // eslint-disable-line
  name: string;
  id?: string;
  checked: boolean;
}

const CheckBox = ({ label, onChange, name, id, checked }: ICheckBox) => {
  return (
    <div className="flex items-center select-none gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked="true"
        data-state={checked ? "checked" : "unchecked"}
        onClick={(e) =>
          e.currentTarget.getAttribute("data-state") === "checked"
            ? (e.currentTarget.setAttribute("data-state", "unchecked"),
              onChange(name, false))
            : (e.currentTarget.setAttribute("data-state", "checked"),
              onChange(name, true))
        }
        id={id}
        className="w-4 h-4 group cursor-pointer rounded bg-opac-w-2"
      >
        <div className="w-full hidden bg-gray-14 rounded text-black h-full group-data-[state=checked]:flex items-center justify-center text-2xl">
          <BsCheck />
        </div>
      </button>
      <label
        htmlFor={id}
        className="text-sm cursor-pointer text-gray-10 font-medium"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
