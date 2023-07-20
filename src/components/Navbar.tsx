import { auth } from "@/firebase";
import { signOut } from "@firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      console.log("User has been logged out");
      window.location.reload();
      // Perform any additional actions after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle any errors that occurred during logout
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      console.log("User is logged in");
      setIsLoggedIn(true);
    } else {
      console.log("User is not logged in");
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-9xl mx-auto px-2 sm:px-6 lg:px-4">
        <div className="flex items-center space-evenly h-16">
          {/* Company Logo */}
          <div>
            <Link href="/">
              <p className="text-white ">Home</p>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex flex-grow">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 ml-4 text-white rounded-l-lg px-4 py-2 w-7xl focus:outline-none"
            />
            <button className="bg-gray-900 text-white rounded-r-lg px-4">
              Search
            </button>
          </div>

          {/* Login and Sign Up Buttons */}
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            ) : (
              <Link href="/Login">
                <p className="text-white">Login</p>
              </Link>
            )}
            <Link href="/signUp">
              <p className="text-white">Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
