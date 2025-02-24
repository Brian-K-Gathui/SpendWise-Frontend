import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

//mobile first design ----
export function NavBar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Link to="/" className="text-xl font-bold">
                  SW
                </Link>
                {/* <img src="/logo.png" alt="logo" className="h-8 w-8" /> */}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home Page
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About Us
              </Link>
              <Link
                to="/features"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                to="/support"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Support
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">SW</span>
          </Link>
          {/* <img src="/logo.png" alt="logo" className="h-8 w-8" /> */}
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home Page
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About Us
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="/support"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Support
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex">
            Login
          </Button>
          <Button className="hidden md:flex">Sign up</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-4 flex flex-col space-y-4">
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
                <Button className="w-full justify-start">Sign up</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
