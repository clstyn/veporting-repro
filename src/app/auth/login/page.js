'use client';

import Image from "next/image";
import Button from "@/app/ui/auth/button";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors when a new request starts

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("#", {
        // ganti link
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <Image
          src={
            `/logo.svg`
          }
          alt="logo"
          width={56}
          height={56}
        />
        <p className="font-bold mt-3 tracking-wide">Welcome Back</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium font-[#535353] mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium font-[#535353] mb-2">
              Password
            </label>
            <input
              type="text"
              name="password"
              className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit">Login</Button>
        </div>
      </form>

      {error && <div className="text-red-900 font-bold">{error}</div>}

      <Link href={`/auth/verify`}>
        <p className="w-full text-end text-red-700 my-4 hover:underline">
          Reset Password
        </p>
      </Link>
    </div>
  );
}
