"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-700 to-orange-500 bg-opacity-90 relative p-4">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>

      <main className="w-full max-w-md space-y-8 relative z-10">
        <div className="backdrop-blur-md bg-white bg-opacity-20 p-8 rounded-xl shadow-2xl border border-white border-opacity-30">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-2">
              BFP-FIRE SAFETY ENFORCEMENT INFORMATION SYSTEM
            </h2>
            <p className="text-sm text-gray-200">
              Please sign in to your account
            </p>
          </div>

          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-6">
              <div className="relative">
                <Label htmlFor="username" className="text-white mb-1 block">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute top-3 left-3 h-5 w-5 text-white" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 w-full bg-white bg-opacity-20 text-white  placeholder:text-gray-100"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password" className="text-white mb-1 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-3 left-3 h-5 w-5 text-white" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 w-full bg-white bg-opacity-20 text-white  placeholder:text-gray-100"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white" />
                    ) : (
                      <Eye className="h-5 w-5 text-white" />
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
                className="border-white"
              />
              <Label
                htmlFor="accept-terms"
                className="ml-2 block text-sm text-white"
              >
                I accept the terms and conditions
              </Label>
            </div>

            <div>
              <Link href="/dashboard">
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
                  disabled={!acceptTerms}
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="relative z-10 mt-8 text-center text-white text-sm">
        © 2024 BFP-FIRE SAFETY ENFORCEMENT INFORMATION SYSTEM. All rights
        reserved.
      </footer>
    </div>
  );
}
