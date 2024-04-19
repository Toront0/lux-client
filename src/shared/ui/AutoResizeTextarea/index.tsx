import { useEffect, useRef } from "react";

interface IAutoResizeTextarea
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoResizeTextarea = ({ ...rest }: IAutoResizeTextarea) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [rest.value]);

  return (
    <textarea
      {...rest}
      ref={textAreaRef as React.RefObject<HTMLTextAreaElement>}
      className="w-full resize-none text-sm p-2 rounded text-gray-4 dark:text-gray-12 placeholder:text-gray-9 dark:placeholder:text-gray-8  focus:outline-none bg-opac-b-1 dark:bg-opac-w-1"
      rows={1}
    ></textarea>
  );
};

export default AutoResizeTextarea;
