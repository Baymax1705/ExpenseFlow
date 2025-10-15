"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username] = useState("John Doe");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    const handleUserAuthenticated = () => {
      const updatedToken = localStorage.getItem("token");
      if (updatedToken) {
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("userAuthenticated", handleUserAuthenticated);

    return () => {
      window.removeEventListener("userAuthenticated", handleUserAuthenticated);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setShowDropdown(false);
    router.push("/");
  };

  const handleMenuClick = (path: string) => {
    setShowDropdown(false);
    router.push(path);
  };

  return (
    <header className="w-full bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-1 ring-1 ring-slate-100">
            <Image src="/logo-mark.svg" alt="FinSense" width={40} height={40} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="cursor-pointer">FinSense</span>
            </h1>
            <p className="text-xs text-slate-500 cursor-pointer">Expense Pattern Analyzer</p>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="relative flex items-center gap-5">
            <span className="text-lg font-bold text-slate-700">{username}</span>
            <div
              className="bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-sm font-medium text-slate-700">J</span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleMenuClick("/dashboard/profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    Chat with us
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-700 hover:underline">Log in</Link>
            <Link href="/signup" className="ml-2 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-5 py-2 rounded-full text-sm shadow-md">Get Started</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
