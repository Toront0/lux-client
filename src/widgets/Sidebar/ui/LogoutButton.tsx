import { useState } from "react";
import SidebarButton from "./SidebarButton";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { LogoutConfirmModal } from "@/entities";

const LogoutButton = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <>
      <LogoutConfirmModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
      />
      <SidebarButton onClick={() => setOpenLogoutModal((p) => !p)}>
        <RiLogoutBoxRLine className="w-full h-full rotate-180" />
      </SidebarButton>
    </>
  );
};

export default LogoutButton;
