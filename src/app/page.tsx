// src/app/page.tsx
"use client";
import { useState } from "react";
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-700">🔒 WebShield</h1>
          <p className="mt-2 text-gray-600">Your Web Vulnerability Scanner</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex justify-around mb-6">
            <button
              className={`px-4 py-2 font-medium rounded-lg ${
                isLogin
                  ? "bg-blue-600 text-white shadow"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 font-medium rounded-lg ${
                !isLogin
                  ? "bg-blue-600 text-white shadow"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full btn btn-primary mt-4"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Social Auth */}
          <div className="flex gap-3">
            <button className="btn btn-outline flex-1">Google</button>
            <button className="btn btn-outline flex-1">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
