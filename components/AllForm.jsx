"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Label, TextInput } from "flowbite-react";

export default function AllForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Hapa ndipo tunatengeneza SESSION kwa kuhifadhi taarifa kwenye localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", String(data.user.id));
        localStorage.setItem("role", data.role);

        alert("Umeingia kwa mafanikio!");

        // Kuwapeleka watumiaji kulingana na role yao (Admin au Student/User)
        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/users");
        }
      } else {
        setErrorMessage(data.message || "Imeshindikana kuingia, jaribu tena.");
      }
    } catch (error) {
      console.error("Login network error:", error);
      setErrorMessage("Imeshindikana kuunganisha na server.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="w-full max-w-full overflow-x-hidden">
    <div className="min-h-screen bg-[#1e293b] flex flex-col items-center justify-center p-6 mb-10">
      
      {/* Vyeo vya Juu (h1 na h2) */}
      <div className="text-center mb-8">
        <h2 className="text-lg font-medium text-gray-300">
          Task Tracking & Project Verification Portal
        </h2>
      </div>

      {/* Fomu Iliyokaa Katikati na yenye Kuonekana Vizuri */}
      <div className="w-full max-w-md bg-[#2c3e50] p-8 rounded-xl shadow-2xl border border-gray-700">
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 text-sm rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" className="text-white font-semibold text-sm" />
            </div>
            <TextInput 
              id="email1" 
              type="email" 
              placeholder="User email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" className="text-white font-semibold text-sm" />
            </div>
            <TextInput 
              id="password1" 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all py-1.5"
          >
            {loading ? "Inapakia..." : "Login"}
          </Button>
        </form>

        {/* Sehemu ya kwenda Sign Up kama hana akaunti */}
        <div className="text-center mt-6">
          <p className="text-sm font-medium text-gray-300">
            Huna akaunti bado?{" "}
            <Link href="/sign_up" className="font-bold text-blue-400 hover:underline">
              Sign Up hapa
            </Link>
          </p>
        </div>

      </div>

    </div>
   
  {/* Yaliyomo ndani */}
</div>
  );
}