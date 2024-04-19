import { Themes } from "@/stores/darkTheme/darkTheme.types";

export const generateBannerPlaceholder = (
  fullName: string,
  currTheme: Themes
) => {
  let res =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px'>";

  for (let i = 0; i < 3; i++) {
    const r = `<text x='${i === 0 ? -50 : i === 1 ? -250 : -150}' y='${
      27 + i * 33 + "%"
    }' fill='${
      currTheme === "dark" ? "%2326262c" : "%23d3d3d9"
    }'  font-size='4rem' font-weight='600'  font-family='Roobert,Helvetica Neue,Helvetica,Arial,sans-serif'>${Array.from(
      { length: 16 }
    )
      .fill(fullName)
      .join(" ")
      .split(",")
      .map((v) => v)}</text>`;

    res += r;

    if (i === 2) {
      res += "</svg>";
    }
  }

  return res;
};
