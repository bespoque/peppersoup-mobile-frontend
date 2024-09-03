"use client"; // Make it a Client Component

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submit logic here
    console.log(formState);
  };

  return (
    <div className="flex h-screen">
      {/* Left section (Login Form) */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Sign in to Sufpay
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email address"
            className="border p-3 mb-4 rounded-md w-full"
            value={formState.email}
            onChange={handleChange}
          />
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="border p-3 rounded-md w-full"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <Link href="#">
              <span className="text-blue-600 text-sm underline">
                Forgot your password?
              </span>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            By creating an account, you agree to the{" "}
            <Link href="#">
              <span className="text-blue-600 underline">Terms of use</span>
            </Link>{" "}
            and{" "}
            <Link href="#">
              <span className="text-blue-600 underline">Privacy Policy</span>
            </Link>
            .
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Create an account
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="#">
            <span className="text-blue-600 underline">Log in</span>
          </Link>
        </p>

        <div className="relative flex py-5 items-center mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full bg-white border border-gray-300 text-black py-3 px-4 rounded-md hover:bg-gray-100 transition duration-300 flex justify-center items-center">
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Google
        </button>
      </div>

      {/* Right section (Image) */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/images/cash.png"
          alt="Welcome to Sufpay"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-green-900 opacity-50"></div>
        <div className="absolute top-1/3 left-10 text-white">
          <h1 className="text-4xl font-bold">Welcome to Sufpay</h1>
          <p className="mt-2">...easy pay</p>
        </div>
      </div>
    </div>
  );
}
