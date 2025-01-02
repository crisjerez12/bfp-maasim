"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { authenticate } from "./actions/auth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bfplogo from "@/public/logo.png";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await authenticate(formData);
    if (!result.success) {
      toast({
        title: "Unsuccessful",
        variant: "destructive",
        description: result.error,
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: "Success",
      variant: "success",
      description: "Opening Dashboard",
    });
    router.push("/dashboard");
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative p-4">
      <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-30"></div>

      <main className="w-full max-w-md space-y-8 relative z-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
          <div className="flex flex-col items-center mb-6">
            <div className=" mb-4">
              <Image src={bfplogo} height={60} width={60} alt="bfp-logo" />
            </div>
            <h1 className="text-2xl font-bold text-white text-center">
              BFP-FIRE SAFETY ENFORCEMENT INFORMATION SYSTEM
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Please sign in to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="text-gray-300 text-sm font-medium mb-1 block"
                >
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute top-2.5 left-3 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 py-2 w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-gray-300 text-sm font-medium mb-1 block"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-2.5 left-3 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 py-2 pr-10 w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 border-gray-600 text-blue-500 focus:ring-blue-500"
                required
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 block text-sm text-gray-300"
              >
                I accept the terms and conditions
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={!acceptTerms || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </form>
        </div>
      </main>

      <footer className="relative z-10 mt-8 text-center text-gray-400 text-sm">
        <p>
          © 2024 BFP-FIRE SAFETY ENFORCEMENT INFORMATION SYSTEM. All rights
          reserved.
        </p>
        <p className="mt-1">
          Authorized access only. Unauthorized use is strictly prohibited.
        </p>
      </footer>
    </div>
  );
}
