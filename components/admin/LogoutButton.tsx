"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
    >
      <LogOut size={14} />
      Salir
    </button>
  );
}
