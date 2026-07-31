"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Tumeongeza Link ya Next.js

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: username, phone, email, password, role: "user" }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Umejisajili vizuri! Karibu u-login.");
        router.push("/all_login");
      } else {
        setMessage(data.message || "Imeshindikana kujisajili.");
      }
    } catch (error) {
      console.error("Register network error:", error);
      setMessage("Imeshindikana kuunganisha na server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="mx-auto grid max-w-xl w-full grid-cols-1 gap-5 rounded-2xl border border-gray-700 bg-white p-8 shadow-2xl sm:grid-cols-2"
      >
        <div className="sm:col-span-2 text-center mb-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-wide">Tengeneza Akaunti</h2>
          <p className="text-sm font-semibold text-gray-500 mt-1">Jaza taarifa zako ili kuanza</p>
        </div>

        {message && (
          <div className="sm:col-span-2 p-3 bg-red-500/10 border border-red-500 text-red-600 font-bold text-sm rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Username (Kushoto) */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1" htmlFor="username">
            Username
          </label>
          <input
            className="mt-1 w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:border-indigo-600 focus:outline-none shadow-sm"
            id="username"
            type="text"
            placeholder="Jina lako"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Phone No (Kulia) */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1" htmlFor="phone">
            Phone No
          </label>
          <input
            className="mt-1 w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:border-indigo-600 focus:outline-none shadow-sm"
            id="phone"
            type="tel"
            placeholder="Namba ya simu"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email (Chini yake) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-gray-900 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="mt-1 w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:border-indigo-600 focus:outline-none shadow-sm"
            id="email"
            type="email"
            placeholder="Weka email yako"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password (Chini ya Email) */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-gray-900 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="mt-1 w-full rounded-lg border-2 border-gray-400 bg-white px-4 py-3 font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:border-indigo-600 focus:outline-none shadow-sm"
            id="password"
            type="password"
            placeholder="Weka nenosiri"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Sign Up Button */}
        <div className="sm:col-span-2 mt-2">
          <button
            className="block w-full rounded-xl border border-indigo-600 bg-indigo-600 px-12 py-3.5 text-base font-black text-white transition-all hover:bg-indigo-700 shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Inasajili..." : "Sign Up"}
          </button>
        </div>

        {/* Sehemu ya kwenda Login kama tayari ana akaunti */}
        <div className="sm:col-span-2 text-center mt-3">
          <p className="text-sm font-medium text-gray-600">
            Una akaunti tayari?{" "}
            <Link href="/all_login" className="font-bold text-indigo-600 hover:underline">
              Login hapa
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}