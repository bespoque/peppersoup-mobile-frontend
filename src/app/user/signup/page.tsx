"use client";
import { useState } from 'react';
import Image from 'next/image';
// Define the types for form state
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default function Signup() {
  // Form state management
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="flex h-screen">
      {/* Left section (Form) */}
      <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign up to Sufpay</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            className="border p-3 rounded-md"
            value={formState.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            className="border p-3 rounded-md"
            value={formState.lastName}
            onChange={handleChange}
          />
        </div>
        
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          className="border p-3 mt-4 rounded-md w-full"
          value={formState.email}
          onChange={handleChange}
        />
        <div className="flex items-center mt-4">
          <div className="flex items-center border p-3 rounded-md">
            <span className="mr-2">🇳🇬</span>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              className="w-full"
              value={formState.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="border p-3 mt-4 rounded-md w-full"
          value={formState.password}
          onChange={handleChange}
        />
        
        <ul className="text-sm text-gray-600 mt-2">
          <li>• Use 8 or more characters</li>
          <li>• One Uppercase character</li>
          <li>• One lowercase character</li>
          <li>• One special character</li>
          <li>• One number</li>
        </ul>

        <p className="text-sm text-gray-600 mt-6">
          By creating an account, you agree to the{' '}
          <a href="#" className="text-blue-600 underline">Terms of use</a> and{' '}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </p>

        <button className="mt-6 bg-gray-300 text-white py-3 px-4 rounded-md w-full">
          Create an account
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <a href="#" className="text-blue-600 underline">Log in</a>
        </p>
      </div>

      <div className="hidden md:block w-1/3 relative">
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
