// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication status
    const auth = localStorage.getItem("isAuthenticated");
    
    if (auth !== "true" && pathname !== "/login") {
      router.push("/login");
    } else if (auth === "true" && pathname === "/login") {
      router.push("/");
    }
    
    setIsAuthenticated(auth === "true");
  }, [pathname, router]);

  if (isAuthenticated === null && pathname !== "/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6fb]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#6f6c99]">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}