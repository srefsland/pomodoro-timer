"use client";

import { HeroUIProvider } from "@heroui/react";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
