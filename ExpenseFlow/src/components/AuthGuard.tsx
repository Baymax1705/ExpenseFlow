"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/forgot-password", "/offline"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      route === "/" ? pathname === "/" : pathname.startsWith(route)
    );

    if (!token && !isPublicRoute) {
      router.push("/login");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
