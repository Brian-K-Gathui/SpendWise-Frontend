import {
  Menu,
  Contact,
  BookOpen,
  Star,
  Briefcase,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <nav className="border-b border-border">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-primary text-primary-foreground"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col bg-sidebar text-sidebar-foreground"
          >
            <SheetHeader className="border-b border-sidebar-border pb-4">
              <SheetTitle>
                <Link to="/" className="text-xl font-bold">
                  SW
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="mt-4 space-y-3 text-sidebar-foreground">
                <Link
                  to="/"
                  className="block py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  About Us
                </Link>
                <Link
                  to="/features"
                  className="block py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  Features
                </Link>
                <Link
                  to="/support"
                  className="block py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  Support
                </Link>
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  <Contact className="h-4 w-4" /> Contact Us
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  <BookOpen className="h-4 w-4" /> Blog
                </Link>
                <Link
                  to="/testimonials"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  <Star className="h-4 w-4" /> Testimonials
                </Link>
                <Link
                  to="/careers"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-sidebar-primary"
                >
                  <Briefcase className="h-4 w-4" /> Careers
                </Link>
              </div>
            </div>
            <SheetFooter className="mt-auto border-t border-sidebar-border pt-4">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="grid gap-2">
                    <Link to="/dashboard" className="w-full">
                      <Button variant="outline" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button className="w-full" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full">Sign up</Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">SW</span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <nav className="flex items-center space-x-6 text-primary">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              About Us
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Features
            </Link>
            <Link
              to="/support"
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Support
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isAuthenticated ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="hidden md:flex text-primary hover:bg-primary/10 hover:text-primary"
                >
                  Login
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
