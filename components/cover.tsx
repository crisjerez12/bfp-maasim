"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Clock,
  Building2,
  Menu,
  PlusCircle,
  Archive,
  Minus,
  PenIcon as UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSidebar, SidebarProvider } from "@/contexts/SidebarContext";
import { useState, useEffect } from "react";
import { UserProvider, useUser } from "@/contexts/UserContext";
import ProfileCard from "./profile";
import bfplogo from "@/public/logo.png";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
interface NavItemProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icon as a React component
  title: string;
  sidebarOpen: boolean;
  active: boolean;
}
export default function Cover({ children }: SidebarProps) {
  return (
    <UserProvider>
      <SidebarProvider>
        <CoverContent>{children}</CoverContent>
      </SidebarProvider>
    </UserProvider>
  );
}

function CoverContent({ children }: SidebarProps) {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [showTitle, setShowTitle] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const { user } = useUser();
  useEffect(() => {
    setShowTitle(true);
  }, []);

  const handleToggleSidebar = () => {
    toggleSidebar();
    if (!sidebarOpen) {
      setTimeout(() => setShowTitle(true), 150);
    } else {
      setShowTitle(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed md:relative z-20 flex flex-col h-full bg-gradient-to-b from-gray-800 to-slate-800 text-gray-100 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-72" : "w-20"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && (
            <div
              className={cn(
                "flex flex-col items-start transition-opacity duration-500 ease-in-out",
                showTitle ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="bg-gray-700 rounded-lg p-3 shadow-md w-full">
                <div className="flex items-center">
                  <Image
                    src={bfplogo || "/placeholder.svg"}
                    alt="BFP-FIRE SAFETY"
                    width={40}
                    height={40}
                    className="mr-3"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">BFP-SYSTEM</span>
                    <div className="text-xs text-gray-300">
                      Municipality of Maasim Sarangani Province
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition-colors duration-200 "
            onClick={handleToggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-2">
            <NavItem
              href="/dashboard"
              icon={LayoutDashboard}
              title="Dashboard"
              active={pathname === "/dashboard"}
            />
            <NavItem
              href="/dashboard/due"
              icon={Clock}
              title="Due"
              active={pathname === "/dashboard/due"}
            />
            <div className="mt-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
                {sidebarOpen ? (
                  "Transactions"
                ) : (
                  <Minus className="-mt-6 h-7 w-10" />
                )}
              </div>
              <div className={cn(sidebarOpen ? "ml-2 space-y-2" : "space-y-2")}>
                <NavItem
                  href="/dashboard/new"
                  icon={PlusCircle}
                  title="New Establishment"
                  active={pathname === "/dashboard/new"}
                />
                <NavItem
                  href="/dashboard/establishments"
                  icon={Building2}
                  title="Establishment"
                  active={pathname === "/dashboard/establishments"}
                />
                <NavItem
                  href="/dashboard/archives"
                  icon={Archive}
                  title="Archives"
                  active={pathname === "/dashboard/archives"}
                />
                {user?.role === "ADMIN" && (
                  <NavItem
                    href="/dashboard/accounts"
                    icon={UserPen}
                    title="Accounts"
                    active={pathname === "/dashboard/accounts"}
                  />
                )}
              </div>
            </div>
          </nav>
        </ScrollArea>
        <div className="p-4">
          <ProfileCard sidebarOpen={sidebarOpen} />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto  bg-gray-900">
        <header className="bg-gradient-to-r from-gray-800 to-slate-800 shadow-md sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-100">
              {getPageTitle(pathname)}
            </h1>
          </div>
        </header>
        <div className={`${!isDesktop && "ml-16"} p-6`}>{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  title,
  active,
}: Omit<NavItemProps, "sidebarOpen">) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClick = () => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  };

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-2 px-3 rounded-r-md transition-colors duration-200",
        active
          ? "border-l-4 border-blue-600 bg-gray-950/40 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-blue-400",
        !sidebarOpen && "justify-center"
      )}
      onClick={handleClick}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {sidebarOpen && (
        <span className="ml-2 truncate transition-opacity duration-200">
          {title}
        </span>
      )}
    </Link>
  );
}

function getPageTitle(pathname: string) {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/dashboard/due":
      return "Due Establishments";
    case "/dashboard/new":
      return "New Establishment";
    case "/dashboard/establishments":
      return "Establishments";
    case "/dashboard/archives":
      return "Archives";
    default:
      return "BFP-FIRE SAFETY";
  }
}
