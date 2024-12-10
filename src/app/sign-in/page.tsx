"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { token, user } = response.data;
      Cookies.set("token", token, { expires: 1 });
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Column - Logo */}
      <div className="hidden md:flex md:w-1/2 bg-[#E5E7EB] items-center justify-center p-8">
        <div className="max-w-[400px] w-full">
          <Image
            src="/logo_amnet.png"
            alt="AMNET - ASEAN MANGROVE NETWORK"
            width={400}
            height={400}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[480px] space-y-8">
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Image
              src="/logo_amnet.png"
              alt="AMNET - ASEAN MANGROVE NETWORK"
              width={200}
              height={200}
              priority
              className="w-48 h-auto"
            />
          </div>

          <h1 className="text-4xl font-bold text-center mb-8">Sign in</h1>

          {/* Tampilkan pesan error jika ada */}
          {errorMessage && (
            <div className="bg-red-100 text-red-600 p-2 rounded-lg mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-lg">
                Username
              </label>
              <Input
                id="username"
                type="text"
                required
                className="w-full h-12 px-4 rounded-full border-gray-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-lg">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full h-12 px-4 rounded-full border-gray-300 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-[#446A46] hover:bg-[#385839] text-white font-medium text-lg"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-gray-600">You don&apos;t have an account?</p>
            <p className="text-[#446A46]">Please contact your Country Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
