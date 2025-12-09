"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { handleQuickUrlClick } from "@/utils/urlFallback";

interface FallbackLinkProps {
  href: string;
  target?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  [key: string]: any; // Allow other props to be passed through
}

/**
 * Custom Link component with URL fallback mechanism
 * Automatically falls back to secondary URL if primary is unreachable
 */
export function FallbackLink({
  href,
  target,
  className,
  children,
  onClick,
  ...props
}: FallbackLinkProps) {
  // Only apply fallback for the specific URLs (3000 or 4000)
  const isFallbackUrl = 
    href === "http://115.242.156.230:3000" || 
    href === "http://115.242.156.230:4000" ||
    href.includes("115.242.156.230:3000") ||
    href.includes("115.242.156.230:4000");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isFallbackUrl) {
      handleQuickUrlClick(e);
    }
    // Call additional onClick handler if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      target={target}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}

