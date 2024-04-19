import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full">
      <div className="p-2 md:p-6 max-w-[1140px]">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-gray-12">
          {t("settings")}
        </h2>
        <div className="flex items-center gap-6 text-gray-4 dark:text-gray-12 mt-6 font-medium">
          <Link to="/settings">Home</Link>
          <Link to="/settings/system">System</Link>
        </div>
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
