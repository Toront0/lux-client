import { useAuthSession } from "@/shared/hooks";
import { Header } from "@/widgets";
import Sidebar from "@/widgets/Sidebar/ui";

import { Navigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const val = useAuthSession();

  const cookie = useCookies(["jwt"]);

  console.log("cookie", cookie);

  if (!val) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[calc(100%-48px)] flex">
        <Sidebar />
        <div className="w-full h-full bg-gray-15 dark:bg-black">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
