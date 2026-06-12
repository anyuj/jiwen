"use client";

import { useTheme } from "@wrksz/themes/client";
import type { ThemeSwitchProps as FumadocsThemeSwitchProps } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeName = "light" | "dark";
type ThemeSwitchProps = FumadocsThemeSwitchProps;

const items = [
  { key: "light", icon: Sun },
  { key: "dark", icon: Moon },
] as const;

function cx(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

function itemClassName(active: boolean) {
  return cx(
    "size-6.5 p-1.5 text-fd-muted-foreground",
    active && "bg-fd-accent text-fd-accent-foreground",
  );
}

export function ThemeSwitch({
  className,
}: ThemeSwitchProps) {
  const { resolvedTheme, setTheme } = useTheme<ThemeName>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerClassName = cx(
    "inline-flex items-center overflow-hidden rounded-full border p-1 *:rounded-full",
    className,
  );

  const activeTheme = isMounted ? resolvedTheme : null;

  return (
    <button
      aria-label="Toggle Theme"
      className={containerClassName}
      data-theme-toggle=""
      onClick={() => setTheme(activeTheme === "light" ? "dark" : "light")}
      type="button"
    >
      {items.map(({ key, icon: Icon }) => (
        <Icon
          key={key}
          className={itemClassName(activeTheme === key)}
          fill="currentColor"
        />
      ))}
    </button>
  );
}
