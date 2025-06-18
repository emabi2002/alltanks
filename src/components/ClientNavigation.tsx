"use client";

import Navigation from "./Navigation";

interface ClientNavigationProps {
  currentPage?: string;
}

export default function ClientNavigation({ currentPage = "home" }: ClientNavigationProps) {
  return <Navigation currentPage={currentPage} />;
}
