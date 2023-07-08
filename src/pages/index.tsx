import React, { use, useEffect, useState } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello {user}</h1>
    </div>
  );
}
