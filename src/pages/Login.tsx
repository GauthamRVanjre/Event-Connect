import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Email and password are required fields.");
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const validateEmail = (email: string) => {
    // Email validation regex
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-4 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
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
            Log In
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In with Google
          </button>
          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-4">
              {errorMessage}
            </div>
          )}
          {loginSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-4">
              Login successful! Redirecting you to the homepage...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
