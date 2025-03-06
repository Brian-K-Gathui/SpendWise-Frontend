import { useState, useEffect } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setSidebarOpen(!isMobile);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - now extends full height */}
      <DashboardSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header - now has proper border */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content Area */}
        <main className="flex-1 p-4 pt-6 md:p-8 overflow-auto">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
