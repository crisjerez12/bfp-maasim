"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Clock,
  Building2,
  LogOut,
  Menu,
  PlusCircle,
  Archive,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSidebar, SidebarProvider } from "@/contexts/SidebarContext";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
    <SidebarProvider>
      <CoverContent>{children}</CoverContent>
    </SidebarProvider>
  );
}

function CoverContent({ children }: SidebarProps) {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const [showTitle, setShowTitle] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

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
              <div className="flex items-center ">
                <Image
                  src="/logo.png"
                  alt="BFP-FIRE SAFETY"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-2xl font-bold">BFP-SYSTEM</span>
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
              </div>
            </div>
          </nav>
        </ScrollArea>
        <div className="p-4">
          {sidebarOpen ? (
            <div className="flex flex-col space-y-2 bg-gradient-to-r from-gray-300 to-gray-400 p-2 rounded-md">
              <div className="flex items-center  space-x-2 ">
                <Avatar>
                  <AvatarImage src="/user-icon.png" alt="user" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-gray-950">
                  <p className="text-md  font-semibold">
                    Maria Santos Fernandez
                  </p>
                  <p className="text-sm font-medium uppercase">staff</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-center bg-blue-600 text-gray-100 hover:bg-blue-800 hover:text-blue-50 transition-colors duration-200"
                onClick={() => console.log("Logout")}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-center text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition-colors duration-200 p-0"
              onClick={() => console.log("Logout")}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
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
