export type Themes = "dark" | "light";

export interface IUseToggleTheme {
  activeTheme: Themes;
  toggleTheme: () => void;
}
