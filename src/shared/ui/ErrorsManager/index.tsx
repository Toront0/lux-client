import { useRouteError } from "react-router-dom";
import NotFoundError from "./NotFoundError";
import { AxiosError } from "axios";

const ErrorManager = () => {
  const res = useRouteError() as AxiosError;

  console.log("error(error)", res);

  // if (res.response?.status === 401) {
  //   console.log("401 401");

  //   return <Navigate to="/auth" />;
  // }

  if (res.response?.status === 404) {
    return <NotFoundError />;
  }

  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <h3 className="text-lg text-gray-6 dark:text-gray-9">
        Что-то пошло не так
      </h3>
    </div>
  );
};

export default ErrorManager;
