"use client";

export function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/admin-access";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
    >
      Logout
    </button>
  );
}
