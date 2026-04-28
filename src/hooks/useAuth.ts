"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(redirect: boolean = true) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && redirect) {
      router.push("/login");
    }
  }, [redirect, router]);

  return {
    isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("token"),
  };
}
