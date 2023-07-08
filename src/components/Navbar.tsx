import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
            <Link href="/Login">
              <p className="text-white">Login</p>
            </Link>
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
