"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Map, 
  BarChart3, 
  Settings, 
  Users,
  ChevronLeft,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  onCollapse?: () => void;
}

export function Sidebar({ className, collapsed = false, onCollapse }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Live Map",
      icon: Map,
      href: "/routes",
      active: pathname === "/routes",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      label: "Couriers",
      icon: Users,
      href: "/couriers",
      active: pathname === "/couriers",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  return (
    <div className={cn(
      "relative flex flex-col h-full border-r bg-background",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      {/* Collapse button at the top */}
      <div className="p-3 border-b">
        <Button
          onClick={onCollapse}
          variant="ghost"
          className={cn(
            "w-full justify-center p-2",
            !collapsed && "justify-between"
          )}
        >
          {collapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <>
              <span>Menu</span>
              <ChevronLeft className={cn(
                "h-4 w-4 transition-transform duration-300",
                collapsed && "rotate-180"
              )} />
            </>
          )}
        </Button>
      </div>

      {/* Navigation items */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-1 py-4">
          {routes.map((route) => {
            const LinkContent = (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium menu-item-transition whitespace-nowrap",
                  route.active 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-accent hover:text-accent-foreground",
                  collapsed ? "justify-center px-2" : "w-full"
                )}
              >
                <route.icon className={cn(
                  "h-5 w-5 shrink-0 transition-all duration-300 ease-in-out",
                  !collapsed && "mr-3"
                )} />
                <span className={cn(
                  "transition-all duration-300 ease-in-out",
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}>
                  {route.label}
                </span>
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={route.href} delayDuration={0}>
                  <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center">
                    {route.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return LinkContent;
          })}
        </div>
      </div>
    </div>
  );
}