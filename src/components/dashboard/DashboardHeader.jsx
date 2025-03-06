import { UserButton } from "@clerk/clerk-react"
import { Bell, Menu, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Input } from "@/components/ui/input"



export function DashboardHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        {/* Search Section */}
        <div className="flex flex-1 items-center gap-4 md:gap-6 md:max-w-2xl md:mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search anything..." className="pl-8 w-full bg-muted" />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            + Add Expense
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {/* Notification indicator */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  )
}
