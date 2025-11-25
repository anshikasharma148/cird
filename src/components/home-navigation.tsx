"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";

export function HomeNavigation() {
  const pathname = usePathname();
  
  // Only show navigation in layout if not on home page
  if (pathname === "/") {
    return null;
  }
  
  return <Navigation />;
}

