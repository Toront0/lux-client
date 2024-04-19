import { Button } from "@/shared";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/shared/dropdown";

import { GoBell } from "react-icons/go";

const NotificationsDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>
          <GoBell className="w-full h-full" />
        </Button>
      </DropdownTrigger>
      <DropdownContent position="bottom-right" className="w-72 md:w-96">
        <div className="flex justify-between items-center">
          <div></div>
          <h4 className="text-sm text-gray-4 dark:text-gray-12 font-medium">
            Уведомления
          </h4>
          <div></div>
        </div>
        <div className="h-64"></div>
      </DropdownContent>
    </Dropdown>
  );
};

export default NotificationsDropdown;
