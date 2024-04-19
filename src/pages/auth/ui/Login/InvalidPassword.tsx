import { useTranslation } from "react-i18next";
import { MdError } from "react-icons/md";

const InvalidPassword = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded border p-4 flex mb-4 items-center gap-2 border-error border-l-4 ">
      <MdError className="text-3xl text-error" />
      <div>
        <h4 className="text-sm font-medium">{t("invalidPassword")}</h4>
        <h5 className="text-sm text-gray-6 dark:text-gray-9">
          {t("tryAgain")}
        </h5>
      </div>
    </div>
  );
};

export default InvalidPassword;
