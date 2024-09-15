"use client"
import Image from "next/image";
import React, { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login (e.g., redirect to dashboard)
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Failed to login. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="w-full md:w-1/2 flex flex-col bg-white shadow-lg">
        <nav className="flex items-center mb-12 border-b p-3 bg-white shadow-md">
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
          <span className="ml-4 text-2xl font-bold">Pepper Soup Place</span>
        </nav>

        <div className="flex flex-grow justify-center items-center">
          <div className="p-6 w-full max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Welcome, Operations
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email/Phone number
                </label>
                <input
                  type="text"
                  id="email"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    <Image src="/images/eye-slash.png" alt="" width={20} height={20} />
                  </span>
                </div>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900"
              >
                Login to Operations
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        className="hidden md:flex w-full md:w-1/2 p-12 flex-col justify-center items-start bg-gray-900 text-white bg-cover bg-no-repeat bg-center relative"
        style={{ backgroundImage: `url('/images/loginplate.png')` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 bg-opacity-60 p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-6">
            The Pepper Soup Place Operations Centre
          </h2>
          <div className="space-y-6">
            <div className="text-lg md:text-xl">
              <span className="font-bold text-green-400">2</span> Orders In
              Progress
            </div>
            <hr />
            <div className="text-lg md:text-xl">
              <span className="font-bold text-green-400">18</span> Incoming
              Orders
            </div>
            <hr />
            <div className="text-lg md:text-xl">
              <span className="font-bold text-green-400">200</span> Active Users
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
