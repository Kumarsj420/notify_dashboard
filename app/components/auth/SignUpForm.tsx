"use client";

import Input from "../form/Input";
import Label from "../form/Label";
import { useForm } from "../form/useForm";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import Button from "../Button";
import { useRouter } from "next/navigation"; // Add this import
import API from "@/app/services/api";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  mainDomain: z
    .string()
    .min(1, "Main domain is required")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/, "Please enter a valid domain (e.g., example.com)"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await API.post("/auth/register", {
        email: data.email,
        mainDomain: data.mainDomain,
        name: data.name,
        password: data.password,
      });

      // Handle successful registration
      if (response) {
        // Show success modal instead of immediate redirect
        setShowSuccessModal(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Registration error:", error);

      // Handle API error response
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Registration failed. Please try again.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-orange-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600 mb-8">
              Join NotifyBreach to protect your organization
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label required>Company Name</Label>
                <Input
                  {...form.getInputFields("name")}
                  type="text"
                  placeholder="Enter your company name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label required>Main Domain</Label>
                <Input
                  {...form.getInputFields("mainDomain")}
                  type="text"
                  placeholder="Enter your main domain (e.g., example.com)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label required>Email Address</Label>
                <Input
                  {...form.getInputFields("email")}
                  type="email"
                  placeholder="Enter your work email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label required>Password</Label>
                <Input
                  {...form.getInputFields("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="mt-1"
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeClosedIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  }
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-orange-600 hover:text-orange-500"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-orange-600 hover:text-orange-500"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={loading || form.formState.isSubmitting}
                disabled={loading || form.formState.isSubmitting}
              >
                {loading || form.formState.isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Account Request Received!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                We have received your account request. Our team will review your application and you&apos;ll receive an email confirmation shortly.
              </p>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/login");
                }}
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
