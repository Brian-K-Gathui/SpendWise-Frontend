import { Menu, Contact, BookOpen, Star, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";

export function NavBar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden bg-[#092C4C]"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader className="border-b pb-4">
              <SheetTitle>
                <Link to="/" className="text-xl font-bold">
                  SW
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <div className="mt-4 space-y-3 text-[#092C4C]">
                <Link
                  to="/"
                  className="block py-2 text-sm  font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  to="/features"
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  to="/support"
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Support
                </Link>
              </div>
              <div className="mt-6 space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Contact className="h-4 w-4" />
                  Contact Us
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <BookOpen className="h-4 w-4" />
                  Blog
                </Link>
                <Link
                  to="/testimonials"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Star className="h-4 w-4" />
                  Testimonials
                </Link>
                <Link
                  to="/careers"
                  className="flex items-center gap-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  <Briefcase className="h-4 w-4" />
                  Careers
                </Link>
              </div>
            </div>
            <SheetFooter className="mt-auto border-t pt-4">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button className="w-full">Sign up</Button>
                </div>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">SW</span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <nav className="flex items-center space-x-6 text-[#092C4C]">
            <Link
              to="/"
              className="text-sm  font-medium transition-colors hover:text-primary"
            >
              Home
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
        </div>
      </div>
    </nav>
  );
}
