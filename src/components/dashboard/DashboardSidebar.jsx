import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  MessageSquare,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Wallets",
    icon: CreditCard,
    href: "/dashboard/wallets",
  },
  {
    title: "Transactions",
    icon: DollarSign,
    href: "/dashboard/transactions",
  },
  {
    title: "Budgets",
    icon: PieChart,
    href: "/dashboard/budgets",
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "/dashboard/reports",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
  },
  {
    title: "Shared Wallets",
    icon: Users,
    href: "/dashboard/shared",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function DashboardSidebar({ open, onOpenChange }) {
  const location = useLocation();

  // Close mobile sidebar on location change
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && open) {
      onOpenChange(false);
    }
  }, [open, onOpenChange]);

  // Fix for sheet popping up on every reload
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile && open) {
      onOpenChange(false);
    }
  }, [open, onOpenChange]);

  const nav = (
    <nav className="grid gap-2 px-2">
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.href;

        return (
          <Link key={link.href} to={link.href}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-2", {
                "bg-secondary/50": isActive,
              })}
            >
              <Icon className="h-5 w-5" />
              {link.title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open && window.innerWidth < 768} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-72 border-r bg-card p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="text-lg font-semibold">SpendWise</SheetTitle>
          </SheetHeader>
          <div className="py-4">{nav}</div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-72 border-r bg-card md:block">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">SpendWise</h2>
        </div>
        <div className="py-4">{nav}</div>
      </aside>
    </>
  );
}
