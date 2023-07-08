import { useState } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import Navbar from "@/components/Navbar";
import { collection, doc, setDoc } from "@firebase/firestore";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    if (!email || !password) {
      setErrorMessage("Email and password are required fields.");
      return;
    }

    if (!name) {
      setErrorMessage("Name is a required field.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Email should be in a valid format.");
      return;
    }
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Success!");
      setSignupSuccess(true);

      // Add user to the database
      const userRef = doc(collection(db, "users"));
      await setDoc(userRef, {
        name,
        email,
      });
      localStorage.setItem("user", JSON.stringify(name));

      setTimeout(() => {
        setSignupSuccess(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Error signing up. Please try again.");
    }
  };

  const validateEmail = (email: string) => {
    // Email validation regex
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-4 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Sign Up
            </button>
            {signupSuccess && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-4">
                Signup successful! Redirecting you to the Home page...
              </div>
            )}
            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-4">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
