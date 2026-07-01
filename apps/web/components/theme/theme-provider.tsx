"use client";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({
  children,
  ...pros
}: {
  children: React.ReactNode;
}) {
  return <NextThemesProvider {...pros}>{children}</NextThemesProvider>;
}
