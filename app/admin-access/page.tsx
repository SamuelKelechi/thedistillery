"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAccessPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/verify-passkey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    const data = await res.json();
    if (data.status === "success") {
      router.push("/admin");
    } else {
      setError("Invalid Passkey");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Admin Access
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="password"
          placeholder="Enter Passkey"
          className="w-full p-2 border rounded mb-3"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button className="w-full bg-black text-white p-2 rounded">
          Enter
        </button>
      </form>
    </div>
  );
}
