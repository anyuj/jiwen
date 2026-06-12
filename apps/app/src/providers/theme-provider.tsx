import { ScriptOnce } from "@tanstack/react-router";
import { createClientOnlyFn, createIsomorphicFn } from "@tanstack/react-start";
import { createContext, type ReactNode, use, useState } from "react";

export type Theme = "light" | "dark";
const DEFAULT_THEME: Theme = "light";

const themeStorageKey = "ui-theme";

function normalizeTheme(value: unknown): Theme {
  return value === "dark" ? "dark" : "light";
}

const getStoredTheme = createIsomorphicFn()
  .server((): Theme => DEFAULT_THEME)
  .client((): Theme => {
    const stored = localStorage.getItem(themeStorageKey);
    return normalizeTheme(stored);
  });

const setStoredTheme = createClientOnlyFn((theme: Theme) => {
  const validatedTheme = normalizeTheme(theme);
  localStorage.setItem(themeStorageKey, validatedTheme);
});

const applyTheme = createClientOnlyFn((theme: Theme) => {
  const validatedTheme = normalizeTheme(theme);
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(validatedTheme);
  root.style.colorScheme = validatedTheme;
});

const themeScript = `(() => {
  try {
    const storageKey = ${JSON.stringify(themeStorageKey)};
    const storedTheme = localStorage.getItem(storageKey);
    const theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : ${JSON.stringify(DEFAULT_THEME)};

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(${JSON.stringify(DEFAULT_THEME)});
    root.style.colorScheme = ${JSON.stringify(DEFAULT_THEME)};
  }
})();`;

type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);

  const setTheme = (newTheme: Theme) => {
    const validatedTheme = normalizeTheme(newTheme);
    setThemeState(validatedTheme);
    setStoredTheme(validatedTheme);
    applyTheme(validatedTheme);
  };

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <ScriptOnce children={themeScript} />
      {children}
    </ThemeContext>
  );
}

export const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
