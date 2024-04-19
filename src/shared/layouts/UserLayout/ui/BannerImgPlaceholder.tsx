import { useToggleTheme } from "@/stores/darkTheme/darkTheme";
import { generateBannerPlaceholder } from "../lib/generateBackgroundSvg";

interface IBannerImgPlaceholder {
  userFullname: string;
}

const BannerImgPlaceholder = ({ userFullname }: IBannerImgPlaceholder) => {
  const currTheme = useToggleTheme((s) => s.activeTheme);

  return (
    <div
      style={{
        background: `url("${generateBannerPlaceholder(
          userFullname,
          currTheme
        )}")`
      }}
      className="absolute  -top-10 text-gray-7 dark:text-gray-4  left-0 w-full h-full "
    >
      <div className="w-full h-full"></div>
    </div>
  );
};

export default BannerImgPlaceholder;
