"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Clock, Image as ImageIcon, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Coches", href: "/admin/dashboard", icon: Car },
    { name: "Horarios", href: "/admin/horarios", icon: Clock },
    { name: "Imágenes", href: "/admin/imagenes", icon: ImageIcon },
  ];

  // If we are on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard size={24} className="text-blue-600" />
            Don Remondo
          </Link>
          <p className="text-xs text-gray-500 mt-1">Panel de Administración</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-blue-600" : "text-gray-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
