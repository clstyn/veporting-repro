"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@/app/_components/auth/button";
import { AuthContext } from "@/app/_context/authContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      login(data);
      router.push("/dashboard");
      toast.success("Login success");
    } catch (error) {
      setError(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <Image src={`/logo.svg`} alt="logo" width={56} height={56} />
        <p className="font-bold mt-3 tracking-wide">Welcome Back</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="font-medium font-[#535353] mb-2"
            >
              Username atau email
            </label>
            <input
              type="text"
              name="username"
              className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-medium font-[#535353] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="bg-[#F6F6F6] border border-[#BFBFBF] rounded-md h-12 focus:outline-none px-2"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit">Login</Button>
        </div>
      </form>

      {error && <div className="text-red-900 font-bold">{error}</div>}

      <Link href={`/auth/send-reset`}>
        <p className="w-full text-end text-red-700 my-4 hover:underline">
          Reset Password
        </p>
      </Link>
    </div>
  );
}
