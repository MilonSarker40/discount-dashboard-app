// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Shield, Store } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call - In production, replace with actual authentication
    setTimeout(() => {
      // Demo credentials: admin@discountapp.com / admin123
      if (email === "admin@discountapp.com" && password === "admin123") {
        // Store auth state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", "admin");
        
        // Redirect to dashboard
        router.push("/");
      } else {
        setError("Invalid email or password. Try: admin@discountapp.com / admin123");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg mb-4">
            <Store className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-black text-[#1d1b4b]">Discount App</h1>
          <p className="text-[#6f6c99] mt-2">Premium Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-[32px] shadow-xl border border-[#f0ebff] p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1d1b4b]">Welcome Back!</h2>
            <p className="text-[#6f6c99] text-sm mt-1">Sign in to manage your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <Shield size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a86b3]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                  placeholder="admin@discountapp.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#1d1b4b] font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8a86b3]" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#e0d9ff] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8a86b3] hover:text-violet-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-[#e0d9ff] text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-[#6f6c99]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-violet-600 hover:text-violet-700 font-semibold">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-violet-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Sign In
                </>
              )}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-violet-50 rounded-xl border border-violet-100">
              <p className="text-xs text-violet-700 font-semibold mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-sm text-violet-600">
                <p>📧 Email: admin@discountapp.com</p>
                <p>🔑 Password: admin123</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#8a86b3] text-sm mt-6">
          © 2024 Discount App. All rights reserved.
        </p>
      </div>
    </div>
  );
}