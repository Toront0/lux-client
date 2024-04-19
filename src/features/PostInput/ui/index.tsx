import { useTranslation } from "react-i18next";

const PostInput = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex mt-4 items-center gap-4">
      <div className="min-w-[32px] h-8 rounded-full bg-gray-12 dark:bg-gray-4"></div>
      <div className="h-8 w-full rounded flex items-center">
        <input
          type="text"
          className="w-full text-sm text-gray-4 placeholder:text-gray-8 dark:text-gray-12 bg-transparent focus:outline-none"
          placeholder={t("writeYourComment")}
        />
      </div>
    </div>
  );
};

export default PostInput;
