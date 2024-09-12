"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 relative p-4">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>

      <main className="w-full max-w-md space-y-8 relative z-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full mb-4">
              <Shield className="h-12 w-12 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-white text-center">
              BFP-FIRE SAFETY ENFORCEMENT INFORMATION SYSTEM
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Please sign in to access your account
            </p>
          </div>

          <form className="space-y-6" action="#" method="POST">
            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="username"
                  className="text-gray-300 text-sm font-medium mb-1 block"
                >
                  Username
                </Label>
                <div className="relative">
                  <User
                    className="absolute top-2.5 left-3 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-gray-300 text-sm font-medium mb-1 block"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute top-2.5 left-3 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
              <Checkbox
                id="accept-terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
                className="border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <Label
                htmlFor="accept-terms"
                className="ml-2 block text-sm text-gray-300"
              >
                I accept the terms and conditions
              </Label>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                disabled={!acceptTerms}
              >
                Sign in
              </Button>
            </div>
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
