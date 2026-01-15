"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeProps {
  compact?: boolean;
}

export default function Theme({ compact = false }: ThemeProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-secondary/50 backdrop-blur-sm",
          compact ? "h-10 w-10" : "h-10 w-[120px]"
        )}
      />
    );
  }

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  // Compact mode: Single button that cycles through themes
  if (compact) {
    const CurrentIcon =
      theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;

    return (
      <button
        onClick={cycleTheme}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full",
          "border border-border/50 bg-secondary/30 backdrop-blur-sm",
          "transition-all duration-300 hover:bg-secondary/60 active:scale-95"
        )}
        title={`Theme: ${theme} (click to cycle)`}
      >
        <CurrentIcon
          size={18}
          className="text-foreground transition-transform duration-300"
        />
      </button>
    );
  }

  // Full mode: Pill with all three options
  return (
    <div className="flex h-10 items-center gap-1 rounded-full border border-border/50 bg-secondary/30 p-1 backdrop-blur-sm">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
            theme === value
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
          )}
          title={label}
        >
          <Icon
            size={16}
            className={cn(
              "transition-transform duration-300",
              theme === value && "scale-110"
            )}
          />
          {theme === value && (
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          )}
        </button>
      ))}
    </div>
  );
}
