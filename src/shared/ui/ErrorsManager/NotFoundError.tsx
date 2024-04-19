import icon from "/icons/errorDark.svg";

const NotFoundError = () => {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <img src={icon} alt="404 error" className="w-40 h-40 object-cover " />
      <h3 className="text-lg text-gray-6 dark:text-gray-9">
        Запрашиваемый ресурс не существует
      </h3>
    </div>
  );
};

export default NotFoundError;
