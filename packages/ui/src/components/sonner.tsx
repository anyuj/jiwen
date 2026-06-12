import { type CSSProperties, useSyncExternalStore } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertOctagon,
  IconLoader,
} from "@tabler/icons-react";

type SonnerTheme = NonNullable<ToasterProps["theme"]>;
type ResolvedSonnerTheme = Extract<SonnerTheme, "light" | "dark">;

function getDocumentTheme(): ResolvedSonnerTheme {
  if (typeof document === "undefined") {
    return "light";
  }

  const root = document.documentElement;
  const attributeTheme = root.getAttribute("data-theme");
  if (attributeTheme === "light" || attributeTheme === "dark") {
    return attributeTheme;
  }

  if (root.classList.contains("dark")) {
    return "dark";
  }

  if (root.classList.contains("light")) {
    return "light";
  }

  const { colorScheme } = root.style;
  if (colorScheme === "light" || colorScheme === "dark") {
    return colorScheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToDocumentTheme(onChange: () => void) {
  const root = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const observer = new MutationObserver(onChange);
  observer.observe(root, {
    attributeFilter: ["class", "data-theme", "style"],
    attributes: true,
  });
  mediaQuery.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener("change", onChange);
  };
}

function getServerTheme(): ResolvedSonnerTheme {
  return "light";
}

function useResolvedTheme(themeProp?: SonnerTheme): ResolvedSonnerTheme {
  const documentTheme = useSyncExternalStore<ResolvedSonnerTheme>(
    subscribeToDocumentTheme,
    getDocumentTheme,
    getServerTheme,
  );

  if (themeProp === "light" || themeProp === "dark") {
    return themeProp;
  }

  return documentTheme;
}

const Toaster = ({ theme: themeProp, ...props }: ToasterProps) => {
  const theme = useResolvedTheme(themeProp);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <IconCircleCheck className="size-4" />,
        info: <IconInfoCircle className="size-4" />,
        warning: <IconAlertTriangle className="size-4" />,
        error: <IconAlertOctagon className="size-4" />,
        loading: <IconLoader className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
