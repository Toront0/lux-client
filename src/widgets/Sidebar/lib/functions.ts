export const shouldRender = (pathname: string, href: string) => {
  // if (pathname.includes("playlists") && href === "music") {
  //   return true;
  // }

  if (pathname === href) {
    return true;
  }

  if (pathname === "/create-post" && href === "/") {
    return true;
  }

  return false;
};
