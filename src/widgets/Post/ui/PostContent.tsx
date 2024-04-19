import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { MdArrowDropDown } from "react-icons/md";

interface IPostContent {
  content: string;
}

const PostContent = ({ content }: IPostContent) => {
  const [expandText, setExpandText] = useState(false);
  const textRef = useRef<HTMLElement>();
  const [isTextBig, setIsTextBig] = useState<boolean | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    if (textRef.current.offsetHeight > 120) {
      setIsTextBig(true);
    }
  }, [textRef.current]);

  const { t } = useTranslation();

  return (
    <div className="my-3 md:my-4 relative">
      <div className={` ${expandText ? "" : "max-h-[128px]"} overflow-hidden`}>
        <pre
          ref={textRef as React.RefObject<HTMLPreElement>}
          className={`  whitespace-pre-wrap text-sm text-gray-4 dark:text-gray-12`}
        >
          {content}
        </pre>
      </div>
      {isTextBig && !expandText && (
        <button
          onClick={() => setExpandText(true)}
          className="absolute bottom-0 bg-gradient-to-t h-20 pb-2 from-gray-15 dark:from-black  via-opac-w-12 dark:via-opac-b-13 to-transparent z-10 flex items-end gap-2 justify-center w-full text-sm text-blue-7 dark:text-blue-10 left-0"
        >
          {t("showMore")}
          <MdArrowDropDown className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default PostContent;
