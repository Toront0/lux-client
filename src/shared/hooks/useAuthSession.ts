type AuthUser = {
  id: number;
  profileImg: string;
};

function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export const useAuthSession = () => {
  const cookieValue = getCookie("data-session");

  if (cookieValue) {
    try {
      const v = JSON.parse(atob(cookieValue.split(".")[1])).userID;

      return JSON.parse(atob(v)) as AuthUser;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};
