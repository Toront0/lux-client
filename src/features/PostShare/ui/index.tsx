import { BiShareAlt } from "react-icons/bi";

import { useTranslation } from "react-i18next";

const PostShare = () => {
  const { t } = useTranslation();

  return (
    <button
      className={`px-1 md:px-3 flex items-center gap-2 text-gray-6 dark:text-gray-8 transition-colors text-xs xl:text-sm font-semibold`}
    >
      <BiShareAlt className="text-base md:text-xl" />
      <span className="text-[10px] md:text-sm font-semibold ">
        {t("share")}
      </span>
    </button>
  );
};

export default PostShare;
