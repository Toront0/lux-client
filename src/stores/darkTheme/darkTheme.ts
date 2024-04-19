import { create } from "zustand";
import { IUseToggleTheme, Themes } from "./darkTheme.types";

const getThemeFromLocalStorage = () => {
  return window.localStorage.getItem("theme") || "light";
};

export const useToggleTheme = create<IUseToggleTheme>((set, get) => ({
  activeTheme: getThemeFromLocalStorage() as Themes,
  toggleTheme() {
    if (get().activeTheme === "light") {
      window.localStorage.setItem("theme", "dark");
    } else {
      window.localStorage.setItem("theme", "light");
    }

    document.documentElement.classList.toggle("dark");

    set({ activeTheme: get().activeTheme === "light" ? "dark" : "light" });
  }
}));
