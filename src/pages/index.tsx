import GroupCreationForm from "@/pages/GroupCreationForm";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Groups from "@/components/Groups";
import Events from "@/components/Events";

export default function Home() {
  const [user, setUser] = useState<string | null>("guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // localStorage.removeItem("user");
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-between py-10 px-4">
        <h1 className="flex-grow-0 text-3xl font-bold">Hello, {user}</h1>
        <div className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600">
          {/* Create a group */}
          <Link href="/GroupCreationForm">Create a new group+</Link>
        </div>
      </div>

      <div className="flex py-10 px-4">
        <div className="w-3/12 text-2xl">
          Your Groups
          <Groups />
        </div>
        <div className="w-9/12 text-2xl">
          Browse Events
          <Events />
        </div>
      </div>
    </>
  );
}
