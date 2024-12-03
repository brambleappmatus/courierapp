"use client";

import { useState, Suspense } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for mobile */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="w-[240px] sm:w-[240px] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Sidebar for desktop */}
        <aside className={cn(
          "hidden h-[calc(100vh-3.5rem)] shrink-0 transition-all duration-300 ease-in-out md:block gpu-accelerated",
          isSidebarCollapsed ? "w-16" : "w-[240px]"
        )}>
          <Sidebar 
            collapsed={isSidebarCollapsed} 
            onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="h-full" 
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          <Suspense 
            fallback={
              <div className="w-full h-full backdrop-blur-sm bg-background/50 transition-all duration-300">
                <LoadingSpinner />
              </div>
            }
          >
            <div className="p-8 animate-fade-in">
              {children}
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}