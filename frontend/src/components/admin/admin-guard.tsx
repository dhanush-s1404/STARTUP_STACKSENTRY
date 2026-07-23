"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/");
      return;
    }

    const verify = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("access_token");
          router.replace("/");
          return;
        }
        const user = await res.json();
        if (!user.is_superuser) {
          localStorage.removeItem("access_token");
          router.replace("/");
          return;
        }
        setAuthorized(true);
      } catch {
        localStorage.removeItem("access_token");
        router.replace("/");
      }
    };

    verify();
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(230,63%,5%)]">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-blue-400 mx-auto" />
          <p className="text-white/40 text-sm">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
