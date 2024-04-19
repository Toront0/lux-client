import { Select, SelectContent, SelectOption, SelectTrigger } from "@/shared";

import { useTranslation } from "react-i18next";

const SettingsSystem = () => {
  const { i18n } = useTranslation();

  return (
    <div className="h-screen">
      <Select>
        <SelectTrigger defaultValue="Выберите язык">
          Выберите язык
        </SelectTrigger>
        <SelectContent>
          <SelectOption idx={0} onClick={() => i18n.changeLanguage("en")}>
            English
          </SelectOption>
          <SelectOption idx={1} onClick={() => i18n.changeLanguage("ru")}>
            Русский
          </SelectOption>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SettingsSystem;
