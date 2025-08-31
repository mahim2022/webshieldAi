"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!isLogin && password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin ? { email, password } : { email, password, name }
        ),
      });

      const data = await res.json();
      setMessage(data.message || "Something went wrong");

      if (res.ok) {
        // ✅ Redirect to dashboard (or homepage) after login/signup
        // for now just simulate success
        // console.log("✅ Auth success:", data);
      router.push("/scan");

      }
    } catch (err) {
      setMessage("⚠️ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              type="button"
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
              type="button"
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary mt-4"
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Login"
                : "Signup"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Social Auth (placeholders) */}
          <div className="flex gap-3">
            <button className="btn btn-outline flex-1">Google</button>
            <button className="btn btn-outline flex-1">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
