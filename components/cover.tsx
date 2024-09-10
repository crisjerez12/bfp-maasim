"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Clock,
  FileText,
  Building2,
  User,
  LogOut,
  Menu,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the types for the props passed to the Cover component
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Cover({ children, className }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setTimeout(() => setShowTitle(true), 100);
    } else {
      setShowTitle(false);
    }
  };

  useEffect(() => {
    setShowTitle(true);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside
        className={cn(
          "relative z-20 flex flex-col h-full bg-red-900 text-white transition-all duration-300 ease-in-out",
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
            className="text-white hover:bg-red-800 transition-colors duration-200"
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
            <NavItem
              href="/dashboard/transactions"
              icon={FileText}
              title="Transactions"
              sidebarOpen={sidebarOpen}
              active={pathname === "/dashboard/transactions"}
            />
            <NavItem
              href="/dashboard/establishments"
              icon={Building2}
              title="Establishments"
              sidebarOpen={sidebarOpen}
              active={pathname === "/dashboard/establishments"}
            />
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
              "w-full justify-start text-white hover:bg-red-800 transition-colors duration-200",
              !sidebarOpen && "justify-center"
            )}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {getPageTitle(pathname)}
            </h1>
            <Flame className="h-8 w-8 text-red-600" />
          </div>
        </header>
        <div className="p-6 text-red-950">{children}</div>
      </main>
    </div>
  );
}

// Define types for NavItem props
interface NavItemProps {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  sidebarOpen: boolean;
  active: boolean;
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
          ? "bg-red-800 text-white"
          : "text-red-100 hover:bg-red-800 hover:text-white",
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

function getPageTitle(pathname: string): string {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/dashboard/due":
      return "Due Establishments";
    case "/dashboard/transactions":
      return "Recent Transactions";
    case "/dashboard/establishments":
      return "Establishments";
    case "/dashboard/account":
      return "Account Settings";
    default:
      return "BFP-FIRE SAFETY";
  }
}
