import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";

const RegistrationPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("personal");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, isLoaded: clerkLoaded } = useSignUp();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clerkLoaded) {
      toast.error("Authentication system is loading. Please try again.");
      return;
    }

    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    try {
      setIsLoading(true);

      // Split full name into first and last name
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Start the sign-up process with Clerk
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
        phoneNumber,
        unsafeMetadata: {
          accountType,
        },
      });

      // Check if sign-up needs email verification
      if (result.status === "complete") {
        // Complete the sign-up
        await signUp.setActive({ session: result.createdSessionId });
        toast.success("Registration successful!");
        // Redirection will happen automatically due to auth state change
      } else {
        // Email verification might be needed
        const verifications = result.verifications;

        if (verifications.emailAddress.status === "pending") {
          toast.info("Please check your email to verify your account");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.errors?.[0]?.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-1">First Time?</h1>
            <p className="text-gray-600 text-sm">Register to get started :)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                className="h-10 px-3 border border-gray-200 rounded-md mt-1"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-10 px-3 border border-gray-200 rounded-md mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                placeholder="Enter your phone number"
                className="h-10 px-3 border border-gray-200 rounded-md mt-1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="h-10 px-3 border border-gray-200 rounded-md mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                className="h-10 px-3 border border-gray-200 rounded-md mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Type of Account
              </label>
              <Select value={accountType} onValueChange={setAccountType}>
                <SelectTrigger className="h-10 px-3 border border-gray-200 rounded-md mt-1">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-start space-x-2 space-y-0 pt-2">
              <Checkbox
                checked={agreeToTerms}
                onCheckedChange={setAgreeToTerms}
                className="mt-1 border-gray-300"
              />
              <div className="space-y-1 leading-none">
                <label className="text-xs text-gray-600">
                  I agree to the terms & policy
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-black hover:bg-black/90 text-white text-sm font-medium rounded-md mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-9 text-xs border border-gray-200 hover:bg-gray-50 rounded-md"
                onClick={() =>
                  signUp?.authenticateWithRedirect({
                    strategy: "oauth_google",
                    redirectUrl: "/sso-callback",
                    redirectUrlComplete: "/dashboard",
                  })
                }
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-9 text-xs border border-gray-200 hover:bg-gray-50 rounded-md"
              >
                <FaApple className="mr-2 h-4 w-4" />
                Sign in with Apple
              </Button>
            </div>

            <p className="text-center text-xs text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:text-blue-500"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0"></div>
          <img
            src="/placeholder.svg?height=800&width=600"
            alt="Red piggy bank with white polka dots"
            className="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
