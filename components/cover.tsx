"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Clock,
  Building2,
  User,
  LogOut,
  Menu,
  Flame,
  PlusCircle,
  Archive,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setTimeout(() => setShowTitle(true), 150);
    } else {
      setShowTitle(false);
    }
  };

  useEffect(() => {
    setShowTitle(true);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      <aside
        className={cn(
          "relative z-20 flex flex-col h-full bg-gray-800 text-gray-100 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {sidebarOpen && (
            <h2
              className={cn(
                "text-xl font-bold transition-opacity duration-500 ease-in-out",
                showTitle ? "opacity-100" : "opacity-0"
              )}
            >
              BFP-FIRE SAFETY
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition-colors duration-200"
            onClick={toggleSidebar}
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
              sidebarOpen={sidebarOpen}
              active={pathname === "/dashboard"}
            />
            <NavItem
              href="/dashboard/due"
              icon={Clock}
              title="Due"
              sidebarOpen={sidebarOpen}
              active={pathname === "/dashboard/due"}
            />
            <div className="mt-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
                {sidebarOpen ? (
                  "Transactions"
                ) : (
                  <Minus className="-mt-6 h-7 w-7" />
                )}
              </div>
              <div className={cn(sidebarOpen ? "ml-2 space-y-2" : "space-y-2")}>
                <NavItem
                  href="/dashboard/new"
                  icon={PlusCircle}
                  title="New Establishment"
                  sidebarOpen={sidebarOpen}
                  active={pathname === "/dashboard/new"}
                />
                <NavItem
                  href="/dashboard/establishments"
                  icon={Building2}
                  title="Establishment"
                  sidebarOpen={sidebarOpen}
                  active={pathname === "/dashboard/establishments"}
                />
                <NavItem
                  href="/dashboard/archives"
                  icon={Archive}
                  title="Archives"
                  sidebarOpen={sidebarOpen}
                  active={pathname === "/dashboard/archives"}
                />
              </div>
            </div>
          </nav>
        </ScrollArea>
        <div className="p-4">
          <NavItem
            href="/dashboard/account"
            icon={User}
            title="Account"
            sidebarOpen={sidebarOpen}
            active={pathname === "/dashboard/account"}
          />
          <Button
            variant="ghost"
            className={cn(
              "mt-2 w-full justify-start text-gray-100 hover:bg-gray-700 hover:text-blue-400 transition-colors duration-200",
              !sidebarOpen && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-900">
        <header className="bg-gray-800 shadow-md sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-100">
              {getPageTitle(pathname)}
            </h1>
            <Flame className="h-8 w-8 text-blue-400" />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  title,
  sidebarOpen,
  active,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-2 px-3 rounded-lg transition-colors duration-200",
        active
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-blue-400",
        !sidebarOpen && "justify-center"
      )}
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
    case "/dashboard/account":
      return "Account Settings";
    default:
      return "BFP-FIRE SAFETY";
  }
}
