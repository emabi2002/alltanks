"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartIcon } from "@/components/Cart";
import { useAuth, getUserDisplayName, isAdmin } from "@/lib/auth";
import { User, LogOut, Shield } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const { state, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", key: "home" },
    { href: "/products", label: "Products", key: "products" },
    { href: "/quote", label: "Get Quote", key: "quote" },
    { href: "/about", label: "About", key: "about" },
    { href: "/contact", label: "Contact", key: "contact" },
  ];

  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    if (pathname === "/") return "home";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/quote")) return "quote";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/contact")) return "contact";
    return "";
  };

  const activePage = getCurrentPage();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img src="/atlogo.png" alt="All Tanks Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold text-blue-900">All Tanks Limited</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activePage === item.key
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <CartIcon />

              {/* Auth Section */}
              {state.isAuthenticated ? (
                <div className="flex items-center gap-2 ml-4">
                  {state.user && isAdmin(state.user) && (
                    <Button variant="outline" asChild>
                      <Link href="/admin">
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href="/account">
                      <User className="h-4 w-4 mr-2" />
                      {state.user ? getUserDisplayName(state.user) : 'Account'}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/products">Shop Now</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
