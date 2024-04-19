import { useState } from "react";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./SignUp/SignUpForm";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const [currentAuthMode, setCurrentAuthMode] = useState<"login" | "signUp">(
    "login"
  );

  const { t } = useTranslation();

  return (
    <div className="w-full h-full bg-gray-10 dark:bg-gray-2 flex items-center justify-center">
      <div className=" w-[clamp(300px,100%,600px)] px-4  ">
        <h2 className="text-2xl text-center font-bold text-gray-1 dark:text-gray-15">
          {t("welcomeToLux")}
        </h2>
        <div className="w-full mt-4 rounded shadow-elev-2 dark:shadow-elev-2-dark bg-gray-12 dark:bg-gray-1 px-4 py-6">
          {currentAuthMode === "login" ? (
            <>
              <LoginForm />
              <div className="flex text-xs text-gray-9 gap-1 justify-center mt-4">
                <span>{t("haveNoAccount")} </span>
                <button
                  onClick={() => setCurrentAuthMode("signUp")}
                  className="text-xs text-blue-10 hover:underline"
                >
                  {t("createAccount")}
                </button>
              </div>
            </>
          ) : (
            <>
              <SignUpForm />
              <div className="flex text-xs text-gray-9 gap-1 justify-center mt-4">
                <span>{t("alreadyHaveAccount")} </span>
                <button
                  onClick={() => setCurrentAuthMode("login")}
                  className="text-xs text-blue-10 hover:underline"
                >
                  {t("login")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
