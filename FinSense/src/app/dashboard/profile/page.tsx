"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUser, FaCalendarAlt, FaRedo } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Springfield, USA",
    profileImage: "", // Placeholder for uploaded image
  });

  const [activeTab, setActiveTab] = useState("profile");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prevUser) => ({ ...prevUser, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-teal-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md overflow-hidden">
                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-slate-500">Phone</h3>
                <p className="text-lg font-semibold text-slate-800 mt-1">{user.phone}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-slate-500">Address</h3>
                <p className="text-lg font-semibold text-slate-800 mt-1">{user.address}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-slate-500">Upload Profile Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-slate-800 border-1 pl-2 rounded-[10px]"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-teal-500 transition text-lg font-medium">
                Edit Profile
              </button>
            </div>
          </div>
        );
      case "previousMonths":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Previous Months Data</h2>
            <p className="text-sm text-slate-500">Here you can view your previous months&#39; financial data.</p>
            {/* Add detailed data visualization here */}
          </div>
        );
      case "recurringExpenses":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Recurring Expenses</h2>
            <p className="text-sm text-slate-500">List of subscriptions and recurring expenses will be displayed here.</p>
            {/* Add recurring expenses details here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 flex px-32">
      <aside className="w-64 bg-white shadow-md p-6 rounded-lg h-screen">
        <nav className="space-y-4">
          <button
            className={`w-full flex items-center gap-4 text-left px-4 py-2 rounded-lg font-medium border border-slate-300 transition-all duration-200 ${
              activeTab === "profile" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="text-lg" /> Profile
          </button>
          <button
            className={`w-full flex items-center gap-4 text-left px-4 py-2 rounded-lg font-medium border border-slate-300 transition-all duration-200 ${
              activeTab === "previousMonths" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setActiveTab("previousMonths")}
          >
            <FaCalendarAlt className="text-lg" /> Previous Months Data
          </button>
          <button
            className={`w-full flex items-center gap-4 text-left px-4 py-2 rounded-lg font-medium border border-slate-300 transition-all duration-200 ${
              activeTab === "recurringExpenses" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setActiveTab("recurringExpenses")}
          >
            <FaRedo className="text-lg" /> Recurring Expenses
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}